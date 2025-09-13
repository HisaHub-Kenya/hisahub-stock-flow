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
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: sanitizedEmail, 
        password: sanitizedPassword 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }

    const data = await response.json();
    this.saveTokens(data.tokens);
    this.saveUser(data.user);
    
    return data;
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
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register/`, {
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
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Registration failed');
    }

    const data = await response.json();
    this.saveTokens(data.tokens);
    this.saveUser(data.user);
    
    return data;
  }

  async logout(): Promise<void> {
    if (this.refreshToken) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/auth/logout/`, {
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
      return null;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: this.refreshToken }),
      });

      if (!response.ok) {
        this.clearTokens();
        return null;
      }

      const data = await response.json();
      this.accessToken = data.access;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', data.access);
      }
      
      return data.access;
    } catch (error) {
      console.error('Token refresh error:', error);
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
    return !!this.accessToken && !!this.user;
  }

  async getValidToken(): Promise<string | null> {
    if (!this.accessToken) {
      return null;
    }

    // Check if token is expired using secure utility
    if (isTokenExpired(this.accessToken)) {
      // Token expired, try to refresh
      return await this.refreshAccessToken();
    }
    
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
