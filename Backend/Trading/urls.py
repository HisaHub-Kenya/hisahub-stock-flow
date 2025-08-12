from django.urls import path
from .views import ProcessMockOrder

urlpatterns = [
    path('mock-order/', ProcessMockOrder.as_view(), name='mock-order')
]
