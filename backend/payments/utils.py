from rest_framework.response import Response

def success_response(data=None, message="Success", status_code=200):
    return Response({
        "status": "success",
        "message": message,
        "data": data or {}
    }, status=status_code)

def error_response(message="An error occurred", errors=None, status_code=400):
    return Response({
        "status": "error",
        "message": message,
        "errors": errors or {}
    }, status=status_code)

SUPPORTED_CURRENCIES = ["USD", "KES", "ETH", "BTC"]

def validate_currency(currency):
    currency = currency.upper()
    if currency not in SUPPORTED_CURRENCIES:
        raise ValueError(f"{currency} is not supported")
    return currency
