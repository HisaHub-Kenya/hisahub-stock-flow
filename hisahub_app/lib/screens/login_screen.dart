import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../services/background_image_service.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool isBroker = false;
  bool isBrokerSignup = false;

  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController licenseController = TextEditingController();

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final state = GoRouterState.of(context);
    final brokerParam = state.uri.queryParameters['broker'];
    if (brokerParam == '1' && !isBroker) {
      setState(() {
        isBroker = true;
        isBrokerSignup = false;
      });
    }
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
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Toggle for User/Broker
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      ChoiceChip(
                        label: const Text('User'),
                        selected: !isBroker,
                        onSelected: (selected) {
                          setState(() {
                            isBroker = false;
                            isBrokerSignup = false;
                          });
                        },
                      ),
                      const SizedBox(width: 12),
                      ChoiceChip(
                        label: const Text('Broker'),
                        selected: isBroker,
                        onSelected: (selected) {
                          setState(() {
                            isBroker = true;
                            isBrokerSignup = false;
                          });
                        },
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                  Text(
                    isBroker
                        ? (isBrokerSignup ? 'Broker Signup' : 'Broker Login')
                        : 'Welcome to HisaHub',
                    style: const TextStyle(
                      color: Color(0xFFF4C542),
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 32),
                  TextField(
                    controller: emailController,
                    decoration: InputDecoration(
                      labelText: 'Email or Phone',
                      labelStyle: const TextStyle(color: Colors.white),
                      filled: true,
                      fillColor: Colors.white10,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    style: const TextStyle(color: Colors.white),
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    controller: passwordController,
                    obscureText: true,
                    decoration: InputDecoration(
                      labelText: 'Password / OTP',
                      labelStyle: const TextStyle(color: Colors.white),
                      filled: true,
                      fillColor: Colors.white10,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    style: const TextStyle(color: Colors.white),
                  ),
                  if (isBroker && isBrokerSignup) ...[
                    const SizedBox(height: 16),
                    TextField(
                      controller: licenseController,
                      decoration: InputDecoration(
                        labelText: 'License Number',
                        labelStyle: const TextStyle(color: Colors.white),
                        filled: true,
                        fillColor: Colors.white10,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      style: const TextStyle(color: Colors.white),
                    ),
                  ],
                  const SizedBox(height: 16),
                  MouseRegion(
                    cursor: SystemMouseCursors.click,
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      child: ElevatedButton(
                        onPressed: () {
                          // TODO: Add login/signup logic for user/broker
                        },
                        style: ElevatedButton.styleFrom(
                          minimumSize: const Size.fromHeight(48),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                        ),
                        child: Text(
                          isBroker
                              ? (isBrokerSignup
                                  ? 'Broker Signup'
                                  : 'Broker Login')
                              : 'Login / Register',
                        ),
                      ),
                    ),
                  ),
                  if (!isBroker) ...[
                    const SizedBox(height: 16),
                    MouseRegion(
                      cursor: SystemMouseCursors.click,
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 200),
                        child: ElevatedButton.icon(
                          onPressed: () {},
                          icon: const Icon(Icons.mobile_friendly),
                          label: const Text('Login with M-Pesa'),
                          style: ElevatedButton.styleFrom(
                            minimumSize: const Size.fromHeight(48),
                            backgroundColor: Colors.green,
                            foregroundColor: Colors.white,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                  const SizedBox(height: 24),
                  if (!isBroker) ...[
                    MouseRegion(
                      cursor: SystemMouseCursors.click,
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 200),
                        child: ElevatedButton(
                          onPressed: () {
                            context.go('/kyc');
                          },
                          style: ElevatedButton.styleFrom(
                            minimumSize: const Size.fromHeight(48),
                            backgroundColor: const Color(0xFFF4C542),
                            foregroundColor: const Color(0xFF0B1A39),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                          child: const Text('Start KYC Onboarding'),
                        ),
                      ),
                    ),
                  ],
                  if (isBroker) ...[
                    const SizedBox(height: 16),
                    GestureDetector(
                      onTap: () {
                        setState(() {
                          isBrokerSignup = !isBrokerSignup;
                        });
                      },
                      child: Text(
                        isBrokerSignup
                            ? 'Already have an account? Broker Login'
                            : 'New broker? Broker Signup',
                        style: const TextStyle(
                          color: Colors.blueAccent,
                          decoration: TextDecoration.underline,
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
