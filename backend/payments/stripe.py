# payment from stripe/card payment accounts
import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY
    
    
def create_card_payment(amount, currency="usd"):
    payment_intent = stripe.PaymentIntent.create(
        amount=int(amount * 100),  # in cents
        currency=currency,
        payment_method_types=["card"],
        DESCRIPTION="Deposit via card",
    )
    return payment_intent.client_secret
