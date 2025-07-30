from rest_framework import serializers
from .models import FirebaseUser

class SignUpSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    display_name = serializers.CharField(required=False)

class FirebaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FirebaseUser
        fields = ['uid', 'email', 'display_name', 'created_at']
