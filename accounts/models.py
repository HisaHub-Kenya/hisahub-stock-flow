from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.conf import settings


class User(AbstractUser):
    ROLE_CHOICES = (
        ('user', 'User'),
        ('broker', 'Broker'),
        ('admin', 'Admin'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    firebase_uid = models.CharField(max_length=128, blank=True, null=True, unique=True)
    phone = models.CharField(max_length=32, blank=True, null=True)

    # KYC / profile details
    national_id = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=255, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    kyc_verified = models.BooleanField(default=False)
    two_factor_enabled = models.BooleanField(default=False)
    security_questions = models.JSONField(default=dict, blank=True)
    account_balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    # Fix reverse accessor conflicts
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_groups',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username or self.email

class BrokerVerification(models.Model):
    """
    Tracks verification status for brokers.
    """
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="broker_verification",
    )
    is_verified = models.BooleanField(default=False)
    verified_at = models.DateTimeField(null=True, blank=True)
    verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="verified_brokers",
    )

    def __str__(self):
        return f"{self.user.email} - {'Verified' if self.is_verified else 'Pending'}"


class KYC(models.Model):
    """
    Stores uploaded KYC documents for any user.
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="kyc_documents",
    )
    document_type = models.CharField(
        max_length=50,
        choices=[
            ("ID", "National ID"),
            ("PASSPORT", "Passport"),
            ("DL", "Driver's License"),
        ],
    )
    document_file = models.FileField(upload_to="kyc_documents/")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ("PENDING", "Pending"),
            ("APPROVED", "Approved"),
            ("REJECTED", "Rejected"),
        ],
        default="PENDING",
    )

    def __str__(self):
        return f"{self.user} - {self.document_type} - {self.status}"


class StockTrade(models.Model):
    """
    Stock trade linked to a user (with optional broker involvement).
    """
    TRADE_TYPES = (
        ('buy', 'Buy'),
        ('sell', 'Sell'),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='trades',
    )
    stock_symbol = models.CharField(max_length=10)
    stock_name = models.CharField(max_length=100)
    trade_type = models.CharField(max_length=10, choices=TRADE_TYPES)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    broker = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        limit_choices_to={'role': 'broker'},
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.stock_symbol} ({self.trade_type})"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    kyc_verified = models.BooleanField(default=False)

class BrokerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    verified = models.BooleanField(default=False)
    broker_code = models.CharField(max_length=50, unique=True)
