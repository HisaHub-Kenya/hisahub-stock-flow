from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Stock
from .utils import calculate_trending_score

@receiver(post_save, sender=Stock)
def update_trending_score(sender, instance, **kwargs):
    instance.trending_score = calculate_trending_score(instance)
    instance.save(update_fields=['trending_score'])
