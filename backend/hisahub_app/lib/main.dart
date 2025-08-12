import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'screens/splash_screen.dart';
import 'screens/login_screen.dart';
import 'screens/kyc_onboarding_screen.dart';
import 'screens/persona_selection_screen.dart';
import 'screens/home_screen.dart';
import 'screens/trade_screen.dart';
import 'screens/portfolio_screen.dart';
import 'screens/news_screen.dart';
import 'screens/profile_screen.dart';
import 'screens/welcome_screen.dart';
import 'screens/broker_dashboard_screen.dart';
import 'screens/broker_clients_screen.dart';
import 'screens/broker_kyc_screen.dart';
import 'screens/broker_trades_screen.dart';
import 'screens/broker_compliance_screen.dart';
import 'screens/broker_payments_screen.dart';
import 'screens/broker_profile_screen.dart';
import 'screens/signup_screen.dart';
import 'screens/broker_login_screen.dart';
import 'screens/broker_signup_screen.dart';
import 'widgets/hisa_ai_assistant_modal.dart';
import 'services/background_image_service.dart';
import 'services/app_state_service.dart';
import 'theme/theme_provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'screens/stock_detail_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Firebase
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  runApp(const HisaHubApp());
}

class HisaHubApp extends StatelessWidget {
  const HisaHubApp({super.key});

  Future<String> _getInitialRoute() async {
    final prefs = await SharedPreferences.getInstance();
    final hasSeenWelcome = prefs.getBool('hasSeenWelcome') ?? false;
    return hasSeenWelcome ? '/login' : '/welcome';
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<String>(
      future: _getInitialRoute(),
      builder: (context, snapshot) {
        if (!snapshot.hasData) {
          return const MaterialApp(
            home: Scaffold(body: Center(child: CircularProgressIndicator())),
          );
        }
        return MultiProvider(
          providers: [
            ChangeNotifierProvider(
              create: (context) => BackgroundImageService(),
            ),
            ChangeNotifierProvider(create: (context) => AppStateService()),
            ChangeNotifierProvider(create: (context) => ThemeProvider()),
          ],
          child: Consumer<ThemeProvider>(
            builder: (context, themeProvider, child) {
              return MaterialApp.router(
                title: 'HisaHub',
                theme: themeProvider.currentTheme,
                routerConfig: _router,
                debugShowCheckedModeBanner: false,
              );
            },
          ),
        );
      },
    );
  }
}

final GoRouter _router = GoRouter(
  initialLocation: '/welcome',
  routes: [
    GoRoute(
      path: '/welcome',
      name: 'welcome',
      builder: (context, state) => const WelcomeScreen(),
    ),
    GoRoute(
      path: '/splash',
      name: 'splash',
      builder: (context, state) => const SplashScreen(),
    ),
    GoRoute(
      path: '/login',
      name: 'login',
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: '/signup',
      name: 'signup',
      builder: (context, state) => const SignupScreen(),
    ),
    GoRoute(
      path: '/kyc',
      name: 'kyc',
      builder: (context, state) => const KYCOnboardingScreen(),
    ),
    GoRoute(
      path: '/persona',
      name: 'persona',
      builder: (context, state) => const PersonaSelectionScreen(),
    ),
    GoRoute(
      path: '/home',
      name: 'home',
      builder: (context, state) => const MainScaffold(),
      routes: [
        GoRoute(
          path: 'trade',
          name: 'trade',
          builder: (context, state) => const TradeScreen(),
        ),
      ],
    ),
    GoRoute(
      path: '/stock/:symbol',
      name: 'stock-detail',
      builder:
          (context, state) =>
              StockDetailScreen(symbol: state.pathParameters['symbol'] ?? ''),
    ),
    GoRoute(
      path: '/broker-dashboard',
      builder: (context, state) => const BrokerDashboardScreen(),
    ),
    GoRoute(
      path: '/broker-dashboard/clients',
      builder: (context, state) => const BrokerClientsScreen(),
    ),
    GoRoute(
      path: '/broker-dashboard/kyc',
      builder: (context, state) => const BrokerKycScreen(),
    ),
    GoRoute(
      path: '/broker-dashboard/trades',
      builder: (context, state) => const BrokerTradesScreen(),
    ),
    GoRoute(
      path: '/broker-dashboard/compliance',
      builder: (context, state) => const BrokerComplianceScreen(),
    ),
    GoRoute(
      path: '/broker-dashboard/payments',
      builder: (context, state) => const BrokerPaymentsScreen(),
    ),
    GoRoute(
      path: '/broker-dashboard/profile',
      builder: (context, state) => const BrokerProfileScreen(),
    ),
    GoRoute(
      path: '/broker-login',
      name: 'broker-login',
      builder: (context, state) => const BrokerLoginScreen(),
    ),
    GoRoute(
      path: '/broker-signup',
      name: 'broker-signup',
      builder: (context, state) => const BrokerSignupScreen(),
    ),
  ],
  redirect: (context, state) {
    // Get the app state service
    final appState = Provider.of<AppStateService>(context, listen: false);

    // Allow access to welcome, splash, login, kyc, and persona screens
    if (state.matchedLocation == '/welcome' ||
        state.matchedLocation == '/splash' ||
        state.matchedLocation == '/login' ||
        state.matchedLocation == '/kyc' ||
        state.matchedLocation == '/persona') {
      return null;
    }

    // For protected routes, check authentication
    if (state.matchedLocation.startsWith('/home')) {
      // Allow access to home screen for both guest and authenticated users
      // Individual screens will handle their own authentication requirements
      return null;
    }

    return null;
  },
);

