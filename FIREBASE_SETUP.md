# Firebase Setup Guide for HisaHub

This guide will help you set up Firebase for the HisaHub project, replacing the previous Supabase configuration.

## Prerequisites

1. **Node.js and npm** - Install from [nodejs.org](https://nodejs.org/)
2. **Firebase CLI** - Install globally: `npm install -g firebase-tools`
3. **Flutter SDK** - Make sure Flutter is installed and configured

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `hisahub-app`
4. Enable Google Analytics (optional but recommended)
5. Choose your analytics account or create a new one
6. Click "Create project"

## Step 2: Configure Firebase Services

### Authentication
1. In Firebase Console, go to "Authentication" → "Sign-in method"
2. Enable the following providers:
   - Email/Password
   - Google
   - Phone (optional)
3. Configure authorized domains for your app

### Firestore Database
1. Go to "Firestore Database" → "Create database"
2. Choose "Start in test mode" for development
3. Select a location (preferably close to your target users)
4. Click "Done"

### Storage
1. Go to "Storage" → "Get started"
2. Choose "Start in test mode" for development
3. Select the same location as Firestore
4. Click "Done"

### Cloud Functions (Optional)
1. Go to "Functions" → "Get started"
2. Enable billing if prompted
3. Choose Node.js runtime

## Step 3: Configure Flutter App

### Install FlutterFire CLI
```bash
dart pub global activate flutterfire_cli
```

### Configure Firebase for Flutter
```bash
cd hisahub_app
flutterfire configure --project=your-firebase-project-id
```

This will:
- Generate `firebase_options.dart` with your project configuration
- Add necessary Firebase configuration files
- Update `pubspec.yaml` with Firebase dependencies

### Update main.dart
Make sure your `main.dart` initializes Firebase:

```dart
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(MyApp());
}
```

## Step 4: Deploy Firebase Configuration

### Initialize Firebase in Project Root
```bash
firebase login
firebase init
```

Select the following services:
- Firestore
- Functions (if using)
- Hosting (if needed)
- Storage

### Deploy Rules and Configuration
```bash
firebase deploy
```

This will deploy:
- Firestore security rules
- Storage security rules
- Firestore indexes
- Functions (if any)

## Step 5: Environment Variables

Create a `.env` file in your project root with Firebase configuration:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id
```

## Step 6: Update Backend (Django)

If your Django backend needs to interact with Firebase:

1. Install Firebase Admin SDK:
```bash
cd backend
pip install firebase-admin
```

2. Add Firebase configuration to Django settings:
```python
import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("path/to/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
```

## Step 7: Test Configuration

### Test Authentication
```dart
import 'package:firebase_auth/firebase_auth.dart';

// Test sign in
try {
  UserCredential userCredential = await FirebaseAuth.instance
      .signInWithEmailAndPassword(email: "test@example.com", password: "password");
} catch (e) {
  print('Error: $e');
}
```

### Test Firestore
```dart
import 'package:cloud_firestore/cloud_firestore.dart';

// Test write
await FirebaseFirestore.instance.collection('test').add({
  'message': 'Hello Firebase!',
  'timestamp': FieldValue.serverTimestamp(),
});
```

## Security Rules

The project includes pre-configured security rules for:
- **Firestore**: User-based access control
- **Storage**: User-based file access
- **Authentication**: Email/password and social login

Review and customize these rules in:
- `firestore.rules`
- `storage.rules`

## Deployment

### Development
```bash
firebase emulators:start
```

### Production
```bash
firebase deploy
```

## Troubleshooting

### Common Issues

1. **Firebase not initialized**: Make sure `Firebase.initializeApp()` is called before using any Firebase services

2. **Permission denied**: Check your security rules and make sure users are authenticated

3. **Missing dependencies**: Run `flutter pub get` after adding Firebase dependencies

4. **Configuration errors**: Verify your `firebase_options.dart` file has correct values

### Getting Help

- [Firebase Documentation](https://firebase.google.com/docs)
- [FlutterFire Documentation](https://firebase.flutter.dev/)
- [Firebase Console](https://console.firebase.google.com/)

## Next Steps

1. Implement authentication flows in your Flutter app
2. Set up Firestore collections for your data models
3. Configure push notifications with Firebase Messaging
4. Set up analytics and crash reporting
5. Deploy to production environments 