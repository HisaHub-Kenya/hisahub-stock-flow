from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from firebase_admin import auth
from .models import FirebaseUser
from .serializers import SignUpSerializer
from django.db import IntegrityError
from .serializers import PortfolioSummarySerializer
from .utils import get_chart_data

#  SignUp Endpoint
class SignUpView(APIView):
    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            try:
                # Firebase user creation
                user = auth.create_user(
                    email=data['email'],
                    password=data['password'],
                    display_name=data.get('display_name', '')
                )
                # Local DB creation
                FirebaseUser.objects.create(
                    uid=user.uid,
                    email=user.email,
                    display_name=user.display_name
                )
                return Response({
                    'uid': user.uid,
                    'email': user.email,
                    'display_name': user.display_name
                }, status=status.HTTP_201_CREATED)

            except IntegrityError:
                return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#  Login Endpoint using Firebase ID Token
class LoginView(APIView):
    def post(self, request):
        id_token = request.data.get("idToken")

        if not id_token:
            return Response({'error': 'ID token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            decoded_token = auth.verify_id_token(id_token)
            uid = decoded_token.get('uid')
            user = FirebaseUser.objects.filter(uid=uid).first()

            if user:
                return Response({
                    'uid': user.uid,
                    'email': user.email,
                    'display_name': user.display_name
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_401_UNAUTHORIZED)

#  Get current user (requires token in Authorization header)
class CurrentUserView(APIView):
    def get(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        id_token = auth_header.split('Bearer ')[-1] if 'Bearer ' in auth_header else None

        if not id_token:
            return Response({'error': 'Authorization header missing'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            decoded_token = auth.verify_id_token(id_token)
            uid = decoded_token.get('uid')
            email = decoded_token.get('email')
            name = decoded_token.get('name', '')

            return Response({
                'uid': uid,
                'email': email,
                'display_name': name
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': 'Invalid token or user not authenticated',
                'details': str(e)
            }, status=status.HTTP_401_UNAUTHORIZED)

class PortfolioView(APIView):
    def get(self, request):
        user = request.user
        summary = PortfolioSummarySerializer(user).data
        
        return Response({
            "summary": summary,
            "charts": {
                "by_market_type": get_chart_data(user, "market_type"),
                "by_exchange": get_chart_data(user, "exchange"),
                "by_sector": get_chart_data(user, "sector"),
            }
        })