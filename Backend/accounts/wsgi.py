"""
 config for Backend project.

It exposes the  callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment//
"""

import os

from django.core. import get__application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Backend.settings')

application = get__application()
