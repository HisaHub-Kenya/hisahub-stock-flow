"""
Django settings for Backend project.
"""

from decouple import config
import os
from pathlib import Path


# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Security
SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = []

# Firebase
FIREBASE_CREDENTIAL_PATH = config('FIREBASE_CREDENTIAL_PATH')  # Used in firebase.py

# Installed apps
INSTALLED_APPS = [
    # Default Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party apps
    'rest_framework',
    'django_celery_beat',

    # Local apps
    'accounts',
    'stocks',
    'payments',
    'channels',
]
CELERY_BROKER_URL = 'redis://localhost:6379/0'  # Ensure Redis is running
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'

# Firebase initialization
import firebase_config    # Initialize Firebase
# REST framework configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'accounts.authentication.FirebaseAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    
}
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}


# Middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# URL routing
ROOT_URLCONF = 'Backend.urls'

# Templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI
WSGI_APPLICATION = 'Backend.wsgi.application'

# Database configuration (PostgreSQL)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='5432'),
    }
}

# Password validators
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.redis.RedisCache",
    "LOCATION": "redis://127.0.0.1:6379/1",

    }
}

# mpesa cofigurations   

MPESA_CONSUMER_KEY = os.getenv("MPESA_CONSUMER_KEY", "your_consumer_key")
MPESA_CONSUMER_SECRET = os.getenv("MPESA_CONSUMER_SECRET", "your_consumer_secret")
MPESA_PASSKEY = os.getenv("MPESA_PASSKEY", "your_lnm_passkey")
MPESA_SHORTCODE = os.getenv("MPESA_SHORTCODE", "174379")  # Test shortcode

 # paypal configurations
PAYPAL_CLIENT_ID = 'your-paypal-client-id'
PAYPAL_SECRET = 'your-paypal-secret'
PAYPAL_RETURN_URL = 'https://yourdomain.com/paypal/return/'
PAYPAL_CANCEL_URL = 'https://yourdomain.com/paypal/cancel/'

 # coinbase configurations
COINBASE_API_BASE_URL = 'https://api.coinbase.com/v2/'
COINBASE_API_KEY = os.getenv('COINBASE_API_KEY')

# Stripe Keys
STRIPE_PUBLIC_KEY = "pk_test_XXXXXXXXXXXXXXXXXXXXXXXX"
STRIPE_SECRET_KEY = "sk_test_XXXXXXXXXXXXXXXXXXXXXXXX"

ASGI_APPLICATION = 'Backend.asgi.application'

# Channels config (Redis channel layer)
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            'hosts': ["redis://127.0.0.1:6379/1"],
        },
    },
}

# Redis URL for presence/other uses
REDIS_URL = 'redis://127.0.0.1:6379/2'


# Firebase Admin initialization (do this in project startup, e.g., project/firebase_init.py)
# import firebase_admin
# from firebase_admin import credentials
# cred = credentials.Certificate('/path/to/serviceAccountKey.json')
# firebase_admin.initialize_app(cred)

ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'yourdomain.com']




# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = 'static/'

# Default auto field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
