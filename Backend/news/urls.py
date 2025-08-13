from django.urls import path
from .views import NewsArticleListCreateView

urlpatterns = [
    path('articles/', NewsArticleListCreateView.as_view(), name='news-article-list-create'),
]