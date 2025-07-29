from .models import Stock, StockPriceHistory
from datetime import timedelta
from django.utils import timezone

def get_trending_stocks(sort_by='volume', limit=20):
    queryset = Stock.objects.all()

    if sort_by == 'percentage_change':
        queryset = sorted(queryset, key=lambda x: x.percentage_change(), reverse=True)
    else:
        queryset = queryset.order_by(f'-{sort_by}')

    return queryset[:limit]

def get_percentage_change(stock, days=1):
    today = timezone.now().date()
    past_date = today - timedelta(days=days)

    try:
        past_price = StockPriceHistory.objects.get(stock=stock, date=past_date).price
    except StockPriceHistory.DoesNotExist:
        return None

    if past_price == 0:
        return 0
    return ((stock.current_price - past_price) / past_price) * 100
