import 'package:cloud_firestore/cloud_firestore.dart';

class PortfolioModel {
  final String symbol;
  final int quantity;
  final double averagePrice;
  final double totalValue;
  final DateTime addedAt;
  final DateTime updatedAt;

  PortfolioModel({
    required this.symbol,
    required this.quantity,
    required this.averagePrice,
    required this.totalValue,
    required this.addedAt,
    required this.updatedAt,
  });

  factory PortfolioModel.fromMap(Map<String, dynamic> map) {
    return PortfolioModel(
      symbol: map['symbol'] ?? '',
      quantity: map['quantity'] ?? 0,
      averagePrice: (map['averagePrice'] ?? 0.0).toDouble(),
      totalValue: (map['totalValue'] ?? 0.0).toDouble(),
      addedAt: (map['addedAt'] as Timestamp?)?.toDate() ?? DateTime.now(),
      updatedAt: (map['updatedAt'] as Timestamp?)?.toDate() ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'symbol': symbol,
      'quantity': quantity,
      'averagePrice': averagePrice,
      'totalValue': totalValue,
      'addedAt': addedAt,
      'updatedAt': updatedAt,
    };
  }

  String get formattedQuantity => quantity.toString();
  String get formattedAveragePrice => 'KES ${averagePrice.toStringAsFixed(2)}';
  String get formattedTotalValue => 'KES ${totalValue.toStringAsFixed(2)}';
}
