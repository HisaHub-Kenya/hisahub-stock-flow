from celery import shared_task
from django.core.mail import send_mail
from .models import Message
from django.conf import settings

@shared_task(bind=True, max_retries=3, default_retry_delay=30)
def deliver_push_notification(self, message_id):
    # Example: use FCM or APNs to notify offline users
    try:
        msg = Message.objects.get(id=message_id)
        # check receiver presence in redis; if offline send push
        # (Implement redis check using settings.REDIS_URL)
    except Message.DoesNotExist:
        return