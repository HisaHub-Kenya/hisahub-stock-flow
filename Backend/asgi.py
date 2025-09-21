import os
import django
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
import chat_App.routing

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Backend.settings")
django.setup()  # Ensures Django apps are loaded before URLRouter

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            chat_App.routing.websocket_urlpatterns
        )
    ),
})
import os
import django
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
import chat_App.routing

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Backend.settings")
django.setup()  # Ensures Django apps are loaded before URLRouter

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            chat_App.routing.websocket_urlpatterns
        )
    ),
})
