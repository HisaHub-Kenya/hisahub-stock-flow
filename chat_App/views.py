from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from .models import Message, ChatThread
from .serializers import MessageSerializer, ChatThreadSerializer

# Note: DRF authentication should be set up to validate Firebase ID tokens on REST endpoints.

class MessageHistoryView(APIView):
    permission_classes = []  # Implement Firebase-based permission for API access

    def get(self, request, other_uid):
        # expects ?page= & page_size=
        my_uid = request.user.uid if hasattr(request.user, 'uid') else None
        qs = Message.objects.filter(
            (Q(sender_uid=my_uid) & Q(receiver_uid=other_uid)) |
            (Q(sender_uid=other_uid) & Q(receiver_uid=my_uid))
        ).order_by('-created_at')
        # add pagination as needed
        serializer = MessageSerializer(qs[:50], many=True)
        return Response(serializer.data)

class CreateThreadView(APIView):
    def post(self, request):
        a = request.data.get('a')
        b = request.data.get('b')
        if a == b:
            return Response({'detail': 'cannot create thread with same user'}, status=400)
        thread, _ = ChatThread.objects.get_or_create(user_a=min(a,b), user_b=max(a,b))
        return Response(ChatThreadSerializer(thread).data)