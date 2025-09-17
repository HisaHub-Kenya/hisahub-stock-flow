from rest_framework import serializers
from .models import User, UserProfile, BrokerProfile, StockTrade , KYC , BrokerVerification

class SignUpSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    display_name = serializers.CharField(required=False)
    role= serializers.ChoiceField(choices=[('user', 'user'), ('broker', 'Broker') ])
    phone = serializers.CharField(required=False, allow_blank=True)
    company_name = serializers.CharField(required=False, allow_blank=True)
    license_id = serializers.CharField(required=False, allow_blank=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['uid', 'email', 'display_name', 'created_at']
        
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'  # Include all fields for user profile

class BrokerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = BrokerProfile
        fields = ['uid', 'full_name', 'email', 'phone', 'company_name', 'license_id', 'verified', 'created_at']
        
class StockTradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockTrade
        fields = ['user', 'stock_symbol', 'stock_name', 'trade_type', 'quantity', 'price', 'timestamp', 'broker']

class KYCSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["id", "document_type", "document_file", "status", "uploaded_at"]
        read_only_fields = ['id', 'uploaded_at', 'status']
        
class KYCApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["uid", "full_name", "email", "kyc_status"]
        
class BrokerVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BrokerVerification
        fields = ["user", "is_verified", "verified_at", "verified_by"]
        read_only_fields = ["verified_at", "verified_by"]
