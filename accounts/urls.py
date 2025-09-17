from django.urls import path
from .views import CurrentUserView, SignUpView, LoginView, UploadKYCView, VerifyingBrokerView
urlpatterns = [
     path('signup/', SignUpView.as_view(), name='signup'),
     path('login/', LoginView.as_view(), name='login'),
    path('user/', CurrentUserView, name='current-user'),
    path('kyc/upload/', UploadKYCView.as_view(), name='upload-kyc'),
    path('verify-broker/<str:uid>/', VerifyingBrokerView.as_view(), name='verify-broker'),
    
]
