# trading/urls.py
from django.urls import path
from .views import CreateOrderView, OrderListView

urlpatterns = [
    path('orders/', CreateOrderView.as_view(), name='create-order'),
    path('orders/', OrderListView.as_view(), name='order-list')
]
