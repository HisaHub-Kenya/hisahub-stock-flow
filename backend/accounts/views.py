from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from rest_framework.parsers import MultiPartParser
from firebase_admin import auth

from .models import FirebaseUser, UserProfile, BrokerProfile
from .serializers import SignUpSerializer
from django.core.mail import send_mail
from accounts.permissions import IsBroker
from rest_framework.permissions import IsAuthenticated


#  User SignUp View
class SignUpView(APIView):
    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            try:
                # Create user in Firebase
                firebase_user = auth.create_user(
                    email=data['email'],
                    password=data['password'],
                    display_name=data.get('display_name', '')
                )

                # Save FirebaseUser locally
                FirebaseUser.objects.create(
                    uid=firebase_user.uid,
                    email=firebase_user.email,
                    display_name=firebase_user.display_name
                )

                # Create UserProfile or BrokerProfile based on role
                role = data['role']
                if role == 'user':
                    UserProfile.objects.create(
                        uid=firebase_user.uid,
                        full_name=data['display_name'],
                        email=data['email'],
                        phone=data.get('phone', '')
                    )
                elif role == 'broker':
                    BrokerProfile.objects.create(
                        uid=firebase_user.uid,
                        full_name=data['display_name'],
                        email=data['email'],
                        phone=data.get('phone', ''),
                        company_name=data.get('company_name', ''),
                        license_id=data.get('license_id', ''),
                        verified=False
                    )

                return Response({
                    'uid': firebase_user.uid,
                    'email': firebase_user.email,
                    'display_name': firebase_user.display_name,
                    'role': role
                }, status=status.HTTP_201_CREATED)

            except IntegrityError:
                return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#  Login with Firebase ID Token
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


#  Get Currently Authenticated User
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


#  Upload KYC Document (for both user and broker)
class UploadKYCView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        uid = request.data.get('uid')
        kyc_doc = request.data.get('kyc_document')
        role = request.data.get('role')

        if not uid or not kyc_doc or not role:
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if role == 'user':
                profile = UserProfile.objects.get(uid=uid)
            elif role == 'broker':
                profile = BrokerProfile.objects.get(uid=uid)
            else:
                return Response({'error': 'Invalid role'}, status=status.HTTP_400_BAD_REQUEST)

            profile.kyc_document = kyc_doc
            profile.kyc_verified = False  # Manual review pending
            profile.save()

            return Response({'message': 'KYC document uploaded successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


#  Admin Verifies Broker
class BrokerOnlyView(APIView):
    permission_classes = [IsAuthenticated, IsBroker]

    def get(self, request):
        user = request.user
        return Response({'message': 'hello broker ',"id": user.id}, status=status.HTTP_200_OK)   