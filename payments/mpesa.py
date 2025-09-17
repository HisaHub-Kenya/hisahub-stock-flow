import base64
import datetime
import requests
from django.conf import settings

def generate_mpesa_access_token():
    consumer_key = settings.MPESA_CONSUMER_KEY
    consumer_secret = settings.MPESA_CONSUMER_SECRET
    url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

    response = requests.get(url, auth=(consumer_key, consumer_secret))
    access_token = response.json().get("access_token")
    return access_token

def lipa_na_mpesa(amount, phone_number, CURRENCY="KSH"):
    access_token = generate_mpesa_access_token()

    timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
    shortcode = settings.MPESA_SHORTCODE
    passkey = settings.MPESA_PASSKEY
    data_to_encode = shortcode + passkey + timestamp
    encoded_password = base64.b64encode(data_to_encode.encode()).decode()

    url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }

    payload = {
        "BusinessShortCode": shortcode,
        "Password": encoded_password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,
        "PartyB": shortcode,
        "PhoneNumber": phone_number,
        "CallBackURL": "https://yourdomain.com/payments/mpesa/callback/",
        "AccountReference": "Ref001",
        "TransactionDesc": "Deposit"
    }

    response = requests.post(url, json=payload, headers=headers)
    return response.json()

def withdraw_from_mpesa(amount, phone_number):
    access_token = generate_mpesa_access_token()

    timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
    shortcode = settings.MPESA_SHORTCODE
    passkey = settings.MPESA_PASSKEY
    data_to_encode = shortcode + passkey + timestamp
    encoded_password = base64.b64encode(data_to_encode.encode()).decode()

    url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/safaricom-safaricom"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }

    payload = {
        "ShortCode": shortcode,
        "CommandID": "Withdraw",
        "Amount": amount,
        "Msisdn": phone_number,
        "BillRefNumber": "Withdraw001",
        "Remarks": "Withdrawal Request"
    }

    response = requests.post(url, json=payload, headers=headers)
    return response.json()