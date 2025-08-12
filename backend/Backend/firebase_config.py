import os
import firebase_admin
from firebase_admin import credentials, initialize_app
from django.conf import settings

Base_DIR = os.path.dirname(os.path.abspath(__file__))
key_path = os.path.join(Base_DIR, "serviceAccountKey.json")

cred = credentials.Certificate(key_path)
firebase_admin.initialize_app(cred)

