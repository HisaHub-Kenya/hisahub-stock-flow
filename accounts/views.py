from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from rest_framework.parsers import MultiPartParser
from firebase_admin import auth

from .models import User, UserProfile, BrokerProfile
from .serializers import SignUpSerializer,KYCSerializer, KYCApprovalSerializer
from django.db import IntegrityError
from rest_framework.permissions import IsAuthenticated
from .models import BrokerVerification
from .serializers import BrokerVerificationSerializer
from rest_framework import permissions, generics, status
from django.utils import timezone

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
    permission_classes = [IsAuthenticated]
    
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
            
            

class IsAdminUser(permissions.BasePermission):
    """
    Custom permission to only allow admins to verify brokers.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_staff         
class VerifyingBrokerView(generics.UpdateAPIView):
    queryset = BrokerVerification.objects.all()
    serializer_class = BrokerVerificationSerializer
    permission_classes = [IsAdminUser]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_verified = True
        instance.verified_at = now()
        instance.verified_by = request.user  # request.user is FirebaseUser now
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
            

class UploadKYCView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = KYCSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user_profile = UserProfile.objects.get(uid=request.user.uid)
            except UserProfile.DoesNotExist:
                return Response({"error": "User profile not found"}, status=status.HTTP_404_NOT_FOUND)

            kyc = serializer.save(user=user_profile)
            return Response(KYCSerializer(kyc).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class ApproveKYCView(APIView): 

    def post(self, request, uid):
        action = request.data.get("action")  # "approve" or "reject"
        try:
            user_profile = UserProfile.objects.get(uid=uid)
            
            if action == "approve":
                user_profile.kyc_status = "approved"
            elif action == "reject":
                user_profile.kyc_status = "rejected"
            else:
                return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

            user_profile.save()
            return Response(KYCApprovalSerializer(user_profile).data, status=status.HTTP_200_OK)

        except UserProfile.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
class VerifyingBrokerView(APIView):
    """
    Admin-only endpoint to mark a broker as verified.
    URL: /verify-broker/<uid>/
    """
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request, uid):
        try:
            broker = BrokerProfile.objects.get(firebase_user__uid=uid)
        except BrokerProfile.DoesNotExist:
            return Response(
                {"error": "Broker not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        broker.verified = True
        broker.save(update_fields=["verified"])

        return Response(
            {
                "message": f"Broker {broker.full_name} verified successfully",
                "verified_at": timezone.now().isoformat(),
            },
            status=status.HTTP_200_OK
        )
CurrentUserView= CurrentUserView.as_view()