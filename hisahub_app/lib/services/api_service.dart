import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'package:pdf/widgets.dart' as pw;

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

  // Phone number authentication
  Future<void> verifyPhoneNumber({
    required String phoneNumber,
    required Function(String) onCodeSent,
    required Function(UserCredential) onVerificationCompleted,
    required Function(String) onVerificationFailed,
  }) async {
    try {
      await _auth.verifyPhoneNumber(
        phoneNumber: phoneNumber,
        verificationCompleted: (PhoneAuthCredential credential) {
          _auth
              .signInWithCredential(credential)
              .then((userCredential) {
                onVerificationCompleted(userCredential);
              })
              .catchError((e) {
                onVerificationFailed(e.toString());
              });
        },
        verificationFailed:
            (FirebaseAuthException e) =>
                onVerificationFailed(e.message ?? 'Verification failed'),
        codeSent:
            (String verificationId, int? resendToken) =>
                onCodeSent(verificationId),
        codeAutoRetrievalTimeout: (String verificationId) {},
      );
    } catch (e) {
      print('Phone verification error: $e');
      rethrow;
    }
  }

  Future<UserCredential?> signInWithCredential(
    PhoneAuthCredential credential,
  ) async {
    try {
      return await _auth.signInWithCredential(credential);
    } catch (e) {
      print('Sign in with credential error: $e');
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
    String? persona, // Student, Hustler, Corporate, Parent
  }) async {
    try {
      await _firestore.collection('users').doc(userId).set({
        'fullName': fullName,
        'phoneNumber': phoneNumber,
        'idNumber': idNumber,
        'profileImageUrl': profileImageUrl,
        'persona': persona,
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
    String? orderMode, // 'market', 'limit', 'stop'
  }) async {
    try {
      await _firestore.collection('orders').add({
        'userId': userId,
        'symbol': symbol,
        'orderType': orderType,
        'orderMode': orderMode ?? 'market',
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
    String? accountType, // 'deposit' or 'withdrawal'
  }) async {
    try {
      // This would call the M-Pesa API
      // For now, returning mock response
      return {
        'status': 'success',
        'transactionId': 'MPESA_${DateTime.now().millisecondsSinceEpoch}',
        'message': 'Payment initiated successfully',
        'amount': amount,
        'phoneNumber': phoneNumber,
        'reference': reference,
      };
    } catch (e) {
      print('M-Pesa payment error: $e');
      rethrow;
    }
  }

  // Portfolio export to PDF
  Future<String> exportPortfolioToPDF(String userId) async {
    try {
      final portfolio = await getUserPortfolio(userId);
      final userProfile = await getUserProfile(userId);

      final pdf = pw.Document();

      pdf.addPage(
        pw.Page(
          build: (pw.Context context) {
            return pw.Column(
              crossAxisAlignment: pw.CrossAxisAlignment.start,
              children: [
                pw.Header(level: 0, child: pw.Text('HisaHub Portfolio Report')),
                pw.SizedBox(height: 20),
                pw.Text('Generated on: ${DateTime.now().toString()}'),
                pw.SizedBox(height: 20),
                pw.Text('Portfolio Holdings:'),
                pw.SizedBox(height: 10),
                ...portfolio.map(
                  (holding) => pw.Padding(
                    padding: pw.EdgeInsets.all(8),
                    child: pw.Text(
                      '${holding['symbol']}: ${holding['quantity']} shares @ ${holding['averagePrice']}',
                    ),
                  ),
                ),
              ],
            );
          },
        ),
      );

      final directory = await getApplicationDocumentsDirectory();
      final file = File(
        '${directory.path}/portfolio_${DateTime.now().millisecondsSinceEpoch}.pdf',
      );
      await file.writeAsBytes(await pdf.save());

      return file.path;
    } catch (e) {
      print('Export portfolio error: $e');
      rethrow;
    }
  }

  // Offline caching
  Future<void> cacheData(String key, Map<String, dynamic> data) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(key, jsonEncode(data));
    } catch (e) {
      print('Cache data error: $e');
    }
  }

  Future<Map<String, dynamic>?> getCachedData(String key) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final data = prefs.getString(key);
      if (data != null) {
        return jsonDecode(data) as Map<String, dynamic>;
      }
      return null;
    } catch (e) {
      print('Get cached data error: $e');
      return null;
    }
  }

  // Security features
  Future<void> logSecurityEvent({
    required String userId,
    required String event,
    required String details,
  }) async {
    try {
      await _firestore.collection('security_logs').add({
        'userId': userId,
        'event': event,
        'details': details,
        'timestamp': FieldValue.serverTimestamp(),
        'ipAddress': 'unknown', // Would be captured in production
        'userAgent': 'unknown', // Would be captured in production
      });
    } catch (e) {
      print('Log security event error: $e');
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
