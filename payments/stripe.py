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

def transfer_to_card(amount, user, currency="usd"):
    try:
        payout = stripe.Payout.create(
            amount=int(amount * 100),
            currency=currency,
            method="standard",
            description="User withdrawal payout"
        )
        return {
            "reference": payout.id,
            "status": "pending"
        }
    except stripe.error.StripeError as e:
        return {"error": str(e)}
