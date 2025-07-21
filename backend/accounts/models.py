from django.db import models

class FirebaseUser(models.Model):
    uid = models.CharField(max_length=128, unique=True)
    email = models.EmailField(unique=True)
    display_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return self.email
    
     