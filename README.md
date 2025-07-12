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
├── web-frontend/         # React/TypeScript web interface
├── backend/              # Django Python backend
├── supabase/             # Database configuration
└── README.md            # This file
```

### Component Details

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Mobile App** | Flutter (Dart) | Primary mobile experience for Android & iOS |
| **Web Frontend** | React + TypeScript | Web-based interface for desktop users |
| **Backend** | Django (Python) | API server and business logic |
| **Database** | Supabase (PostgreSQL) | User data, authentication, and real-time features |

---

## 🧰 Tech Stack

| Layer          | Technology Used                              |
| -------------- | --------------------------------------------- |
| Mobile App     | Flutter (Dart)                               |
| Web Frontend   | React + TypeScript + Vite                    |
| Backend        | Django (Python)                              |
| Auth & DB      | Supabase (PostgreSQL, Auth)                  |
| AI Integration | Ollama + Mistral/phi2 via Invisa AI engine   |
| Hosting        | Firebase + AWS Nairobi                       |
| Others         | TensorFlow, REST APIs, WebSockets, Figma UI  |

---

## ⚙️ Getting Started

### Prerequisites

- **For Mobile App**: Flutter SDK, Dart
- **For Web Frontend**: Node.js 18+, npm
- **For Backend**: Python 3.10+
- **For Database**: Supabase CLI
- **For Deployment**: Firebase CLI, Git

### Setup Instructions

#### 1. Mobile App (Flutter)
```bash
cd hisahub_app
flutter pub get
flutter run
```

#### 2. Web Frontend (React)
```bash
cd web-frontend
npm install
npm run dev
```

#### 3. Backend (Django)
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

#### 4. Database (Supabase)
```bash
cd supabase
supabase start
```

---

## 📱 Development Workflow

1. **Mobile Development**: Work in `hisahub_app/` for Flutter features
2. **Web Development**: Work in `web-frontend/` for React features  
3. **Backend Development**: Work in `backend/` for Django APIs
4. **Database Changes**: Work in `supabase/` for schema updates

---

## 🚀 Deployment

- **Mobile App**: Deploy to Google Play Store & Apple App Store
- **Web Frontend**: Deploy to Vercel or Firebase Hosting
- **Backend**: Deploy to AWS Nairobi or Google Cloud
- **Database**: Supabase Cloud (already configured)

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
