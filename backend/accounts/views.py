from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from firebase_admin import auth
from .models import FirebaseUser
from .serializers import SignUpSerializer
from django.db import IntegrityError

class SignUpView(APIView):
    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            try:
                user = auth.create_user(
                    email=data['email'],
                    password=request.data['password'],
                    display_name=data['display_name']
                )
                FirebaseUser.objects.create(uid=user.uid, email=user.email, display_name=user.display_name)
                return Response({'uid': user.uid, 'email': user.email}, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        # In production, verify Firebase ID token
        return Response({'message': 'Firebase handles login on frontend'}, status=status.HTTP_200_OK)

class CurrentUserView(APIView):
    def get(self, request):
        id_token = request.META.get('HTTP_AUTHORIZATION', '').split('Bearer ')[-1]
        try:
            decoded_token = auth.verify_id_token(id_token)
            uid = decoded_token.get('uid')
            email = decoded_token.get('email')
            name = decoded_token.get('name', '')  # Optional

            return Response({
                'uid': uid,
                'email': email,
                'display_name': name
            })
        except Exception as e:
            return Response({'error': 'Invalid token or user not authenticated', 'details': str(e)}, status=status.HTTP_401_UNAUTHORIZED)