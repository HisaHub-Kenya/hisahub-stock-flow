// Zustand selectors to optimize re-renders
import { useAppStore } from './useAppStore';
// User and auth selectors
export var useUser = function () { return useAppStore(function (state) { return state.user; }); };
export var useIsAuthenticated = function () { return useAppStore(function (state) { return state.isAuthenticated; }); };
export var useIsLoading = function () { return useAppStore(function (state) { return state.isLoading; }); };
// Portfolio selectors
export var usePortfolioData = function () { return useAppStore(function (state) { return state.portfolioData; }); };
export var useHoldings = function () { return useAppStore(function (state) { return state.holdings; }); };
export var useTransactions = function () { return useAppStore(function (state) { return state.transactions; }); };
export var useOrders = function () { return useAppStore(function (state) { return state.orders; }); };
// Market data selectors
export var useStocks = function () { return useAppStore(function (state) { return state.stocks; }); };
export var useMarketIndices = function () { return useAppStore(function (state) { return state.marketIndices; }); };
export var useSelectedStock = function () { return useAppStore(function (state) { return state.selectedStock; }); };
// Action selectors
export var usePortfolioActions = function () { return useAppStore(function (state) { return ({
    loadPortfolioData: state.loadPortfolioData,
    depositFunds: state.depositFunds,
    withdrawFunds: state.withdrawFunds,
}); }); };
export var useTradingActions = function () { return useAppStore(function (state) { return ({
    placeOrder: state.placeOrder,
    cancelOrder: state.cancelOrder,
    loadOrders: state.loadOrders,
}); }); };
export var useMarketActions = function () { return useAppStore(function (state) { return ({
    loadMarketData: state.loadMarketData,
    setSelectedStock: state.setSelectedStock,
}); }); };
export var useUtilityActions = function () { return useAppStore(function (state) { return ({
    refreshAllData: state.refreshAllData,
    logAnalytics: state.logAnalytics,
}); }); };
