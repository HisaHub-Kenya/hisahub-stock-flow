from django.urls import path
from .views import CurrentUserView, SignUpView, LoginView

urlpatterns = [
     path('signup/', SignUpView.as_view(), name='signup'),
     path('login/', LoginView.as_view(), name='login'),
    path('user/', CurrentUserView.as_view(), name='current-user'),
    
]
