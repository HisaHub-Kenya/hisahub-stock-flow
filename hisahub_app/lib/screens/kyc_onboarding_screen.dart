import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../services/background_image_service.dart';

class KYCOnboardingScreen extends StatelessWidget {
  const KYCOnboardingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0B1A39),
      appBar: AppBar(
        title: const Text('KYC Onboarding'),
        backgroundColor: const Color(0xFF0B1A39),
      ),
      body: Stack(
        children: [
          // Background Image
          BackgroundImageService().buildBackgroundImage(),
          // Content overlay
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const LinearProgressIndicator(
                    value: 0.33,
                    color: Color(0xFFF4C542),
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    'Step 1: Upload ID',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () {},
                    style: ElevatedButton.styleFrom(
                      minimumSize: Size.fromHeight(48),
                    ),
                    child: const Text('Upload ID'),
                  ),
                  const SizedBox(height: 32),
                  const Text(
                    'Step 2: Take a Selfie',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () {},
                    style: ElevatedButton.styleFrom(
                      minimumSize: Size.fromHeight(48),
                    ),
                    child: const Text('Take Selfie'),
                  ),
                  const SizedBox(height: 32),
                  const Text(
                    'Step 3: Personal Info',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () {},
                    style: ElevatedButton.styleFrom(
                      minimumSize: Size.fromHeight(48),
                    ),
                    child: const Text('Enter Info'),
                  ),
                  const Spacer(),
                  ElevatedButton(
                    onPressed: () {
                      context.go('/persona');
                    },
                    style: ElevatedButton.styleFrom(
                      minimumSize: const Size.fromHeight(48),
                      backgroundColor: const Color(0xFFF4C542),
                      foregroundColor: const Color(0xFF0B1A39),
                    ),
                    child: const Text('Continue'),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
