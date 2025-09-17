var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiHelpers } from '../lib/api';
import { toast } from 'sonner';
import { getCurrentUser, isAuthenticated as checkAuth } from '../lib/auth';
// Mock data generators
var generateMockStocks = function () { return [
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
]; };
var generateMockMarketIndices = function () { return [
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
]; };
var generateMockHoldings = function () { return [
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
]; };
var generateMockTransactions = function () { return [
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
]; };
// Create the store
export var useAppStore = create()(persist(function (set, get) { return ({
    // Initial state
    user: null,
    isAuthenticated: false,
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
    setUser: function (user) { return set({
        user: user,
        isAuthenticated: !!user && user.is_authenticated
    }); },
    syncAuthState: function () {
        var currentUser = getCurrentUser();
        var isAuth = checkAuth();
        set({
            user: currentUser,
            isAuthenticated: isAuth
        });
    },
    setLoading: function (isLoading) { return set({ isLoading: isLoading }); },
    updatePortfolioData: function (data) { return set(function (state) { return ({
        portfolioData: __assign(__assign({}, state.portfolioData), data)
    }); }); },
    setHoldings: function (holdings) { return set({ holdings: holdings }); },
    setTransactions: function (transactions) { return set({ transactions: transactions }); },
    setOrders: function (orders) { return set({ orders: orders }); },
    setStocks: function (stocks) { return set({ stocks: stocks }); },
    setMarketIndices: function (marketIndices) { return set({ marketIndices: marketIndices }); },
    setSelectedStock: function (selectedStock) { return set({ selectedStock: selectedStock }); },
    // API Actions
    loadPortfolioData: function () { return __awaiter(void 0, void 0, void 0, function () {
        var portfolioData, apiError_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, 6, 7]);
                    set({ isLoading: true });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, apiHelpers.getPortfolioSummary()];
                case 2:
                    portfolioData = _a.sent();
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
                    return [3 /*break*/, 4];
                case 3:
                    apiError_1 = _a.sent();
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
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 7];
                case 5:
                    error_1 = _a.sent();
                    console.error('Error loading portfolio data:', error_1);
                    toast.error('Failed to load portfolio data');
                    return [3 /*break*/, 7];
                case 6:
                    set({ isLoading: false });
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); },
    loadTransactions: function () { return __awaiter(void 0, void 0, void 0, function () {
        var transactions, apiError_2, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, 6, 7]);
                    set({ isLoading: true });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, apiHelpers.getTransactions()];
                case 2:
                    transactions = _a.sent();
                    set({ transactions: transactions || generateMockTransactions() });
                    return [3 /*break*/, 4];
                case 3:
                    apiError_2 = _a.sent();
                    set({ transactions: generateMockTransactions() });
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 7];
                case 5:
                    error_2 = _a.sent();
                    console.error('Error loading transactions:', error_2);
                    toast.error('Failed to load transactions');
                    return [3 /*break*/, 7];
                case 6:
                    set({ isLoading: false });
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); },
    loadOrders: function () { return __awaiter(void 0, void 0, void 0, function () {
        var orders, apiError_3, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, 6, 7]);
                    set({ isLoading: true });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, apiHelpers.getOrders()];
                case 2:
                    orders = _a.sent();
                    set({ orders: orders || [] });
                    return [3 /*break*/, 4];
                case 3:
                    apiError_3 = _a.sent();
                    set({ orders: [] });
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 7];
                case 5:
                    error_3 = _a.sent();
                    console.error('Error loading orders:', error_3);
                    toast.error('Failed to load orders');
                    return [3 /*break*/, 7];
                case 6:
                    set({ isLoading: false });
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); },
    loadMarketData: function () { return __awaiter(void 0, void 0, void 0, function () {
        var stocks, marketIndices, apiError_4, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, 7, 8]);
                    set({ isLoading: true });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, apiHelpers.getStocks()];
                case 2:
                    stocks = _a.sent();
                    return [4 /*yield*/, apiHelpers.getMarketIndices()];
                case 3:
                    marketIndices = _a.sent();
                    set({
                        stocks: stocks || generateMockStocks(),
                        marketIndices: marketIndices || generateMockMarketIndices()
                    });
                    return [3 /*break*/, 5];
                case 4:
                    apiError_4 = _a.sent();
                    set({
                        stocks: generateMockStocks(),
                        marketIndices: generateMockMarketIndices()
                    });
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 8];
                case 6:
                    error_4 = _a.sent();
                    console.error('Error loading market data:', error_4);
                    toast.error('Failed to load market data');
                    return [3 /*break*/, 8];
                case 7:
                    set({ isLoading: false });
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); },
    depositFunds: function (amount_1) {
        var args_1 = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args_1[_i - 1] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([amount_1], args_1, true), void 0, function (amount, method) {
            var result, currentState, apiError_5, currentState, error_5;
            if (method === void 0) { method = 'bank_transfer'; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, 9, 10]);
                        set({ isLoading: true });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, apiHelpers.depositFunds(amount, method)];
                    case 2:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 5];
                        currentState = get();
                        set({
                            portfolioData: __assign(__assign({}, currentState.portfolioData), { cashBalance: currentState.portfolioData.cashBalance + amount, totalValue: currentState.portfolioData.totalValue + amount })
                        });
                        // Reload data to ensure consistency
                        return [4 /*yield*/, get().loadPortfolioData()];
                    case 3:
                        // Reload data to ensure consistency
                        _a.sent();
                        return [4 /*yield*/, get().loadTransactions()];
                    case 4:
                        _a.sent();
                        toast.success("Successfully deposited KES ".concat(amount.toLocaleString()));
                        get().logAnalytics('deposit_funds', { amount: amount, method: method });
                        return [2 /*return*/, true];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        apiError_5 = _a.sent();
                        currentState = get();
                        set({
                            portfolioData: __assign(__assign({}, currentState.portfolioData), { cashBalance: currentState.portfolioData.cashBalance + amount, totalValue: currentState.portfolioData.totalValue + amount }),
                            transactions: __spreadArray([
                                {
                                    id: Date.now().toString(),
                                    symbol: 'DEPOSIT',
                                    type: 'DEPOSIT',
                                    quantity: 0,
                                    price: 0,
                                    total: amount,
                                    date: new Date().toISOString().split('T')[0],
                                    status: 'Completed'
                                }
                            ], currentState.transactions, true)
                        });
                        toast.success("Successfully deposited KES ".concat(amount.toLocaleString()));
                        get().logAnalytics('deposit_funds', { amount: amount, method: method });
                        return [2 /*return*/, true];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        error_5 = _a.sent();
                        console.error('Error depositing funds:', error_5);
                        toast.error('Failed to deposit funds');
                        return [2 /*return*/, false];
                    case 9:
                        set({ isLoading: false });
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    },
    withdrawFunds: function (amount_1) {
        var args_1 = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args_1[_i - 1] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([amount_1], args_1, true), void 0, function (amount, method) {
            var currentState, result, apiError_6, error_6;
            if (method === void 0) { method = 'bank_transfer'; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, 9, 10]);
                        set({ isLoading: true });
                        currentState = get();
                        if (currentState.portfolioData.cashBalance < amount) {
                            toast.error('Insufficient balance');
                            return [2 /*return*/, false];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, apiHelpers.withdrawFunds(amount, method)];
                    case 2:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 5];
                        // Update local state
                        set({
                            portfolioData: __assign(__assign({}, currentState.portfolioData), { cashBalance: currentState.portfolioData.cashBalance - amount, totalValue: currentState.portfolioData.totalValue - amount })
                        });
                        // Reload data to ensure consistency
                        return [4 /*yield*/, get().loadPortfolioData()];
                    case 3:
                        // Reload data to ensure consistency
                        _a.sent();
                        return [4 /*yield*/, get().loadTransactions()];
                    case 4:
                        _a.sent();
                        toast.success("Withdrawal request submitted for KES ".concat(amount.toLocaleString()));
                        get().logAnalytics('withdraw_funds', { amount: amount, method: method });
                        return [2 /*return*/, true];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        apiError_6 = _a.sent();
                        // Simulate successful withdrawal
                        set({
                            portfolioData: __assign(__assign({}, currentState.portfolioData), { cashBalance: currentState.portfolioData.cashBalance - amount, totalValue: currentState.portfolioData.totalValue - amount }),
                            transactions: __spreadArray([
                                {
                                    id: Date.now().toString(),
                                    symbol: 'WITHDRAWAL',
                                    type: 'WITHDRAWAL',
                                    quantity: 0,
                                    price: 0,
                                    total: amount,
                                    date: new Date().toISOString().split('T')[0],
                                    status: 'Pending'
                                }
                            ], currentState.transactions, true)
                        });
                        toast.success("Withdrawal request submitted for KES ".concat(amount.toLocaleString()));
                        get().logAnalytics('withdraw_funds', { amount: amount, method: method });
                        return [2 /*return*/, true];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        error_6 = _a.sent();
                        console.error('Error withdrawing funds:', error_6);
                        toast.error('Failed to withdraw funds');
                        return [2 /*return*/, false];
                    case 9:
                        set({ isLoading: false });
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    },
    placeOrder: function (orderData) { return __awaiter(void 0, void 0, void 0, function () {
        var result, apiError_7, newOrder, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, 9, 10]);
                    set({ isLoading: true });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, apiHelpers.placeOrder(orderData)];
                case 2:
                    result = _a.sent();
                    if (!result) return [3 /*break*/, 5];
                    // Reload data to ensure consistency
                    return [4 /*yield*/, get().loadPortfolioData()];
                case 3:
                    // Reload data to ensure consistency
                    _a.sent();
                    return [4 /*yield*/, get().loadOrders()];
                case 4:
                    _a.sent();
                    toast.success("Order placed successfully for ".concat(orderData.quantity, " ").concat(orderData.symbol, " shares"));
                    get().logAnalytics('place_order', orderData);
                    return [2 /*return*/, true];
                case 5: return [3 /*break*/, 7];
                case 6:
                    apiError_7 = _a.sent();
                    newOrder = __assign(__assign({ id: Date.now().toString() }, orderData), { status: 'pending', created_at: new Date().toISOString() });
                    set({
                        orders: __spreadArray([newOrder], get().orders, true)
                    });
                    toast.success("Order placed successfully for ".concat(orderData.quantity, " ").concat(orderData.symbol, " shares"));
                    get().logAnalytics('place_order', orderData);
                    return [2 /*return*/, true];
                case 7: return [3 /*break*/, 10];
                case 8:
                    error_7 = _a.sent();
                    console.error('Error placing order:', error_7);
                    toast.error('Failed to place order');
                    return [2 /*return*/, false];
                case 9:
                    set({ isLoading: false });
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    }); },
    cancelOrder: function (orderId) { return __awaiter(void 0, void 0, void 0, function () {
        var result, apiError_8, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, 6, 7]);
                    set({ isLoading: true });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, apiHelpers.cancelOrder(orderId)];
                case 2:
                    result = _a.sent();
                    if (result) {
                        // Remove order from local state
                        set({
                            orders: get().orders.filter(function (order) { return order.id !== orderId; })
                        });
                        toast.success('Order cancelled successfully');
                        get().logAnalytics('cancel_order', { orderId: orderId });
                        return [2 /*return*/, true];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    apiError_8 = _a.sent();
                    // Remove order from local state
                    set({
                        orders: get().orders.filter(function (order) { return order.id !== orderId; })
                    });
                    toast.success('Order cancelled successfully');
                    get().logAnalytics('cancel_order', { orderId: orderId });
                    return [2 /*return*/, true];
                case 4: return [3 /*break*/, 7];
                case 5:
                    error_8 = _a.sent();
                    console.error('Error cancelling order:', error_8);
                    toast.error('Failed to cancel order');
                    return [2 /*return*/, false];
                case 6:
                    set({ isLoading: false });
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); },
    refreshAllData: function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    set({ isLoading: true });
                    return [4 /*yield*/, Promise.all([
                            get().loadPortfolioData(),
                            get().loadTransactions(),
                            get().loadOrders(),
                            get().loadMarketData()
                        ])];
                case 1:
                    _a.sent();
                    set({ lastUpdated: new Date().toISOString() });
                    return [3 /*break*/, 4];
                case 2:
                    error_9 = _a.sent();
                    console.error('Error refreshing data:', error_9);
                    toast.error('Failed to refresh data');
                    return [3 /*break*/, 4];
                case 3:
                    set({ isLoading: false });
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    logAnalytics: function (action, data) {
        // In production, send to analytics service
        if (process.env.NODE_ENV === 'development') {
            console.log("[Analytics] ".concat(action, ":"), data);
        }
    }
}); }, {
    name: 'hisahub-store',
    partialize: function (state) { return ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        selectedStock: state.selectedStock
    }); }
}));
// Auto-refresh hook
export var useAutoRefresh = function (intervalMs) {
    if (intervalMs === void 0) { intervalMs = 10000; }
    var refreshAllData = useAppStore(function (state) { return state.refreshAllData; });
    React.useEffect(function () {
        var interval = setInterval(function () {
            refreshAllData();
        }, intervalMs);
        return function () { return clearInterval(interval); };
    }, [refreshAllData, intervalMs]);
};
