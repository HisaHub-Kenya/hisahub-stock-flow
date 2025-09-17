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
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useMarketData } from '../hooks/useMarketData';
import { apiHelpers } from '../lib/api';
var FinancialDataContext = createContext(undefined);
var initialState = {
    accountData: {
        balance: 0,
        totalValue: 0,
        todaysPnL: 0,
        totalPnL: 0,
    },
    portfolioData: {
        totalValue: 0,
        dailyChange: 0,
        dailyChangePercent: 0,
        weeklyChangePercent: 0,
        monthlyChangePercent: 0,
    },
    stocks: [],
    holdings: [],
    marketIndices: [],
    transactions: [],
    isLoading: true,
    user: null,
    portfolio: null,
};
function financialDataReducer(state, action) {
    var _a;
    switch (action.type) {
        case 'SET_LOADING':
            return __assign(__assign({}, state), { isLoading: action.payload });
        case 'SET_USER_DATA':
            return __assign(__assign({}, state), { user: action.payload.user, portfolio: action.payload.portfolio, accountData: __assign(__assign({}, state.accountData), { balance: ((_a = action.payload.portfolio) === null || _a === void 0 ? void 0 : _a.cash_balance) || 0 }) });
        case 'SET_MARKET_DATA':
            return __assign(__assign({}, state), { stocks: action.payload.stocks, marketIndices: action.payload.marketIndices });
        case 'SET_HOLDINGS':
            // Transform holdings data to include computed properties
            var transformedHoldings = action.payload.map(function (holding) {
                var _a, _b;
                return (__assign(__assign({}, holding), { symbol: ((_a = holding.stocks) === null || _a === void 0 ? void 0 : _a.symbol) || '', name: ((_b = holding.stocks) === null || _b === void 0 ? void 0 : _b.name) || '', value: holding.market_value || holding.quantity * holding.current_price, avgPrice: holding.average_price, currentPrice: holding.current_price, profitLoss: holding.unrealized_pnl || 0, profitLossPercent: holding.average_price > 0
                        ? ((holding.current_price - holding.average_price) / holding.average_price) * 100
                        : 0 }));
            });
            return __assign(__assign({}, state), { holdings: transformedHoldings });
        case 'SET_TRANSACTIONS':
            return __assign(__assign({}, state), { transactions: action.payload });
        case 'UPDATE_ACCOUNT_DATA':
            return __assign(__assign({}, state), { accountData: __assign(__assign({}, state.accountData), action.payload) });
        case 'UPDATE_PORTFOLIO_DATA':
            return __assign(__assign({}, state), { portfolioData: __assign(__assign({}, state.portfolioData), action.payload) });
        case 'ADD_FUNDS':
            return __assign(__assign({}, state), { accountData: __assign(__assign({}, state.accountData), { balance: state.accountData.balance + action.payload, totalValue: state.accountData.totalValue + action.payload }) });
        default:
            return state;
    }
}
export var FinancialDataProvider = function (_a) {
    var children = _a.children;
    var _b = useReducer(financialDataReducer, initialState), state = _b[0], dispatch = _b[1];
    var _c = useAuth(), user = _c.user, userLoading = _c.loading;
    var _d = useMarketData(), stocks = _d.stocks, marketIndices = _d.marketIndices, marketLoading = _d.loading, updateMarketData = _d.updateMarketData;
    useEffect(function () {
        dispatch({
            type: 'SET_USER_DATA',
            payload: { user: user, portfolio: null }
        });
    }, [user]);
    useEffect(function () {
        dispatch({
            type: 'SET_MARKET_DATA',
            payload: { stocks: stocks, marketIndices: marketIndices }
        });
    }, [stocks, marketIndices]);
    useEffect(function () {
        dispatch({
            type: 'SET_LOADING',
            payload: userLoading || marketLoading
        });
    }, [userLoading, marketLoading]);
    useEffect(function () {
        if (user) {
            loadPortfolioData();
        }
    }, [user]);
    var loadPortfolioData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var portfolioData, totalValue, totalPnL, dailyChangePercent, transactions, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, apiHelpers.getPortfolioSummary()];
                case 1:
                    portfolioData = _a.sent();
                    if (!portfolioData) return [3 /*break*/, 3];
                    dispatch({
                        type: 'SET_HOLDINGS',
                        payload: portfolioData.holdings || []
                    });
                    totalValue = portfolioData.total_value || 0;
                    totalPnL = (portfolioData.holdings || []).reduce(function (sum, h) { return sum + (h.unrealized_pnl || 0); }, 0);
                    dailyChangePercent = totalValue > 0 ? (totalPnL / (totalValue - totalPnL)) * 100 : 0;
                    dispatch({
                        type: 'UPDATE_ACCOUNT_DATA',
                        payload: {
                            totalValue: totalValue,
                            totalPnL: totalPnL
                        }
                    });
                    dispatch({
                        type: 'UPDATE_PORTFOLIO_DATA',
                        payload: {
                            totalValue: totalValue,
                            dailyChange: totalPnL,
                            dailyChangePercent: dailyChangePercent,
                            weeklyChangePercent: 2.5, // Mock data
                            monthlyChangePercent: 8.2, // Mock data
                        }
                    });
                    return [4 /*yield*/, apiHelpers.getTransactions()];
                case 2:
                    transactions = _a.sent();
                    dispatch({
                        type: 'SET_TRANSACTIONS',
                        payload: transactions || []
                    });
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error loading portfolio data:', error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var contextValue = {
        state: state,
        dispatch: dispatch,
        placeOrder: function (symbol_1, quantity_1) {
            var args_1 = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args_1[_i - 2] = arguments[_i];
            }
            return __awaiter(void 0, __spreadArray([symbol_1, quantity_1], args_1, true), void 0, function (symbol, quantity, orderType) {
                var success, error_2;
                if (orderType === void 0) { orderType = 'market'; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, apiHelpers.placeOrder({
                                    symbol: symbol,
                                    quantity: quantity,
                                    order_type: orderType,
                                    side: quantity > 0 ? 'buy' : 'sell'
                                })];
                        case 1:
                            success = _a.sent();
                            if (!success) return [3 /*break*/, 3];
                            return [4 /*yield*/, loadPortfolioData()];
                        case 2:
                            _a.sent(); // Refresh portfolio data
                            _a.label = 3;
                        case 3: return [2 /*return*/, success];
                        case 4:
                            error_2 = _a.sent();
                            console.error('Error placing order:', error_2);
                            return [2 /*return*/, false];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        updateMarketData: updateMarketData
    };
    return (_jsx(FinancialDataContext.Provider, { value: contextValue, children: children }));
};
export var useFinancialData = function () {
    var context = useContext(FinancialDataContext);
    if (context === undefined) {
        throw new Error('useFinancialData must be used within a FinancialDataProvider');
    }
    return context;
};
