import 'package:flutter/material.dart';

// Theme modes
enum AppThemeMode { light, dark, highContrast }

// Custom color schemes
class HisaHubColors {
  // Primary colors
  static const Color primaryBlue = Color(0xFF0B1A39);
  static const Color primaryYellow = Color(0xFFF4C542);
  static const Color primaryGold = Color(0xFFFFD54F);

  // Light theme colors
  static const Color lightBackground = Color(0xFFF8F9FA);
  static const Color lightSurface = Color(0xFFFFFFFF);
  static const Color lightCard = Color(0xFFFFFFFF);
  static const Color lightText = Color(0xFF1A1A1A);
  static const Color lightTextSecondary = Color(0xFF666666);
  static const Color lightBorder = Color(0xFFE0E0E0);
  static const Color lightDivider = Color(0xFFF0F0F0);

  // Dark theme colors
  static const Color darkBackground = Color(0xFF0B1A39);
  static const Color darkSurface = Color(0xFF1A2332);
  static const Color darkCard = Color(0xFF2A3441);
  static const Color darkText = Color(0xFFFFFFFF);
  static const Color darkTextSecondary = Color(0xFFB0B0B0);
  static const Color darkBorder = Color(0xFF3A4A5A);
  static const Color darkDivider = Color(0xFF2A3441);

  // High contrast colors
  static const Color highContrastBackground = Color(0xFF000000);
  static const Color highContrastSurface = Color(0xFF1A1A1A);
  static const Color highContrastCard = Color(0xFF2A2A2A);
  static const Color highContrastText = Color(0xFFFFFFFF);
  static const Color highContrastTextSecondary = Color(0xFFCCCCCC);
  static const Color highContrastBorder = Color(0xFFFFFFFF);
  static const Color highContrastDivider = Color(0xFF404040);
  static const Color highContrastAccent = Color(0xFFFFEB3B);

  // Success/Error colors
  static const Color success = Color(0xFF4CAF50);
  static const Color error = Color(0xFFF44336);
  static const Color warning = Color(0xFFFF9800);
  static const Color info = Color(0xFF2196F3);

  // Market colors
  static const Color marketGain = Color(0xFF4CAF50);
  static const Color marketLoss = Color(0xFFF44336);
  static const Color marketNeutral = Color(0xFF9E9E9E);
}

class AppTheme {
  static AppThemeMode _currentThemeMode = AppThemeMode.dark;

  static AppThemeMode get currentThemeMode => _currentThemeMode;

  static void setThemeMode(AppThemeMode mode) {
    _currentThemeMode = mode;
  }