class MainScaffold extends StatefulWidget {
  const MainScaffold({super.key});

  @override
  State<MainScaffold> createState() => _MainScaffoldState();
}

class _MainScaffoldState extends State<MainScaffold> {
  int _selectedIndex = 0;
  final List<Widget> _screens = const [
    HomeScreen(),
    TradeScreen(),
    PortfolioScreen(),
    NewsScreen(),
    ProfileScreen(),
  ];

  double _fontScale = 1.0;
  bool _highContrast = false;
  bool _dyslexiaMode = false;

  void _onTabTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  void _showHisaAIAssistant() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) => const HisaAIAssistantModal(),
    );
  }

  void _showAccessibilityModal() {
    showModalBottomSheet(
      context: context,
      backgroundColor: const Color(0xFF0B1A39),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text(
                'Accessibility & Personalization',
                style: TextStyle(
                  color: Color(0xFFF4C542),
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                ),
              ),
              const SizedBox(height: 20),
              Row(
                children: [
                  const Icon(Icons.text_fields, color: Colors.white70),
                  const SizedBox(width: 12),
                  const Text(
                    'Font Size',
                    style: TextStyle(color: Colors.white),
                  ),
                  Expanded(
                    child: Slider(
                      value: _fontScale,
                      min: 0.8,
                      max: 1.4,
                      divisions: 6,
                      label: '${(_fontScale * 100).toInt()}%',
                      onChanged: (val) => setState(() => _fontScale = val),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  const Icon(Icons.contrast, color: Colors.white70),
                  const SizedBox(width: 12),
                  const Text(
                    'High Contrast',
                    style: TextStyle(color: Colors.white),
                  ),
                  const Spacer(),
                  Switch(
                    value: _highContrast,
                    onChanged: (val) => setState(() => _highContrast = val),
                    activeColor: const Color(0xFFF4C542),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  const Icon(Icons.font_download, color: Colors.white70),
                  const SizedBox(width: 12),
                  const Text(
                    'Dyslexia-Friendly Font',
                    style: TextStyle(color: Colors.white),
                  ),
                  const Spacer(),
                  Switch(
                    value: _dyslexiaMode,
                    onChanged: (val) => setState(() => _dyslexiaMode = val),
                    activeColor: const Color(0xFFF4C542),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  const Icon(Icons.brightness_6, color: Colors.white70),
                  const SizedBox(width: 12),
                  const Text('Theme', style: TextStyle(color: Colors.white)),
                  const Spacer(),
                  Consumer<ThemeProvider>(
                    builder: (context, themeProvider, child) {
                      return IconButton(
                        icon: Icon(
                          themeProvider.isDarkMode
                              ? Icons.wb_sunny
                              : Icons.nightlight_round,
                          color: const Color(0xFFF4C542),
                        ),
                        onPressed: () => themeProvider.toggleTheme(),
                        tooltip: 'Toggle Theme',
                      );
                    },
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AppStateService>(
      builder: (context, appState, child) {
        return Scaffold(
          body: Stack(
            children: [
              if (appState.isOffline)
                Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  child: Container(
                    color: Colors.red,
                    padding: const EdgeInsets.symmetric(vertical: 4),
                    child: const Center(
                      child: Text(
                        'Offline Mode',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                ),
              _screens[_selectedIndex],
              // Accessibility FAB only on Profile page
              if (_selectedIndex == 4)
                Positioned(
                  left: 16,
                  bottom: 80, // above bottom nav bar
                  child: FloatingActionButton(
                    heroTag: 'accessibility_fab',
                    onPressed: _showAccessibilityModal,
                    backgroundColor: const Color(0xFFF4C542),
                    child: const Icon(
                      Icons.accessibility_new,
                      color: Color(0xFF0B1A39),
                    ),
                    tooltip: 'Accessibility & Personalization',
                  ),
                ),
              // AI Assistant FAB (bottom right, above nav bar)
              Positioned(
                right: 16,
                bottom: 80, // above bottom nav bar
                child: MouseRegion(
                  cursor: SystemMouseCursors.click,
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFFF4C542), Color(0xFFFFD54F)],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFFF4C542).withOpacity(0.4),
                          blurRadius: 15,
                          spreadRadius: 2,
                        ),
                      ],
                    ),
                    child: FloatingActionButton(
                      heroTag: 'ai_fab',
                      onPressed:
                          appState.isAuthenticated
                              ? _showHisaAIAssistant
                              : () {
                                // Show sign-in prompt for AI assistant
                                showDialog(
                                  context: context,
                                  builder:
                                      (context) => AlertDialog(
                                        title: const Text('Sign In Required'),
                                        content: const Text(
                                          'Please sign in to access the AI assistant.',
                                        ),
                                        actions: [
                                          TextButton(
                                            onPressed:
                                                () => Navigator.pop(context),
                                            child: const Text('Cancel'),
                                          ),
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
                              },
                      tooltip: 'Hisa AI Assistant',
                      backgroundColor: Colors.transparent,
                      elevation: 0,
                      child: const Icon(
                        Icons.psychology_rounded,
                        color: Color(0xFF0B1A39),
                        size: 28,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
          bottomNavigationBar: Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  const Color(0xFF0B1A39),
                  const Color(0xFF0B1A39).withOpacity(0.95),
                ],
              ),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.3),
                  blurRadius: 10,
                  offset: const Offset(0, -2),
                ),
              ],
            ),
            child: BottomNavigationBar(
              backgroundColor: Colors.transparent,
              selectedItemColor: const Color(0xFFF4C542),
              unselectedItemColor: Colors.white.withOpacity(0.7),
              currentIndex: _selectedIndex,
              onTap: _onTabTapped,
              type: BottomNavigationBarType.fixed,
              elevation: 0,
              selectedFontSize: 12,
              unselectedFontSize: 11,
              items: [
                BottomNavigationBarItem(
                  icon: MouseRegion(
                    cursor: SystemMouseCursors.click,
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color:
                            _selectedIndex == 0
                                ? const Color(0xFFF4C542).withOpacity(0.2)
                                : Colors.transparent,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: Colors.transparent, width: 1),
                      ),
                      child: Icon(
                        Icons.home_rounded,
                        size: _selectedIndex == 0 ? 26 : 24,
                      ),
                    ),
                  ),
                  label: 'Home',
                ),
                BottomNavigationBarItem(
                  icon: MouseRegion(
                    cursor: SystemMouseCursors.click,
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color:
                            _selectedIndex == 1
                                ? const Color(0xFFF4C542).withOpacity(0.2)
                                : Colors.transparent,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: Colors.transparent, width: 1),
                      ),
                      child: Icon(
                        Icons.trending_up_rounded,
                        size: _selectedIndex == 1 ? 26 : 24,
                      ),
                    ),
                  ),
                  label: 'Trade',
                ),
                BottomNavigationBarItem(
                  icon: MouseRegion(
                    cursor: SystemMouseCursors.click,
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color:
                            _selectedIndex == 2
                                ? const Color(0xFFF4C542).withOpacity(0.2)
                                : Colors.transparent,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: Colors.transparent, width: 1),
                      ),
                      child: Icon(
                        Icons.pie_chart_rounded,
                        size: _selectedIndex == 2 ? 26 : 24,
                      ),
                    ),
                  ),
                  label: 'Portfolio',
                ),
                BottomNavigationBarItem(
                  icon: MouseRegion(
                    cursor: SystemMouseCursors.click,
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color:
                            _selectedIndex == 3
                                ? const Color(0xFFF4C542).withOpacity(0.2)
                                : Colors.transparent,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: Colors.transparent, width: 1),
                      ),
                      child: Icon(
                        Icons.article_rounded,
                        size: _selectedIndex == 3 ? 26 : 24,
                      ),
                    ),
                  ),
                  label: 'News',
                ),
                BottomNavigationBarItem(
                  icon: MouseRegion(
                    cursor: SystemMouseCursors.click,
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color:
                            _selectedIndex == 4
                                ? const Color(0xFFF4C542).withOpacity(0.2)
                                : Colors.transparent,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: Colors.transparent, width: 1),
                      ),
                      child: Icon(
                        Icons.person_rounded,
                        size: _selectedIndex == 4 ? 26 : 24,
                      ),
                    ),
                  ),
                  label: 'Profile',
                ),
              ],
            ),
          ),
          floatingActionButton: null,
          floatingActionButtonLocation: null,
        );
      },
    );
  }
}
