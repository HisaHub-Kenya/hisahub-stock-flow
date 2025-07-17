import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../services/app_state_service.dart';

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

  @override
  Widget build(BuildContext context) {
    return Consumer<AppStateService>(
      builder: (context, appState, child) {
        final isLoading = appState.isLoading;
        final error = appState.error;
        final marketData = appState.marketData;
        final portfolio = appState.portfolio;
        final isAuthenticated = appState.isAuthenticated;

        // Select first stock by default
        _selectedStock ??=
            marketData.isNotEmpty ? marketData[0]['symbol'] as String : null;
        final currentStock = marketData.firstWhere(
          (s) => s['symbol'] == _selectedStock,
          orElse: () => marketData.isNotEmpty ? marketData[0] : {},
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
                      _buildMarketDataContainer(marketData, currentStock),
                      const SizedBox(height: 16),
                      _buildBuySellSection(
                        currentStock,
                        isAuthenticated,
                        appState,
                      ),
                      const SizedBox(height: 24),
                      _buildPositionsSection(portfolio),
                      // TODO: Add open orders and transaction history from backend if available
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
            DropdownButton<String>(
              value: _selectedStock,
              dropdownColor: const Color(0xFF0B1A39),
              style: const TextStyle(color: Colors.white, fontFamily: 'Inter'),
              items:
                  marketData
                      .map<DropdownMenuItem<String>>(
                        (s) => DropdownMenuItem<String>(
                          value: s['symbol'] as String,
                          child: Text('${s['name']} (${s['symbol']})'),
                        ),
                      )
                      .toList(),
              onChanged: (val) => setState(() => _selectedStock = val!),
            ),
            const SizedBox(width: 16),
            if (stock.isNotEmpty)
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'KES ${stock['price']?.toStringAsFixed(2) ?? '--'}',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Roboto',
                    ),
                  ),
                  Row(
                    children: [
                      Icon(
                        (stock['change'] ?? 0) >= 0
                            ? Icons.arrow_upward
                            : Icons.arrow_downward,
                        color:
                            (stock['change'] ?? 0) >= 0
                                ? Colors.green
                                : Colors.red,
                        size: 16,
                      ),
                      Text(
                        '${(stock['change'] ?? 0) >= 0 ? '+' : ''}${stock['change'] ?? '--'} (${stock['changePercent'] ?? '--'}%)',
                        style: TextStyle(
                          color:
                              (stock['change'] ?? 0) >= 0
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
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text(
                                '${_isBuy ? 'Buy' : 'Sell'} order placed!',
                              ),
                            ),
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
