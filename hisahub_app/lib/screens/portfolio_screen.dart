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
          Card(
            color: Colors.white10,
            child: Padding(
              padding: const EdgeInsets.all(16.0),
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
