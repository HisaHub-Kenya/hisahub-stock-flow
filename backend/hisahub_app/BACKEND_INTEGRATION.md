# HisaHub Backend Integration Setup

This document outlines the backend integration setup for the HisaHub Flutter app, including Firebase configuration, API services, and data models.

## 🏗️ Architecture Overview

The app uses a layered architecture with the following components:

```
┌─────────────────┐
│   UI Layer      │ ← Screens, Widgets
├─────────────────┤
│  State Layer    │ ← AppStateService, Providers
├─────────────────┤
│  Service Layer  │ ← ApiService, BackgroundImageService
├─────────────────┤
│  Model Layer    │ ← UserModel, MarketDataModel, PortfolioModel
├─────────────────┤
│  Data Layer     │ ← Firebase, HTTP APIs
└─────────────────┘
```

## 🔧 Firebase Setup

### 1. Firebase Project Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable the following services:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage
   - Analytics
   - Cloud Messaging

### 2. Firebase Configuration Files

Update the following files with your Firebase project details:

#### `lib/firebase_options.dart`
Replace the placeholder values with your actual Firebase configuration:

```dart
// Replace these values with your Firebase project configuration
static const FirebaseOptions web = FirebaseOptions(
  apiKey: 'your-api-key',
  appId: 'your-app-id',
  messagingSenderId: 'your-sender-id',
  projectId: 'your-project-id',
  authDomain: 'your-project-id.firebaseapp.com',
  storageBucket: 'your-project-id.appspot.com',
);
```

#### `lib/services/api_service.dart`
Update the Firebase project ID:

```dart
static const String firebaseProjectId = 'your-actual-firebase-project-id';
```

### 3. Firestore Security Rules

