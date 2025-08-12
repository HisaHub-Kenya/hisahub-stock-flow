class MarketDataModel {
  final String symbol;
  final String name;
  final double price;
  final double change;
  final double changePercent;
  final int volume;
  final DateTime? lastUpdated;

  MarketDataModel({
    required this.symbol,
    required this.name,
    required this.price,
    required this.change,
    required this.changePercent,
    required this.volume,
    this.lastUpdated,
  });

  factory MarketDataModel.fromMap(Map<String, dynamic> map) {
    return MarketDataModel(
      symbol: map['symbol'] ?? '',
      name: map['name'] ?? '',
      price: (map['price'] ?? 0.0).toDouble(),
      change: (map['change'] ?? 0.0).toDouble(),
      changePercent: (map['changePercent'] ?? 0.0).toDouble(),
      volume: map['volume'] ?? 0,
      lastUpdated:
          map['lastUpdated'] != null
              ? DateTime.parse(map['lastUpdated'])
              : null,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'symbol': symbol,
      'name': name,
      'price': price,
      'change': change,
      'changePercent': changePercent,
      'volume': volume,
      'lastUpdated': lastUpdated?.toIso8601String(),
    };
  }

  bool get isPositive => change >= 0;
  bool get isNegative => change < 0;

  String get formattedPrice => 'KES ${price.toStringAsFixed(2)}';
  String get formattedChange =>
      '${change >= 0 ? '+' : ''}${change.toStringAsFixed(2)}';
  String get formattedChangePercent =>
      '${changePercent >= 0 ? '+' : ''}${changePercent.toStringAsFixed(2)}%';
  String get formattedVolume => volume.toString();
}
