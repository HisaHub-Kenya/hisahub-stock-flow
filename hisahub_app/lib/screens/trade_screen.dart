import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../services/app_state_service.dart';
import 'package:fl_chart/fl_chart.dart';
import 'dart:async'; // Added for Timer
import 'dart:math'; // Added for Random
import 'package:flutter_rating_bar/flutter_rating_bar.dart';

class TradeScreen extends StatefulWidget {
  const TradeScreen({super.key});

  @override
  State<TradeScreen> createState() => _TradeScreenState();
}

class _TradeScreenState extends State<TradeScreen> {
  String? _selectedStock;
  String _orderType = 'Market';
  int _quantity = 1;
  bool _isBuy = true;
  String _selectedTimeframe = '1W';
  Set<String> _watchlist = {};

  final Map<String, List<double>> _mockHistory1D = {
    'SCOM': [20.2, 20.3, 20.4, 20.5, 20.5, 20.4, 20.5],
    'KCB': [38.5, 38.6, 38.7, 38.75, 38.7, 38.6, 38.75],
    'EQTY': [42.9, 42.85, 42.8, 42.8, 42.8, 42.8, 42.8],
  };
  final Map<String, List<double>> _mockHistory1W = {
    'SCOM': [19.8, 20.0, 20.2, 20.1, 20.5],
    'KCB': [37.5, 38.0, 38.2, 38.4, 38.75],
    'EQTY': [43.5, 43.2, 43.0, 42.9, 42.8],
  };
  final Map<String, List<double>> _mockHistory1M = {
    'SCOM': [18.5, 19.0, 19.5, 20.0, 20.5],
    'KCB': [36.0, 36.5, 37.0, 38.0, 38.75],
    'EQTY': [44.0, 43.8, 43.5, 43.0, 42.8],
  };
  final Map<String, List<double>> _mockHistory3M = {
    'SCOM': [16.0, 17.5, 18.5, 19.5, 20.5],
    'KCB': [32.0, 34.0, 36.0, 37.5, 38.75],
    'EQTY': [40.0, 41.5, 43.0, 43.5, 42.8],
  };

  // --- Real-time price update state ---
  Map<String, double> _livePrices = {};
  Map<String, double> _prevPrices = {};
  Map<String, Color?> _highlightColors = {};
  Timer? _priceTimer;

  @override
  void initState() {
    super.initState();
    // Initialize live prices with mock data
    _livePrices = {'SCOM': 20.50, 'KCB': 38.75, 'EQTY': 42.80};
    _prevPrices = Map.from(_livePrices);
    _highlightColors = {'SCOM': null, 'KCB': null, 'EQTY': null};
    _priceTimer = Timer.periodic(const Duration(seconds: 2), (_) {
      setState(() {
        _livePrices.forEach((symbol, price) {
          final prev = price;
          // Randomly move price up or down by 0.1-0.5
          final change =
              (Random().nextBool() ? 1 : -1) *
              (0.1 + Random().nextDouble() * 0.4);
          final newPrice = (price + change).clamp(1.0, 1000.0);
          _prevPrices[symbol] = prev;
          _livePrices[symbol] = double.parse(newPrice.toStringAsFixed(2));
          if (_livePrices[symbol] != prev) {
            _highlightColors[symbol] =
                newPrice > prev
                    ? Colors.green.withOpacity(0.3)
                    : Colors.red.withOpacity(0.3);
            Future.delayed(const Duration(milliseconds: 600), () {
              if (mounted) {
                setState(() {
                  _highlightColors[symbol] = null;
                });
              }
            });
          }
        });
      });
    });
  }

  @override
  void dispose() {
    _priceTimer?.cancel();
    super.dispose();
  }

  List<double> _getHistoryForCurrentStock(String symbol) {
    switch (_selectedTimeframe) {
      case '1D':
        return _mockHistory1D[symbol] ?? [];
      case '1W':
        return _mockHistory1W[symbol] ?? [];
      case '1M':
        return _mockHistory1M[symbol] ?? [];
      case '3M':
        return _mockHistory3M[symbol] ?? [];
      default:
        return _mockHistory1W[symbol] ?? [];
    }
  }

