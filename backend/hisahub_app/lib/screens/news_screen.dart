import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class NewsScreen extends StatelessWidget {
  const NewsScreen({super.key});

  void _showSignInPrompt(BuildContext context, String feature) {
    showDialog(
      context: context,
      builder:
          (context) => AlertDialog(
            title: const Text('Sign In Required'),
            content: Text('Please sign in to $feature.'),
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
        title: const Text('News & Social'),
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
          // Stock & Finance News Section
          const Text(
            'Stock & Finance News',
            style: TextStyle(
              color: Color(0xFFF4C542),
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          Card(
            color: Colors.white10,
            child: ListTile(
              leading: Icon(Icons.trending_up, color: Color(0xFFF4C542)),
              title: const Text(
                'NSE rallies as investors return',
                style: TextStyle(color: Colors.white),
              ),
              subtitle: const Text(
                'Kenya’s stock market saw gains today...',
                style: TextStyle(color: Colors.white70),
              ),
            ),
          ),
          Card(
            color: Colors.white10,
            child: ListTile(
              leading: Icon(Icons.trending_down, color: Color(0xFFF4C542)),
              title: const Text(
                'Banking stocks dip amid new regulations',
                style: TextStyle(color: Colors.white),
              ),
              subtitle: const Text(
                'Several banks saw declines after CMA updates...',
                style: TextStyle(color: Colors.white70),
              ),
            ),
          ),
          const SizedBox(height: 24),
          // Featured Articles Section
          const Text(
            'Featured Articles',
            style: TextStyle(
              color: Color(0xFFF4C542),
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          Card(
            color: Colors.white10,
            child: ListTile(
              leading: Icon(Icons.lightbulb, color: Color(0xFFF4C542)),
              title: const Text(
                '5 Tips for New Investors in Kenya',
                style: TextStyle(color: Colors.white),
              ),
              subtitle: const Text(
                'Start small, diversify, and stay informed...',
                style: TextStyle(color: Colors.white70),
              ),
            ),
          ),
          Card(
            color: Colors.white10,
            child: ListTile(
              leading: Icon(Icons.analytics, color: Color(0xFFF4C542)),
              title: const Text(
                'Understanding the NSE Indices',
                style: TextStyle(color: Colors.white),
              ),
              subtitle: const Text(
                'A guide to the NSE 20 and All Share Index...',
                style: TextStyle(color: Colors.white70),
              ),
            ),
          ),
          const SizedBox(height: 24),
          // Community Social Hub Section
          const Text(
            'Community Social Hub',
            style: TextStyle(
              color: Color(0xFFF4C542),
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          Card(
            color: Colors.white10,
            child: ListTile(
              leading: Icon(Icons.person, color: Color(0xFFF4C542)),
              title: const Text(
                '@hustler_ke',
                style: TextStyle(color: Colors.white),
              ),
              subtitle: const Text(
                'Just made my first trade! #HisaHub',
                style: TextStyle(color: Colors.white70),
              ),
              trailing: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  IconButton(
                    icon: Icon(Icons.thumb_up, color: Colors.white70, size: 20),
                    onPressed: () => _showSignInPrompt(context, 'like posts'),
                    tooltip: 'Like',
                  ),
                  Text('12', style: TextStyle(color: Colors.white70)),
                ],
              ),
            ),
          ),
          Card(
            color: Colors.white10,
            child: ListTile(
              leading: Icon(Icons.person, color: Color(0xFFF4C542)),
              title: const Text(
                '@investor254',
                style: TextStyle(color: Colors.white),
              ),
              subtitle: const Text(
                'What are your thoughts on KCB this week?',
                style: TextStyle(color: Colors.white70),
              ),
              trailing: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  IconButton(
                    icon: Icon(Icons.thumb_up, color: Colors.white70, size: 20),
                    onPressed: () => _showSignInPrompt(context, 'like posts'),
                    tooltip: 'Like',
                  ),
                  Text('7', style: TextStyle(color: Colors.white70)),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),
          // Placeholder for Kenyan imagery
          Container(
            height: 120,
            color: Colors.white10,
            child: const Center(
              child: Text(
                'Kenyan Imagery Placeholder',
                style: TextStyle(color: Colors.white70),
              ),
            ),
          ),
          const SizedBox(height: 24),
          const Text(
            'Build Your Future with Smart Investments!',
            style: TextStyle(
              color: Color(0xFFF4C542),
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}
