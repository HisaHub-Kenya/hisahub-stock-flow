from rest_framework import generics
from .models import NewsArticle
from .serializers import NewsArticleSerializer

class NewsArticleListCreateView(generics.ListCreateAPIView):
    queryset = NewsArticle.objects.all().order_by('-published_at')
    serializer_class = NewsArticleSerializer