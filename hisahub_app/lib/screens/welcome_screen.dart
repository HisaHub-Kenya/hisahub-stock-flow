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
      gradient: LinearGradient(
        colors: [Color(0xFF2E7D32), Color(0xFF4CAF50)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
    ),
    WelcomeSlide(
      title: 'Smart Investing',
      subtitle: 'AI-Powered Insights',
      description:
          'Get personalized investment recommendations and market analysis powered by Hisa AI, your personal financial advisor.',
      icon: Icons.psychology,
      color: Color(0xFF1976D2),
      gradient: LinearGradient(
        colors: [Color(0xFF1976D2), Color(0xFF42A5F5)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
    ),
    WelcomeSlide(
      title: 'Low-Data Optimized',
      subtitle: 'Works Everywhere',
      description:
          'Designed for low-end devices and slow connections. Trade confidently even with limited internet access.',
      icon: Icons.signal_cellular_alt,
      color: Color(0xFFFF6F00),
      gradient: LinearGradient(
        colors: [Color(0xFFFF6F00), Color(0xFFFF9800)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
    ),
    WelcomeSlide(
      title: 'Secure & Reliable',
      subtitle: 'Your Money, Our Priority',
      description:
          'Bank-grade security with offline support. Your investments are protected with the highest standards.',
      icon: Icons.security,
      color: Color(0xFFD32F2F),
      gradient: LinearGradient(
        colors: [Color(0xFFD32F2F), Color(0xFFF44336)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
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
    // Toggle background image on every next
    Provider.of<BackgroundImageService>(context, listen: false).toggleImage();
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
    // Also toggle when skipping to home (for consistency)
    Provider.of<BackgroundImageService>(context, listen: false).toggleImage();
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
                    child: MouseRegion(
                      cursor: SystemMouseCursors.click,
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 200),
                        padding: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 8,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.transparent,
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                            color: Colors.transparent,
                            width: 1,
                          ),
                        ),
                        child: TextButton(
                          onPressed: _skipToHome,
                          style: TextButton.styleFrom(
                            backgroundColor: Colors.transparent,
                            foregroundColor: Colors.white,
                            padding: EdgeInsets.zero,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(20),
                            ),
                          ),
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
    return TweenAnimationBuilder<double>(
      duration: const Duration(milliseconds: 800),
      tween: Tween(begin: 0.0, end: 1.0),
      builder: (context, value, child) {
        return Transform.translate(
          offset: Offset(0, 20 * (1 - value)),
          child: Opacity(
            opacity: value,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 32.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Animated Icon Container
                  TweenAnimationBuilder<double>(
                    duration: const Duration(milliseconds: 1200),
                    tween: Tween(begin: 0.0, end: 1.0),
                    builder: (context, iconValue, child) {
                      return Transform.scale(
                        scale: 0.8 + (0.2 * iconValue),
                        child: Container(
                          width: 140,
                          height: 140,
                          decoration: BoxDecoration(
                            gradient: slide.gradient,
                            shape: BoxShape.circle,
                            boxShadow: [
                              BoxShadow(
                                color: slide.color.withOpacity(0.3),
                                blurRadius: 20,
                                spreadRadius: 5,
                              ),
                            ],
                          ),
                          child: Icon(
                            slide.icon,
                            size: 70,
                            color: Colors.white,
                          ),
                        ),
                      );
                    },
                  ),

                  const SizedBox(height: 40),

                  // Animated Title
                  TweenAnimationBuilder<double>(
                    duration: const Duration(milliseconds: 1000),
                    tween: Tween(begin: 0.0, end: 1.0),
                    builder: (context, titleValue, child) {
                      return Transform.translate(
                        offset: Offset(0, 30 * (1 - titleValue)),
                        child: Opacity(
                          opacity: titleValue,
                          child: Text(
                            slide.title,
                            style: TextStyle(
                              fontSize: 32,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                              shadows: [
                                Shadow(
                                  color: Colors.black.withOpacity(0.3),
                                  offset: Offset(0, 2),
                                  blurRadius: 4,
                                ),
                              ],
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),
                      );
                    },
                  ),

                  const SizedBox(height: 12),

                  // Animated Subtitle
                  TweenAnimationBuilder<double>(
                    duration: const Duration(milliseconds: 1200),
                    tween: Tween(begin: 0.0, end: 1.0),
                    builder: (context, subtitleValue, child) {
                      return Transform.translate(
                        offset: Offset(0, 20 * (1 - subtitleValue)),
                        child: Opacity(
                          opacity: subtitleValue,
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 16,
                              vertical: 8,
                            ),
                            decoration: BoxDecoration(
                              gradient: slide.gradient,
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Text(
                              slide.subtitle,
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.w600,
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ),
                        ),
                      );
                    },
                  ),

                  const SizedBox(height: 32),

                  // Animated Description
                  TweenAnimationBuilder<double>(
                    duration: const Duration(milliseconds: 1400),
                    tween: Tween(begin: 0.0, end: 1.0),
                    builder: (context, descValue, child) {
                      return Transform.translate(
                        offset: Offset(0, 15 * (1 - descValue)),
                        child: Opacity(
                          opacity: descValue,
                          child: Container(
                            padding: const EdgeInsets.all(20),
                            decoration: BoxDecoration(
                              color: Colors.white.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(
                                color: slide.color.withOpacity(0.3),
                                width: 1,
                              ),
                            ),
                            child: Text(
                              slide.description,
                              style: TextStyle(
                                fontSize: 16,
                                color: Colors.white.withOpacity(0.95),
                                height: 1.6,
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildBottomNavigation() {
    return Container(
      padding: const EdgeInsets.all(32.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // Animated Page Indicators
          Row(
            children: List.generate(
              _slides.length,
              (index) => TweenAnimationBuilder<double>(
                duration: const Duration(milliseconds: 300),
                tween: Tween(
                  begin: index == _currentPage ? 0.0 : 1.0,
                  end: index == _currentPage ? 1.0 : 0.0,
                ),
                builder: (context, value, child) {
                  return AnimatedContainer(
                    duration: const Duration(milliseconds: 300),
                    margin: const EdgeInsets.only(right: 8),
                    width: 12 + (8 * value),
                    height: 12 + (8 * value),
                    decoration: BoxDecoration(
                      gradient:
                          index == _currentPage
                              ? _slides[_currentPage].gradient
                              : null,
                      shape: BoxShape.circle,
                      color:
                          index == _currentPage
                              ? null
                              : Colors.white.withOpacity(0.3),
                      boxShadow:
                          index == _currentPage
                              ? [
                                BoxShadow(
                                  color: _slides[_currentPage].color
                                      .withOpacity(0.4),
                                  blurRadius: 8,
                                  spreadRadius: 2,
                                ),
                              ]
                              : null,
                    ),
                  );
                },
              ),
            ),
          ),

          // Animated Next/Get Started Button
          TweenAnimationBuilder<double>(
            duration: const Duration(milliseconds: 500),
            tween: Tween(begin: 0.0, end: 1.0),
            builder: (context, value, child) {
              return Transform.scale(
                scale: 0.9 + (0.1 * value),
                child: Container(
                  decoration: BoxDecoration(
                    gradient: _slides[_currentPage].gradient,
                    borderRadius: BorderRadius.circular(30),
                    boxShadow: [
                      BoxShadow(
                        color: _slides[_currentPage].color.withOpacity(0.4),
                        blurRadius: 15,
                        spreadRadius: 2,
                      ),
                    ],
                  ),
                  child: MouseRegion(
                    cursor: SystemMouseCursors.click,
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      child: ElevatedButton(
                        onPressed: _nextPage,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.transparent,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(
                            horizontal: 32,
                            vertical: 16,
                          ),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30),
                          ),
                          elevation: 0,
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              _currentPage == _slides.length - 1
                                  ? 'Get Started'
                                  : 'Next',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            const SizedBox(width: 8),
                            Icon(
                              _currentPage == _slides.length - 1
                                  ? Icons.rocket_launch
                                  : Icons.arrow_forward,
                              size: 18,
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              );
            },
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
  final LinearGradient gradient;

  WelcomeSlide({
    required this.title,
    required this.subtitle,
    required this.description,
    required this.icon,
    required this.color,
    required this.gradient,
  });
}
