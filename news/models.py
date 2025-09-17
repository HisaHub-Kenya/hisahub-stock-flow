from django.db import models

class NewsArticle(models.Model):
    title = models.CharField(max_length=255)
    summary = models.TextField()
    content = models.TextField(blank=True)
    published_at = models.DateTimeField(auto_now_add=True)
    source = models.CharField(max_length=255, blank=True)
    author = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.title