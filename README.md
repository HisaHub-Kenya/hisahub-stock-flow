<<<<<<< HEAD
=======
<<<<<<< HEAD
# 📈 HisaHub – MVP

**HisaHub** is a localized stock trading and wealth management platform tailored for the Kenyan market. This MVP version demonstrates core trading functionalities, broker integration, a social community hub, and an AI-powered assistant – all within a mobile-first experience.

---

## 🚀 Project Status

> ✅ MVP Stage – Actively being developed for pre-launch testing and user onboarding.  
> 🧪 Feedback from early testers and partners will guide the next iterations.

---

## 🧠 Core Features

- 🔐 **User Authentication** – Secure sign-up and login with Supabase.
- 📊 **Trading Interface** – Simulated stock buying/selling with multi-broker integration.
- 💬 **AI Assistant (Invisa)** – Financial assistant for education, support, and analysis.
- 🌍 **Social Hub** – Real-time news, community chat, and crowd sentiment.
- 💼 **Portfolio & Wealth Tracker** – View assets, cash, P&L and risk insights.
- 📱 **Mobile-First Design** – Built for both Android & iOS.

---

## 🏗️ Project Structure

This repository contains multiple components of the HisaHub platform:

```
HisaHub/
├── hisahub_app/          # Flutter mobile app (main)
├── backend/              # Django Python backend
└── README.md            # This file
```

### Component Details

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Mobile App** | Flutter (Dart) | Primary mobile experience for Android & iOS |
| **Backend** | Django (Python) | API server and business logic |
| **Database** | Firebase (Firestore) | User data, authentication, and real-time features |

---

## 🧰 Tech Stack

| Layer          | Technology Used                              |
| -------------- | --------------------------------------------- |
| Mobile App     | Flutter (Dart)                               |
| Backend        | Django (Python)                              |
| Auth & DB      | Firebase (Firestore, Auth)                   |
| AI Integration | Ollama + Mistral/phi2 via Invisa AI engine   |
| Hosting        | Firebase + AWS Nairobi                       |
| Others         | TensorFlow, REST APIs, WebSockets, Figma UI  |

---

## ⚙️ Getting Started

### Prerequisites

- **For Mobile App**: Flutter SDK, Dart
- **For Backend**: Python 3.10+
- **For Database**: Firebase CLI
- **For Deployment**: Firebase CLI, Git

### Setup Instructions

#### 1. Mobile App (Flutter)
```bash
cd hisahub_app
flutter pub get
flutter run
```

#### 2. Backend (Django)
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### 3. Firebase Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Deploy Firebase configuration
firebase deploy
```

---

## 📱 Development Workflow

1. **Mobile Development**: Work in `hisahub_app/` for Flutter features
2. **Backend Development**: Work in `backend/` for Django APIs
3. **Database Changes**: Work with Firebase Console for schema updates

---

## 🚀 Deployment

- **Mobile App**: Deploy to Google Play Store & Apple App Store
- **Backend**: Deploy to AWS Nairobi or Google Cloud
- **Database**: Firebase Cloud (Firestore, Auth, Storage)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For support, email support@hisahub.co.ke or join our Discord community.
=======
>>>>>>> backend-fix
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
<<<<<<< HEAD
- Create superuser: `python manage.py createsuperuser` 
=======
- Create superuser: `python manage.py createsuperuser` 
>>>>>>> e87ae41 (Updated payment methods with shell code)
>>>>>>> backend-fix