  // Light theme
  static ThemeData get lightTheme {
    return ThemeData(
      brightness: Brightness.light,
      primaryColor: HisaHubColors.primaryBlue,
      colorScheme: const ColorScheme.light(
        primary: HisaHubColors.primaryBlue,
        secondary: HisaHubColors.primaryYellow,
        surface: HisaHubColors.lightSurface,
        onPrimary: Colors.white,
        onSecondary: HisaHubColors.primaryBlue,
        onSurface: HisaHubColors.lightText,
      ),
      scaffoldBackgroundColor: HisaHubColors.lightBackground,
      cardColor: HisaHubColors.lightCard,
      dividerColor: HisaHubColors.lightDivider,
      textTheme: const TextTheme(
        displayLarge: TextStyle(color: HisaHubColors.lightText),
        displayMedium: TextStyle(color: HisaHubColors.lightText),
        displaySmall: TextStyle(color: HisaHubColors.lightText),
        headlineLarge: TextStyle(color: HisaHubColors.lightText),
        headlineMedium: TextStyle(color: HisaHubColors.lightText),
        headlineSmall: TextStyle(color: HisaHubColors.lightText),
        titleLarge: TextStyle(color: HisaHubColors.lightText),
        titleMedium: TextStyle(color: HisaHubColors.lightText),
        titleSmall: TextStyle(color: HisaHubColors.lightText),
        bodyLarge: TextStyle(color: HisaHubColors.lightText),
        bodyMedium: TextStyle(color: HisaHubColors.lightText),
        bodySmall: TextStyle(color: HisaHubColors.lightTextSecondary),
        labelLarge: TextStyle(color: HisaHubColors.lightText),
        labelMedium: TextStyle(color: HisaHubColors.lightText),
        labelSmall: TextStyle(color: HisaHubColors.lightTextSecondary),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: HisaHubColors.primaryYellow,
          foregroundColor: HisaHubColors.primaryBlue,
          minimumSize: const Size(48, 48),
          textStyle: const TextStyle(fontWeight: FontWeight.bold),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      ),
      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: HisaHubColors.primaryYellow,
        foregroundColor: HisaHubColors.primaryBlue,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: HisaHubColors.lightSurface,
        foregroundColor: HisaHubColors.lightText,
        elevation: 0,
        shadowColor: Colors.transparent,
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: HisaHubColors.lightSurface,
        selectedItemColor: HisaHubColors.primaryYellow,
        unselectedItemColor: HisaHubColors.lightTextSecondary,
        type: BottomNavigationBarType.fixed,
        elevation: 8,
      ),
      cardTheme: CardTheme(
        color: HisaHubColors.lightCard,
        elevation: 2,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: HisaHubColors.lightCard,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: HisaHubColors.lightBorder),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: HisaHubColors.lightBorder),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(
            color: HisaHubColors.primaryYellow,
            width: 2,
          ),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: HisaHubColors.error),
        ),
      ),
      // Accessibility features
      visualDensity: VisualDensity.adaptivePlatformDensity,
      useMaterial3: true,
    );
  }

  // Dark theme
  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      primaryColor: HisaHubColors.primaryBlue,
      colorScheme: const ColorScheme.dark(
        primary: HisaHubColors.primaryBlue,
        secondary: HisaHubColors.primaryYellow,
        surface: HisaHubColors.darkSurface,
        onPrimary: Colors.white,
        onSecondary: HisaHubColors.primaryBlue,
        onSurface: HisaHubColors.darkText,
      ),
      scaffoldBackgroundColor: HisaHubColors.darkBackground,
      cardColor: HisaHubColors.darkCard,
      dividerColor: HisaHubColors.darkDivider,
      textTheme: const TextTheme(
        displayLarge: TextStyle(color: HisaHubColors.darkText),
        displayMedium: TextStyle(color: HisaHubColors.darkText),
        displaySmall: TextStyle(color: HisaHubColors.darkText),
        headlineLarge: TextStyle(color: HisaHubColors.darkText),
        headlineMedium: TextStyle(color: HisaHubColors.darkText),
        headlineSmall: TextStyle(color: HisaHubColors.darkText),
        titleLarge: TextStyle(color: HisaHubColors.darkText),
        titleMedium: TextStyle(color: HisaHubColors.darkText),
        titleSmall: TextStyle(color: HisaHubColors.darkText),
        bodyLarge: TextStyle(color: HisaHubColors.darkText),
        bodyMedium: TextStyle(color: HisaHubColors.darkText),
        bodySmall: TextStyle(color: HisaHubColors.darkTextSecondary),
        labelLarge: TextStyle(color: HisaHubColors.darkText),
        labelMedium: TextStyle(color: HisaHubColors.darkText),
        labelSmall: TextStyle(color: HisaHubColors.darkTextSecondary),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: HisaHubColors.primaryYellow,
          foregroundColor: HisaHubColors.primaryBlue,
          minimumSize: const Size(48, 48),
          textStyle: const TextStyle(fontWeight: FontWeight.bold),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      ),
      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: HisaHubColors.primaryYellow,
        foregroundColor: HisaHubColors.primaryBlue,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: HisaHubColors.darkSurface,
        foregroundColor: HisaHubColors.darkText,
        elevation: 0,
        shadowColor: Colors.transparent,
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: HisaHubColors.darkSurface,
        selectedItemColor: HisaHubColors.primaryYellow,
        unselectedItemColor: HisaHubColors.darkTextSecondary,
        type: BottomNavigationBarType.fixed,
        elevation: 8,
      ),
      cardTheme: CardTheme(
        color: HisaHubColors.darkCard,
        elevation: 2,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: HisaHubColors.darkCard,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: HisaHubColors.darkBorder),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: HisaHubColors.darkBorder),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(
            color: HisaHubColors.primaryYellow,
            width: 2,
          ),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: HisaHubColors.error),
        ),
      ),
      // Accessibility features
      visualDensity: VisualDensity.adaptivePlatformDensity,
      useMaterial3: true,
    );
  }

  // High contrast theme
  static ThemeData get highContrastTheme {
    return ThemeData(
      brightness: Brightness.dark,
      primaryColor: HisaHubColors.highContrastAccent,
      colorScheme: const ColorScheme.dark(
        primary: HisaHubColors.highContrastAccent,
        secondary: HisaHubColors.highContrastAccent,
        surface: HisaHubColors.highContrastSurface,
        onPrimary: HisaHubColors.highContrastBackground,
        onSecondary: HisaHubColors.highContrastBackground,
        onSurface: HisaHubColors.highContrastText,
      ),
      scaffoldBackgroundColor: HisaHubColors.highContrastBackground,
      cardColor: HisaHubColors.highContrastCard,
      dividerColor: HisaHubColors.highContrastDivider,
      textTheme: const TextTheme(
        displayLarge: TextStyle(color: HisaHubColors.highContrastText),
        displayMedium: TextStyle(color: HisaHubColors.highContrastText),
        displaySmall: TextStyle(color: HisaHubColors.highContrastText),
        headlineLarge: TextStyle(color: HisaHubColors.highContrastText),
        headlineMedium: TextStyle(color: HisaHubColors.highContrastText),
        headlineSmall: TextStyle(color: HisaHubColors.highContrastText),
        titleLarge: TextStyle(color: HisaHubColors.highContrastText),
        titleMedium: TextStyle(color: HisaHubColors.highContrastText),
        titleSmall: TextStyle(color: HisaHubColors.highContrastText),
        bodyLarge: TextStyle(color: HisaHubColors.highContrastText),
        bodyMedium: TextStyle(color: HisaHubColors.highContrastText),
        bodySmall: TextStyle(color: HisaHubColors.highContrastTextSecondary),
        labelLarge: TextStyle(color: HisaHubColors.highContrastText),
        labelMedium: TextStyle(color: HisaHubColors.highContrastText),
        labelSmall: TextStyle(color: HisaHubColors.highContrastTextSecondary),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: HisaHubColors.highContrastAccent,
          foregroundColor: HisaHubColors.highContrastBackground,
          minimumSize: const Size(48, 48),
          textStyle: const TextStyle(fontWeight: FontWeight.bold),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      ),
      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: HisaHubColors.highContrastAccent,
        foregroundColor: HisaHubColors.highContrastBackground,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: HisaHubColors.highContrastSurface,
        foregroundColor: HisaHubColors.highContrastText,
        elevation: 0,
        shadowColor: Colors.transparent,
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: HisaHubColors.highContrastSurface,
        selectedItemColor: HisaHubColors.highContrastAccent,
        unselectedItemColor: HisaHubColors.highContrastTextSecondary,
        type: BottomNavigationBarType.fixed,
        elevation: 8,
      ),
      cardTheme: CardTheme(
        color: HisaHubColors.highContrastCard,
        elevation: 2,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: HisaHubColors.highContrastCard,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: HisaHubColors.highContrastBorder),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: HisaHubColors.highContrastBorder),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(
            color: HisaHubColors.highContrastAccent,
            width: 2,
          ),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: HisaHubColors.error),
        ),
      ),
      // Enhanced accessibility features for high contrast
      visualDensity: VisualDensity.adaptivePlatformDensity,
      useMaterial3: true,
    );
  }

  // Get current theme based on mode
  static ThemeData get currentTheme {
    switch (_currentThemeMode) {
      case AppThemeMode.light:
        return lightTheme;
      case AppThemeMode.dark:
        return darkTheme;
      case AppThemeMode.highContrast:
        return highContrastTheme;
    }
  }

  // Check if current theme is dark
  static bool get isDarkMode {
    return _currentThemeMode == AppThemeMode.dark ||
        _currentThemeMode == AppThemeMode.highContrast;
  }

  // Check if current theme is high contrast
  static bool get isHighContrast {
    return _currentThemeMode == AppThemeMode.highContrast;
  }
}
