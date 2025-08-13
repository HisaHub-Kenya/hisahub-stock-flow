import firebase_admin
#from firebase_admin import credentials
#from django.conf import settings
from .celeryconfig import app as celery_app

__all__ = ('celery_app',)

#cred = credentials.Certificate(settings.FIREBASE_CREDENTIAL_PATH)
#firebase_admin.initialize_app(cred)
