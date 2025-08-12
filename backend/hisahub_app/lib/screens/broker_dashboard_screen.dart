import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class BrokerDashboardScreen extends StatelessWidget {
  const BrokerDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0B1A39),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0B1A39),
        title: const Text(
          'Broker Dashboard',
          style: TextStyle(fontFamily: 'Inter', color: Color(0xFFF4C542)),
        ),
        elevation: 0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Summary cards
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _SummaryCard(title: 'Clients', value: '24', icon: Icons.people),
                _SummaryCard(
                  title: 'Pending KYC',
                  value: '3',
                  icon: Icons.verified_user,
                ),
                _SummaryCard(
                  title: 'Trades Today',
                  value: '12',
                  icon: Icons.swap_horiz,
                ),
              ],
            ),
            const SizedBox(height: 24),
            // Navigation buttons
            Expanded(
              child: ListView(
                children: [
                  _NavButton(
                    label: 'Clients',
                    icon: Icons.people,
                    onTap: () => context.go('/broker-dashboard/clients'),
                  ),
                  _NavButton(
                    label: 'KYC Verification',
                    icon: Icons.verified_user,
                    onTap: () => context.go('/broker-dashboard/kyc'),
                  ),
                  _NavButton(
                    label: 'Trade Execution',
                    icon: Icons.swap_horiz,
                    onTap: () => context.go('/broker-dashboard/trades'),
                  ),
                  _NavButton(
                    label: 'Compliance & Reports',
                    icon: Icons.assignment_turned_in,
                    onTap: () => context.go('/broker-dashboard/compliance'),
                  ),
                  _NavButton(
                    label: 'Payments',
                    icon: Icons.payment,
                    onTap: () => context.go('/broker-dashboard/payments'),
                  ),
                  _NavButton(
                    label: 'Profile & Settings',
                    icon: Icons.person,
                    onTap: () => context.go('/broker-dashboard/profile'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SummaryCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;
  const _SummaryCard({
    required this.title,
    required this.value,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      color: const Color(0xFFF4C542),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 12),
        child: Column(
          children: [
            Icon(icon, color: const Color(0xFF0B1A39)),
            const SizedBox(height: 8),
            Text(
              value,
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Color(0xFF0B1A39),
                fontFamily: 'Roboto',
              ),
            ),
            Text(
              title,
              style: const TextStyle(
                fontSize: 12,
                color: Color(0xFF0B1A39),
                fontFamily: 'Inter',
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _NavButton extends StatelessWidget {
  final String label;
  final IconData icon;
  final VoidCallback onTap;
  const _NavButton({
    required this.label,
    required this.icon,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.white10,
      child: ListTile(
        leading: Icon(icon, color: const Color(0xFFF4C542)),
        title: Text(
          label,
          style: const TextStyle(color: Colors.white, fontFamily: 'Inter'),
        ),
        trailing: const Icon(
          Icons.arrow_forward_ios,
          color: Colors.white54,
          size: 16,
        ),
        onTap: onTap,
      ),
    );
  }
}
