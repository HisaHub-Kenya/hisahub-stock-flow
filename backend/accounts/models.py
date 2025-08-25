from django.db import models
from django.conf import settings


# Firebase-linked basic account (mirrors Firebase Auth users)
class FirebaseUser(models.Model):
    uid = models.CharField(max_length=128, unique=True)   # Firebase UID
    email = models.EmailField(unique=True)
    display_name = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email or self.uid


# Platform Users (Traders/Investors) with KYC info
class UserProfile(models.Model):
    firebase_user = models.OneToOneField(
        FirebaseUser, on_delete=models.CASCADE, related_name="profile"
    )
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, blank=True)
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
        return self.full_name or self.firebase_user.email


# Brokers (who facilitate or manage trades)
class BrokerProfile(models.Model):
    firebase_user = models.OneToOneField(
        FirebaseUser, on_delete=models.CASCADE, related_name="broker_profile"
    )
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    company_name = models.CharField(max_length=100, blank=True)
    license_id = models.CharField(max_length=100, blank=True)
    verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} (Broker)"


# Stock trades
class StockTrade(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="trades")
    stock_symbol = models.CharField(max_length=10)
    stock_name = models.CharField(max_length=100)
    trade_type = models.CharField(max_length=10, choices=[('buy', 'Buy'), ('sell', 'Sell')])
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    broker = models.ForeignKey(BrokerProfile, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.user.full_name} - {self.stock_symbol} ({self.trade_type})"
    
class BrokerVerification(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="broker_verification")
    is_verified = models.BooleanField(default=False)
    verified_at = models.DateTimeField(null=True, blank=True)
    verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="verified_brokers"
    )

    def __str__(self):
        return f"{self.user.email} - {'Verified' if self.is_verified else 'Pending'}"

class KYC(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="kyc_documents")
    document_type = models.CharField(max_length=50, choices=[
        ("ID", "National ID"),
        ("PASSPORT", "Passport"),
        ("DL", "Driver's License"),
    ])
    document_file = models.FileField(upload_to="kyc_documents/")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[
        ("PENDING", "Pending"),
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
    ], default="PENDING")

    def __str__(self):
        return f"{self.user} - {self.document_type} - {self.status}"