import requests
from django.conf import settings

def handle_crypto(amount, user, type,currency="USD"):
    
    currency = currency.upper()
    
    
    if type == "deposit":
        headers = {
            "Content-Type": "application/json",
            "X-CC-Api-Key": settings.COINBASE_API_KEY,
            "X-CC-Version": "2018-03-22"
        }
        payload = {
            "name": "Crypto Deposit",
            "description": "Top-up via cryptocurrency",
            "pricing_type": "fixed_price",
            "local_price": {
                "amount": f"{amount}",
                "currency": currency
            },
            "metadata": {
                "user_id": str(user.id),
                "email": user.email
            },
            "redirect_url": "https://yourdomain.com/crypto/success/",
            "cancel_url": "https://yourdomain.com/crypto/cancel/"
        }

        try:
            res = requests.post("https://api.commerce.coinbase.com/charges", json=payload, headers=headers)
            res.raise_for_status()
            charge = res.json().get("data", {})

            return {
                "checkout_url": charge.get("hosted_url"),
                "reference": charge.get("id")
            }
        except Exception as e:
            return {"error": f"Crypto deposit failed: {str(e)}"}
        
    else:
        return {"error": "Crypto withdrawals are only available manually or via custodial wallet APIs."}
    