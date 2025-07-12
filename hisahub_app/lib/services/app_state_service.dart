import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'api_service.dart';

class AppStateService extends ChangeNotifier {
  final ApiService _apiService = ApiService();

  // User state
  User? _currentUser;
  Map<String, dynamic>? _userProfile;
  bool _isLoading = false;
  String? _error;

  // Market data
  List<Map<String, dynamic>> _marketData = [];
  List<Map<String, dynamic>> _portfolio = [];
  List<Map<String, dynamic>> _news = [];

  // Getters
  User? get currentUser => _currentUser;
  Map<String, dynamic>? get userProfile => _userProfile;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isAuthenticated => _currentUser != null;
  List<Map<String, dynamic>> get marketData => _marketData;
  List<Map<String, dynamic>> get portfolio => _portfolio;
  List<Map<String, dynamic>> get news => _news;

  // Initialize app state
  Future<void> initialize() async {
    _setLoading(true);
    try {
      // Listen to auth state changes
      FirebaseAuth.instance.authStateChanges().listen((User? user) {
        _currentUser = user;
        if (user != null) {
          _loadUserProfile();
        } else {
          _userProfile = null;
        }
        notifyListeners();
      });

      // Load initial data
      await _loadMarketData();
      await _loadNews();

      _setLoading(false);
    } catch (e) {
      _setError(e.toString());
    }
  }

  // Loading state management
  void _setLoading(bool loading) {
    _isLoading = loading;
    _error = null;
    notifyListeners();
  }

  void _setError(String error) {
    _error = error;
    _isLoading = false;
    notifyListeners();
  }

  // Authentication methods
  Future<bool> signIn(String email, String password) async {
    _setLoading(true);
    try {
      await _apiService.signInWithEmailAndPassword(email, password);
      _setLoading(false);
      return true;
    } catch (e) {
      _setError(e.toString());
      return false;
    }
  }

  Future<bool> signUp(String email, String password) async {
    _setLoading(true);
    try {
      await _apiService.createUserWithEmailAndPassword(email, password);
      _setLoading(false);
      return true;
    } catch (e) {
      _setError(e.toString());
      return false;
    }
  }

  Future<void> signOut() async {
    _setLoading(true);
    try {
      await _apiService.signOut();
      _userProfile = null;
      _portfolio = [];
      _setLoading(false);
    } catch (e) {
      _setError(e.toString());
    }
  }

  // User profile methods
  Future<void> _loadUserProfile() async {
    if (_currentUser == null) return;

    try {
      _userProfile = await _apiService.getUserProfile(_currentUser!.uid);
      await _loadPortfolio();
      notifyListeners();
    } catch (e) {
      print('Load user profile error: $e');
    }
  }

  Future<bool> createUserProfile({
    required String fullName,
    required String phoneNumber,
    required String idNumber,
    String? profileImageUrl,
  }) async {
    if (_currentUser == null) return false;

    _setLoading(true);
    try {
      await _apiService.createUserProfile(
        userId: _currentUser!.uid,
        fullName: fullName,
        phoneNumber: phoneNumber,
        idNumber: idNumber,
        profileImageUrl: profileImageUrl,
      );
      await _loadUserProfile();
      _setLoading(false);
      return true;
    } catch (e) {
      _setError(e.toString());
      return false;
    }
  }

  // KYC methods
  Future<bool> submitKYC(Map<String, dynamic> kycData) async {
    if (_currentUser == null) return false;

    _setLoading(true);
    try {
      await _apiService.submitKYC(userId: _currentUser!.uid, kycData: kycData);
      await _loadUserProfile();
      _setLoading(false);
      return true;
    } catch (e) {
      _setError(e.toString());
      return false;
    }
  }

  // Market data methods
  Future<void> _loadMarketData() async {
    try {
      _marketData = await _apiService.getMarketData();
      notifyListeners();
    } catch (e) {
      print('Load market data error: $e');
    }
  }

  Future<void> refreshMarketData() async {
    await _loadMarketData();
  }

  // Portfolio methods
  Future<void> _loadPortfolio() async {
    if (_currentUser == null) return;

    try {
      _portfolio = await _apiService.getUserPortfolio(_currentUser!.uid);
      notifyListeners();
    } catch (e) {
      print('Load portfolio error: $e');
    }
  }

  Future<bool> addToPortfolio({
    required String symbol,
    required int quantity,
    required double price,
  }) async {
    if (_currentUser == null) return false;

    _setLoading(true);
    try {
      await _apiService.addToPortfolio(
        userId: _currentUser!.uid,
        symbol: symbol,
        quantity: quantity,
        price: price,
      );
      await _loadPortfolio();
      _setLoading(false);
      return true;
    } catch (e) {
      _setError(e.toString());
      return false;
    }
  }

  // Trading methods
  Future<bool> placeOrder({
    required String symbol,
    required String orderType,
    required int quantity,
    required double price,
  }) async {
    if (_currentUser == null) return false;

    _setLoading(true);
    try {
      await _apiService.placeOrder(
        userId: _currentUser!.uid,
        symbol: symbol,
        orderType: orderType,
        quantity: quantity,
        price: price,
      );
      _setLoading(false);
      return true;
    } catch (e) {
      _setError(e.toString());
      return false;
    }
  }

  // News methods
  Future<void> _loadNews() async {
    try {
      _news = await _apiService.getNews();
      notifyListeners();
    } catch (e) {
      print('Load news error: $e');
    }
  }

  Future<void> refreshNews() async {
    await _loadNews();
  }

  // AI Assistant methods
  Future<String> getAIResponse(String message) async {
    if (_currentUser == null) return 'Please sign in to use the AI assistant.';

    try {
      return await _apiService.getAIResponse(message, _currentUser!.uid);
    } catch (e) {
      return 'Sorry, I encountered an error. Please try again.';
    }
  }

  // M-Pesa methods
  Future<Map<String, dynamic>> initiateMpesaPayment({
    required String phoneNumber,
    required double amount,
    required String reference,
  }) async {
    try {
      return await _apiService.initiateMpesaPayment(
        phoneNumber: phoneNumber,
        amount: amount,
        reference: reference,
      );
    } catch (e) {
      return {'status': 'error', 'message': e.toString()};
    }
  }

  // Clear error
  void clearError() {
    _error = null;
    notifyListeners();
  }

  // Refresh all data
  Future<void> refreshAllData() async {
    await Future.wait([
      _loadMarketData(),
      _loadNews(),
      if (_currentUser != null) _loadUserProfile(),
    ]);
  }
}
