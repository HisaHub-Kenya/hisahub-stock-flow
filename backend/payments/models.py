from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Transaction(models.Model):
    TRANSACTION_TYPES = (
        ('deposit', 'Deposit'),
        ('withdrawal', 'Withdrawal'),
    )
    PAYMENT_METHODS = (
        ('card', 'Card'),
        ('paypal', 'PayPal'),
        ('amazon', 'Amazon Pay'),
        ('crypto', 'Crypto'),
        ('mpesa', 'M-Pesa'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    paypal_email = models.EmailField(null=True, blank=True)
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, default='pending')  # pending, success, failed
    reference_id = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} | {self.transaction_type} | {self.amount}"
