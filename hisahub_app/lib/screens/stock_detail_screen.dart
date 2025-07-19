import 'package:flutter/material.dart';

class StockDetailScreen extends StatelessWidget {
  final String symbol;
  const StockDetailScreen({super.key, required this.symbol});

  @override
  Widget build(BuildContext context) {
    // Placeholder: In a real app, fetch stock/company details using the symbol
    return Scaffold(
      appBar: AppBar(
        title: Text('Stock Details: $symbol'),
        backgroundColor: const Color(0xFF0B1A39),
      ),
      backgroundColor: const Color(0xFF0B1A39),
      body: Center(
        child: Card(
          color: Colors.white10,
          margin: const EdgeInsets.all(24),
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Symbol: $symbol',
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 16),
                const Text(
                  'Company details, price history, news, and more will appear here.',
                  style: TextStyle(color: Colors.white70),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
