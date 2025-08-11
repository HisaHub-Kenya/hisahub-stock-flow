from celery import shared_task # Task to refresh trending scores
from .models import Stock
from .utils import calculate_trending_score

@shared_task
def refresh_trending_scores():
   def refresh_trending_scores():
    updated = 0
    stocks = Stock.objects.all()

    for stock in stocks:
        previous_price = stock.previous_price
        current_price = stock.current_price

        if previous_price and previous_price != 0:
            change = (current_price - previous_price) / previous_price
        else:
            change = 0

        stock.trending_score = stock.volume * float(change)
        stock.save(update_fields=['trending_score'])
        updated += 1

    return f"{updated} stocks updated with new trending scores."