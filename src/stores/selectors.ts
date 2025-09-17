// Zustand selectors to optimize re-renders
import { useAppStore } from './useAppStore';

// User and auth selectors
export const useUser = () => useAppStore((state) => state.user);
export const useIsAuthenticated = () => useAppStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAppStore((state) => state.isLoading);

// Portfolio selectors
export const usePortfolioData = () => useAppStore((state) => state.portfolioData);
export const useHoldings = () => useAppStore((state) => state.holdings);
export const useTransactions = () => useAppStore((state) => state.transactions);
export const useOrders = () => useAppStore((state) => state.orders);

// Market data selectors
export const useStocks = () => useAppStore((state) => state.stocks);
export const useMarketIndices = () => useAppStore((state) => state.marketIndices);
export const useSelectedStock = () => useAppStore((state) => state.selectedStock);

// Action selectors
export const usePortfolioActions = () => useAppStore((state) => ({
  loadPortfolioData: state.loadPortfolioData,
  depositFunds: state.depositFunds,
  withdrawFunds: state.withdrawFunds,
}));

export const useTradingActions = () => useAppStore((state) => ({
  placeOrder: state.placeOrder,
  cancelOrder: state.cancelOrder,
  loadOrders: state.loadOrders,
}));

export const useMarketActions = () => useAppStore((state) => ({
  loadMarketData: state.loadMarketData,
  setSelectedStock: state.setSelectedStock,
}));

export const useUtilityActions = () => useAppStore((state) => ({
  refreshAllData: state.refreshAllData,
  logAnalytics: state.logAnalytics,
}));
