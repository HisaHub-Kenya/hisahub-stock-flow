from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Unified platform user model — works for traders, investors, brokers, and admins.
    Tied to Firebase UID for auth sync.
    """
    ROLE_CHOICES = (
        ('user', 'User'),
        ('broker', 'Broker'),
        ('admin', 'Admin')
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    firebase_uid = models.CharField(max_length=128, blank=True, null=True, unique=True)
    phone = models.CharField(max_length=32, blank=True, null=True)

    # Common KYC fields (optional for brokers)
    national_id = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=255, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    kyc_verified = models.BooleanField(default=False)
    kyc_documents = models.FileField(upload_to='kyc_docs/', blank=True)
    two_factor_enabled = models.BooleanField(default=False)
    security_questions = models.JSONField(default=dict, blank=True)

    account_balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"


class StockTrade(models.Model):
    """
    Stock trade linked to a user (either directly executed or via a broker).
    """
    TRADE_TYPES = (
        ('buy', 'Buy'),
        ('sell', 'Sell')
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='trades')
    stock_symbol = models.CharField(max_length=10)
    stock_name = models.CharField(max_length=100)
    trade_type = models.CharField(max_length=10, choices=TRADE_TYPES)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    # Optional broker reference (if trade was broker-assisted)
    broker = models.ForeignKey(User, limit_choices_to={'role': 'broker'}, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.stock_symbol} ({self.trade_type})"
