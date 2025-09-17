from django.urls import path
from .views import (
    DepositView,
    WithdrawView,
    mpesa_callback,
    stripe_webhook,
    paypal_webhook,
    crypto_webhook,
)

urlpatterns = [
    # 💳 General Payment Actions
    path('deposit/', DepositView.as_view(), name='deposit'),
    path('withdraw/', WithdrawView.as_view(), name='withdraw'),

    # 📲 M-Pesa Callback
    path('mpesa/callback/', mpesa_callback, name='mpesa-callback'),

    # 💳 Stripe Webhook
    path('stripe/webhook/', stripe_webhook, name='stripe-webhook'),

    # 💸 PayPal Webhook
    path('paypal/webhook/', paypal_webhook, name='paypal-webhook'),

    # 🪙 Crypto Webhook
    path('crypto/webhook/', crypto_webhook, name='crypto-webhook'),
]
