import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../services/background_image_service.dart';

class WelcomeScreen extends StatefulWidget {
  const WelcomeScreen({super.key});

  @override
  State<WelcomeScreen> createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen>
    with TickerProviderStateMixin {
  late PageController _pageController;
  late AnimationController _animationController;
  int _currentPage = 0;

  final List<WelcomeSlide> _slides = [
    WelcomeSlide(
      title: 'Welcome to HisaHub',
      subtitle: 'Your Gateway to Kenyan Markets',
      description:
          'Access the Nairobi Securities Exchange and beyond with our intuitive, low-data platform designed for every Kenyan investor.',
      icon: Icons.trending_up,
      color: Color(0xFF2E7D32),
    ),
    WelcomeSlide(
      title: 'Smart Investing',
      subtitle: 'AI-Powered Insights',
      description:
          'Get personalized investment recommendations and market analysis powered by Hisa AI, your personal financial advisor.',
      icon: Icons.psychology,
      color: Color(0xFF1976D2),
    ),
    WelcomeSlide(
      title: 'Low-Data Optimized',
      subtitle: 'Works Everywhere',
      description:
          'Designed for low-end devices and slow connections. Trade confidently even with limited internet access.',
      icon: Icons.signal_cellular_alt,
      color: Color(0xFFFF6F00),
    ),
    WelcomeSlide(
      title: 'Secure & Reliable',
      subtitle: 'Your Money, Our Priority',
      description:
          'Bank-grade security with offline support. Your investments are protected with the highest standards.',
      icon: Icons.security,
      color: Color(0xFFD32F2F),
    ),
  ];

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
  }

  @override
  void dispose() {
    _pageController.dispose();
    _animationController.dispose();
    super.dispose();
  }

  void _nextPage() {
    if (_currentPage < _slides.length - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    } else {
      _goToHome();
    }
  }

  void _goToHome() {
    context.go('/home');
  }

  void _skipToHome() {
    context.go('/home');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Background Image
          Positioned.fill(
            child: Consumer<BackgroundImageService>(
              builder: (context, backgroundService, child) {
                return Container(
                  decoration: BoxDecoration(
                    color: const Color(0xFF0B1A39), // Fallback color
                    image: DecorationImage(
                      image: AssetImage(backgroundService.currentImage),
                      fit: BoxFit.cover,
                      colorFilter: ColorFilter.mode(
                        Colors.black.withOpacity(0.3),
                        BlendMode.darken,
                      ),
                      onError: (exception, stackTrace) {
                        // Fallback to a solid color if image fails to load
                        print('Error loading background image: $exception');
                      },
                    ),
                  ),
                );
              },
            ),
          ),

          // Content
          SafeArea(
            child: Column(
              children: [
                // Skip Button
                Align(
                  alignment: Alignment.topRight,
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: TextButton(
                      onPressed: _skipToHome,
                      child: Text(
                        'Skip',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ),
                ),

                // PageView
                Expanded(
                  child: PageView.builder(
                    controller: _pageController,
                    onPageChanged: (index) {
                      setState(() {
                        _currentPage = index;
                      });
                    },
                    itemCount: _slides.length,
                    itemBuilder: (context, index) {
                      return _buildSlide(_slides[index]);
                    },
                  ),
                ),

                // Bottom Navigation
                _buildBottomNavigation(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSlide(WelcomeSlide slide) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Icon
          Container(
            width: 120,
            height: 120,
            decoration: BoxDecoration(
              color: slide.color.withOpacity(0.2),
              shape: BoxShape.circle,
            ),
            child: Icon(slide.icon, size: 60, color: slide.color),
          ),

          const SizedBox(height: 40),

          // Title
          Text(
            slide.title,
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
            textAlign: TextAlign.center,
          ),

          const SizedBox(height: 8),

          // Subtitle
          Text(
            slide.subtitle,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w500,
              color: slide.color,
            ),
            textAlign: TextAlign.center,
          ),

          const SizedBox(height: 24),

          // Description
          Text(
            slide.description,
            style: TextStyle(
              fontSize: 16,
              color: Colors.white.withOpacity(0.9),
              height: 1.5,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildBottomNavigation() {
    return Container(
      padding: const EdgeInsets.all(32.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // Page Indicators
          Row(
            children: List.generate(
              _slides.length,
              (index) => Container(
                margin: const EdgeInsets.only(right: 8),
                width: 12,
                height: 12,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color:
                      index == _currentPage
                          ? Colors.white
                          : Colors.white.withOpacity(0.3),
                ),
              ),
            ),
          ),

          // Next/Get Started Button
          ElevatedButton(
            onPressed: _nextPage,
            style: ElevatedButton.styleFrom(
              backgroundColor: _slides[_currentPage].color,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(30),
              ),
            ),
            child: Text(
              _currentPage == _slides.length - 1 ? 'Get Started' : 'Next',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
            ),
          ),
        ],
      ),
    );
  }
}

class WelcomeSlide {
  final String title;
  final String subtitle;
  final String description;
  final IconData icon;
  final Color color;

  WelcomeSlide({
    required this.title,
    required this.subtitle,
    required this.description,
    required this.icon,
    required this.color,
  });
}
