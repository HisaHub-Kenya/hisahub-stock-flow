import axios from 'axios';
import { getValidToken } from './auth';
import { sanitizeString, sanitizeNumber, sanitizeApiResponse, validateStockSymbol } from './security';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth interceptor
apiClient.interceptors.request.use(async (config) => {
  const token = await getValidToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle token refresh and sanitization
apiClient.interceptors.response.use(
  (response) => {
    // Sanitize response data
    if (response.data) {
      response.data = sanitizeApiResponse(response.data);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const token = await getValidToken();
      if (token) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      }
    }
    
    return Promise.reject(error);
  }
);

// API Endpoints
export const API_ENDPOINTS = {
  // Portfolio Management
  PORTFOLIO: {
    GET_SUMMARY: '/portfolio/summary/',
    DEPOSIT: '/portfolio/deposit/',
    WITHDRAW: '/portfolio/withdraw/',
    TRANSACTIONS: '/portfolio/transactions/',
  },
  
  // Trading
  TRADING: {
    PLACE_ORDER: '/trading/orders/',
    GET_ORDERS: '/trading/orders/',
    CANCEL_ORDER: '/trading/orders/{id}/cancel/',
    GET_POSITIONS: '/trading/positions/',
  },
  
  // Broker Integration
  BROKER: {
    GET_BROKERS: '/broker/brokers/',
    LINK_ACCOUNT: '/broker/link-account/',
    SUBMIT_KYC: '/broker/kyc/submit/',
    GET_ACCOUNTS: '/broker/accounts/',
    KYC_STATUS: '/broker/kyc/status/',
    PLACE_ORDER: '/broker/place-order/',
    GET_ORDERS: '/broker/orders/',
    GET_BALANCE: '/broker/accounts/{account_id}/balance/',
    SYNC_ACCOUNT: '/broker/accounts/{account_id}/sync/',
  },
  
  // Community
  COMMUNITY: {
    POSTS: '/community/posts/',
    LIKE_POST: '/community/posts/{id}/like/',
    FOLLOW_USER: '/community/users/{id}/follow/',
  },
  
  // Market Data
  MARKET: {
    STOCKS: '/market/stocks/',
    STOCK_DETAIL: '/market/stocks/{symbol}/',
    STOCK_PRICES: '/market/stocks/{symbol}/prices/',
    INDICES: '/market/indices/',
    NEWS: '/market/news/',
    STOCK_NEWS: '/market/news/{symbol}/',
    OVERVIEW: '/market/overview/',
  },
  
  // User Profile
  PROFILE: {
    GET: '/auth/profile/',
    UPDATE: '/auth/profile/',
  },
} as const;

// API Helper Functions
export const apiHelpers = {
  // Portfolio operations
  async depositFunds(amount: number, method: string = 'bank_transfer') {
    const response = await apiClient.post(API_ENDPOINTS.PORTFOLIO.DEPOSIT, {
      amount,
      method,
    });
    return response.data;
  },

  async withdrawFunds(amount: number, method: string = 'bank_transfer') {
    const response = await apiClient.post(API_ENDPOINTS.PORTFOLIO.WITHDRAW, {
      amount,
      method,
    });
    return response.data;
  },

  async getPortfolioSummary() {
    const response = await apiClient.get(API_ENDPOINTS.PORTFOLIO.GET_SUMMARY);
    return response.data;
  },

  async getTransactions(limit = 50, offset = 0) {
    const response = await apiClient.get(API_ENDPOINTS.PORTFOLIO.TRANSACTIONS, {
      params: { limit, offset },
    });
    return response.data;
  },

  // Trading operations
  async placeOrder(orderData: {
    symbol: string;
    quantity: number;
    order_type: 'market' | 'limit';
    side: 'buy' | 'sell';
    limit_price?: number;
  }) {
    const response = await apiClient.post(API_ENDPOINTS.TRADING.PLACE_ORDER, orderData);
    return response.data;
  },

  async getOrders(status?: string) {
    const response = await apiClient.get(API_ENDPOINTS.TRADING.GET_ORDERS, {
      params: status ? { status } : {},
    });
    return response.data;
  },

  async cancelOrder(orderId: string) {
    const response = await apiClient.post(
      API_ENDPOINTS.TRADING.CANCEL_ORDER.replace('{id}', orderId)
    );
    return response.data;
  },

  async getPositions() {
    const response = await apiClient.get(API_ENDPOINTS.TRADING.GET_POSITIONS);
    return response.data;
  },

  // Broker operations
  async linkBrokerAccount(brokerData: {
    broker_id: string;
    cds_number: string;
    password: string;
    otp?: string;
  }) {
    const response = await apiClient.post(API_ENDPOINTS.BROKER.LINK_ACCOUNT, brokerData);
    return response.data;
  },

  async submitKyc(kycData: {
    broker_id: string;
    full_name: string;
    id_number: string;
    kra_pin?: string;
    phone_number?: string;
    email?: string;
    bank_account?: string;
  }) {
    const response = await apiClient.post(API_ENDPOINTS.BROKER.SUBMIT_KYC, kycData);
    return response.data;
  },

  async getLinkedBrokers() {
    const response = await apiClient.get(API_ENDPOINTS.BROKER.GET_ACCOUNTS);
    return response.data;
  },

  // Community operations
  async createPost(content: string) {
    const response = await apiClient.post(API_ENDPOINTS.COMMUNITY.POSTS, { content });
    return response.data;
  },

  async getPosts(limit = 20, offset = 0) {
    const response = await apiClient.get(API_ENDPOINTS.COMMUNITY.POSTS, {
      params: { limit, offset },
    });
    return response.data;
  },

  async likePost(postId: string) {
    const response = await apiClient.post(
      API_ENDPOINTS.COMMUNITY.LIKE_POST.replace('{id}', postId)
    );
    return response.data;
  },

  async followUser(userId: string) {
    const response = await apiClient.post(
      API_ENDPOINTS.COMMUNITY.FOLLOW_USER.replace('{id}', userId)
    );
    return response.data;
  },

  async unfollowUser(userId: string) {
    const response = await apiClient.delete(
      API_ENDPOINTS.COMMUNITY.FOLLOW_USER.replace('{id}', userId)
    );
    return response.data;
  },

  // Market data operations
  async getStocks() {
    const response = await apiClient.get(API_ENDPOINTS.MARKET.STOCKS);
    return response.data;
  },

  async getMarketIndices() {
    const response = await apiClient.get(API_ENDPOINTS.MARKET.INDICES);
    return response.data;
  },

  async getStockDetail(symbol: string) {
    const response = await apiClient.get(
      API_ENDPOINTS.MARKET.STOCK_DETAIL.replace('{symbol}', symbol)
    );
    return response.data;
  },

  async getStockPrices(symbol: string) {
    const response = await apiClient.get(
      API_ENDPOINTS.MARKET.STOCK_PRICES.replace('{symbol}', symbol)
    );
    return response.data;
  },

  async getNews() {
    const response = await apiClient.get(API_ENDPOINTS.MARKET.NEWS);
    return response.data;
  },

  async getStockNews(symbol: string) {
    const response = await apiClient.get(
      API_ENDPOINTS.MARKET.STOCK_NEWS.replace('{symbol}', symbol)
    );
    return response.data;
  },

  async getMarketOverview() {
    const response = await apiClient.get(API_ENDPOINTS.MARKET.OVERVIEW);
    return response.data;
  },

  // Profile operations
  async getProfile() {
    const response = await apiClient.get(API_ENDPOINTS.PROFILE.GET);
    return response.data;
  },

  async updateProfile(updates: any) {
    const response = await apiClient.patch(API_ENDPOINTS.PROFILE.UPDATE, updates);
    return response.data;
  },

  // Broker integration operations
  async getBrokers() {
    const response = await apiClient.get(API_ENDPOINTS.BROKER.GET_BROKERS);
    return response.data;
  },

  async getBrokerAccounts() {
    const response = await apiClient.get(API_ENDPOINTS.BROKER.GET_ACCOUNTS);
    return response.data;
  },

  async getKycStatus() {
    const response = await apiClient.get(API_ENDPOINTS.BROKER.KYC_STATUS);
    return response.data;
  },

  async placeBrokerOrder(accountId: string, symbol: string, quantity: number, orderType: string, side: string) {
    const response = await apiClient.post(API_ENDPOINTS.BROKER.PLACE_ORDER, {
      account_id: accountId,
      symbol,
      quantity,
      order_type: orderType,
      side,
    });
    return response.data;
  },

  async getBrokerOrders(accountId?: string) {
    const response = await apiClient.get(API_ENDPOINTS.BROKER.GET_ORDERS, {
      params: accountId ? { account_id: accountId } : {},
    });
    return response.data;
  },

  async getBrokerBalance(accountId: string) {
    const response = await apiClient.get(
      API_ENDPOINTS.BROKER.GET_BALANCE.replace('{account_id}', accountId)
    );
    return response.data;
  },

  async syncBrokerAccount(accountId: string) {
    const response = await apiClient.post(
      API_ENDPOINTS.BROKER.SYNC_ACCOUNT.replace('{account_id}', accountId)
    );
    return response.data;
  },
};

// Error handling utility
export const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.message || error.response.data?.error || 'An error occurred';
    return { message, status: error.response.status };
  } else if (error.request) {
    // Request was made but no response received
    return { message: 'Network error. Please check your connection.', status: 0 };
  } else {
    // Something else happened
    return { message: error.message || 'An unexpected error occurred', status: 0 };
  }
};
