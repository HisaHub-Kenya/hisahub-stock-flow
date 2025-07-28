from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view  
from django.utils.dateparse import parse_datetime
from django.db.models import F, ExpressionWrapper, FloatField, Q
from .models import Stock
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from rest_framework.pagination import PageNumberPagination
from .serializers import StockSerializer
# views.py or your relevant module
from .serializers import LightweightStockSerializer
from .services import get_trending_stocks

@method_decorator(cache_page(60 * 5), name='dispatch') # Cache the view for 5 minutes

class TrendingStocksView(APIView):# include trending stocks view for sorting and pagination
    def get(self, request):
        sort_by = request.query_params.get('sort_by', 'most_traded','trending_score')
        interval =int(request.query_params.get('interval', 1))
        trending = get_trending_stocks(sort_by=sort_by, interval=interval)

        paginator = PageNumberPagination()
        paginated_qs = paginator.paginate_queryset(trending, request)
        serializer = StockSerializer(paginated_qs, many=True)

        return paginator.get_paginated_response(serializer.data)
    # --- Detail View ---
class StockDetailView(APIView):
    def get(self, request, symbol):
        try:
            stock = Stock.objects.all()
        except Stock.DoesNotExist:
            return Response({'error': 'Stock not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = StockSerializer(stock)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    # --- Batch Fetch View ---
@api_view(['POST'])

def batch_stock_fetch(request):
    symbols = request.data.get('symbols', [])

    if not isinstance(symbols, list):
        return Response({"error": "symbols must be a list"}, status=status.HTTP_400_BAD_REQUEST)

    # Clean and uppercase all symbols to avoid mismatch
    symbols = [s.upper() for s in symbols]

    stocks = Stock.objects.filter(symbol__in=symbols)
    serializer =LightweightStockSerializer(stocks, many=True)

    # Optional: detect missing symbols for logging/debugging
    found_symbols = {stock.symbol for stock in stocks}
    missing = [s for s in symbols if s not in found_symbols]

    return Response({
        "stocks": serializer.data,
        "missing": missing
    }, status=status.HTTP_200_OK)

