from django.db.models import Sum
from django.utils.dateparse import parse_date
from .models import Trade

def get_chart_data(user, field_name, start_date=None, end_date=None):
    trades = Trade.objects.filter(user=user)
    
    # Apply date filter if provided
    if start_date:
        trades = trades.filter(created_at__date__gte=parse_date(start_date))
    if end_date:
        trades = trades.filter(created_at__date__lte=parse_date(end_date))
    
    data = (
        trades.values(field_name)
        .annotate(total_value=Sum("amount"))
        .order_by("-total_value")
    )
    
    return [
        {"label": item[field_name], "value": float(item["total_value"])}
        for item in data
    ]
