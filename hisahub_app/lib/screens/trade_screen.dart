import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class TradeScreen extends StatefulWidget {
  const TradeScreen({super.key});

  @override
  State<TradeScreen> createState() => _TradeScreenState();
}

class _TradeScreenState extends State<TradeScreen> {
  String? _selectedStock;
  String _orderType = 'Market';
  int _quantity = 1;

  void _showSignInPrompt() {
    showDialog(
      context: context,
      builder:
          (context) => AlertDialog(
            title: const Text('Sign In Required'),
            content: const Text(
              'Please sign in to place trades and manage your portfolio.',
            ),
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

  void _showConfirmation() {
    _showSignInPrompt();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0B1A39),
      appBar: AppBar(
        title: const Text('Trade'),
        backgroundColor: const Color(0xFF0B1A39),
        actions: [
          IconButton(
            icon: const Icon(Icons.login),
            onPressed: () => context.go('/login'),
            tooltip: 'Sign In',
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
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
                      'Demo Mode - Sign in to place real trades',
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
            DropdownButtonFormField<String>(
              value: _selectedStock,
              items: const [
                DropdownMenuItem(
                  value: 'SCOM',
                  child: Text('Safaricom (SCOM)'),
                ),
                DropdownMenuItem(value: 'EABL', child: Text('EABL')),
              ],
              onChanged: (val) => setState(() => _selectedStock = val),
              decoration: const InputDecoration(
                labelText: 'Select Stock',
                labelStyle: TextStyle(color: Colors.white),
                filled: true,
                fillColor: Colors.white10,
                border: OutlineInputBorder(),
              ),
              dropdownColor: const Color(0xFF0B1A39),
              style: const TextStyle(color: Colors.white),
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              value: _orderType,
              items: const [
                DropdownMenuItem(value: 'Market', child: Text('Market')),
                DropdownMenuItem(value: 'Limit', child: Text('Limit')),
                DropdownMenuItem(value: 'Stop', child: Text('Stop')),
              ],
              onChanged: (val) => setState(() => _orderType = val ?? 'Market'),
              decoration: const InputDecoration(
                labelText: 'Order Type',
                labelStyle: TextStyle(color: Colors.white),
                filled: true,
                fillColor: Colors.white10,
                border: OutlineInputBorder(),
              ),
              dropdownColor: const Color(0xFF0B1A39),
              style: const TextStyle(color: Colors.white),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                const Text('Quantity:', style: TextStyle(color: Colors.white)),
                const SizedBox(width: 16),
                Expanded(
                  child: Slider(
                    value: _quantity.toDouble(),
                    min: 1,
                    max: 100,
                    divisions: 99,
                    label: '$_quantity',
                    onChanged: (val) => setState(() => _quantity = val.toInt()),
                  ),
                ),
                Text('$_quantity', style: const TextStyle(color: Colors.white)),
              ],
            ),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: _selectedStock == null ? null : _showConfirmation,
              style: ElevatedButton.styleFrom(
                minimumSize: const Size.fromHeight(48),
              ),
              child: const Text('Place Order (Demo)'),
            ),
          ],
        ),
      ),
    );
  }
}
