# HisaHub Backend

This is the Django backend for HisaHub, providing REST APIs and business logic for the Kenyan stock market platform.

## Tech Stack

- **Django 4.x** - Web framework
- **Django REST Framework** - API development
- **PostgreSQL** - Database (via Supabase)
- **Python 3.10+** - Runtime

## Getting Started

1. Create a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   Create a `.env` file with:
   ```env
   SECRET_KEY=your_django_secret_key
   DEBUG=True
   DATABASE_URL=your_supabase_database_url
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the development server:
   ```bash
   python manage.py runserver
   ```

## API Endpoints

The backend provides REST APIs for:

- User authentication and management
- Stock data and trading operations
- Portfolio management
- News and social features
- AI assistant integration

## Project Structure

- `myproject/` - Django project settings
- `api/` - REST API views and serializers
- `models/` - Database models
- `services/` - Business logic services
- `utils/` - Utility functions

## Development

- Run tests: `python manage.py test`
- Create migrations: `python manage.py makemigrations`
- Apply migrations: `python manage.py migrate`
- Create superuser: `python manage.py createsuperuser` 