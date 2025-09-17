from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import transaction
from django.utils import timezone
from decimal import Decimal
from .models import Order, Wallet, Holding, OutboxMessage
from .serializers import OrderSerializer

# Helper for consistent decimal quantization
DEC_PLACES = Decimal('0.00000001')  # 8 decimal places
CURR_PLACES = Decimal('0.01')       # 2 decimal places


class OrderListView(generics.ListAPIView):
    """
    List all orders for the authenticated user
    """
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')


class CreateOrderView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        data = serializer.validated_data

        symbol = data['symbol'].upper()
        side = data['side']
        quantity = Decimal(str(data['quantity'])).quantize(DEC_PLACES)
        price = Decimal(str(data['price'])).quantize(DEC_PLACES)
        amount = (price * quantity).quantize(DEC_PLACES)

        with transaction.atomic():
            wallet, _ = Wallet.objects.select_for_update().get_or_create(user=user)
            holding_qs = Holding.objects.select_for_update().filter(user=user, symbol=symbol)
            holding = holding_qs.first()

            # Create pending order
            order = Order.objects.create(
                user=user,
                symbol=symbol,
                side=side,
                quantity=quantity,
                price=price,
                amount=amount,
                status='pending'
            )

            # ---- BUY PATH ----
            if side == 'buy':
                if wallet.balance < amount:
                    order.status = 'failed'
                    order.note = 'Insufficient funds'
                    order.save(update_fields=['status', 'note'])
                    OutboxMessage.objects.create(
                        message_type='order_failed',
                        payload={'order_id': str(order.id), 'reason': order.note},
                        unique_key=f'order_failed:{order.id}'
                    )
                    return Response({'error': order.note}, status=status.HTTP_400_BAD_REQUEST)

                wallet.balance = (wallet.balance - amount).quantize(DEC_PLACES)
                wallet.save(update_fields=['balance'])

                prev_qty = holding.quantity if holding else Decimal('0')
                prev_avg = holding.avg_price if holding else Decimal('0')

                new_qty = (prev_qty + quantity).quantize(DEC_PLACES)
                new_avg = ((prev_qty * prev_avg) + amount).quantize(DEC_PLACES) / new_qty if new_qty > 0 else Decimal('0')

                if holding:
                    holding.quantity = new_qty
                    holding.avg_price = new_avg
                    holding.save(update_fields=['quantity', 'avg_price'])
                else:
                    holding = Holding.objects.create(user=user, symbol=symbol, quantity=new_qty, avg_price=new_avg)

                order.status = 'executed'
                order.executed_at = timezone.now()
                order.note = 'Buy executed'
                order.save(update_fields=['status', 'executed_at', 'note'])
                profit_loss = Decimal('0.00')

            # ---- SELL PATH ----
            else:
                if not holding or holding.quantity < quantity:
                    order.status = 'failed'
                    order.note = 'Insufficient holdings'
                    order.save(update_fields=['status', 'note'])
                    OutboxMessage.objects.create(
                        message_type='order_failed',
                        payload={'order_id': str(order.id), 'reason': order.note},
                        unique_key=f'order_failed:{order.id}'
                    )
                    return Response({'error': order.note}, status=status.HTTP_400_BAD_REQUEST)

                new_qty = (holding.quantity - quantity).quantize(DEC_PLACES)
                cost_price = holding.avg_price
                profit_loss = ((price - cost_price) * quantity).quantize(DEC_PLACES)

                holding.quantity = new_qty
                holding.save(update_fields=['quantity'])

                wallet.balance = (wallet.balance + amount).quantize(DEC_PLACES)
                wallet.save(update_fields=['balance'])

                order.status = 'executed'
                order.executed_at = timezone.now()
                order.note = 'Sell executed'
                order.profit_loss = profit_loss
                order.save(update_fields=['status', 'executed_at', 'note', 'profit_loss'])

            # ---- Payloads ----
            order_payload = {
                'order_id': str(order.id),
                'firebase_uid': getattr(user, 'firebase_uid', None) or str(user.id),
                'symbol': symbol,
                'side': side,
                'quantity': float(quantity),
                'price': float(price),
                'amount': float(amount),
                'status': order.status,
                'executed_at': order.executed_at.isoformat() if order.executed_at else None,
                'profit_loss': float(profit_loss)
            }

            wallet_payload = {
                'user_id': str(user.id),
                'firebase_uid': getattr(user, 'firebase_uid', None) or str(user.id),
                'balance': float(wallet.balance),
            }

            holding_payload = {
                'user_id': str(user.id),
                'firebase_uid': getattr(user, 'firebase_uid', None) or str(user.id),
                'symbol': symbol,
                'quantity': float(holding.quantity),
                'avg_price': float(holding.avg_price),
            }

            # ---- Outbox Messages ----
            OutboxMessage.objects.create(
                message_type='order_created',
                payload=order_payload,
                destination=f'firestore:users/{order_payload["firebase_uid"]}/orders',
                unique_key=f'order:{order.id}'
            )

            OutboxMessage.objects.create(
                message_type='wallet_updated',
                payload=wallet_payload,
                destination=f'firestore:users/{wallet_payload["firebase_uid"]}/wallet',
                unique_key=f'wallet:{user.id}:{wallet.balance}'
            )

            OutboxMessage.objects.create(
                message_type='holding_updated',
                payload=holding_payload,
                destination=f'firestore:users/{holding_payload["firebase_uid"]}/holdings/{symbol}',
                unique_key=f'holding:{user.id}:{symbol}:{holding.quantity}'
            )

        return Response({
            'order_id': str(order.id),
            'status': order.status,
            'note': order.note,
            'executed_at': order.executed_at,
            'profit_loss': float(profit_loss)
        }, status=status.HTTP_201_CREATED if order.status == 'executed' else status.HTTP_400_BAD_REQUEST)
