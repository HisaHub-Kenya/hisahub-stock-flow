"""
URL configuration for Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from stocks.views import StockDetailView
from django.http import JsonResponse
from .view import WalletView, ProcessMockOrder, OrderHistoryView
def root_view(request):
    return JsonResponse({"message": "Welcome to the HisaHub API"})
schema_view = get_schema_view(
    openapi.Info(title="Stock API", default_version='v1',description="API for managing stocks and trades"),
    public=True,
)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/stocks/', include('stocks.urls')),
    path("api/payments/", include('payments.urls')),
    path("mock-order/", ProcessMockOrder.as_view(), name="mock-order"),
    path("wallet/", WalletView.as_view(), name="wallet"),
    path('api/orders/', include('orders.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    ]


