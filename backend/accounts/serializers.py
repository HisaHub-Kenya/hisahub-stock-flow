from rest_framework import serializers
from .models import FirebaseUser, UserProfile, BrokerProfile, StockTrade

class SignUpSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    display_name = serializers.CharField(required=False)
    role= serializers.ChoiceField(choices=[('user', 'user'), ('broker', 'Broker') ])
    phone = serializers.CharField(required=False, allow_blank=True)
    company_name = serializers.CharField(required=False, allow_blank=True)
    license_id = serializers.CharField(required=False, allow_blank=True)

class FirebaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FirebaseUser
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
