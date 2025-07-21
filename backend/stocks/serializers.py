from rest_framework import serializers
from .models import Stock

class StockSerializer(serializers.ModelSerializer):
    percentage_change = serializers.SerializerMethodField()

    class Meta:
        model = Stock
        fields = ['symbol', 'name', 'current_price', 'percentage_change', 'volume', 'last_updated','trending_score']

class LightweightStockSerializer(serializers.ModelSerializer):
    percentage_change = serializers.SerializerMethodField()
    class Meta:
        model = Stock
        fields = ['symbol', 'name', 'current_price', 'percentage_change']
        
    
    def get_percentage_change(self, obj):
        interval = self.context.get('interval', 1)
        return round(obj.percentage_change(), 2)
