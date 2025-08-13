from django.contrib import admin
from .models import NewsArticle

@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'published_at', 'source')
    search_fields = ('title', 'summary', 'source')
    ordering = ('-published_at',)