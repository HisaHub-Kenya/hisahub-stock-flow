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

## 🧰 Tech Stack

| Layer          | Technology Used                              |
| -------------- | --------------------------------------------- |
| Frontend       | Flutter (Dart) or React Native                |
| Backend        | Django (Python)                               |
| Auth & DB      | Supabase (PostgreSQL, Auth)                   |
| AI Integration | Ollama + Mistral/phi2 via Invisa AI engine    |
| Hosting        | Firebase + AWS Nairobi                        |
| Others         | TensorFlow, REST APIs, WebSockets, Figma UI   |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js / Dart (depending on frontend)
- Python 3.10+
- Supabase CLI
- Firebase CLI
- Git

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-org/hisahub.git
cd hisahub

# 2. Set up backend (Django)
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# 3. Set up frontend (React Native or Flutter)
cd ../frontend
npm install # or flutter pub get
npm start   # or flutter run
