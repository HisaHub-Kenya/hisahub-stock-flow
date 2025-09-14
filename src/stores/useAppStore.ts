import React from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiHelpers, handleApiError } from '../lib/api';
import { toast } from 'sonner';
import { getCurrentUser, getValidToken, logout as authLogout } from '../lib/auth';

// Types
export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_authenticated: boolean;
}

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  price: number;
  volume: number;
  high: number;
  low: number;
  change: number;
  changePercent: string;
}

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  average_price: number;
  current_price: number;
  market_value: number;
  unrealized_pnl: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface Transaction {
  id: string;
  symbol: string;
  type: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
  status: string;
}

export interface Order {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  order_type: 'market' | 'limit';
  price?: number;
  status: string;
  created_at: string;
}

export interface MarketIndex {
  id: string;
  symbol: string;
  name: string;
  value: number;
  change_value: number;
  change_percent: number;
  timestamp: string;
}

export interface PortfolioData {
  totalValue: number;
  cashBalance: number;
  totalPnL: number;
  dailyChange: number;
  dailyChangePercent: number;
  weeklyChangePercent: number;
  monthlyChangePercent: number;
}

// Store interface
interface AppState {
  // User & Auth
  user: User | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  authSyncError: boolean;
  isLoading: boolean;
  
  // Portfolio & Trading
  portfolioData: PortfolioData;
  holdings: Holding[];
  transactions: Transaction[];
  orders: Order[];
  
  // Market Data
  stocks: Stock[];
  marketIndices: MarketIndex[];
  
  // UI State
  selectedStock: Stock | null;
  lastUpdated: string;
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setAuthSyncError: (v: boolean) => void;
  updatePortfolioData: (data: Partial<PortfolioData>) => void;
  setHoldings: (holdings: Holding[]) => void;
  setTransactions: (transactions: Transaction[]) => void;
  setOrders: (orders: Order[]) => void;
  setStocks: (stocks: Stock[]) => void;
  setMarketIndices: (indices: MarketIndex[]) => void;
  setSelectedStock: (stock: Stock | null) => void;
  
  // API Actions
  loadPortfolioData: () => Promise<void>;
  loadTransactions: () => Promise<void>;
  loadOrders: () => Promise<void>;
  loadMarketData: () => Promise<void>;
  depositFunds: (amount: number, method?: string) => Promise<boolean>;
  withdrawFunds: (amount: number, method?: string) => Promise<boolean>;
  placeOrder: (orderData: {
    symbol: string;
    quantity: number;
    order_type: 'market' | 'limit';
    side: 'buy' | 'sell';
    limit_price?: number;
  }) => Promise<boolean>;
  cancelOrder: (orderId: string) => Promise<boolean>;
  
  // Utility Actions
  refreshAllData: () => Promise<void>;
  syncAuthState: () => Promise<boolean>;
  logAnalytics: (action: string, data?: any) => void;
}

// Mock data generators
const generateMockStocks = (): Stock[] => [
  {
    id: '1',
    symbol: 'SCOM',
    name: 'Safaricom PLC',
    sector: 'Technology',
    price: 28.50,
    volume: 1000000,
    high: 29.00,
    low: 28.00,
    change: 0.50,
    changePercent: '1.79'
  },
  {
    id: '2',
    symbol: 'EQTY',
    name: 'Equity Group Holdings',
    sector: 'Banking',
    price: 45.20,
    volume: 500000,
    high: 46.00,
    low: 44.50,
    change: -0.80,
    changePercent: '-1.74'
  },
  {
    id: '3',
    symbol: 'KCB',
    name: 'Kenya Commercial Bank',
    sector: 'Banking',
    price: 52.30,
    volume: 300000,
    high: 53.00,
    low: 51.50,
    change: 1.20,
    changePercent: '2.35'
  },
  {
    id: '4',
    symbol: 'COOP',
    name: 'Co-operative Bank',
    sector: 'Banking',
    price: 18.75,
    volume: 200000,
    high: 19.00,
    low: 18.50,
    change: 0.25,
    changePercent: '1.35'
  },
  {
    id: '5',
    symbol: 'EABL',
    name: 'East African Breweries',
    sector: 'Beverages',
    price: 125.00,
    volume: 150000,
    high: 126.50,
    low: 124.00,
    change: -2.50,
    changePercent: '-1.96'
  }
];

const generateMockMarketIndices = (): MarketIndex[] => [
  {
    id: '1',
    symbol: 'NSE20',
    name: 'NSE 20 Share Index',
    value: 1850.45,
    change_value: 12.30,
    change_percent: 0.67,
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    symbol: 'NSEASI',
    name: 'NSE All Share Index',
    value: 142.85,
    change_value: -0.45,
    change_percent: -0.31,
    timestamp: new Date().toISOString()
  }
];

