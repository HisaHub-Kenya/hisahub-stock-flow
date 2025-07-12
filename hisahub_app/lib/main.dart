import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
// import 'package:firebase_core/firebase_core.dart';
// import 'package:firebase_auth/firebase_auth.dart';
// import 'package:cloud_firestore/cloud_firestore.dart';
// import 'package:firebase_analytics/firebase_analytics.dart';
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
import 'widgets/hisa_ai_assistant_modal.dart';
import 'services/background_image_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Firebase (equivalent to Firebase.initializeApp() in JS)
  // await Firebase.initializeApp();

  runApp(const HisaHubApp());
}

class HisaHubApp extends StatelessWidget {
  const HisaHubApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => BackgroundImageService(),
      child: MaterialApp.router(
        title: 'HisaHub',
        theme: ThemeData(
          primaryColor: const Color(0xFF0B1A39),
          colorScheme: ColorScheme.fromSeed(
            seedColor: const Color(0xFF0B1A39),
            primary: const Color(0xFF0B1A39),
            secondary: const Color(0xFFF4C542),
          ),
          fontFamily: 'Roboto', // Inter can be added via pubspec
          scaffoldBackgroundColor: const Color(0xFF0B1A39),
          textTheme: const TextTheme(
            bodyLarge: TextStyle(color: Colors.white),
            bodyMedium: TextStyle(color: Colors.white),
            bodySmall: TextStyle(color: Colors.white),
          ),
          elevatedButtonTheme: ElevatedButtonThemeData(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFFF4C542),
              foregroundColor: const Color(0xFF0B1A39),
              minimumSize: const Size(48, 48),
              textStyle: const TextStyle(fontWeight: FontWeight.bold),
            ),
          ),
          floatingActionButtonTheme: const FloatingActionButtonThemeData(
            backgroundColor: Color(0xFFF4C542),
            foregroundColor: Color(0xFF0B1A39),
          ),
          appBarTheme: const AppBarTheme(
            backgroundColor: Color(0xFF0B1A39),
            foregroundColor: Colors.white,
          ),
        ),
        routerConfig: _router,
        debugShowCheckedModeBanner: false,
      ),
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
  ],
  redirect: (context, state) {
    // Allow access to main screens without authentication
    // Only redirect to login for specific protected actions
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // TODO: Implement connectivity logic and show/hide this banner
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
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: const Color(0xFF0B1A39),
        selectedItemColor: const Color(0xFFF4C542),
        unselectedItemColor: Colors.white,
        currentIndex: _selectedIndex,
        onTap: _onTabTapped,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.swap_horiz), label: 'Trade'),
          BottomNavigationBarItem(
            icon: Icon(Icons.pie_chart),
            label: 'Portfolio',
          ),
          BottomNavigationBarItem(icon: Icon(Icons.article), label: 'News'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _showHisaAIAssistant,
        tooltip: 'Hisa AI Assistant',
        child: const Icon(Icons.smart_toy),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }
}
