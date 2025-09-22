  // Community user operations
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { getValidToken } from './auth';
import { logout as authLogout } from './auth';
import { sanitizeString, sanitizeNumber, sanitizeApiResponse, validateStockSymbol } from './security';

// API Configuration
// API_BASE_URL is now imported from config.ts

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
  try {
    const token = await getValidToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('[api] attaching Authorization header (masked)', `${String(token).slice(0,6)}...`);
    } else {
      console.log('[api] no token available for request to', config.url);
    }
  } catch (e) {
    console.error('[api] error getting valid token for request', e);
  }
  return config;
});

// Add response interceptor to handle token refresh and sanitization
apiClient.interceptors.response.use(
  (response) => {
    const contentType = response.headers['content-type'] || '';
    if (contentType.includes('application/json')) {
      response.data = response.data ? sanitizeApiResponse(response.data) : {};
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // Log error details for debugging
    if (error.response) {
      console.error('[api] Request failed:', {
        url: error.config?.url,
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error('[api] No response received:', error.request);
    } else {
      console.error('[api] Error setting up request:', error.message);
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = await getValidToken();
      if (token) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      }
    }
    try {
      if (error.response?.status === 401) {
        await authLogout();
        try { localStorage.removeItem('hisahub-store'); } catch (e) { }
      }
    } catch (e) {
      console.error('[api] error during auth cleanup', e);
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
  depositFunds: async (amount: number, method: string = 'bank_transfer') => (await apiClient.post(API_ENDPOINTS.PORTFOLIO.DEPOSIT, { amount, method })).data,
  getCommunityUsers: async () => (await apiClient.get('/community/users/')).data,
  getFollowedUsers: async () => (await apiClient.get('/community/users/followed/')).data,
  withdrawFunds: async (amount: number, method: string = 'bank_transfer') => (await apiClient.post(API_ENDPOINTS.PORTFOLIO.WITHDRAW, { amount, method })).data,
  getPortfolioSummary: async () => (await apiClient.get(API_ENDPOINTS.PORTFOLIO.GET_SUMMARY)).data,
  getTransactions: async (limit = 50, offset = 0) => (await apiClient.get(API_ENDPOINTS.PORTFOLIO.TRANSACTIONS, { params: { limit, offset } })).data,
  placeOrder: async (orderData: { symbol: string; quantity: number; order_type: 'market' | 'limit'; side: 'buy' | 'sell'; limit_price?: number }) => (await apiClient.post(API_ENDPOINTS.TRADING.PLACE_ORDER, orderData)).data,
  getOrders: async (status?: string) => (await apiClient.get(API_ENDPOINTS.TRADING.GET_ORDERS, { params: status ? { status } : {} })).data,
  cancelOrder: async (orderId: string) => (await apiClient.post(API_ENDPOINTS.TRADING.CANCEL_ORDER.replace('{id}', orderId))).data,
  getPositions: async () => (await apiClient.get(API_ENDPOINTS.TRADING.GET_POSITIONS)).data,
  linkBrokerAccount: async (brokerData: { broker_id: string; cds_number: string; password: string; otp?: string }) => (await apiClient.post(API_ENDPOINTS.BROKER.LINK_ACCOUNT, brokerData)).data,
  submitKyc: async (kycData: { broker_id: string; full_name: string; id_number: string; kra_pin?: string; phone_number?: string; email?: string; bank_account?: string }) => (await apiClient.post(API_ENDPOINTS.BROKER.SUBMIT_KYC, kycData)).data,
  getLinkedBrokers: async () => (await apiClient.get(API_ENDPOINTS.BROKER.GET_ACCOUNTS)).data,
  createPost: async (content: string) => (await apiClient.post(API_ENDPOINTS.COMMUNITY.POSTS, { content })).data,
  getPosts: async (limit = 20, offset = 0) => (await apiClient.get(API_ENDPOINTS.COMMUNITY.POSTS, { params: { limit, offset } })).data,
  likePost: async (postId: string) => (await apiClient.post(API_ENDPOINTS.COMMUNITY.LIKE_POST.replace('{id}', postId))).data,
  followUser: async (userId: string) => (await apiClient.post(API_ENDPOINTS.COMMUNITY.FOLLOW_USER.replace('{id}', userId))).data,
  unfollowUser: async (userId: string) => (await apiClient.delete(API_ENDPOINTS.COMMUNITY.FOLLOW_USER.replace('{id}', userId))).data,
  getStocks: async () => (await apiClient.get(API_ENDPOINTS.MARKET.STOCKS)).data,
  getMarketIndices: async () => (await apiClient.get(API_ENDPOINTS.MARKET.INDICES)).data,
  getStockDetail: async (symbol: string) => (await apiClient.get(API_ENDPOINTS.MARKET.STOCK_DETAIL.replace('{symbol}', symbol))).data,
  getStockPrices: async (symbol: string) => (await apiClient.get(API_ENDPOINTS.MARKET.STOCK_PRICES.replace('{symbol}', symbol))).data,
  getNews: async () => (await apiClient.get(API_ENDPOINTS.MARKET.NEWS)).data,
  getStockNews: async (symbol: string) => (await apiClient.get(API_ENDPOINTS.MARKET.STOCK_NEWS.replace('{symbol}', symbol))).data,
  getMarketOverview: async () => (await apiClient.get(API_ENDPOINTS.MARKET.OVERVIEW)).data,
  getProfile: async () => (await apiClient.get(API_ENDPOINTS.PROFILE.GET)).data,
  updateProfile: async (updates: any) => (await apiClient.patch(API_ENDPOINTS.PROFILE.UPDATE, updates)).data,
  getBrokers: async () => (await apiClient.get(API_ENDPOINTS.BROKER.GET_BROKERS)).data,
  getBrokerAccounts: async () => (await apiClient.get(API_ENDPOINTS.BROKER.GET_ACCOUNTS)).data,
  getKycStatus: async () => (await apiClient.get(API_ENDPOINTS.BROKER.KYC_STATUS)).data,
  placeBrokerOrder: async (accountId: string, symbol: string, quantity: number, orderType: string, side: string) => (await apiClient.post(API_ENDPOINTS.BROKER.PLACE_ORDER, { account_id: accountId, symbol, quantity, order_type: orderType, side })).data,
  getBrokerOrders: async (accountId?: string) => (await apiClient.get(API_ENDPOINTS.BROKER.GET_ORDERS, { params: accountId ? { account_id: accountId } : {} })).data,
  getBrokerBalance: async (accountId: string) => (await apiClient.get(API_ENDPOINTS.BROKER.GET_BALANCE.replace('{account_id}', accountId))).data,
  syncBrokerAccount: async (accountId: string) => (await apiClient.post(API_ENDPOINTS.BROKER.SYNC_ACCOUNT.replace('{account_id}', accountId))).data,
  // Broker integration operations






};

// Error handling utility
export const handleApiError = (error: any) => {
  if (error && error.response) {
    // Server responded with error status
    const message = error.response.data?.message || error.response.data?.error || 'An error occurred';
    return { message, status: error.response.status };
  } else if (error && error.request) {
    // Request was made but no response received
    return { message: 'Network error. Please check your connection.', status: 0 };
  } else if (error && error.message) {
    // Something else happened
    return { message: error.message, status: 0 };
  } else {
    // Unknown error type
    return { message: 'An unexpected error occurred', status: 0 };
  }
};
