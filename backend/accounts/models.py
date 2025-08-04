from django.db import models

# Firebase-linked basic account for users
class FirebaseUser(models.Model):
    uid = models.CharField(max_length=128, unique=True)
    email = models.EmailField(unique=True)
    display_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email


# Platform Users (Traders/Investors)
class UserProfile(models.Model):
    uid = models.CharField(max_length=128, unique=True)  # Firebase UID
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    account_balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name


# Brokers (who facilitate or manage trades for users)
class BrokerProfile(models.Model):
    uid = models.CharField(max_length=128, unique=True)  # Firebase UID
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    company_name = models.CharField(max_length=100, blank=True)
    license_id = models.CharField(max_length=100, blank=True)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} (Broker)"


# Stock trade associated with a user
class StockTrade(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    stock_symbol = models.CharField(max_length=10)
    stock_name = models.CharField(max_length=100)
    trade_type = models.CharField(max_length=10, choices=[('buy', 'Buy'), ('sell', 'Sell')])
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)
    broker = models.ForeignKey(BrokerProfile, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.user.full_name} - {self.stock_symbol} ({self.trade_type})"