  void _showTradeConfirmationModal(
    BuildContext context, {
    required String symbol,
    required int quantity,
    required double price,
    required String orderType,
    required bool isBuy,
  }) {
    double rating = 0;
    bool? thumbsUp;
    final feedbackController = TextEditingController();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: const Color(0xFF0B1A39),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) {
        return Padding(
          padding: EdgeInsets.only(
            left: 24,
            right: 24,
            top: 24,
            bottom: MediaQuery.of(context).viewInsets.bottom + 24,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  width: 40,
                  height: 4,
                  margin: const EdgeInsets.only(bottom: 16),
                  decoration: BoxDecoration(
                    color: Colors.white24,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              Center(
                child: Icon(
                  isBuy ? Icons.check_circle : Icons.sell,
                  color: isBuy ? Colors.green : Colors.redAccent,
                  size: 48,
                ),
              ),
              const SizedBox(height: 12),
              Center(
                child: Text(
                  isBuy ? 'Buy Order Placed!' : 'Sell Order Placed!',
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Text(
                'Summary',
                style: const TextStyle(
                  color: Color(0xFFF4C542),
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Text('Stock:', style: TextStyle(color: Colors.white70)),
                  const SizedBox(width: 8),
                  Text(symbol, style: TextStyle(color: Colors.white)),
                ],
              ),
              Row(
                children: [
                  Text('Quantity:', style: TextStyle(color: Colors.white70)),
                  const SizedBox(width: 8),
                  Text(
                    quantity.toString(),
                    style: TextStyle(color: Colors.white),
                  ),
                ],
              ),
              Row(
                children: [
                  Text('Price:', style: TextStyle(color: Colors.white70)),
                  const SizedBox(width: 8),
                  Text(
                    'KES ${price.toStringAsFixed(2)}',
                    style: TextStyle(color: Colors.white),
                  ),
                ],
              ),
              Row(
                children: [
                  Text('Order Type:', style: TextStyle(color: Colors.white70)),
                  const SizedBox(width: 8),
                  Text(orderType, style: TextStyle(color: Colors.white)),
                ],
              ),
              const SizedBox(height: 16),
              Text(
                'Rate your experience:',
                style: TextStyle(color: Colors.white70),
              ),
              const SizedBox(height: 8),
              Center(
                child: RatingBar.builder(
                  initialRating: 0,
                  minRating: 1,
                  direction: Axis.horizontal,
                  allowHalfRating: false,
                  itemCount: 5,
                  itemSize: 32,
                  unratedColor: Colors.white24,
                  itemPadding: const EdgeInsets.symmetric(horizontal: 2.0),
                  itemBuilder:
                      (context, _) =>
                          const Icon(Icons.star, color: Colors.amber),
                  onRatingUpdate: (r) {
                    rating = r;
                  },
                ),
              ),
              const SizedBox(height: 16),
              Text('Quick feedback:', style: TextStyle(color: Colors.white70)),
              const SizedBox(height: 8),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  IconButton(
                    icon: Icon(
                      Icons.thumb_up,
                      color: thumbsUp == true ? Colors.green : Colors.white54,
                    ),
                    iconSize: 32,
                    onPressed: () {
                      thumbsUp = true;
                      (context as Element).markNeedsBuild();
                    },
                  ),
                  const SizedBox(width: 16),
                  IconButton(
                    icon: Icon(
                      Icons.thumb_down,
                      color:
                          thumbsUp == false ? Colors.redAccent : Colors.white54,
                    ),
                    iconSize: 32,
                    onPressed: () {
                      thumbsUp = false;
                      (context as Element).markNeedsBuild();
                    },
                  ),
                ],
              ),
              const SizedBox(height: 16),
              TextField(
                controller: feedbackController,
                maxLines: 2,
                decoration: InputDecoration(
                  hintText: 'Optional comments...',
                  hintStyle: TextStyle(color: Colors.white38),
                  filled: true,
                  fillColor: Colors.white10,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                style: TextStyle(color: Colors.white),
              ),
              const SizedBox(height: 20),
              Center(
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.pop(context);
                    // Optionally, show a thank you snackbar or handle feedback
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Thank you for your feedback!')),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFF4C542),
                    foregroundColor: const Color(0xFF0B1A39),
                    minimumSize: const Size(120, 44),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: const Text('Submit'),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AppStateService>(
      builder: (context, appState, child) {
        // MOCK DATA FOR DEVELOPMENT PREVIEW
        final marketData = [
          {
            'symbol': 'SCOM',
            'name': 'Safaricom PLC',
            'price': 20.50,
            'change': 1.05,
            'changePercent': 5.4,
            'volume': 1200000,
            'history': [19.8, 20.0, 20.2, 20.1, 20.5],
          },
          {
            'symbol': 'KCB',
            'name': 'KCB Group',
            'price': 38.75,
            'change': 0.85,
            'changePercent': 2.2,
            'volume': 800000,
            'history': [37.5, 38.0, 38.2, 38.4, 38.75],
          },
          {
            'symbol': 'EQTY',
            'name': 'Equity Group',
            'price': 42.80,
            'change': -0.95,
            'changePercent': -2.1,
            'volume': 950000,
            'history': [43.5, 43.2, 43.0, 42.9, 42.8],
          },
        ];
        final indices = [
          {'name': 'NSE 20', 'value': 1847.32, 'change': 2.34},
          {'name': 'NSE All Share', 'value': 142.56, 'change': -0.87},
        ];
        final gainers = [
          {
            'symbol': 'SCOM',
            'name': 'Safaricom',
            'price': 20.50,
            'changePercent': 5.2,
            'trend': [19.8, 20.0, 20.2, 20.5],
          },
          {
            'symbol': 'KCB',
            'name': 'KCB Group',
            'price': 38.75,
            'changePercent': 3.8,
            'trend': [37.5, 38.0, 38.2, 38.75],
          },
        ];
        final losers = [
          {
            'symbol': 'EQTY',
            'name': 'Equity Group',
            'price': 42.80,
            'changePercent': -4.2,
            'trend': [43.5, 43.2, 43.0, 42.8],
          },
        ];
        final portfolio = [
          {
            'symbol': 'SCOM',
            'quantity': 120,
            'averagePrice': 19.80,
            'totalValue': 2460.0,
          },
          {
            'symbol': 'KCB',
            'quantity': 50,
            'averagePrice': 37.50,
            'totalValue': 1875.0,
          },
        ];
        // Mock trade history for personalized insights
        final tradeHistory = [
          {
            'symbol': 'SCOM',
            'date': DateTime(2024, 6, 1),
            'type': 'buy',
            'quantity': 20,
            'price': 20.10,
          },
          {
            'symbol': 'SCOM',
            'date': DateTime(2024, 5, 20),
            'type': 'buy',
            'quantity': 100,
            'price': 19.75,
          },
          {
            'symbol': 'KCB',
            'date': DateTime(2024, 6, 2),
            'type': 'buy',
            'quantity': 50,
            'price': 37.50,
          },
          {
            'symbol': 'EQTY',
            'date': DateTime(2024, 5, 10),
            'type': 'buy',
            'quantity': 10,
            'price': 43.00,
          },
        ];
        // Helper: get avg buy price for selected stock
        double? avgBuyPrice(String symbol) {
          final pos = portfolio.firstWhere(
            (p) => p['symbol'] == symbol,
            orElse: () => <String, Object>{},
          );
          return pos.isNotEmpty ? pos['averagePrice'] as double : null;
        }

        // Helper: get last trade date for selected stock
        String? lastTradeDate(String symbol) {
          final trades =
              tradeHistory.where((t) => t['symbol'] == symbol).toList()..sort(
                (a, b) =>
                    (b['date'] as DateTime).compareTo(a['date'] as DateTime),
              );
          if (trades.isNotEmpty) {
            final date = trades.first['date'] as DateTime;
            return " ${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}";
          }
          return null;
        }

        // Helper: get best performing stock in portfolio for this month (highest % gain)
        String? bestStockThisMonth() {
          final now = DateTime.now();
          String? bestSymbol;
          double bestGain = double.negativeInfinity;
          for (final pos in portfolio) {
            final symbol = pos['symbol'];
            // Get price at start of month (mock: use first price in 1M history)
            final history = _mockHistory1M[symbol] ?? [];
            if (history.isEmpty) continue;
            final startPrice = history.first;
            final current = marketData.firstWhere(
              (s) => s['symbol'] == symbol,
              orElse: () => <String, Object>{},
            );
            if (current.isEmpty) continue;
            final currentPrice = current['price'] as double;
            final gain = (currentPrice - startPrice) / startPrice;
            if (gain > bestGain) {
              bestGain = gain;
              if (symbol is String) {
                bestSymbol = symbol;
              }
            }
          }
          if (bestSymbol != null) {
            final stock = marketData.firstWhere(
              (s) => s['symbol'] == bestSymbol,
              orElse: () => <String, Object>{},
            );
            return stock.isNotEmpty ? stock['name'] as String : bestSymbol;
          }
          return null;
        }

        final isLoading = false;
        final error = null;
        final isAuthenticated = true;

        // Select first stock by default
        if (_selectedStock == null && marketData.isNotEmpty) {
          final symbol = marketData[0]['symbol'];
          String? stockSymbol;
          if (symbol is String) {
            stockSymbol = symbol;
          } else if (symbol != null) {
            stockSymbol = symbol.toString();
          }
          _selectedStock = stockSymbol;
        }
        final currentStock = marketData.firstWhere(
          (s) => s['symbol'] == _selectedStock,
          orElse:
              () => marketData.isNotEmpty ? marketData[0] : <String, Object>{},
        );
        final history = _getHistoryForCurrentStock(
          (currentStock['symbol'] ?? 'SCOM').toString(),
        );

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
              IconButton(
                icon: const Icon(Icons.business_center),
                onPressed: () => context.go('/login?broker=1'),
                tooltip: 'Broker Login',
              ),
            ],
          ),
          body:
              isLoading
                  ? const Center(child: CircularProgressIndicator())
                  : error != null
                  ? Center(
                    child: Text(
                      error,
                      style: const TextStyle(color: Colors.red),
                    ),
                  )
                  : marketData.isEmpty
                  ? const Center(
                    child: Text(
                      'No market data available',
                      style: TextStyle(color: Colors.white),
                    ),
                  )
                  : ListView(
                    padding: const EdgeInsets.all(16),
                    children: [
                      // --- Indices Summary ---
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children:
                            indices.map((idx) {
                              final isUp = (idx['change'] as num? ?? 0) >= 0;
                              return Card(
                                color: Colors.white10,
                                child: Padding(
                                  padding: const EdgeInsets.symmetric(
                                    vertical: 12,
                                    horizontal: 16,
                                  ),
                                  child: Column(
                                    children: [
                                      Text(
                                        idx['name'].toString(),
                                        style: const TextStyle(
                                          color: Colors.white,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      const SizedBox(height: 4),
                                      Text(
                                        (idx['value'] as num? ?? 0)
                                            .toStringAsFixed(2),
                                        style: TextStyle(
                                          color:
                                              isUp ? Colors.green : Colors.red,
                                          fontWeight: FontWeight.bold,
                                          fontSize: 16,
                                        ),
                                      ),
                                      Text(
                                        '${isUp ? '+' : ''}${(idx['change'] as num? ?? 0).toStringAsFixed(2)}%',
                                        style: TextStyle(
                                          color:
                                              isUp ? Colors.green : Colors.red,
                                          fontSize: 12,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              );
                            }).toList(),
                      ),
                      // ... Trending Stocks ...
                      const SizedBox(height: 16),
                      Text(
                        'Trending Stocks',
                        style: TextStyle(
                          color: Color(0xFFF4C542),
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                      const SizedBox(height: 8),
                      SizedBox(
                        height: 130,
                        child: ListView.separated(
                          scrollDirection: Axis.horizontal,
                          itemCount: 3,
                          separatorBuilder:
                              (_, __) => const SizedBox(width: 12),
                          itemBuilder: (context, i) {
                            final trending = [
                              {
                                'symbol': 'SCOM',
                                'name': 'Safaricom',
                                'price': _livePrices['SCOM'] ?? 20.50,
                                'trend': [19.8, 20.0, 20.2, 20.5],
                              },
                              {
                                'symbol': 'KCB',
                                'name': 'KCB Group',
                                'price': _livePrices['KCB'] ?? 38.75,
                                'trend': [37.5, 38.0, 38.2, 38.75],
                              },
                              {
                                'symbol': 'EQTY',
                                'name': 'Equity Group',
                                'price': _livePrices['EQTY'] ?? 42.80,
                                'trend': [43.5, 43.2, 43.0, 42.8],
                              },
                            ];
                            final t = trending[i];
                            final symbol = t['symbol'] as String;
                            final name = t['name'] as String;
                            final price = t['price'] as double;
                            final trend =
                                (t['trend'] as List)
                                    .map((e) => e as double)
                                    .toList();
                            return Card(
                              color: Colors.white10,
                              child: Container(
                                width: 140,
                                padding: const EdgeInsets.all(8),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      name,
                                      style: const TextStyle(
                                        color: Colors.white,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 13,
                                      ),
                                    ),
                                    Text(
                                      symbol,
                                      style: const TextStyle(
                                        color: Colors.white70,
                                        fontSize: 11,
                                      ),
                                    ),
                                    const SizedBox(height: 2),
                                    Text(
                                      'KES ${price.toStringAsFixed(2)}',
                                      style: const TextStyle(
                                        color: Colors.white,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 14,
                                      ),
                                    ),
                                    const SizedBox(height: 2),
                                    SizedBox(
                                      height: 22,
                                      child: LineChart(
                                        LineChartData(
                                          lineBarsData: [
                                            LineChartBarData(
                                              spots: List.generate(
                                                trend.length,
                                                (j) => FlSpot(
                                                  j.toDouble(),
                                                  trend[j],
                                                ),
                                              ),
                                              isCurved: true,
                                              color: Colors.green,
                                              barWidth: 2,
                                              dotData: FlDotData(show: false),
                                            ),
                                          ],
                                          titlesData: FlTitlesData(show: false),
                                          gridData: FlGridData(show: false),
                                          borderData: FlBorderData(show: false),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                      ),
                      // ... Market Data Container ...
                      const SizedBox(height: 16),
                      _buildMarketDataContainer(marketData, currentStock),
                      const SizedBox(height: 16),
                      // --- Timeframe Selector ---
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          for (final tf in ['1D', '1W', '1M', '3M'])
                            Padding(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 4.0,
                              ),
                              child: ChoiceChip(
                                label: Text(
                                  tf,
                                  style: TextStyle(
                                    color:
                                        _selectedTimeframe == tf
                                            ? const Color(0xFF0B1A39)
                                            : Colors.white,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                selected: _selectedTimeframe == tf,
                                selectedColor: const Color(0xFFF4C542),
                                backgroundColor: Colors.white10,
                                onSelected: (selected) {
                                  if (selected)
                                    setState(() => _selectedTimeframe = tf);
                                },
                              ),
                            ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      // --- Price History LineChart ---
                      Card(
                        color: Colors.white10,
                        child: Padding(
                          padding: const EdgeInsets.all(12.0),
                          child: SizedBox(
                            height: 180,
                            child: LineChart(
                              LineChartData(
                                lineBarsData: [
                                  LineChartBarData(
                                    spots: List.generate(
                                      history.length,
                                      (i) => FlSpot(i.toDouble(), history[i]),
                                    ),
                                    isCurved: true,
                                    color: Colors.amber,
                                    barWidth: 3,
                                    dotData: FlDotData(show: false),
                                  ),
                                ],
                                titlesData: FlTitlesData(
                                  leftTitles: AxisTitles(
                                    sideTitles: SideTitles(
                                      showTitles: true,
                                      reservedSize: 48,
                                      getTitlesWidget: (value, meta) {
                                        return Padding(
                                          padding: const EdgeInsets.only(
                                            right: 8.0,
                                          ),
                                          child: Text(
                                            'KES ${value.toStringAsFixed(1)}',
                                            style: const TextStyle(
                                              color: Colors.white70,
                                              fontSize: 12,
                                            ),
                                          ),
                                        );
                                      },
                                      interval: 0.5,
                                    ),
                                  ),
                                  bottomTitles: AxisTitles(
                                    sideTitles: SideTitles(
                                      showTitles: true,
                                      getTitlesWidget: (value, meta) {
                                        final labels = {
                                          '1D': [
                                            'Mon',
                                            'Tue',
                                            'Wed',
                                            'Thu',
                                            'Fri',
                                            'Sat',
                                            'Sun',
                                          ],
                                          '1W': ['W1', 'W2', 'W3', 'W4', 'W5'],
                                          '1M': ['M1', 'M2', 'M3', 'M4', 'M5'],
                                          '3M': ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
                                        };
                                        final idx = value.toInt();
                                        final tf = _selectedTimeframe;
                                        final labelList = labels[tf]!;
                                        return Text(
                                          idx >= 0 && idx < labelList.length
                                              ? labelList[idx]
                                              : '',
                                          style: const TextStyle(
                                            color: Colors.white70,
                                            fontSize: 12,
                                          ),
                                        );
                                      },
                                      interval: 1,
                                    ),
                                  ),
                                  rightTitles: AxisTitles(
                                    sideTitles: SideTitles(showTitles: false),
                                  ),
                                  topTitles: AxisTitles(
                                    sideTitles: SideTitles(showTitles: false),
                                  ),
                                ),
                                gridData: FlGridData(show: false),
                                borderData: FlBorderData(show: false),
                                minY:
                                    history.isNotEmpty
                                        ? (history.reduce(
                                              (a, b) => a < b ? a : b,
                                            )) -
                                            0.5
                                        : 0,
                                maxY:
                                    history.isNotEmpty
                                        ? (history.reduce(
                                              (a, b) => a > b ? a : b,
                                            )) +
                                            0.5
                                        : 1,
                              ),
                            ),
                          ),
                        ),
                      ),
                      // ... Personalized Insights ...
                      // ... Top Gainers ...
                      // ... Top Losers ...
                      // ... Buy/Sell Section ...
                      // ... Positions Section ...
                    ],
                  ),
        );
      },
    );
  }

  Widget _buildMarketDataContainer(
    List<Map<String, dynamic>> marketData,
    Map<String, dynamic> stock,
  ) {
    return Card(
      color: Colors.white10,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            // --- Modal Bottom Sheet Picker Button ---
            Expanded(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.white10,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  elevation: 0,
                  padding: const EdgeInsets.symmetric(
                    vertical: 12,
                    horizontal: 8,
                  ),
                ),
                onPressed: () async {
                  final selected = await showModalBottomSheet<String>(
                    context: context,
                    backgroundColor: const Color(0xFF0B1A39),
                    shape: const RoundedRectangleBorder(
                      borderRadius: BorderRadius.vertical(
                        top: Radius.circular(24),
                      ),
                    ),
                    isScrollControlled: true,
                    builder: (context) {
                      String search = '';
                      return StatefulBuilder(
                        builder: (context, setModalState) {
                          final filtered =
                              marketData.where((s) {
                                final name =
                                    (s['name'] ?? '').toString().toLowerCase();
                                final symbol =
                                    (s['symbol'] ?? '')
                                        .toString()
                                        .toLowerCase();
                                return name.contains(search.toLowerCase()) ||
                                    symbol.contains(search.toLowerCase());
                              }).toList();
                          // Sort: starred first (alphabetically), then rest (alphabetically)
                          filtered.sort((a, b) {
                            final aStar = _watchlist.contains(a['symbol']);
                            final bStar = _watchlist.contains(b['symbol']);
                            if (aStar && !bStar) return -1;
                            if (!aStar && bStar) return 1;
                            return (a['name'] ?? '').toString().compareTo(
                              (b['name'] ?? '').toString(),
                            );
                          });
                          return Padding(
                            padding: EdgeInsets.only(
                              left: 16,
                              right: 16,
                              top: 24,
                              bottom:
                                  MediaQuery.of(context).viewInsets.bottom + 24,
                            ),
                            child: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Container(
                                  width: 40,
                                  height: 4,
                                  margin: const EdgeInsets.only(bottom: 16),
                                  decoration: BoxDecoration(
                                    color: Colors.white24,
                                    borderRadius: BorderRadius.circular(2),
                                  ),
                                ),
                                TextField(
                                  autofocus: true,
                                  decoration: InputDecoration(
                                    hintText: 'Search company or symbol',
                                    hintStyle: const TextStyle(
                                      color: Colors.white54,
                                    ),
                                    filled: true,
                                    fillColor: Colors.white10,
                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(12),
                                    ),
                                    prefixIcon: const Icon(
                                      Icons.search,
                                      color: Colors.white54,
                                    ),
                                  ),
                                  style: const TextStyle(color: Colors.white),
                                  onChanged:
                                      (val) =>
                                          setModalState(() => search = val),
                                ),
                                const SizedBox(height: 16),
                                if (filtered.isEmpty)
                                  const Text(
                                    'No results',
                                    style: TextStyle(color: Colors.white70),
                                  ),
                                if (filtered.isNotEmpty)
                                  Flexible(
                                    child: ListView.separated(
                                      shrinkWrap: true,
                                      itemCount: filtered.length,
                                      separatorBuilder:
                                          (_, __) => const Divider(
                                            color: Colors.white12,
                                          ),
                                      itemBuilder: (context, i) {
                                        final s = filtered[i];
                                        final symbol = s['symbol'].toString();
                                        final isStarred = _watchlist.contains(
                                          symbol,
                                        );
                                        return ListTile(
                                          onTap:
                                              () => Navigator.pop(
                                                context,
                                                symbol,
                                              ),
                                          leading: CircleAvatar(
                                            backgroundColor: const Color(
                                              0xFFF4C542,
                                            ),
                                            child: Text(
                                              (s['symbol'] ?? '?').toString(),
                                              style: const TextStyle(
                                                color: Color(0xFF0B1A39),
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                          ),
                                          title: Text(
                                            s['name'] ?? '',
                                            style: const TextStyle(
                                              color: Colors.white,
                                              fontWeight: FontWeight.bold,
                                            ),
                                          ),
                                          subtitle: Text(
                                            s['symbol'] ?? '',
                                            style: const TextStyle(
                                              color: Colors.white70,
                                            ),
                                          ),
                                          trailing: IconButton(
                                            icon: Icon(
                                              isStarred
                                                  ? Icons.star
                                                  : Icons.star_border,
                                              color:
                                                  isStarred
                                                      ? Colors.amber
                                                      : Colors.white54,
                                            ),
                                            tooltip:
                                                isStarred
                                                    ? 'Remove from Watchlist'
                                                    : 'Add to Watchlist',
                                            onPressed: () {
                                              setModalState(() {
                                                setState(() {
                                                  if (isStarred) {
                                                    _watchlist.remove(symbol);
                                                  } else {
                                                    _watchlist.add(symbol);
                                                  }
                                                });
                                              });
                                            },
                                          ),
                                        );
                                      },
                                    ),
                                  ),
                              ],
                            ),
                          );
                        },
                      );
                    },
                  );
                  if (selected != null && selected != _selectedStock) {
                    setState(() => _selectedStock = selected);
                  }
                },
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    CircleAvatar(
                      backgroundColor: const Color(0xFFF4C542),
                      child: Text(
                        (stock['symbol'] ?? '?').toString(),
                        style: const TextStyle(
                          color: Color(0xFF0B1A39),
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            stock['name'] ?? '',
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                            ),
                          ),
                          Text(
                            stock['symbol'] ?? '',
                            style: const TextStyle(
                              color: Colors.white70,
                              fontSize: 13,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const Icon(
                      Icons.keyboard_arrow_down,
                      color: Colors.white70,
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(width: 16),
            if (stock.isNotEmpty)
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  AnimatedContainer(
                    duration: const Duration(milliseconds: 400),
                    curve: Curves.easeInOut,
                    decoration: BoxDecoration(
                      color:
                          _highlightColors[stock['symbol']] ??
                          Colors.transparent,
                      borderRadius: BorderRadius.circular(6),
                    ),
                    padding: const EdgeInsets.symmetric(
                      horizontal: 4,
                      vertical: 2,
                    ),
                    child: Text(
                      'KES ${_livePrices[stock['symbol']]?.toStringAsFixed(2) ?? '--'}',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        fontFamily: 'Roboto',
                      ),
                    ),
                  ),
                  Row(
                    children: [
                      Icon(
                        (_livePrices[stock['symbol']] ?? 0) -
                                    (_prevPrices[stock['symbol']] ?? 0) >=
                                0
                            ? Icons.arrow_upward
                            : Icons.arrow_downward,
                        color:
                            (_livePrices[stock['symbol']] ?? 0) -
                                        (_prevPrices[stock['symbol']] ?? 0) >=
                                    0
                                ? Colors.green
                                : Colors.red,
                        size: 16,
                      ),
                      Text(
                        '${(_livePrices[stock['symbol']] ?? 0) - (_prevPrices[stock['symbol']] ?? 0) >= 0 ? '+' : ''}${((_livePrices[stock['symbol']] ?? 0) - (_prevPrices[stock['symbol']] ?? 0)).toStringAsFixed(2)}',
                        style: TextStyle(
                          color:
                              (_livePrices[stock['symbol']] ?? 0) -
                                          (_prevPrices[stock['symbol']] ?? 0) >=
                                      0
                                  ? Colors.green
                                  : Colors.red,
                          fontFamily: 'Inter',
                        ),
                      ),
                    ],
                  ),
                ],
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildBuySellSection(
    Map<String, dynamic> stock,
    bool isAuthenticated,
    AppStateService appState,
  ) {
    return Card(
      color: Colors.white10,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                Expanded(
                  child: ElevatedButton(
                    onPressed: () => setState(() => _isBuy = true),
                    style: ElevatedButton.styleFrom(
                      backgroundColor:
                          _isBuy ? const Color(0xFFF4C542) : Colors.white10,
                      foregroundColor:
                          _isBuy ? const Color(0xFF0B1A39) : Colors.white,
                      shape: const RoundedRectangleBorder(
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(8),
                        ),
                      ),
                    ),
                    child: const Text('Buy'),
                  ),
                ),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () => setState(() => _isBuy = false),
                    style: ElevatedButton.styleFrom(
                      backgroundColor:
                          !_isBuy ? Colors.redAccent : Colors.white10,
                      foregroundColor: !_isBuy ? Colors.white : Colors.white,
                      shape: const RoundedRectangleBorder(
                        borderRadius: BorderRadius.only(
                          topRight: Radius.circular(8),
                        ),
                      ),
                    ),
                    child: const Text('Sell'),
                  ),
                ),
              ],
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
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed:
                  !isAuthenticated || stock.isEmpty
                      ? null
                      : () async {
                        final price = (stock['price'] ?? 0).toDouble();
                        final success = await appState.placeOrder(
                          symbol: stock['symbol'],
                          orderType: _isBuy ? 'buy' : 'sell',
                          quantity: _quantity,
                          price: price,
                          orderMode: _orderType.toLowerCase(),
                        );
                        if (success) {
                          _showTradeConfirmationModal(
                            context,
                            symbol: stock['symbol'] ?? '',
                            quantity: _quantity,
                            price: price,
                            orderType: _orderType,
                            isBuy: _isBuy,
                          );
                        } else {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text(
                                'Order failed: ${appState.error ?? 'Unknown error'}',
                              ),
                            ),
                          );
                        }
                      },
              style: ElevatedButton.styleFrom(
                minimumSize: const Size.fromHeight(48),
                backgroundColor:
                    _isBuy ? const Color(0xFFF4C542) : Colors.redAccent,
                foregroundColor:
                    _isBuy ? const Color(0xFF0B1A39) : Colors.white,
              ),
              child: Text(_isBuy ? 'Buy' : 'Sell'),
            ),
            if (!isAuthenticated)
              const Padding(
                padding: EdgeInsets.only(top: 8.0),
                child: Text(
                  'Sign in to place real trades.',
                  style: TextStyle(color: Colors.white70),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildPositionsSection(List<Map<String, dynamic>> portfolio) {
    return Card(
      color: Colors.white10,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              'Positions',
              style: TextStyle(
                color: Color(0xFFF4C542),
                fontWeight: FontWeight.bold,
                fontFamily: 'Inter',
              ),
            ),
            const SizedBox(height: 8),
            if (portfolio.isEmpty)
              const Text(
                'No positions yet.',
                style: TextStyle(color: Colors.white70),
              ),
            ...portfolio.map(
              (pos) => ListTile(
                leading: CircleAvatar(
                  child: Text(pos['symbol'] ?? '?'),
                  backgroundColor: const Color(0xFFF4C542),
                ),
                title: Text(
                  '${pos['quantity'] ?? '--'} @ KES ${pos['averagePrice'] ?? '--'}',
                  style: const TextStyle(
                    color: Colors.white,
                    fontFamily: 'Roboto',
                  ),
                ),
                subtitle: Text(
                  'Value: KES ${pos['totalValue'] ?? '--'}',
                  style: const TextStyle(color: Colors.white70),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
