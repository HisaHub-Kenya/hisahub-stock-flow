import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  void _showSignInPrompt(BuildContext context, String feature) {
    showDialog(
      context: context,
      builder:
          (context) => AlertDialog(
            title: const Text('Sign In Required'),
            content: Text('Please sign in to access $feature.'),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
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
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0B1A39),
      appBar: AppBar(
        title: const Text('Profile'),
        backgroundColor: const Color(0xFF0B1A39),
        actions: [
          IconButton(
            icon: const Icon(Icons.login),
            onPressed: () => context.go('/login'),
            tooltip: 'Sign In',
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Guest mode notice
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: const Color(0xFFF4C542).withValues(alpha: 0.2),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: const Color(0xFFF4C542)),
            ),
            child: const Row(
              children: [
                Icon(Icons.info_outline, color: Color(0xFFF4C542)),
                SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Guest Mode - Sign in to access your profile',
                    style: TextStyle(
                      color: Color(0xFFF4C542),
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          Row(
            children: [
              const CircleAvatar(
                radius: 32,
                backgroundColor: Color(0xFFF4C542),
                child: Icon(Icons.person, color: Color(0xFF0B1A39), size: 32),
              ),
              const SizedBox(width: 16),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: const [
                      Text(
                        'Guest User',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 20,
                        ),
                      ),
                      SizedBox(width: 8),
                      Icon(
                        Icons.person_outline,
                        color: Colors.white70,
                        size: 20,
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: const [
                      Icon(Icons.info_outline, color: Colors.white70, size: 16),
                      SizedBox(width: 4),
                      Text(
                        'Guest Mode',
                        style: TextStyle(color: Colors.white70),
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 24),
          ListTile(
            leading: const Icon(Icons.settings, color: Color(0xFFF4C542)),
            title: const Text(
              'Settings',
              style: TextStyle(color: Colors.white),
            ),
            onTap: () => _showSignInPrompt(context, 'settings'),
          ),
          ListTile(
            leading: const Icon(Icons.tune, color: Color(0xFFF4C542)),
            title: const Text(
              'Preferences',
              style: TextStyle(color: Colors.white),
            ),
            onTap: () => _showSignInPrompt(context, 'preferences'),
          ),
          ListTile(
            leading: const Icon(Icons.picture_as_pdf, color: Color(0xFFF4C542)),
            title: const Text(
              'Export Portfolio (PDF)',
              style: TextStyle(color: Colors.white),
            ),
            onTap: () => _showSignInPrompt(context, 'export portfolio'),
          ),
          const SizedBox(height: 24),
          const Text(
            'KYC Status: ',
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          ),
          Row(
            children: const [
              Icon(Icons.person_outline, color: Colors.white70),
              SizedBox(width: 8),
              Text(
                'Not Available (Guest Mode)',
                style: TextStyle(color: Colors.white70),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
