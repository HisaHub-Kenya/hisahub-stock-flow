import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_analytics/firebase_analytics.dart';
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
import 'widgets/hisa_ai_assistant_modal.dart';
import 'services/background_image_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Firebase
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

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
      floatingActionButton: MouseRegion(
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
            onPressed: _showHisaAIAssistant,
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
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }
}
