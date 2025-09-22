from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from stocks.views import StockDetailView
from django.http import JsonResponse

def root_view(request):
    return JsonResponse({"message": "Welcome to the HisaHub API"})

def health_view(request):
    return JsonResponse({"status": "ok"})


schema_view = get_schema_view(
    openapi.Info(title="Stock API", default_version='v1'),
    public=True,
)

# Custom error handlers for JSON responses
from Backend.settings import custom_json_404, custom_json_500
handler404 = custom_json_404
handler500 = custom_json_500

urlpatterns = [
    path('', root_view),  # Optional: root welcome route
    path('api/health/', health_view),
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/stocks/', include('stocks.urls')),
    path('api/payments/', include('payments.urls')),
    path('api/trading/', include('Trading.urls')),
    path('api/news/', include('news.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
