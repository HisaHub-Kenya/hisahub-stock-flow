import json
import asyncio
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from django.conf import settings
import firebase_admin
from firebase_admin import auth as firebase_auth
import aioredis
from .models import Message, ChatThread
from .serializers import MessageSerializer

REDIS_PRESENCE_KEY = "presence:user:{uid}"  # store a key with TTL

async def get_redis_pool():
    # Use aioredis for presence. Configure URL in settings (REDIS_URL)
    return await aioredis.from_url(settings.REDIS_URL, encoding='utf-8', decode_responses=True)

class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        # Expect the client to send a Firebase ID token as a query param: ?token=<id-token>
        self.user = None
        token = self.scope['query_string'].decode().split('token=')[-1] if 'token=' in self.scope['query_string'].decode() else None
        if not token:
            await self.close(code=4001)
            return

        try:
            decoded = await database_sync_to_async(firebase_auth.verify_id_token)(token)
            self.user = decoded
            self.uid = decoded.get('uid')
        except Exception as e:
            await self.close(code=4002)
            return

        # join a personal group for direct messages
        self.personal_group = f"user:{self.uid}"
        await self.channel_layer.group_add(self.personal_group, self.channel_name)

        # mark presence in redis
        self.redis = await get_redis_pool()
        await self.redis.set(REDIS_PRESENCE_KEY.format(uid=self.uid), 'online', ex=60)

        await self.accept()

        # Optionally broadcast presence change to friends / contacts

    async def receive_json(self, content, **kwargs):
        """Expect messages with type field, e.g., {"type": "chat.message", "to": "UID", "text": "hello"} """
        mtype = content.get('type')
        if mtype == 'chat.message':
            to_uid = content.get('to')
            text = content.get('text', '')
            data = content.get('data')
            # persist message
            msg = await database_sync_to_async(Message.objects.create)(
                sender_uid=self.uid,
                receiver_uid=to_uid,
                text=text,
                data=data,
            )
            serialized = MessageSerializer(msg).data

            # push to receiver group
            await self.channel_layer.group_send(
                f"user:{to_uid}",
                {
                    'type': 'chat.message',
                    'message': serialized
                }
            )

            # echo back ack to sender (optional)
            await self.send_json({'type': 'chat.sent', 'message': serialized})

        elif mtype == 'presence.ping':
            # extend TTL
            await self.redis.set(REDIS_PRESENCE_KEY.format(uid=self.uid), 'online', ex=60)
            await self.send_json({'type': 'presence.pong'})

        else:
            await self.send_json({'error': 'unknown message type'})

    async def chat_message(self, event):
        message = event['message']
        # if receiver is connected they will get this message
        await self.send_json({'type': 'chat.message', 'message': message})

    async def disconnect(self, code):
        # remove presence
        try:
            await self.redis.delete(REDIS_PRESENCE_KEY.format(uid=self.uid))
        except Exception:
            pass
        await self.channel_layer.group_discard(self.personal_group, self.channel_name)
