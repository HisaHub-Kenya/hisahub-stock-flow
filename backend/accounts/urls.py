from django.urls import path
from .views import CurrentUserView, SignUpView

urlpatterns = [
     path('signup/', SignUpView.as_view(), name='signup'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
]
