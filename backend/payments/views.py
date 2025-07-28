from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt

from .models import Transaction
from .stripe import create_card_payment
from .mpesa import lipa_na_mpesa
from .paypal import create_paypal_payment
from .crypto import create_crypto_payment

# ----------------------------
# 🔁 SHARED PAYMENT HANDLER
# ----------------------------
def handle_payment(method, amount, user, action):
    if method == 'card':
        return create_card_payment(amount)
    elif method == 'mpesa':
        return lipa_na_mpesa(amount, user.phone_number)
    elif method == 'paypal':
        return create_paypal_payment(amount, user, action)
    elif method == 'crypto':
        return create_crypto_payment(amount, user, action)
    else:
        return {"error": "Unsupported payment method"}


# ----------------------------
# ✅ DEPOSIT ENDPOINT
# ----------------------------
class DepositView(APIView):
    def post(self, request):
        method = request.data.get("method")
        amount = float(request.data.get("amount", 0))
        user = request.user  # from Firebase token

        if amount <= 0:
            return Response({"error": "Invalid amount"}, status=400)

        result = handle_payment(method, amount, user, "deposit")

        Transaction.objects.create(
            user=user,
            transaction_type='deposit',
            payment_method=method,
            amount=amount,
            reference_id=result.get('reference'),
            status='pending'
        )

        return Response(result, status=200)


# ----------------------------
# ✅ WITHDRAWAL ENDPOINT
# ----------------------------
class WithdrawView(APIView):
    def post(self, request):
        method = request.data.get("method")
        amount = float(request.data.get("amount", 0))
        user = request.user

        if amount <= 0:
            return Response({"error": "Invalid amount"}, status=400)

        # Optional: Check wallet balance
        # if user.wallet_balance < amount:
        #     return Response({"error": "Insufficient funds"}, status=400)

        result = handle_payment(method, amount, user, "withdrawal")

        Transaction.objects.create(
            user=user,
            transaction_type='withdrawal',
            payment_method=method,
            amount=amount,
            reference_id=result.get('reference'),
            status='pending'
        )

        return Response(result, status=200)


# ----------------------------
# ✅ MPESA CALLBACK
# ----------------------------
@csrf_exempt
@api_view(['POST'])
def mpesa_callback(request):
    data = request.data
    stk_callback = data.get('Body', {}).get('stkCallback', {})
    result_code = stk_callback.get('ResultCode')
    reference = stk_callback.get('CheckoutRequestID')
    amount = 0

    for item in stk_callback.get('CallbackMetadata', {}).get('Item', []):
        if item.get('Name') == 'Amount':
            amount = item.get('Value')

    txn = Transaction.objects.filter(reference_id=reference).first()
    if txn:
        txn.status = 'success' if result_code == 0 else 'failed'
        txn.amount = amount
        txn.save()

    return Response({"message": "M-Pesa callback received"}, status=200)


# ----------------------------
# ✅ STRIPE CALLBACK
# ----------------------------
@csrf_exempt
@api_view(['POST'])
def stripe_webhook(request):
    import stripe
    stripe.api_key = "your_stripe_secret"
    payload = request.body
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, request.headers.get('Stripe-Signature'), "your_webhook_secret"
        )
    except Exception as e:
        return Response({"error": str(e)}, status=400)

    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        reference = payment_intent['id']
        txn = Transaction.objects.filter(reference_id=reference).first()
        if txn:
            txn.status = 'success'
            txn.save()

    return Response({"message": "Stripe webhook received"}, status=200)


# ----------------------------
# ✅ PAYPAL CALLBACK
# ----------------------------
@csrf_exempt
@api_view(['POST'])
def paypal_webhook(request):
    data = request.data
    event_type = data.get('event_type')
    reference = data.get('resource', {}).get('id')

    txn = Transaction.objects.filter(reference_id=reference).first()
    if txn:
        if event_type == "CHECKOUT.ORDER.APPROVED":
            txn.status = 'success'
        elif event_type == "PAYMENT.CAPTURE.DENIED":
            txn.status = 'failed'
        txn.save()

    return Response({"message": "PayPal webhook received"}, status=200)


# ----------------------------
# ✅ CRYPTO CALLBACK
# ----------------------------
@csrf_exempt
@api_view(['POST'])
def crypto_webhook(request):
    event = request.data
    charge = event.get('event', {}).get('data', {})
    status = charge.get('timeline', [{}])[-1].get('status')
    reference = charge.get('code')

    txn = Transaction.objects.filter(reference_id=reference).first()
    if txn:
        txn.status = 'success' if status == 'COMPLETED' else 'failed'
        txn.save()

    return Response({"message": "Crypto webhook received"}, status=200)
