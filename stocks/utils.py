from rest_framework.response import Response

def success_response(data, status=200):
    return Response({
        "status": "success",
        "data": data
    }, status=status)
    
def error_response(message, status=400):
    return Response({
        "status": "error",
        "message": message
    }, status=status)



def calculate_trending_score(stock):
    try:
        change = (stock.current_price - stock.previous_price) / stock.previous_price
    except ZeroDivisionError:
        change = 0
    return stock.volume * float(change)
def get_trending_stocks(sort_by='most_traded', interval=1):
    from .models import Stock
    from django.db.models import F, ExpressionWrapper, FloatField

    trending_options = {
        'most_traded': '-volume',
        'highest_change': '-percentage_change',
        'lowest_change': 'percentage_change',
        'highest_price': '-current_price',
    }

    if sort_by not in trending_options:
        sort_by = 'most_traded'

    trending_stocks = Stock.objects.annotate(
        percentage_change=ExpressionWrapper(
            (F('current_price') - F('previous_price')) / F('previous_price'),
            output_field=FloatField()
        )
    ).order_by(trending_options[sort_by])

    return trending_stocks[:interval * 10]  # Return top 10 stocks per interval