import 'package:flutter/material.dart';
import 'dart:async';
import 'package:go_router/go_router.dart';
import '../services/background_image_service.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Timer(const Duration(seconds: 2), () {
      if (mounted) {
        context.go('/');
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0B1A39),
      body: Stack(
        children: [
          // Background Image
          BackgroundImageService().buildBackgroundImage(),
          // Content overlay
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Placeholder for HisaHub logo
                Icon(Icons.account_balance, size: 80, color: Color(0xFFF4C542)),
                const SizedBox(height: 24),
                const Text(
                  'HisaHub',
                  style: TextStyle(
                    color: Color(0xFFF4C542),
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 2,
                  ),
                ),
                const SizedBox(height: 32),
                const CircularProgressIndicator(color: Color(0xFFF4C542)),
                const SizedBox(height: 24),
                const Text(
                  'Build Your Future with Smart Investments!',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
