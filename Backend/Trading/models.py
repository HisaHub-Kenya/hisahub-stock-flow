from django.db import models
from django.conf import settings
from django.utils import timezone
import uuid as uid
from decimal import Decimal

User = settings.AUTH_USER_MODEL

class Trade(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    market_type = models.CharField(max_length=50)   # , "Stocks", "Forex", "Crypto"
    exchange = models.CharField(max_length=50)      #  "NSE", "NYSE", "Binance"
    sector = models.CharField(max_length=50)        #  "Technology", "Energy"
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='wallet')
    balance = models.DecimalField(max_digits=28, decimal_places=2, default=Decimal('0.00'))

    def __str__(self):
        return f"{self.user} wallet: {self.balance}"


class Holding(models.Model):
    """
    Tracks per-user, per-symbol holdings and average buy price.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='holdings')
    symbol = models.CharField(max_length=16)
    quantity = models.DecimalField(max_digits=28, decimal_places=8, default=Decimal('0'))
    avg_price = models.DecimalField(max_digits=28, decimal_places=8, default=Decimal('0.00'))

    class Meta:
        unique_together = ('user', 'symbol')
        indexes = [models.Index(fields=['user','symbol'])]

    def __str__(self):
        return f"{self.user} - {self.symbol} : {self.quantity} @ {self.avg_price}"


class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='wallet')
    balance = models.DecimalField(max_digits=20, decimal_places=2, default=0)

class Order(models.Model):
    STATUS = (('pending','Pending'), ('executed','Executed'), ('failed','Failed'), ('cancelled','Cancelled'))
    SIDE = (('buy','Buy'), ('sell','Sell'))

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    symbol = models.CharField(max_length=32)
    side = models.CharField(max_length=4, choices=SIDE)
    price = models.DecimalField(max_digits=20, decimal_places=2)
    quantity = models.DecimalField(max_digits=20, decimal_places=4)
    amount = models.DecimalField(max_digits=22, decimal_places=2)  # price * qty
    status = models.CharField(max_length=20, choices=STATUS, default='pending')
    created_at = models.DateTimeField(default=timezone.now)
    executed_at = models.DateTimeField(null=True, blank=True)
    broker_approved = models.BooleanField(default=False)
    
    
class OutboxMessage(models.Model):
    uid = models.UUIDField(primary_key=True, default=uid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    message_type = models.CharField(max_length=64)
    payload = models.JSONField()
    destination = models.CharField(max_length=255, blank=True, null=True)
    attempts = models.IntegerField(default=0)
    processed = models.BooleanField(default=False, db_index=True)
    processed_at = models.DateTimeField(null=True, blank=True)
    locked_at = models.DateTimeField(null=True, blank=True)
    unique_key = models.CharField(max_length=255, blank=True, null=True, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['processed','created_at']),
            models.Index(fields=['unique_key']),
        ]

    def __str__(self):
        return f"Outbox {self.id} type={self.message_type} processed={self.processed}"
