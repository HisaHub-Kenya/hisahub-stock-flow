import os
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "").split(",") if os.getenv("ALLOWED_HOSTS") else []
print("ALLOWED_HOSTS:", ALLOWED_HOSTS)

csrf_trusted_origins_env = os.environ.get('CSRF_TRUSTED_ORIGINS')
if csrf_trusted_origins_env:
    CSRF_TRUSTED_ORIGINS = [origin.strip() for origin in csrf_trusted_origins_env.split(',') if origin.strip()]
else:
    CSRF_TRUSTED_ORIGINS = []
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent
# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# WhiteNoise Middleware for static files
MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware',
    # ...existing code...
]
# Debug logging configuration
# Logs to both console and debug.log file for robust error tracking
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {"class": "logging.StreamHandler"},
        "file": {
            "class": "logging.FileHandler",
            "filename": "debug.log",
            "level": "DEBUG",
        },
    },
    "root": {"handlers": ["console", "file"], "level": "DEBUG"},
}
"""
Django settings for Backend project.
"""


from decouple import config
import os
os.environ["PYTHONZONEINFO_TZPATH"] = "C:/Users/Ian/AppData/Local/Programs/Python/Python313/Lib/zoneinfo/tzdata"
from pathlib import Path


# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Security
SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = []

# Firebase

# Base directory
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
    # 'django_celery_beat',

    # Local apps
    'accounts',
    'stocks',
    'payments',
    'news',
    'Trading',
    'chat_App',
    'corsheaders',
]
# Celery configuration


CELERY_BROKER_URL = 'redis://localhost:6379/0'  # Ensure Redis is running
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'

# Firebase initialization
import firebase_config    # Initialize Firebase
# REST framework configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'accounts.auth_middleware.FirebaseAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
    
}
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}


# Global exception middleware must be first to catch all errors
MIDDLEWARE = [
    'Backend.middleware.error_handler.GlobalExceptionMiddleware',
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

# aSGI
ASGI_APPLICATION = 'Backend.wsgi.application'

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

# Default auto field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
 


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

# CORS settings for testing
CORS_ALLOW_ALL_ORIGINS = True  # For testing only! Use CORS_ALLOWED_ORIGINS in production.

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


# ASGI for Django Channels
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


print("ALLOWED_HOSTS:", ALLOWED_HOSTS)


# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
# Sentry integration temporarily disabled for debugging
# import sentry_sdk
# from sentry_sdk.integrations.django import DjangoIntegration
# sentry_sdk.init(
#     dsn=config('SENTRY_DSN', default=''),
#     integrations=[DjangoIntegration()],
#     traces_sample_rate=1.0,
#     send_default_pii=True,
# )