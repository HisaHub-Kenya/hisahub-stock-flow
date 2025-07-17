import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:fl_chart/fl_chart.dart';

class PortfolioScreen extends StatelessWidget {
  const PortfolioScreen({super.key});

  void _showSignInPrompt(BuildContext context) {
    showDialog(
      context: context,
      builder:
          (context) => AlertDialog(
            title: const Text('Sign In Required'),
            content: const Text(
              'Please sign in to view your portfolio and manage your investments.',
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

  void _showAddFundsModal(BuildContext context) {
    final TextEditingController amountController = TextEditingController();
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      backgroundColor: const Color(0xFF0B1A39),
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text(
                'Add Funds',
                style: TextStyle(
                  color: Color(0xFFF4C542),
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              TextField(
                controller: amountController,
                keyboardType: TextInputType.numberWithOptions(decimal: true),
                decoration: InputDecoration(
                  labelText: 'Amount (KES)',
                  labelStyle: const TextStyle(color: Colors.white),
                  filled: true,
                  fillColor: Colors.white10,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                style: const TextStyle(color: Colors.white),
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: () {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text(
                        'Funds added: KES ${amountController.text} (simulated)',
                      ),
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFF4C542),
                  foregroundColor: const Color(0xFF0B1A39),
                  minimumSize: const Size.fromHeight(48),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: const Text('Confirm'),
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0B1A39),
      appBar: AppBar(
        title: const Text('Portfolio'),
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
                    'Demo Portfolio - Sign in to view your actual portfolio',
                    style: TextStyle(
                      color: Color(0xFFF4C542),
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          // Portfolio Overview with Add Funds button
          Card(
            color: Colors.white10,
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text(
                          'Portfolio Overview',
                          style: TextStyle(
                            color: Color(0xFFF4C542),
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 8),
                        Text(
                          'KES 0.00',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 28,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ),
                  ElevatedButton.icon(
                    onPressed: () => _showAddFundsModal(context),
                    icon: const Icon(Icons.add, color: Color(0xFF0B1A39)),
                    label: const Text(
                      'Add Funds',
                      style: TextStyle(color: Color(0xFF0B1A39)),
                    ),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFF4C542),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            'Holdings',
            style: TextStyle(
              color: Colors.white,
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          Card(
            color: Colors.white10,
            child: ListTile(
              leading: Icon(Icons.show_chart, color: Color(0xFFF4C542)),
              title: const Text(
                'Safaricom (SCOM)',
                style: TextStyle(color: Colors.white),
              ),
              subtitle: const Text(
                '10 shares',
                style: TextStyle(color: Colors.white70),
              ),
              trailing: const Text(
                'KES 200.00',
                style: TextStyle(color: Colors.white),
              ),
              onTap: () => _showSignInPrompt(context),
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            'Allocations',
            style: TextStyle(
              color: Colors.white,
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(
            height: 200,
            child: PieChart(
              PieChartData(
                sections: [
                  PieChartSectionData(
                    value: 60,
                    color: Color(0xFFF4C542),
                    title: 'SCOM',
                  ),
                  PieChartSectionData(
                    value: 40,
                    color: Colors.blue,
                    title: 'EABL',
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            'Transactions',
            style: TextStyle(
              color: Colors.white,
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          Card(
            color: Colors.white10,
            child: ListTile(
              leading: Icon(Icons.swap_horiz, color: Color(0xFFF4C542)),
              title: const Text(
                'Buy SCOM',
                style: TextStyle(color: Colors.white),
              ),
              subtitle: const Text(
                '10 shares @ KES 20.00',
                style: TextStyle(color: Colors.white70),
              ),
              trailing: const Text(
                'KES 200.00',
                style: TextStyle(color: Colors.white),
              ),
              onTap: () => _showSignInPrompt(context),
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            'Dividends',
            style: TextStyle(
              color: Colors.white,
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          Card(
            color: Colors.white10,
            child: ListTile(
              leading: Icon(Icons.attach_money, color: Color(0xFFF4C542)),
              title: const Text(
                'SCOM Dividend',
                style: TextStyle(color: Colors.white),
              ),
              subtitle: const Text(
                'KES 10.00',
                style: TextStyle(color: Colors.white70),
              ),
              onTap: () => _showSignInPrompt(context),
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            'Performance',
            style: TextStyle(
              color: Colors.white,
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(
            height: 200,
            child: LineChart(
              LineChartData(
                lineBarsData: [
                  LineChartBarData(
                    spots: [
                      FlSpot(0, 0),
                      FlSpot(1, 1),
                      FlSpot(2, 1.5),
                      FlSpot(3, 1.2),
                    ],
                    isCurved: true,
                    color: const Color(0xFFF4C542),
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
