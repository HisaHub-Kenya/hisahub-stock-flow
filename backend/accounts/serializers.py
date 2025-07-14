from rest_framework import serializers
import bcrypt

class SignUpSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    display_name = serializers.CharField()

    def create(self, validated_data):
        password = validated_data.pop('password')
        hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        validated_data['password'] = hashed_password.decode()
        return validated_data
