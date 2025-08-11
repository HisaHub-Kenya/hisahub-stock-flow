from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from firebase_init import db
from datetime import datetime
from .utils.auth import verify_firebase_token
from .views import WalletView, ProcessMockOrder


class ProcessMockOrder(APIView):
    def post(self, request):
        try:
            uid = verify_firebase_token(request)
        except Exception as e:
            return Response({'error': str(e)}, status=401)

        data = request.data
        symbol = data.get('symbol', '').upper()
        order_type = data.get('order_type')
        quantity = float(data.get('quantity'))
        price = float(data.get('price'))

        if not all([symbol, order_type, quantity, price]):
            return Response({'error': 'Missing required fields'}, status=400)

        wallet_ref = db.collection("users").document(uid).collection("wallet").document("balance")
        orders_ref = db.collection("users").document(uid).collection("orders")

        wallet_doc = wallet_ref.get()
        wallet_data = wallet_doc.to_dict() if wallet_doc.exists else {
            "usd_balance": 0,
            "holdings": {},
            "avg_price": {}
        }

        usd_balance = wallet_data.get("usd_balance", 0)
        holdings = wallet_data.get("holdings", {})
        avg_price = wallet_data.get("avg_price", {})  # Track average buy price per stock

        total_value = round(quantity * price, 2)
        status_str = "pending"

        if order_type == "buy":
            if usd_balance < total_value:
                status_str = "failed"
                order_note = "Insufficient funds"
            else:
                usd_balance -= total_value
                holdings[symbol] = holdings.get(symbol, 0) + quantity

                # Recalculate average buy price
                previous_qty = holdings.get(symbol, 0) - quantity
                previous_total = avg_price.get(symbol, 0) * previous_qty
                avg_price[symbol] = round((previous_total + total_value) / holdings[symbol], 2)
                status_str = "executed"
                order_note = "Buy successful"

        elif order_type == "sell":
            if holdings.get(symbol, 0) < quantity:
                status_str = "failed"
                order_note = "Insufficient holdings"
            else:
                holdings[symbol] -= quantity
                usd_balance += total_value
                status_str = "executed"
                order_note = "Sell successful"
        else:
            return Response({'error': 'Invalid order_type'}, status=400)

        if status_str == "executed":
            wallet_ref.set({
                "usd_balance": round(usd_balance, 2),
                "holdings": holdings,
                "avg_price": avg_price
            })

        # Record order with P/L (if sell)
        profit_loss = 0
        if order_type == "sell" and status_str == "executed":
            cost_price = avg_price.get(symbol, 0)
            profit_loss = round((price - cost_price) * quantity, 2)

        order_record = {
            "symbol": symbol,
            "type": order_type,
            "quantity": quantity,
            "price": price,
            "total": total_value,
            "status": status_str,
            "note": order_note,
            "profit_loss": profit_loss,
            "timestamp": datetime.utcnow()
        }

        orders_ref.add(order_record)

        return Response({
            "message": f"Order {status_str}",
            "wallet": {
                "usd_balance": usd_balance,
                "holdings": holdings,
                "avg_price": avg_price
            },
            "order": order_record
        }, status=200 if status_str == "executed" else 400)


class WalletView(APIView):
    def get(self, request):
        try:
            uid = verify_firebase_token(request)
        except Exception as e:
            return Response({'error': str(e)}, status=401)

        wallet_ref = db.collection("users").document(uid).collection("wallet").document("balance")
        wallet_doc = wallet_ref.get()

        if not wallet_doc.exists:
            return Response({
                "usd_balance": 0,
                "holdings": {},
                "avg_price": {}
            })

        return Response(wallet_doc.to_dict())


class OrderHistoryView(APIView):
    def get(self, request):
        try:
            uid = verify_firebase_token(request)
        except Exception as e:
            return Response({'error': str(e)}, status=401)

        orders_ref = db.collection("users").document(uid).collection("orders").order_by("timestamp", direction=firestore.Query.DESCENDING)
        orders = [doc.to_dict() for doc in orders_ref.stream()]

        return Response({
            "count": len(orders),
            "orders": orders
        })