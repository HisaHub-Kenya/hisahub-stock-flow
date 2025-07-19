import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  static const String baseUrl =
      'https://your-backend-url.com'; // Update this to your backend URL

  Future<Map<String, dynamic>?> login(String email, String password) async {
    final url = Uri.parse('$baseUrl/api/auth/login/');
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      final token = data['token'];
      // Store token for future use
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('auth_token', token);
      return data;
    } else {
      // Handle error
      return null;
    }
  }

  Future<Map<String, dynamic>?> signup(
    String email,
    String password,
    String displayName,
  ) async {
    final url = Uri.parse('$baseUrl/api/auth/register/');
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'email': email,
        'password': password,
        'display_name': displayName,
      }),
    );

    if (response.statusCode == 201) {
      final data = jsonDecode(response.body);
      // Optionally store token if returned
      return data;
    } else {
      // Handle error
      return null;
    }
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('auth_token');
  }
}
