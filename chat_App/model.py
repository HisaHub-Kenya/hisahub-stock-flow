from django.db import models
from django.conf import settings

class ChatThread(models.Model):
    """Optional: a thread for 1:1 chat between two users. """
    # Use Firebase UID as user identifier stored in local user table or directly as text
    user_a = models.CharField(max_length=128)
    user_b = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (('user_a', 'user_b'),)

    def __str__(self):
        return f"{self.user_a}<->{self.user_b}"

class Message(models.Model):
    thread = models.ForeignKey(ChatThread, related_name='messages', on_delete=models.CASCADE, null=True, blank=True)
    sender_uid = models.CharField(max_length=128)
    receiver_uid = models.CharField(max_length=128)
    text = models.TextField(blank=True)
    data = models.JSONField(blank=True, null=True)  # For attachments / metadata
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=['receiver_uid', 'created_at'])]
        ordering = ['created_at']

    def __str__(self):
        return f"{self.sender_uid} -> {self.receiver_uid} @ {self.created_at}"
