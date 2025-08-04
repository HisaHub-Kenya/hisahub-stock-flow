import requests
from django.conf import settings
from .utils import validate_currency

SUPPORTED_CURRENCIES = ["USD", "KES", "ETH", "BTC"]


def get_paypal_access_token():
    url = "https://api-m.sandbox.paypal.com/v1/oauth2/token"
    client_id = settings.PAYPAL_CLIENT_ID
    secret = settings.PAYPAL_SECRET
    headers = {
        "Accept": "application/json",
        "Accept-Language": "en_US"
    }
    data = {"grant_type": "client_credentials"}

    response = requests.post(url, headers=headers, data=data, auth=(client_id, secret))
    if response.status_code != 200:
        raise Exception(f"PayPal Auth Failed: {response.json()}")
    return response.json().get("access_token")


def handle_paypal(amount, user, action, currency="USD"):
    currency = validate_currency(currency)
    access_token = get_paypal_access_token()
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    if action == "deposit":
        return create_paypal_payment(amount, user, currency, headers)

    elif action == "withdrawal":
        return create_paypal_payout(amount, user, currency, headers)

    else:
        return {"error": "Invalid PayPal transaction type"}


def create_paypal_payment(amount, user, currency, headers):
    payload = {
        "intent": "CAPTURE",
        "purchase_units": [{
            "amount": {"currency_code": currency, "value": f"{amount}"}
        }],
        "application_context": {
            "return_url": settings.PAYPAL_RETURN_URL,
            "cancel_url": settings.PAYPAL_CANCEL_URL
        }
    }

    url = "https://api-m.sandbox.paypal.com/v2/checkout/orders"
    response = requests.post(url, json=payload, headers=headers)
    result = response.json()

    if response.status_code != 201:
        return {"error": result.get("message", "PayPal deposit creation failed")}

    approval_url = next((link["href"] for link in result["links"] if link["rel"] == "approve"), None)

    return {
        "status": "pending",
        "reference": result.get("id"),
        "approval_url": approval_url
    }


def create_paypal_payout(amount, user, currency, headers):
    paypal_email = getattr(user, "paypal_email", None)
    if not paypal_email:
        return {"error": "No PayPal email found for user"}

    payload = {
        "sender_batch_header": {
            "sender_batch_id": f"batch_{user.id}_{amount}",
            "email_subject": "You have a payout!",
            "email_message": "You have received a payout via PayPal."
        },
        "items": [{
            "recipient_type": "EMAIL",
            "amount": {
                "value": f"{amount}",
                "currency": currency
            },
            "receiver": paypal_email,
            "note": "Withdrawal from your account",
            "sender_item_id": f"item_{user.id}_{amount}"
        }]
    }

    url = "https://api-m.sandbox.paypal.com/v1/payments/payouts"
    response = requests.post(url, json=payload, headers=headers)
    result = response.json()

    if response.status_code >= 400:
        return {"error": result.get("message", "PayPal payout failed")}

    return {
        "status": "pending",
        "reference": result.get("batch_header", {}).get("payout_batch_id"),
        "message": "Payout initiated"
    }
