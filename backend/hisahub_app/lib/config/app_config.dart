class AppConfig {
  // API Configuration
  static const String apiBaseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'https://api.hisahub.com',
  );

  static const String firebaseProjectId = String.fromEnvironment(
    'FIREBASE_PROJECT_ID',
    defaultValue: 'your-firebase-project-id',
  );

  // Feature flags
  static const bool enableMpesaIntegration = bool.fromEnvironment(
    'ENABLE_MPESA_INTEGRATION',
    defaultValue: true,
  );

  static const bool enableAIAssistant = bool.fromEnvironment(
    'ENABLE_AI_ASSISTANT',
    defaultValue: true,
  );

  static const bool enableRealTimeData = bool.fromEnvironment(
    'ENABLE_REAL_TIME_DATA',
    defaultValue: false,
  );

  // API Endpoints
  static const String marketDataEndpoint = '/api/v1/market-data';
  static const String newsEndpoint = '/api/v1/news';
  static const String kycEndpoint = '/api/v1/kyc';
  static const String mpesaEndpoint = '/api/v1/mpesa';
  static const String aiEndpoint = '/api/v1/ai';

  // Timeouts
  static const Duration apiTimeout = Duration(seconds: 30);
  static const Duration cacheTimeout = Duration(minutes: 5);

  // Pagination
  static const int defaultPageSize = 20;
  static const int maxPageSize = 100;

  // Validation
  static const int minPasswordLength = 8;
  static const int maxPhoneNumberLength = 15;
  static const int maxIdNumberLength = 20;

  // Currency
  static const String defaultCurrency = 'KES';
  static const String defaultCurrencySymbol = '₦';

  // Market data refresh intervals
  static const Duration marketDataRefreshInterval = Duration(minutes: 1);
  static const Duration newsRefreshInterval = Duration(minutes: 5);

  // Error messages
  static const String networkErrorMessage =
      'Network error. Please check your connection.';
  static const String serverErrorMessage =
      'Server error. Please try again later.';
  static const String authenticationErrorMessage =
      'Authentication failed. Please check your credentials.';
  static const String validationErrorMessage =
      'Please check your input and try again.';

  // Success messages
  static const String loginSuccessMessage = 'Login successful!';
  static const String registrationSuccessMessage = 'Registration successful!';
  static const String kycSubmissionSuccessMessage =
      'KYC submitted successfully!';
  static const String orderPlacedSuccessMessage = 'Order placed successfully!';
  static const String paymentSuccessMessage = 'Payment successful!';

  // App metadata
  static const String appName = 'HisaHub';
  static const String appVersion = '1.0.0';
  static const String appDescription =
      'Democratize access to the Nairobi Securities Exchange for everyday Kenyans';

  // Contact information
  static const String supportEmail = 'support@hisahub.com';
  static const String supportPhone = '+254700000000';
  static const String websiteUrl = 'https://hisahub.com';

  // Social media
  static const String twitterUrl = 'https://twitter.com/hisahub';
  static const String facebookUrl = 'https://facebook.com/hisahub';
  static const String linkedinUrl = 'https://linkedin.com/company/hisahub';

  // Legal
  static const String privacyPolicyUrl = 'https://hisahub.com/privacy';
  static const String termsOfServiceUrl = 'https://hisahub.com/terms';
  static const String disclaimerUrl = 'https://hisahub.com/disclaimer';

  // Development
  static const bool isDevelopment = bool.fromEnvironment(
    'dart.vm.product',
    defaultValue: false,
  );
  static const bool enableDebugLogging = bool.fromEnvironment(
    'ENABLE_DEBUG_LOGGING',
    defaultValue: true,
  );
}
