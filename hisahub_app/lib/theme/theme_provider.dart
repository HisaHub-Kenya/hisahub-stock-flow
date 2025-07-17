import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'app_theme.dart';

class ThemeProvider extends ChangeNotifier {
  AppThemeMode _currentThemeMode = AppThemeMode.dark;

  AppThemeMode get currentThemeMode => _currentThemeMode;

  ThemeProvider() {
    _loadThemeFromStorage();
  }

  // Load theme from shared preferences
  Future<void> _loadThemeFromStorage() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final themeIndex =
          prefs.getInt('theme_mode') ?? 1; // Default to dark theme
      _currentThemeMode = AppThemeMode.values[themeIndex];
      notifyListeners();
    } catch (e) {
      print('Error loading theme: $e');
      // Keep default dark theme
    }
  }

  // Save theme to shared preferences
  Future<void> _saveThemeToStorage() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setInt('theme_mode', _currentThemeMode.index);
    } catch (e) {
      print('Error saving theme: $e');
    }
  }

  // Switch theme
  Future<void> switchTheme(AppThemeMode mode) async {
    if (_currentThemeMode != mode) {
      _currentThemeMode = mode;
      await _saveThemeToStorage();
      notifyListeners();
    }
  }

  // Toggle between light and dark themes
  Future<void> toggleTheme() async {
    if (_currentThemeMode == AppThemeMode.light) {
      await switchTheme(AppThemeMode.dark);
    } else if (_currentThemeMode == AppThemeMode.dark) {
      await switchTheme(AppThemeMode.light);
    } else {
      // If in high contrast, switch to light
      await switchTheme(AppThemeMode.light);
    }
  }

  // Enable high contrast mode
  Future<void> enableHighContrast() async {
    await switchTheme(AppThemeMode.highContrast);
  }

  // Disable high contrast mode (switch to dark)
  Future<void> disableHighContrast() async {
    await switchTheme(AppThemeMode.dark);
  }

  // Get current theme data
  ThemeData get currentTheme => AppTheme.currentTheme;

  // Check if current theme is dark
  bool get isDarkMode => AppTheme.isDarkMode;

  // Check if current theme is high contrast
  bool get isHighContrast => AppTheme.isHighContrast;

  // Get theme name for display
  String get themeName {
    switch (_currentThemeMode) {
      case AppThemeMode.light:
        return 'Light';
      case AppThemeMode.dark:
        return 'Dark';
      case AppThemeMode.highContrast:
        return 'High Contrast';
    }
  }

  // Get theme description
  String get themeDescription {
    switch (_currentThemeMode) {
      case AppThemeMode.light:
        return 'Clean light theme for daytime use';
      case AppThemeMode.dark:
        return 'Easy on the eyes dark theme';
      case AppThemeMode.highContrast:
        return 'High contrast for better accessibility';
    }
  }

  // Get theme icon
  IconData get themeIcon {
    switch (_currentThemeMode) {
      case AppThemeMode.light:
        return Icons.wb_sunny;
      case AppThemeMode.dark:
        return Icons.nightlight_round;
      case AppThemeMode.highContrast:
        return Icons.accessibility;
    }
  }
}