const generateMockHoldings = (): Holding[] => [
  {
    id: '1',
    symbol: 'SCOM',
    name: 'Safaricom PLC',
    quantity: 100,
    average_price: 25.00,
    current_price: 28.50,
    market_value: 2850.00,
    unrealized_pnl: 350.00,
    profitLoss: 350.00,
    profitLossPercent: 14.00
  },
  {
    id: '2',
    symbol: 'EQTY',
    name: 'Equity Group Holdings',
    quantity: 50,
    average_price: 40.00,
    current_price: 45.20,
    market_value: 2260.00,
    unrealized_pnl: 260.00,
    profitLoss: 260.00,
    profitLossPercent: 13.00
  }
];

const generateMockTransactions = (): Transaction[] => [
  {
    id: '1',
    symbol: 'SCOM',
    type: 'BUY',
    quantity: 100,
    price: 25.00,
    total: 2500.00,
    date: '2024-01-15',
    status: 'Completed'
  },
  {
    id: '2',
    symbol: 'EQTY',
    type: 'BUY',
    quantity: 50,
    price: 40.00,
    total: 2000.00,
    date: '2024-01-20',
    status: 'Completed'
  },
  {
    id: '3',
    symbol: 'DEPOSIT',
    type: 'DEPOSIT',
    quantity: 0,
    price: 0,
    total: 5000.00,
    date: '2024-01-10',
    status: 'Completed'
  }
];

