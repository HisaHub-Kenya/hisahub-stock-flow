import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../services/background_image_service.dart';
import '../theme/theme_provider.dart';
import '../services/app_state_service.dart';
import 'package:fl_chart/fl_chart.dart';

// Custom painter for trend line graphs
class TrendLinePainter extends CustomPainter {
  final List<double> points;
  final Color color;

  TrendLinePainter({required this.points, required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    final paint =
        Paint()
          ..color = color
          ..strokeWidth = 2.0
          ..style = PaintingStyle.stroke;

    final path = Path();
    final width = size.width;
    final height = size.height;
    final stepX = width / (points.length - 1);

    for (int i = 0; i < points.length; i++) {
      final x = i * stepX;
      final y = height - (points[i] * height);

      if (i == 0) {
        path.moveTo(x, y);
      } else {
        path.lineTo(x, y);
      }
    }

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// 1. Extract UserStatusIndicator widget
class UserStatusIndicator extends StatelessWidget {
  final bool isAuthenticated;
  final Map<String, dynamic>? userProfile;
  const UserStatusIndicator({
    super.key,
    required this.isAuthenticated,
    required this.userProfile,
  });

  String _getUserName(Map<String, dynamic>? userProfile) {
    if (userProfile == null) return 'User';
    final fullName = userProfile['fullName'] as String?;
    if (fullName == null || fullName.isEmpty) return 'User';
    final nameParts = fullName.split(' ');
    return nameParts.first;
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () {
          if (isAuthenticated) {
            context.go('/home');
          } else {
            context.go('/login');
          }
        },
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(
            color:
                isAuthenticated
                    ? Colors.green.withOpacity(0.9)
                    : const Color(0xFFF4C542).withOpacity(0.9),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: isAuthenticated ? Colors.green : const Color(0xFFF4C542),
            ),
            boxShadow: [
              BoxShadow(
                color: (isAuthenticated
                        ? Colors.green
                        : const Color(0xFFF4C542))
                    .withOpacity(0.2),
                blurRadius: 4,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                isAuthenticated ? Icons.person : Icons.person_outline,
                color: const Color(0xFF0B1A39),
                size: 16,
              ),
              const SizedBox(width: 4),
              Text(
                isAuthenticated ? _getUserName(userProfile) : 'Guest',
                style: const TextStyle(
                  color: Color(0xFF0B1A39),
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// 2. Extract WelcomeHeader widget
class WelcomeHeader extends StatelessWidget {
  final bool isAuthenticated;
  final Map<String, dynamic>? userProfile;
  const WelcomeHeader({
    super.key,
    required this.isAuthenticated,
    required this.userProfile,
  });

  String _getUserName(Map<String, dynamic>? userProfile) {
    if (userProfile == null) return 'User';
    final fullName = userProfile['fullName'] as String?;
    if (fullName == null || fullName.isEmpty) return 'User';
    final nameParts = fullName.split(' ');
    return nameParts.first;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            const Color(0xFFF4C542).withOpacity(0.1),
            const Color(0xFF0B1A39),
          ],
        ),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: const Color(0xFFF4C542).withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Row(
        children: [
          // Mock HisaHub Logo
          Container(
            width: 60,
            height: 60,
            decoration: BoxDecoration(
              color: const Color(0xFFF4C542),
              borderRadius: BorderRadius.circular(12),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFFF4C542).withOpacity(0.3),
                  blurRadius: 8,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: const Center(
              child: Text(
                'HH',
                style: TextStyle(
                  color: Color(0xFF0B1A39),
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  isAuthenticated
                      ? 'Welcome back,  _getUserName(userProfile)!'
                      : 'Welcome to HisaHub',
                  style: const TextStyle(
                    color: Color(0xFFF4C542),
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  isAuthenticated
                      ? 'Track your investments and explore new opportunities'
                      : 'Democratize access to the Nairobi Securities Exchange for everyday Kenyans',
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
          // Background Image Toggle Button
          IconButton(
            onPressed: () => BackgroundImageService().toggleImage(),
            icon: const Icon(Icons.swap_horiz, color: Color(0xFFF4C542)),
            tooltip: 'Toggle Background Image',
          ),
          // Theme Toggle Button
          Consumer<ThemeProvider>(
            builder: (context, themeProvider, child) {
              return IconButton(
                onPressed: () => themeProvider.toggleTheme(),
                icon: Icon(
                  themeProvider.isDarkMode
                      ? Icons.wb_sunny
                      : Icons.nightlight_round,
                  color: const Color(0xFFF4C542),
                ),
                tooltip: 'Toggle Theme',
              );
            },
          ),
        ],
      ),
    );
  }
}

// 3. Extract PortfolioSection widget
class PortfolioSection extends StatelessWidget {
  final bool isAuthenticated;
  final List<dynamic> portfolio;
  final void Function()? onDeposit;
  final void Function()? onWithdraw;
  final void Function()? onTrade;
  final void Function(String, BuildContext)? onShowSignInPrompt;
  final BuildContext parentContext;
  const PortfolioSection({
    super.key,
    required this.isAuthenticated,
    required this.portfolio,
    this.onDeposit,
    this.onWithdraw,
    this.onTrade,
    this.onShowSignInPrompt,
    required this.parentContext,
  });

  @override
  Widget build(BuildContext context) {
    if (isAuthenticated) {
      return Column(
        children: [
          Card(
            color: Colors.white10,
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Portfolio Value',
                    style: TextStyle(
                      color: Color(0xFFF4C542),
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'KES ${portfolio.fold(0.0, (sum, holding) => sum + (holding['totalValue'] ?? 0.0)).toStringAsFixed(2)}',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Holdings: ${portfolio.length}',
                    style: const TextStyle(color: Colors.white70),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              ElevatedButton(
                onPressed: onDeposit,
                child: const Text('Deposit'),
              ),
              ElevatedButton(
                onPressed: onWithdraw,
                child: const Text('Withdraw'),
              ),
              ElevatedButton(onPressed: onTrade, child: const Text('Trade')),
            ],
          ),
        ],
      );
    } else {
      return Column(
        children: [
          Card(
            color: Colors.white10,
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text(
                    'Demo Portfolio',
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
                  SizedBox(height: 8),
                  Text(
                    'Sign in to start trading',
                    style: TextStyle(color: Colors.white70),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              ElevatedButton(
                onPressed:
                    () => onShowSignInPrompt?.call('deposits', parentContext),
                child: const Text('Deposit'),
              ),
              ElevatedButton(
                onPressed:
                    () =>
                        onShowSignInPrompt?.call('withdrawals', parentContext),
                child: const Text('Withdraw'),
              ),
              ElevatedButton(
                onPressed:
                    () => onShowSignInPrompt?.call('trading', parentContext),
                child: const Text('Trade'),
              ),
            ],
          ),
        ],
      );
    }
  }
}

// 4. Extract MarketOverviewSection widget (indices, gainers, losers)
class MarketOverviewSection extends StatelessWidget {
  final dynamic marketData;
  const MarketOverviewSection({super.key, required this.marketData});

  Widget _buildStockItem(
    String name,
    String symbol,
    String price,
    String change,
    Color color,
    List<double> trendPoints,
  ) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: color.withValues(alpha: 0.3)),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '$name ($symbol)',
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  price,
                  style: const TextStyle(color: Colors.white70, fontSize: 12),
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                change,
                style: TextStyle(
                  color: color,
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                ),
              ),
              const SizedBox(height: 4),
              Container(
                width: 50,
                height: 25,
                decoration: BoxDecoration(
                  color: color.withValues(alpha: 0.2),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: CustomPaint(
                  painter: TrendLinePainter(points: trendPoints, color: color),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  void _showSignInPrompt(BuildContext context, String feature) {
    showDialog(
      context: context,
      builder:
          (context) => AlertDialog(
            title: const Text('Sign In Required'),
            content: Text('Please sign in to access $feature.'),
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
    return Column(
      children: [
        const Text(
          'Market Overview',
          style: TextStyle(
            color: Colors.white,
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),

        // Market Indices Section
        Card(
          color: Colors.white10,
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Icon(
                      Icons.trending_up,
                      color: const Color(0xFFF4C542),
                      size: 20,
                    ),
                    const SizedBox(width: 8),
                    const Text(
                      'Market Indices',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: Colors.green.withValues(alpha: 0.1),
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(
                            color: Colors.green.withValues(alpha: 0.3),
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'NSE 20',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 4),
                            const Text(
                              '1,847.32',
                              style: TextStyle(
                                color: Colors.green,
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const Text(
                              '+2.34%',
                              style: TextStyle(
                                color: Colors.green,
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: Colors.red.withValues(alpha: 0.1),
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(
                            color: Colors.red.withValues(alpha: 0.3),
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'NSE All Share',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 4),
                            const Text(
                              '142.56',
                              style: TextStyle(
                                color: Colors.red,
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const Text(
                              '-0.87%',
                              style: TextStyle(color: Colors.red, fontSize: 12),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),

        // Top Gainers Section
        Card(
          color: Colors.white10,
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Icon(Icons.trending_up, color: Colors.green, size: 20),
                    const SizedBox(width: 8),
                    const Text(
                      'Top Gainers',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Column(
                  children: [
                    _buildStockItem(
                      'Safaricom',
                      'SCOM',
                      'KES 20.50',
                      '+5.2%',
                      Colors.green,
                      [0.2, 0.4, 0.6, 0.8, 1.0],
                    ),
                    const SizedBox(height: 8),
                    _buildStockItem(
                      'KCB Group',
                      'KCB',
                      'KES 38.75',
                      '+3.8%',
                      Colors.green,
                      [0.3, 0.5, 0.7, 0.8, 0.9],
                    ),
                    const SizedBox(height: 8),
                    _buildStockItem(
                      'Co-op Bank',
                      'COOP',
                      'KES 12.30',
                      '+2.9%',
                      Colors.green,
                      [0.4, 0.6, 0.7, 0.8, 0.85],
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),

        // Top Losers Section
        Card(
          color: Colors.white10,
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Icon(Icons.trending_down, color: Colors.red, size: 20),
                    const SizedBox(width: 8),
                    const Text(
                      'Top Losers',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Column(
                  children: [
                    _buildStockItem(
                      'Equity Group',
                      'EQTY',
                      'KES 42.80',
                      '-4.2%',
                      Colors.red,
                      [1.0, 0.8, 0.6, 0.4, 0.2],
                    ),
                    const SizedBox(height: 8),
                    _buildStockItem(
                      'Bamburi Cement',
                      'BAMB',
                      'KES 15.45',
                      '-3.1%',
                      Colors.red,
                      [0.9, 0.7, 0.5, 0.3, 0.2],
                    ),
                    const SizedBox(height: 8),
                    _buildStockItem(
                      'Kenya Airways',
                      'KA',
                      'KES 3.20',
                      '-2.7%',
                      Colors.red,
                      [0.8, 0.6, 0.4, 0.3, 0.25],
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),

        // Kenyan Stocks with Trend Graphs
        Column(
          children: [
            // Safaricom
            Card(
              color: Colors.white10,
              child: Padding(
                padding: const EdgeInsets.all(12.0),
                child: Row(
                  children: [
                    const Icon(Icons.show_chart, color: Color(0xFFF4C542)),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text(
                            'Safaricom (SCOM)',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            'KES 20.00',
                            style: TextStyle(color: Colors.white70),
                          ),
                        ],
                      ),
                    ),
                    // Mini Trend Graph
                    Container(
                      width: 60,
                      height: 30,
                      decoration: BoxDecoration(
                        color: Colors.green.withValues(alpha: 0.2),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: CustomPaint(
                        painter: TrendLinePainter(
                          points: [0.2, 0.4, 0.3, 0.6, 0.8],
                          color: Colors.green,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 8),
            // Equity Group
            Card(
              color: Colors.white10,
              child: Padding(
                padding: const EdgeInsets.all(12.0),
                child: Row(
                  children: [
                    const Icon(Icons.show_chart, color: Color(0xFFF4C542)),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text(
                            'Equity Group (EQTY)',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            'KES 45.20',
                            style: TextStyle(color: Colors.white70),
                          ),
                        ],
                      ),
                    ),
                    // Mini Trend Graph
                    Container(
                      width: 60,
                      height: 30,
                      decoration: BoxDecoration(
                        color: Colors.red.withValues(alpha: 0.2),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: CustomPaint(
                        painter: TrendLinePainter(
                          points: [0.8, 0.6, 0.4, 0.3, 0.2],
                          color: Colors.red,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

// Update HomeScreen to use Selectors and extracted widgets
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  void _showSignInPrompt(BuildContext context, String feature) {
    showDialog(
      context: context,
      builder:
          (context) => AlertDialog(
            title: const Text('Sign In Required'),
            content: Text('Please sign in to access $feature.'),
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
      body: Stack(
        children: [
          // Translucent background image (should use singleton/provider)
          BackgroundImageService().buildBackgroundImage(),
          SafeArea(
            child: Stack(
              children: [
                // User Status Indicator (Top Left)
                Positioned(
                  top: 8,
                  left: 8,
                  child: Selector<AppStateService, Map<String, dynamic>>(
                    selector:
                        (_, state) => {
                          'isAuthenticated': state.isAuthenticated,
                          'userProfile': state.userProfile,
                        },
                    builder:
                        (context, data, child) => UserStatusIndicator(
                          isAuthenticated: data['isAuthenticated'] as bool,
                          userProfile:
                              data['userProfile'] as Map<String, dynamic>?,
                        ),
                  ),
                ),
                // Main Content
                ListView(
                  padding: const EdgeInsets.only(
                    left: 16,
                    right: 16,
                    bottom: 16,
                    top: 60,
                  ),
                  children: [
                    Selector<AppStateService, Map<String, dynamic>>(
                      selector:
                          (_, state) => {
                            'isAuthenticated': state.isAuthenticated,
                            'userProfile': state.userProfile,
                          },
                      builder:
                          (context, data, child) => WelcomeHeader(
                            isAuthenticated: data['isAuthenticated'] as bool,
                            userProfile:
                                data['userProfile'] as Map<String, dynamic>?,
                          ),
                    ),
                    const SizedBox(height: 20),
                    Selector<AppStateService, Map<String, dynamic>>(
                      selector:
                          (_, state) => {
                            'isAuthenticated': state.isAuthenticated,
                            'portfolio': state.portfolio,
                          },
                      builder:
                          (context, data, child) => PortfolioSection(
                            isAuthenticated: data['isAuthenticated'] as bool,
                            portfolio: data['portfolio'] as List<dynamic>,
                            onDeposit:
                                (data['isAuthenticated'] as bool)
                                    ? () {
                                      /* deposit logic */
                                    }
                                    : null,
                            onWithdraw:
                                (data['isAuthenticated'] as bool)
                                    ? () {
                                      /* withdraw logic */
                                    }
                                    : null,
                            onTrade:
                                (data['isAuthenticated'] as bool)
                                    ? () {
                                      context.go('/home/trade');
                                    }
                                    : null,
                            onShowSignInPrompt:
                                !(data['isAuthenticated'] as bool)
                                    ? (feature, ctx) =>
                                        _showSignInPrompt(ctx, feature)
                                    : null,
                            parentContext: context,
                          ),
                    ),
                    const SizedBox(height: 24),
                    Selector<AppStateService, dynamic>(
                      selector: (_, state) => state.marketData,
                      builder:
                          (context, marketData, child) =>
                              MarketOverviewSection(marketData: marketData),
                    ),
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
                        itemCount: 3, // mock 3 trending stocks
                        separatorBuilder: (_, __) => const SizedBox(width: 12),
                        itemBuilder: (context, i) {
                          final trending = [
                            {
                              'symbol': 'SCOM',
                              'name': 'Safaricom',
                              'price': 20.50,
                              'trend': [19.8, 20.0, 20.2, 20.5],
                            },
                            {
                              'symbol': 'KCB',
                              'name': 'KCB Group',
                              'price': 38.75,
                              'trend': [37.5, 38.0, 38.2, 38.75],
                            },
                            {
                              'symbol': 'EQTY',
                              'name': 'Equity Group',
                              'price': 42.80,
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
                  ],
                ),
                // Sign In/Sign Out Button (Top Right) - ensure this is last in the Stack
                Selector<AppStateService, bool>(
                  selector: (_, state) => state.isAuthenticated,
                  builder:
                      (context, isAuthenticated, child) => Positioned(
                        top: 8,
                        right: 8,
                        child: MouseRegion(
                          cursor: SystemMouseCursors.click,
                          child: GestureDetector(
                            onTap: () {
                              if (isAuthenticated) {
                                showDialog(
                                  context: context,
                                  builder:
                                      (context) => AlertDialog(
                                        title: const Text('Sign Out'),
                                        content: const Text(
                                          'Are you sure you want to sign out?',
                                        ),
                                        actions: [
                                          TextButton(
                                            onPressed:
                                                () => Navigator.pop(context),
                                            child: const Text('Cancel'),
                                          ),
                                          ElevatedButton(
                                            onPressed: () {
                                              Navigator.pop(context);
                                              Provider.of<AppStateService>(
                                                context,
                                                listen: false,
                                              ).signOut();
                                            },
                                            child: const Text('Sign Out'),
                                          ),
                                        ],
                                      ),
                                );
                              } else {
                                context.go('/login');
                              }
                            },
                            child: Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 12,
                                vertical: 6,
                              ),
                              decoration: BoxDecoration(
                                color: const Color(0xFFF4C542),
                                borderRadius: BorderRadius.circular(20),
                                boxShadow: [
                                  BoxShadow(
                                    color: const Color(
                                      0xFFF4C542,
                                    ).withOpacity(0.3),
                                    blurRadius: 4,
                                    offset: const Offset(0, 2),
                                  ),
                                ],
                                border: Border.all(
                                  color:
                                      Colors
                                          .red, // DEBUG: red border for visibility
                                  width: 2,
                                ),
                              ),
                              child: Text(
                                isAuthenticated ? 'Sign Out' : 'Sign In',
                                style: const TextStyle(
                                  color: Color(0xFF0B1A39),
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