Create the following Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read/write their own portfolio
    match /portfolios/{userId}/holdings/{document} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can create orders
    match /orders/{orderId} {
      allow create: if request.auth != null;
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // KYC submissions
    match /kyc_submissions/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public market data (read-only)
    match /market_data/{document} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

## 📊 Data Models

### User Model
- **Fields**: id, fullName, email, phoneNumber, idNumber, profileImageUrl, kycStatus, accountStatus, createdAt, updatedAt
- **Location**: `lib/models/user_model.dart`

### Market Data Model
- **Fields**: symbol, name, price, change, changePercent, volume, lastUpdated
- **Location**: `lib/models/market_data_model.dart`

### Portfolio Model
- **Fields**: symbol, quantity, averagePrice, totalValue, addedAt, updatedAt
- **Location**: `lib/models/portfolio_model.dart`

## 🔌 API Services

### Core Services

#### 1. ApiService (`lib/services/api_service.dart`)
Handles all backend communication including:
- Firebase Authentication
- Firestore Database operations
- External API calls
- Local storage management

#### 2. AppStateService (`lib/services/app_state_service.dart`)
Manages application state using Provider pattern:
- User authentication state
- Market data
- Portfolio data
- Loading states
- Error handling

### Key Features

#### Authentication
```dart
// Sign in
await appStateService.signIn(email, password);

// Sign up
await appStateService.signUp(email, password);

// Sign out
await appStateService.signOut();
```

#### User Profile Management
```dart
// Create user profile
await appStateService.createUserProfile(
  fullName: 'John Doe',
  phoneNumber: '+254700000000',
  idNumber: '12345678',
);

// Get user profile
final profile = appStateService.userProfile;
```

#### KYC Management
```dart
// Submit KYC
await appStateService.submitKYC({
  'fullName': 'John Doe',
  'idNumber': '12345678',
  'phoneNumber': '+254700000000',
  'dateOfBirth': '1990-01-01',
  'address': 'Nairobi, Kenya',
});
```

#### Market Data
```dart
// Get market data
final marketData = appStateService.marketData;

// Refresh market data
await appStateService.refreshMarketData();
```

#### Portfolio Management
```dart
// Add to portfolio
await appStateService.addToPortfolio(
  symbol: 'SCOM',
  quantity: 100,
  price: 15.50,
);

// Get portfolio
final portfolio = appStateService.portfolio;
```

#### Trading Orders
```dart
// Place order
await appStateService.placeOrder(
  symbol: 'SCOM',
  orderType: 'buy',
  quantity: 100,
  price: 15.50,
);
```

#### AI Assistant
```dart
// Get AI response
final response = await appStateService.getAIResponse('What is Safaricom?');
```

#### M-Pesa Integration
```dart
// Initiate payment
final result = await appStateService.initiateMpesaPayment(
  phoneNumber: '+254700000000',
  amount: 1000.0,
  reference: 'ORDER_123',
);
```

## 🚀 Environment Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_API_KEY=your-firebase-api-key

# API Configuration
API_BASE_URL=https://api.hisahub.com

# Feature Flags
ENABLE_MPESA_INTEGRATION=true
ENABLE_AI_ASSISTANT=true
ENABLE_REAL_TIME_DATA=false

# Development
ENABLE_DEBUG_LOGGING=true
```

### App Configuration

The app uses `lib/config/app_config.dart` for centralized configuration:

```dart
// API base URL
AppConfig.apiBaseUrl

// Feature flags
AppConfig.enableMpesaIntegration
AppConfig.enableAIAssistant

// Timeouts
AppConfig.apiTimeout
AppConfig.cacheTimeout
```

## 📱 State Management

### Provider Setup

The app uses Provider for state management:

```dart
MultiProvider(
  providers: [
    ChangeNotifierProvider(create: (context) => BackgroundImageService()),
    ChangeNotifierProvider(create: (context) => AppStateService()),
  ],
  child: MaterialApp.router(...),
)
```

### Accessing State

```dart
// In widgets
final appState = Provider.of<AppStateService>(context, listen: false);
final user = appState.currentUser;
final isLoading = appState.isLoading;
```

## 🔒 Security Considerations

### 1. Authentication
- Firebase Authentication handles user authentication
- JWT tokens are automatically managed
- Password requirements enforced

### 2. Data Validation
- Input validation on all forms
- Server-side validation for critical operations
- Sanitization of user inputs

### 3. Firestore Security
- Row-level security with user-based access
- Read-only access for public data
- Write access only for authenticated users

### 4. API Security
- HTTPS for all API calls
- Request timeouts
- Error handling without exposing sensitive data

## 🧪 Testing

### Unit Tests
```bash
flutter test test/services/
```

### Integration Tests
```bash
flutter test test/integration/
```

### Widget Tests
```bash
flutter test test/widgets/
```

## 📊 Monitoring & Analytics

### Firebase Analytics
- User engagement tracking
- Feature usage analytics
- Crash reporting

### Performance Monitoring
- API response times
- App performance metrics
- Error tracking

## 🚀 Deployment

### 1. Build Configuration
```bash
# Development
flutter run --dart-define=ENABLE_DEBUG_LOGGING=true

# Production
flutter build web --release --dart-define=ENABLE_DEBUG_LOGGING=false
```

### 2. Environment-Specific Builds
```bash
# Staging
flutter build web --dart-define=API_BASE_URL=https://staging-api.hisahub.com

# Production
flutter build web --dart-define=API_BASE_URL=https://api.hisahub.com
```

## 🔧 Troubleshooting

### Common Issues

1. **Firebase not initialized**
   - Check `firebase_options.dart` configuration
   - Ensure Firebase project is properly set up

2. **Authentication errors**
   - Verify Firebase Authentication is enabled
   - Check email/password format

3. **Firestore permission errors**
   - Review security rules
   - Ensure user is authenticated

4. **API timeout errors**
   - Check network connectivity
   - Verify API endpoints are accessible

### Debug Mode

Enable debug logging:
```dart
// In main.dart
if (AppConfig.enableDebugLogging) {
  print('Debug: API call to $endpoint');
}
```

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Flutter Provider Documentation](https://pub.dev/packages/provider)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Flutter HTTP Package](https://pub.dev/packages/http)

## 🤝 Contributing

When adding new backend features:

1. Create appropriate data models
2. Add methods to `ApiService`
3. Update `AppStateService` for state management
4. Add proper error handling
5. Write tests for new functionality
6. Update documentation

---

This setup provides a robust foundation for the HisaHub app with Firebase backend integration, comprehensive state management, and scalable architecture. 