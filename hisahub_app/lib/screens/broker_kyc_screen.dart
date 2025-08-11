import 'package:flutter/material.dart';

class BrokerKycScreen extends StatelessWidget {
  const BrokerKycScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0B1A39),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0B1A39),
        title: const Text(
          'KYC Verification',
          style: TextStyle(fontFamily: 'Inter', color: Color(0xFFF4C542)),
        ),
      ),
      body: const Center(
        child: Text(
          'Broker KYC Verification Page',
          style: TextStyle(color: Colors.white, fontFamily: 'Inter'),
        ),
      ),
    );
  }
}
