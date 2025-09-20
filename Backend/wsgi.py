import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Backend.settings')

application = get_wsgi_application()

import os
from django.core.wsgi import get_wsgi_application

# Set default settings module for 'backend'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Backend.settings')

application = get_wsgi_application()
