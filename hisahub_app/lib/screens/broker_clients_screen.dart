import 'package:flutter/material.dart';

class BrokerClientsScreen extends StatelessWidget {
  const BrokerClientsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0B1A39),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0B1A39),
        title: const Text(
          'Clients',
          style: TextStyle(fontFamily: 'Inter', color: Color(0xFFF4C542)),
        ),
      ),
      body: const Center(
        child: Text(
          'Broker Clients Page',
          style: TextStyle(color: Colors.white, fontFamily: 'Inter'),
        ),
      ),
    );
  }
}
