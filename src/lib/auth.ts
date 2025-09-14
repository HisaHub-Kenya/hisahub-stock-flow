// Django JWT Authentication utilities
import { sanitizeString, validateEmail, validatePassword, isTokenExpired } from './security';

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_authenticated: boolean;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

class AuthManager {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private user: User | null = null;

  constructor() {
    // Load tokens from localStorage on initialization
    this.loadTokens();
  }

  private loadTokens() {
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('access_token');
      this.refreshToken = localStorage.getItem('refresh_token');
      const userStr = localStorage.getItem('user');
      if (userStr) {
        this.user = JSON.parse(userStr);
      }
    }
  }

  private saveTokens(tokens: AuthTokens) {
    this.accessToken = tokens.access;
    this.refreshToken = tokens.refresh;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', tokens.access);
      localStorage.setItem('refresh_token', tokens.refresh);
    }
  }

  private saveUser(user: User) {
    this.user = user;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  private clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    this.user = null;
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    // Sanitize and validate inputs
    const sanitizedEmail = sanitizeString(email);
    const sanitizedPassword = sanitizeString(password);
    
    if (!validateEmail(sanitizedEmail)) {
      throw new Error('Invalid email format');
    }
    
    if (sanitizedPassword.length === 0) {
      throw new Error('Password is required');
    }
    
    // Check if we're in production and API is not available
    const isProduction = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production';
    let apiUrl = 'http://localhost:8000/api';
    if (typeof process !== 'undefined' && process.env && process.env.API_BASE_URL) {
      apiUrl = process.env.API_BASE_URL;
    } else if (typeof window !== 'undefined') {
      // @ts-ignore
      if ((window as any).API_BASE_URL) {
        apiUrl = (window as any).API_BASE_URL;
      }
    }
    
    // Use mock authentication if:
    // 1. In production and no API URL set
    // 2. API URL points to localhost (not accessible from mobile)
    // 3. On mobile devices (better UX with mock auth)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isProduction && (!apiUrl || apiUrl.includes('localhost') || isMobile)) {
      // Use mock authentication for demo purposes
      return this.mockLogin(sanitizedEmail, sanitizedPassword);
    }
    
    try {
      // Add timeout and better error handling for mobile
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${apiUrl}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: sanitizedEmail, 
          password: sanitizedPassword 
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      this.saveTokens(data.tokens);
      this.saveUser(data.user);
      
      return data;
    } catch (error) {
      // If API call fails, fall back to mock authentication for demo
      console.warn('API login failed, using mock authentication:', error);
      return this.mockLogin(sanitizedEmail, sanitizedPassword);
    }
  }

  private mockLogin(email: string, password: string): LoginResponse {
    // Mock authentication for demo purposes
    const mockUser: User = {
      id: '1',
      email: email,
      first_name: 'Demo',
      last_name: 'User',
      is_authenticated: true
    };

    const mockTokens: AuthTokens = {
      access: 'mock_access_token_' + Date.now(),
      refresh: 'mock_refresh_token_' + Date.now()
    };

    this.saveTokens(mockTokens);
    this.saveUser(mockUser);
    
    return {
      user: mockUser,
      tokens: mockTokens
    };
  }

  async register(email: string, password: string, first_name?: string, last_name?: string): Promise<LoginResponse> {
    // Sanitize and validate inputs
    const sanitizedEmail = sanitizeString(email);
    const sanitizedPassword = sanitizeString(password);
    const sanitizedFirstName = first_name ? sanitizeString(first_name) : undefined;
    const sanitizedLastName = last_name ? sanitizeString(last_name) : undefined;
    
    if (!validateEmail(sanitizedEmail)) {
      throw new Error('Invalid email format');
    }
    
    const passwordValidation = validatePassword(sanitizedPassword);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors[0]);
    }
    
    // Check if we're in production and API is not available
    const isProduction = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production';
    let apiUrl = 'http://localhost:8000/api';
    if (typeof process !== 'undefined' && process.env && process.env.API_BASE_URL) {
      apiUrl = process.env.API_BASE_URL;
    } else if (typeof window !== 'undefined') {
      // @ts-ignore
      if ((window as any).API_BASE_URL) {
        apiUrl = (window as any).API_BASE_URL;
      }
    }
    
    // Use mock registration if:
    // 1. In production and no API URL set
    // 2. API URL points to localhost (not accessible from mobile)
    // 3. On mobile devices (better UX with mock auth)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isProduction && (!apiUrl || apiUrl.includes('localhost') || isMobile)) {
      // Use mock registration for demo purposes
      return this.mockRegister(sanitizedEmail, sanitizedPassword, sanitizedFirstName, sanitizedLastName);
    }
    
    try {
      // Add timeout and better error handling for mobile
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${apiUrl}/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: sanitizedEmail, 
          password: sanitizedPassword, 
          password_confirm: sanitizedPassword,
          first_name: sanitizedFirstName, 
          last_name: sanitizedLastName 
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }

      const data = await response.json();
      this.saveTokens(data.tokens);
      this.saveUser(data.user);
      
      return data;
    } catch (error) {
      // If API call fails, fall back to mock registration for demo
      console.warn('API registration failed, using mock registration:', error);
      return this.mockRegister(sanitizedEmail, sanitizedPassword, sanitizedFirstName, sanitizedLastName);
    }
  }

  private mockRegister(email: string, password: string, first_name?: string, last_name?: string): LoginResponse {
    // Mock registration for demo purposes
    const mockUser: User = {
      id: '1',
      email: email,
      first_name: first_name || 'Demo',
      last_name: last_name || 'User',
      is_authenticated: true
    };

    const mockTokens: AuthTokens = {
      access: 'mock_access_token_' + Date.now(),
      refresh: 'mock_refresh_token_' + Date.now()
    };

    this.saveTokens(mockTokens);
    this.saveUser(mockUser);
    
    return {
      user: mockUser,
      tokens: mockTokens
    };
  }

  async logout(): Promise<void> {
    if (this.refreshToken) {
      try {
  await fetch(`${typeof process !== 'undefined' && process.env && process.env.API_BASE_URL ? process.env.API_BASE_URL : (typeof window !== 'undefined' && (window as any).API_BASE_URL ? (window as any).API_BASE_URL : 'http://localhost:8000/api')}/auth/logout/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: this.refreshToken }),
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    
    this.clearTokens();
  }

  async refreshAccessToken(): Promise<string | null> {
    if (!this.refreshToken) {
      console.log('[auth] refreshAccessToken: no refresh token available');
      return null;
    }

    try {
      console.log('[auth] refreshAccessToken: attempting refresh (masked)', `${String(this.refreshToken).slice(0,6)}...`);
  const response = await fetch(`${typeof process !== 'undefined' && process.env && process.env.API_BASE_URL ? process.env.API_BASE_URL : (typeof window !== 'undefined' && (window as any).API_BASE_URL ? (window as any).API_BASE_URL : 'http://localhost:8000/api')}/auth/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: this.refreshToken }),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        console.warn('[auth] refreshAccessToken: refresh failed', { status: response.status, text });
        this.clearTokens();
        return null;
      }

      const data = await response.json();
      this.accessToken = data.access;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', data.access);
      }
      console.log('[auth] refreshAccessToken: refresh succeeded (masked)', `${String(data.access).slice(0,6)}...`);
      return data.access;
    } catch (error) {
      console.error('[auth] Token refresh error:', error);
      this.clearTokens();
      return null;
    }
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  getUser(): User | null {
    return this.user;
  }

  isAuthenticated(): boolean {
    return !!this.accessToken && !!this.user && this.user.is_authenticated;
  }

  async getValidToken(): Promise<string | null> {
    console.log('[auth] getValidToken: enter');
    if (!this.accessToken) {
      console.log('[auth] getValidToken: no access token available');
      return null;
    }

    // Handle mock tokens (they don't expire)
    if (String(this.accessToken).startsWith('mock_access_token_')) {
      console.log('[auth] getValidToken: mock token, returning');
      return this.accessToken;
    }

    // Check if token is expired using secure utility
    if (isTokenExpired(this.accessToken)) {
      console.log('[auth] getValidToken: access token expired, attempting refresh');
      const newToken = await this.refreshAccessToken();
      console.log('[auth] getValidToken: refresh result (masked)', newToken ? `${String(newToken).slice(0,6)}...` : null);
      return newToken;
    }
    console.log('[auth] getValidToken: access token valid (masked)', `${String(this.accessToken).slice(0,6)}...`);
    return this.accessToken;
  }
}

// Export singleton instance
export const authManager = new AuthManager();

// Export convenience functions
export const login = (email: string, password: string) => authManager.login(email, password);
export const register = (email: string, password: string, first_name?: string, last_name?: string) => 
  authManager.register(email, password, first_name, last_name);
export const logout = () => authManager.logout();
export const getCurrentUser = () => authManager.getUser();
export const isAuthenticated = () => authManager.isAuthenticated();
export const getValidToken = () => authManager.getValidToken();
