from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Create a temporary superuser'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        username = 'tempadmin'
        password = 'TempAdmin2025!'
        email = 'tempadmin@example.com'
        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username=username, email=email, password=password)
            self.stdout.write(self.style.SUCCESS(f'Superuser created: {username} / {password}'))
        else:
            self.stdout.write(self.style.WARNING('User already exists.'))