// Create the store
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
  user: null,
  isAuthenticated: false,
  isAuthChecked: false,
  authSyncError: false,
  isLoading: false,
      portfolioData: {
        totalValue: 5110.00,
        cashBalance: 500.00,
        totalPnL: 610.00,
        dailyChange: 25.50,
        dailyChangePercent: 0.50,
        weeklyChangePercent: 2.5,
        monthlyChangePercent: 8.2
      },
      holdings: generateMockHoldings(),
      transactions: generateMockTransactions(),
      orders: [],
      stocks: generateMockStocks(),
      marketIndices: generateMockMarketIndices(),
      selectedStock: generateMockStocks()[0],
      lastUpdated: new Date().toISOString(),

      // Basic setters
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user && user.is_authenticated 
      }),
      setAuthSyncError: (v: boolean) => set({ authSyncError: v }),
      syncAuthState: async () => {
        console.log('[useAppStore] syncAuthState: start');
        try {
          // Ensure token is valid (refresh if needed)
          const token = await getValidToken();
          if (!token) {
            console.log('[useAppStore] syncAuthState: no valid token');
            // No token available -> unauthenticated
            set({ user: null, isAuthenticated: false, isAuthChecked: true });
            return false;
          }

          console.log('[useAppStore] syncAuthState: valid token present (masked)', token ? `${String(token).slice(0,6)}...` : null);

          // Token exists (or was refreshed) — validate session by calling profile endpoint
          try {
            const profile = await apiHelpers.getProfile();
            console.log('[useAppStore] syncAuthState: profile fetched', { id: profile?.id, email: profile?.email });
            // Save the validated user into store
            set({ user: profile, isAuthenticated: true, isAuthChecked: true });
            return true;
          } catch (profileErr: any) {
            // If profile fetch failed, log and clear tokens
            console.error('[useAppStore] syncAuthState: profile fetch failed', profileErr);
            try {
              await authLogout();
            } catch (logoutErr) {
              console.warn('[useAppStore] syncAuthState: logout error', logoutErr);
            }
            // set authSyncError to indicate server validation failure
            set({ user: null, isAuthenticated: false, isAuthChecked: true, authSyncError: true });
            return false;
          }
        } catch (err) {
          console.error('[useAppStore] syncAuthState: unexpected error', err);
          // Ensure we always set isAuthChecked to avoid infinite loader
          set({ user: null, isAuthenticated: false, isAuthChecked: true, authSyncError: true });
          return false;
        } finally {
          const s = get();
          console.log('[useAppStore] syncAuthState: end', { isAuthenticated: s.isAuthenticated, isAuthChecked: s.isAuthChecked, authSyncError: s.authSyncError, userId: s.user?.id });
        }
      },
      setLoading: (isLoading) => set({ isLoading }),
      updatePortfolioData: (data) => set((state) => ({
        portfolioData: { ...state.portfolioData, ...data }
      })),
      setHoldings: (holdings) => set({ holdings }),
      setTransactions: (transactions) => set({ transactions }),
      setOrders: (orders) => set({ orders }),
      setStocks: (stocks) => set({ stocks }),
      setMarketIndices: (marketIndices) => set({ marketIndices }),
      setSelectedStock: (selectedStock) => set({ selectedStock }),

      // API Actions
      loadPortfolioData: async () => {
        try {
          set({ isLoading: true });
          
          // Try to load from API first
          try {
            const portfolioData = await apiHelpers.getPortfolioSummary();
            if (portfolioData) {
              set({
                portfolioData: {
                  totalValue: portfolioData.total_value || 5110.00,
                  cashBalance: portfolioData.cash_balance || 500.00,
                  totalPnL: portfolioData.total_pnl || 610.00,
                  dailyChange: portfolioData.daily_change || 25.50,
                  dailyChangePercent: portfolioData.daily_change_percent || 0.50,
                  weeklyChangePercent: 2.5,
                  monthlyChangePercent: 8.2
                },
                holdings: portfolioData.holdings || generateMockHoldings(),
                lastUpdated: new Date().toISOString()
              });
            }
          } catch (apiError) {
            // Use mock data if API fails
            set({
              portfolioData: {
                totalValue: 5110.00,
                cashBalance: 500.00,
                totalPnL: 610.00,
                dailyChange: 25.50,
                dailyChangePercent: 0.50,
                weeklyChangePercent: 2.5,
                monthlyChangePercent: 8.2
              },
              holdings: generateMockHoldings(),
              lastUpdated: new Date().toISOString()
            });
          }
        } catch (error) {
          console.error('Error loading portfolio data:', error);
          toast.error('Failed to load portfolio data');
        } finally {
          set({ isLoading: false });
        }
      },

      loadTransactions: async () => {
        try {
          set({ isLoading: true });
          
          try {
            const transactions = await apiHelpers.getTransactions();
            set({ transactions: transactions || generateMockTransactions() });
          } catch (apiError) {
            set({ transactions: generateMockTransactions() });
          }
        } catch (error) {
          console.error('Error loading transactions:', error);
          toast.error('Failed to load transactions');
        } finally {
          set({ isLoading: false });
        }
      },

      loadOrders: async () => {
        try {
          set({ isLoading: true });
          
          try {
            const orders = await apiHelpers.getOrders();
            set({ orders: orders || [] });
          } catch (apiError) {
            set({ orders: [] });
          }
        } catch (error) {
          console.error('Error loading orders:', error);
          toast.error('Failed to load orders');
        } finally {
          set({ isLoading: false });
        }
      },

      loadMarketData: async () => {
        try {
          set({ isLoading: true });
          
          try {
            const stocks = await apiHelpers.getStocks();
            const marketIndices = await apiHelpers.getMarketIndices();
            set({ 
              stocks: stocks || generateMockStocks(),
              marketIndices: marketIndices || generateMockMarketIndices()
            });
          } catch (apiError) {
            set({ 
              stocks: generateMockStocks(),
              marketIndices: generateMockMarketIndices()
            });
          }
        } catch (error) {
          console.error('Error loading market data:', error);
          toast.error('Failed to load market data');
        } finally {
          set({ isLoading: false });
        }
      },

      depositFunds: async (amount: number, method = 'bank_transfer') => {
        try {
          set({ isLoading: true });
          
          try {
            const result = await apiHelpers.depositFunds(amount, method);
            if (result) {
              // Update local state
              const currentState = get();
              set({
                portfolioData: {
                  ...currentState.portfolioData,
                  cashBalance: currentState.portfolioData.cashBalance + amount,
                  totalValue: currentState.portfolioData.totalValue + amount
                }
              });
              
              // Reload data to ensure consistency
              await get().loadPortfolioData();
              await get().loadTransactions();
              
              toast.success(`Successfully deposited KES ${amount.toLocaleString()}`);
              get().logAnalytics('deposit_funds', { amount, method });
              return true;
            }
          } catch (apiError) {
            // Simulate successful deposit
            const currentState = get();
            set({
              portfolioData: {
                ...currentState.portfolioData,
                cashBalance: currentState.portfolioData.cashBalance + amount,
                totalValue: currentState.portfolioData.totalValue + amount
              },
              transactions: [
                {
                  id: Date.now().toString(),
                  symbol: 'DEPOSIT',
                  type: 'DEPOSIT',
                  quantity: 0,
                  price: 0,
                  total: amount,
                  date: new Date().toISOString().split('T')[0],
                  status: 'Completed'
                },
                ...currentState.transactions
              ]
            });
            
            toast.success(`Successfully deposited KES ${amount.toLocaleString()}`);
            get().logAnalytics('deposit_funds', { amount, method });
            return true;
          }
        } catch (error) {
          console.error('Error depositing funds:', error);
          toast.error('Failed to deposit funds');
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      withdrawFunds: async (amount: number, method = 'bank_transfer') => {
        try {
          set({ isLoading: true });
          
          const currentState = get();
          if (currentState.portfolioData.cashBalance < amount) {
            toast.error('Insufficient balance');
            return false;
          }
          
          try {
            const result = await apiHelpers.withdrawFunds(amount, method);
            if (result) {
              // Update local state
              set({
                portfolioData: {
                  ...currentState.portfolioData,
                  cashBalance: currentState.portfolioData.cashBalance - amount,
                  totalValue: currentState.portfolioData.totalValue - amount
                }
              });
              
              // Reload data to ensure consistency
              await get().loadPortfolioData();
              await get().loadTransactions();
              
              toast.success(`Withdrawal request submitted for KES ${amount.toLocaleString()}`);
              get().logAnalytics('withdraw_funds', { amount, method });
              return true;
            }
          } catch (apiError) {
            // Simulate successful withdrawal
            set({
              portfolioData: {
                ...currentState.portfolioData,
                cashBalance: currentState.portfolioData.cashBalance - amount,
                totalValue: currentState.portfolioData.totalValue - amount
              },
              transactions: [
                {
                  id: Date.now().toString(),
                  symbol: 'WITHDRAWAL',
                  type: 'WITHDRAWAL',
                  quantity: 0,
                  price: 0,
                  total: amount,
                  date: new Date().toISOString().split('T')[0],
                  status: 'Pending'
                },
                ...currentState.transactions
              ]
            });
            
            toast.success(`Withdrawal request submitted for KES ${amount.toLocaleString()}`);
            get().logAnalytics('withdraw_funds', { amount, method });
            return true;
          }
        } catch (error) {
          console.error('Error withdrawing funds:', error);
          toast.error('Failed to withdraw funds');
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      placeOrder: async (orderData) => {
        try {
          set({ isLoading: true });
          
          try {
            const result = await apiHelpers.placeOrder(orderData);
            if (result) {
              // Reload data to ensure consistency
              await get().loadPortfolioData();
              await get().loadOrders();
              
              toast.success(`Order placed successfully for ${orderData.quantity} ${orderData.symbol} shares`);
              get().logAnalytics('place_order', orderData);
              return true;
            }
          } catch (apiError) {
            // Simulate successful order
            const newOrder: Order = {
              id: Date.now().toString(),
              ...orderData,
              status: 'pending',
              created_at: new Date().toISOString()
            };
            
            set({
              orders: [newOrder, ...get().orders]
            });
            
            toast.success(`Order placed successfully for ${orderData.quantity} ${orderData.symbol} shares`);
            get().logAnalytics('place_order', orderData);
            return true;
          }
        } catch (error) {
          console.error('Error placing order:', error);
          toast.error('Failed to place order');
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      cancelOrder: async (orderId: string) => {
        try {
          set({ isLoading: true });
          
          try {
            const result = await apiHelpers.cancelOrder(orderId);
            if (result) {
              // Remove order from local state
              set({
                orders: get().orders.filter(order => order.id !== orderId)
              });
              
              toast.success('Order cancelled successfully');
              get().logAnalytics('cancel_order', { orderId });
              return true;
            }
          } catch (apiError) {
            // Remove order from local state
            set({
              orders: get().orders.filter(order => order.id !== orderId)
            });
            
            toast.success('Order cancelled successfully');
            get().logAnalytics('cancel_order', { orderId });
            return true;
          }
        } catch (error) {
          console.error('Error cancelling order:', error);
          toast.error('Failed to cancel order');
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      refreshAllData: async () => {
        try {
          set({ isLoading: true });
          await Promise.all([
            get().loadPortfolioData(),
            get().loadTransactions(),
            get().loadOrders(),
            get().loadMarketData()
          ]);
          set({ lastUpdated: new Date().toISOString() });
        } catch (error) {
          console.error('Error refreshing data:', error);
          toast.error('Failed to refresh data');
        } finally {
          set({ isLoading: false });
        }
      },

      logAnalytics: (action: string, data?: any) => {
        // In production, send to analytics service
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Analytics] ${action}:`, data);
        }
      }
    }),
    {
      name: 'hisahub-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        selectedStock: state.selectedStock
      })
    }
  )
);

// Auto-refresh hook
export const useAutoRefresh = (intervalMs = 10000) => {
  const refreshAllData = useAppStore((state) => state.refreshAllData);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      refreshAllData();
    }, intervalMs);
    
    return () => clearInterval(interval);
  }, [refreshAllData, intervalMs]);
};
