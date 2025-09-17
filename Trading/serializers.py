from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id','symbol','side','price','quantity','amount','status','created_at']
        read_only_fields = ['amount','status','created_at']

    def validate(self, data):
        if data['quantity'] <= 0:
            raise serializers.ValidationError("Quantity must be positive.")
        if data['price'] <= 0:
            raise serializers.ValidationError("Price must be positive.")
        if data['side'] not in ('buy', 'sell'):
            raise serializers.ValidationError("Side must be 'buy' or 'sell'.")
        return data

    def create(self, validated_data):
        validated_data['amount'] = validated_data['price'] * validated_data['quantity']
        return super().create(validated_data)
