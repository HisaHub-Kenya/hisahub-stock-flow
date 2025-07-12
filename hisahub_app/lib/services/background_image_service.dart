import 'package:flutter/material.dart';

class BackgroundImageService extends ChangeNotifier {
  static final BackgroundImageService _instance =
      BackgroundImageService._internal();
  factory BackgroundImageService() => _instance;
  BackgroundImageService._internal();

  final List<String> _backgroundImages = [
    'assets/bodabodariders.jpg',
    'assets/mamamboga.jpg',
    'assets/mtumbavendor.jpeg',
    'assets/juakali.webp',
  ];

  int _currentImageIndex = 0;
  double _opacity = 0.3;

  String get currentImage => _backgroundImages[_currentImageIndex];
  double get opacity => _opacity;

  void toggleImage() {
    _currentImageIndex = (_currentImageIndex + 1) % _backgroundImages.length;
    notifyListeners();
  }

  void setImage(int index) {
    if (index >= 0 && index < _backgroundImages.length) {
      _currentImageIndex = index;
      notifyListeners();
    }
  }

  void setOpacity(double opacity) {
    _opacity = opacity.clamp(0.1, 0.5);
    notifyListeners();
  }

  Widget buildBackgroundImage() {
    return Positioned.fill(
      child: Opacity(
        opacity: _opacity,
        child: Image.asset(currentImage, fit: BoxFit.cover),
      ),
    );
  }
}
