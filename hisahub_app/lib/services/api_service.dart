import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  static const String baseUrl =
      'https://api.hisahub.com'; // Replace with your actual API URL
  static const String firebaseProjectId =
      'your-firebase-project-id'; // Replace with your Firebase project ID

  // Singleton pattern
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;
  ApiService._internal();

  // Firebase instances
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  // Get current user
  User? get currentUser => _auth.currentUser;

  // Authentication methods
  Future<UserCredential?> signInWithEmailAndPassword(
    String email,
    String password,
  ) async {
    try {
      return await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
    } catch (e) {
      print('Sign in error: $e');
      rethrow;
    }
  }

  Future<UserCredential?> createUserWithEmailAndPassword(
    String email,
    String password,
  ) async {
    try {
      return await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
    } catch (e) {
      print('Sign up error: $e');
      rethrow;
    }
  }

  Future<void> signOut() async {
    await _auth.signOut();
  }

  // User profile management
  Future<void> createUserProfile({
    required String userId,
    required String fullName,
    required String phoneNumber,
    required String idNumber,
    String? profileImageUrl,
  }) async {
    try {
      await _firestore.collection('users').doc(userId).set({
        'fullName': fullName,
        'phoneNumber': phoneNumber,
        'idNumber': idNumber,
        'profileImageUrl': profileImageUrl,
        'kycStatus': 'pending',
        'accountStatus': 'active',
        'createdAt': FieldValue.serverTimestamp(),
        'updatedAt': FieldValue.serverTimestamp(),
      });
    } catch (e) {
      print('Create user profile error: $e');
      rethrow;
    }
  }

  Future<Map<String, dynamic>?> getUserProfile(String userId) async {
    try {
      final doc = await _firestore.collection('users').doc(userId).get();
      return doc.data();
    } catch (e) {
      print('Get user profile error: $e');
      rethrow;
    }
  }

  // KYC management
  Future<void> submitKYC({
    required String userId,
    required Map<String, dynamic> kycData,
  }) async {
    try {
      await _firestore.collection('kyc_submissions').doc(userId).set({
        ...kycData,
        'status': 'pending',
        'submittedAt': FieldValue.serverTimestamp(),
        'updatedAt': FieldValue.serverTimestamp(),
      });
    } catch (e) {
      print('Submit KYC error: $e');
      rethrow;
    }
  }

  // Market data
  Future<List<Map<String, dynamic>>> getMarketData() async {
    try {
      // This would typically call an external API for real market data
      // For now, returning mock data
      return [
        {
          'symbol': 'SCOM',
          'name': 'Safaricom PLC',
          'price': 15.50,
          'change': 0.25,
          'changePercent': 1.64,
          'volume': 1250000,
        },
        {
          'symbol': 'EQTY',
          'name': 'Equity Group Holdings',
          'price': 45.20,
          'change': -0.80,
          'changePercent': -1.74,
          'volume': 890000,
        },
        {
          'symbol': 'KCB',
          'name': 'KCB Group',
          'price': 32.10,
          'change': 0.15,
          'changePercent': 0.47,
          'volume': 650000,
        },
      ];
    } catch (e) {
      print('Get market data error: $e');
      rethrow;
    }
  }

  // Portfolio management
  Future<List<Map<String, dynamic>>> getUserPortfolio(String userId) async {
    try {
      final snapshot =
          await _firestore
              .collection('portfolios')
              .doc(userId)
              .collection('holdings')
              .get();

      return snapshot.docs.map((doc) => doc.data()).toList();
    } catch (e) {
      print('Get portfolio error: $e');
      rethrow;
    }
  }

  Future<void> addToPortfolio({
    required String userId,
    required String symbol,
    required int quantity,
    required double price,
  }) async {
    try {
      await _firestore
          .collection('portfolios')
          .doc(userId)
          .collection('holdings')
          .doc(symbol)
          .set({
            'symbol': symbol,
            'quantity': quantity,
            'averagePrice': price,
            'totalValue': quantity * price,
            'addedAt': FieldValue.serverTimestamp(),
            'updatedAt': FieldValue.serverTimestamp(),
          });
    } catch (e) {
      print('Add to portfolio error: $e');
      rethrow;
    }
  }

  // Trading orders
  Future<void> placeOrder({
    required String userId,
    required String symbol,
    required String orderType, // 'buy' or 'sell'
    required int quantity,
    required double price,
  }) async {
    try {
      await _firestore.collection('orders').add({
        'userId': userId,
        'symbol': symbol,
        'orderType': orderType,
        'quantity': quantity,
        'price': price,
        'status': 'pending',
        'totalAmount': quantity * price,
        'createdAt': FieldValue.serverTimestamp(),
        'updatedAt': FieldValue.serverTimestamp(),
      });
    } catch (e) {
      print('Place order error: $e');
      rethrow;
    }
  }

  // News and notifications
  Future<List<Map<String, dynamic>>> getNews() async {
    try {
      // This would typically call a news API
      return [
        {
          'id': '1',
          'title': 'NSE Market Update: Safaricom Leads Gains',
          'summary':
              'Safaricom PLC led the Nairobi Securities Exchange gains today...',
          'publishedAt': DateTime.now().subtract(Duration(hours: 2)),
          'source': 'NSE',
        },
        {
          'id': '2',
          'title': 'New Trading Regulations Announced',
          'summary':
              'The Capital Markets Authority has announced new trading regulations...',
          'publishedAt': DateTime.now().subtract(Duration(hours: 4)),
          'source': 'CMA',
        },
      ];
    } catch (e) {
      print('Get news error: $e');
      rethrow;
    }
  }

  // AI Assistant integration
  Future<String> getAIResponse(String message, String userId) async {
    try {
      // This would typically call an AI service
      // For now, returning a mock response
      return 'Thank you for your message. I\'m here to help you with your trading questions. How can I assist you today?';
    } catch (e) {
      print('AI response error: $e');
      rethrow;
    }
  }

  // M-Pesa integration
  Future<Map<String, dynamic>> initiateMpesaPayment({
    required String phoneNumber,
    required double amount,
    required String reference,
  }) async {
    try {
      // This would call the M-Pesa API
      // For now, returning mock response
      return {
        'status': 'success',
        'transactionId': 'MPESA_${DateTime.now().millisecondsSinceEpoch}',
        'message': 'Payment initiated successfully',
      };
    } catch (e) {
      print('M-Pesa payment error: $e');
      rethrow;
    }
  }

  // Local storage helpers
  Future<void> saveToLocalStorage(String key, String value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(key, value);
  }

  Future<String?> getFromLocalStorage(String key) async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(key);
  }

  Future<void> removeFromLocalStorage(String key) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(key);
  }
}
