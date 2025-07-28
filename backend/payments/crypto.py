import requests

def handle_crypto(amount, user, type):
    if type == "deposit":
        headers = {
            "Content-Type": "application/json",
            "X-CC-Api-Key": settings.COINBASE_API_KEY,
            "X-CC-Version": "2018-03-22"
        }
        data = {
            "name": "Crypto Deposit",
            "description": "Account top-up",
            "pricing_type": "fixed_price",
            "local_price": {
                "amount": f"{amount}",
                "currency": "USD"
            },
            "metadata": {"user_id": user.id}
        }
        response = requests.post("https://api.commerce.coinbase.com/charges", json=data, headers=headers).json()
        return {
            "checkout_url": response["data"]["hosted_url"],
            "reference": response["data"]["id"]
        }
    else:
        return {"error": "Crypto withdrawals must be manual unless using custodial wallet APIs"}
