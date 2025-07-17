# HisaHub User States Guide

This document explains the different user states and functionalities available in the HisaHub app.

## 🔐 User States

### 1. **Guest User (Pre-Signed Up)**
- **Status**: Not authenticated
- **Access**: Limited functionality
- **Features Available**:
  - View market data and news
  - Browse the app interface
  - See demo portfolio
  - Access sign-in prompts

### 2. **Authenticated User (Signed In)**
- **Status**: Fully authenticated
- **Access**: Full functionality
- **Features Available**:
  - All guest features plus:
  - Portfolio management
  - Trading functionality
  - M-Pesa integration
  - AI assistant access
  - KYC verification
  - Profile management

## 📱 Screen-by-Screen Functionality

### **Welcome Screen** (`/welcome`)
- **Guest**: ✅ Full access
- **Authenticated**: ✅ Full access
- **Features**: App introduction, get started flow

### **Login Screen** (`/login`)
- **Guest**: ✅ Full access
- **Authenticated**: Redirected to home
- **Features**: Email/password, phone number, M-Pesa sign-in

### **KYC Onboarding** (`/kyc`)
- **Guest**: ✅ Full access (for new users)
- **Authenticated**: ✅ Full access (for profile completion)
- **Features**: ID upload, selfie, personal details

### **Persona Selection** (`/persona`)
- **Guest**: ✅ Full access
- **Authenticated**: ✅ Full access
- **Features**: Student, Hustler, Corporate, Parent selection

### **Home Screen** (`/home`)
- **Guest**: ✅ Limited access
  - View market overview
  - See demo portfolio
  - Sign-in prompts for features
- **Authenticated**: ✅ Full access
  - Real portfolio data
  - Trading buttons
  - Deposit/withdraw buttons

### **Trade Screen** (`/home/trade`)
- **Guest**: ❌ Sign-in required
- **Authenticated**: ✅ Full access
- **Features**: Stock search, order placement, market orders

### **Portfolio Screen** (`/portfolio`)
- **Guest**: ❌ Sign-in required
- **Authenticated**: ✅ Full access
- **Features**: Holdings, performance, export

### **News Screen** (`/news`)
- **Guest**: ✅ Full access
- **Authenticated**: ✅ Full access
- **Features**: Financial news, community posts

### **Profile Screen** (`/profile`)
- **Guest**: ❌ Sign-in required
- **Authenticated**: ✅ Full access
- **Features**: Settings, KYC status, account management

## 🔧 Feature Matrix

| Feature | Guest User | Authenticated User |
|---------|------------|-------------------|
| **Market Data** | ✅ View only | ✅ View + Trade |
| **News Feed** | ✅ Read only | ✅ Read + Interact |
| **Portfolio** | ❌ Demo only | ✅ Full management |
| **Trading** | ❌ Not available | ✅ Full access |
| **Deposits** | ❌ Not available | ✅ M-Pesa integration |
| **Withdrawals** | ❌ Not available | ✅ M-Pesa integration |
| **AI Assistant** | ❌ Not available | ✅ Full access |
| **KYC Verification** | ✅ Can start | ✅ Can complete |
| **Profile Settings** | ❌ Not available | ✅ Full access |
| **Portfolio Export** | ❌ Not available | ✅ PDF export |
| **Offline Access** | ✅ Cached data | ✅ Cached data |

## 🎯 User Experience Flow

### **For Guest Users:**
1. **Welcome Screen** → App introduction
2. **Home Screen** → Browse market data
3. **Sign-in Prompts** → When trying to access protected features
4. **Login Screen** → Complete authentication
5. **KYC/Persona** → Complete onboarding
6. **Full Access** → All features unlocked

### **For Authenticated Users:**
1. **Home Screen** → Real portfolio data
2. **Trading** → Full market access
3. **Portfolio Management** → Holdings and performance
4. **M-Pesa Integration** → Deposits and withdrawals
5. **AI Assistant** → Investment guidance
6. **Profile Management** → Settings and preferences

## 🔒 Security & Authentication

### **Guest Mode Security:**
- No personal data stored
- Cached market data only
- Sign-in prompts for protected features
- No trading capabilities

### **Authenticated Mode Security:**
- Firebase authentication
- Encrypted data storage
- KYC verification required
- Secure trading environment
- M-Pesa integration security

## 📊 State Management

### **AppStateService Handles:**
- Authentication state (`isAuthenticated`)
- User profile data (`userProfile`)
- Portfolio data (`portfolio`)
- Market data (`marketData`)
- News data (`news`)
- Offline state (`isOffline`)

### **State Transitions:**
1. **Guest → Authenticated**: Login flow
2. **Authenticated → Guest**: Sign out
3. **Online → Offline**: Connectivity loss
4. **Offline → Online**: Connectivity restored

## 🎨 UI/UX Differences

### **Guest User Interface:**
- "Guest" indicator (top left)
- "Sign In" button (top right)
- Demo portfolio display
- Sign-in prompts for features
- Limited functionality buttons

### **Authenticated User Interface:**
- User name indicator (top left)
- "Sign Out" button (top right)
- Real portfolio data
- Full functionality buttons
- AI assistant access

## 🚀 Implementation Details

### **Authentication Flow:**
```dart
// Check authentication state
final isAuthenticated = appState.isAuthenticated;
final userProfile = appState.userProfile;

// Conditional UI rendering
if (isAuthenticated) {
  // Show authenticated user features
} else {
  // Show guest user features
}
```

### **Feature Protection:**
```dart
// Protect features that require authentication
void _showSignInPrompt(BuildContext context, String feature) {
  showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: const Text('Sign In Required'),
      content: Text('Please sign in to access $feature.'),
      actions: [
        TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
        ElevatedButton(
          onPressed: () {
            Navigator.pop(context);
            context.go('/login');
          },
          child: const Text('Sign In'),
        ),
      ],
    ),
  );
}
```

## 📱 Responsive Design

### **Mobile Experience:**
- Touch-friendly buttons
- Swipe navigation
- Optimized layouts

### **Desktop Experience:**
- Hover effects
- Mouse cursors
- Larger click targets

## 🔄 Real-time Updates

### **Guest Users:**
- Market data updates
- News feed updates
- Cached data management

### **Authenticated Users:**
- Portfolio value updates
- Order status updates
- Real-time market data
- Notification updates

## 🎯 Best Practices

### **For Guest Users:**
- Clear sign-in prompts
- Demo data visibility
- Feature discovery
- Smooth onboarding

### **For Authenticated Users:**
- Quick access to features
- Real-time data
- Secure transactions
- Personalized experience

## 📈 Analytics & Tracking

### **Guest User Analytics:**
- Feature exploration
- Sign-in conversion
- App engagement

### **Authenticated User Analytics:**
- Trading patterns
- Portfolio performance
- Feature usage
- User retention

This comprehensive user state management ensures a smooth experience for both guest and authenticated users while maintaining security and providing appropriate functionality for each user type. 