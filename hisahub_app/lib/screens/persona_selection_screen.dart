import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../services/background_image_service.dart';

class PersonaSelectionScreen extends StatelessWidget {
  const PersonaSelectionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final personas = [
      {
        'label': 'Student',
        'icon': Icons.school,
        'desc': 'Learn, save, and invest for your future.',
      },
      {
        'label': 'Hustler',
        'icon': Icons.directions_bike,
        'desc': 'Grow your side hustle and investments.',
      },
      {
        'label': 'Corporate',
        'icon': Icons.business_center,
        'desc': 'Manage and grow your wealth smartly.',
      },
      {
        'label': 'Parent',
        'icon': Icons.family_restroom,
        'desc': 'Secure your family’s financial future.',
      },
    ];
    return Scaffold(
      backgroundColor: const Color(0xFF0B1A39),
      appBar: AppBar(
        title: const Text('Select Your Persona'),
        backgroundColor: const Color(0xFF0B1A39),
      ),
      body: Stack(
        children: [
          // Background Image
          BackgroundImageService().buildBackgroundImage(),
          // Content overlay
          Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Text(
                  'Who are you?',
                  style: TextStyle(
                    color: Color(0xFFF4C542),
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 24),
                ...personas.map(
                  (persona) => Card(
                    color: Colors.white10,
                    child: ListTile(
                      leading: Icon(
                        persona['icon'] as IconData,
                        color: Color(0xFFF4C542),
                        size: 40,
                      ),
                      title: Text(
                        persona['label'] as String,
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      subtitle: Text(
                        persona['desc'] as String,
                        style: const TextStyle(color: Colors.white70),
                      ),
                      onTap: () {
                        // TODO: Store persona selection
                        context.go('/');
                      },
                      contentPadding: const EdgeInsets.symmetric(
                        vertical: 16,
                        horizontal: 16,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
