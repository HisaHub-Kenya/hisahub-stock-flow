# payment from stripe/card payment accounts
import stripe

stripe.api_key = 'sk_test_51Rof7VKE0LNUzENcPU4b9jVoen2Y2lM5861Y6C0GVTHN4FBEEIt6qo3mxzFPpfDEiHNyhug0WtnwnbBoU3dwqmIZ00OL7YzmnY'

def create_card_payment(amount, currency="usd"):
    payment_intent = stripe.PaymentIntent.create(
        amount=int(amount * 100),  # in cents
        currency=currency,
        payment_method_types=["card"],
    )
    return payment_intent.client_secret
