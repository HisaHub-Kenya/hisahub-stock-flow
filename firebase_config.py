

# firebase_config.py for Django: Firebase init from env var only
import os
import json
import firebase_admin
from firebase_admin import credentials

firebase_key_json = os.environ.get('FIREBASE_SERVICE_KEY')
if not firebase_key_json:
	raise Exception("FIREBASE_SERVICE_KEY environment variable not set")

firebase_key_dict = json.loads(firebase_key_json)
cred = credentials.Certificate(firebase_key_dict)
firebase_admin.initialize_app(cred)

