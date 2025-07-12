import 'package:flutter/material.dart';

class HisaAIAssistantModal extends StatelessWidget {
  const HisaAIAssistantModal({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Text(
            'Hisa AI Assistant',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 20,
              color: Color(0xFF0B1A39),
            ),
          ),
          const SizedBox(height: 16),
          const TextField(
            decoration: InputDecoration(
              hintText: 'Ask a question... (English)',
              border: OutlineInputBorder(),
              filled: true,
              fillColor: Colors.white,
            ),
            style: TextStyle(color: Color(0xFF0B1A39)),
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: null, // Static stub
            style: ElevatedButton.styleFrom(
              minimumSize: Size.fromHeight(48),
              backgroundColor: Color(0xFFF4C542),
              foregroundColor: Color(0xFF0B1A39),
            ),
            child: const Text('Get Guidance'),
          ),
          const SizedBox(height: 16),
          const Text(
            'Try: "How do I buy shares?" or "What is a portfolio?"',
            style: TextStyle(color: Color(0xFF0B1A39)),
          ),
        ],
      ),
    );
  }
}
