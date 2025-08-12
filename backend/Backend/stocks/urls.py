from django.urls import path
from .views import StockDetailView
from .views import batch_stock_fetch 

urlpatterns = [
    path('stock/<str:symbol>/', StockDetailView.as_view(), name='stock-detail'),
    path('api/stocks/batch/', batch_stock_fetch, name='batch-stock-fetch'),
]
