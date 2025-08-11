from django.db import models

class Stock(models.Model):
    symbol = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    current_price = models.DecimalField(max_digits=10, decimal_places=2)
    previous_price = models.DecimalField(max_digits=10, decimal_places=2)
    volume = models.IntegerField(default=0)
    treading_score = models.FloatField(default=0.0)
    last_updated = models.DateTimeField(auto_now=True)
    percent_change = models.FloatField()
    
    def percentage_change(self):
        if self.previous_price == 0:
            return 0
        return ((self.current_price - self.previous_price) / self.previous_price) * 100
# a price history model added to track stock prices over time
TRENDING_OPTIONS = {
    'most_traded': '-volume',
    'highest_change': '-percentage_change',
    'lowest_change': 'percentage_change',
    'highest_price': '-current_price',
}
class StockPriceHistory(models.Model):
    stock = models.ForeignKey(Stock, related_name='history', on_delete=models.CASCADE)
    date = models.DateField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = ['stock', 'date']
