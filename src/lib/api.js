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
import axios from 'axios';
import { getValidToken } from './auth';
import { sanitizeApiResponse } from './security';
// API Configuration
var API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
// Create axios instance with default config
export var apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Add auth interceptor
apiClient.interceptors.request.use(function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getValidToken()];
            case 1:
                token = _a.sent();
                if (token) {
                    config.headers.Authorization = "Bearer ".concat(token);
                }
                return [2 /*return*/, config];
        }
    });
}); });
// Add response interceptor to handle token refresh and sanitization
apiClient.interceptors.response.use(function (response) {
    // Sanitize response data
    if (response.data) {
        response.data = sanitizeApiResponse(response.data);
    }
    return response;
}, function (error) { return __awaiter(void 0, void 0, void 0, function () {
    var originalRequest, token;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                originalRequest = error.config;
                if (!(((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401 && !originalRequest._retry)) return [3 /*break*/, 2];
                originalRequest._retry = true;
                return [4 /*yield*/, getValidToken()];
            case 1:
                token = _b.sent();
                if (token) {
                    originalRequest.headers.Authorization = "Bearer ".concat(token);
                    return [2 /*return*/, apiClient(originalRequest)];
                }
                _b.label = 2;
            case 2: return [2 /*return*/, Promise.reject(error)];
        }
    });
}); });
// API Endpoints
export var API_ENDPOINTS = {
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
};
// API Helper Functions
export var apiHelpers = {
    // Health check
    healthCheck: async function () {
        try {
            const response = await apiClient.get('/health/');
            return response.data;
        } catch (error) {
            console.error('Health check failed:', error.response ? error.response.status : error.message, error.response ? error.response.data : error);
            throw error;
        }
    },
    // Portfolio operations
    depositFunds: function (amount_1) {
        return __awaiter(this, arguments, void 0, function (amount, method) {
            var response;
            if (method === void 0) { method = 'bank_transfer'; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.post(API_ENDPOINTS.PORTFOLIO.DEPOSIT, {
                            amount: amount,
                            method: method,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    withdrawFunds: function (amount_1) {
        return __awaiter(this, arguments, void 0, function (amount, method) {
            var response;
            if (method === void 0) { method = 'bank_transfer'; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.post(API_ENDPOINTS.PORTFOLIO.WITHDRAW, {
                            amount: amount,
                            method: method,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getPortfolioSummary: function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.get(API_ENDPOINTS.PORTFOLIO.GET_SUMMARY)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getTransactions: function () {
        return __awaiter(this, arguments, void 0, function (limit, offset) {
            var response;
            if (limit === void 0) { limit = 50; }
            if (offset === void 0) { offset = 0; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.get(API_ENDPOINTS.PORTFOLIO.TRANSACTIONS, {
                            params: { limit: limit, offset: offset },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    // Trading operations
    placeOrder: function (orderData) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.post(API_ENDPOINTS.TRADING.PLACE_ORDER, orderData)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getOrders: function (status) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.get(API_ENDPOINTS.TRADING.GET_ORDERS, {
                            params: status ? { status: status } : {},
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    cancelOrder: function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.post(API_ENDPOINTS.TRADING.CANCEL_ORDER.replace('{id}', orderId))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getPositions: function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.get(API_ENDPOINTS.TRADING.GET_POSITIONS)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    // Broker operations
    linkBrokerAccount: function (brokerData) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.post(API_ENDPOINTS.BROKER.LINK_ACCOUNT, brokerData)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    submitKyc: function (kycData) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.post(API_ENDPOINTS.BROKER.SUBMIT_KYC, kycData)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getLinkedBrokers: function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.get(API_ENDPOINTS.BROKER.GET_ACCOUNTS)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    // Community operations
    createPost: function (content) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.post(API_ENDPOINTS.COMMUNITY.POSTS, { content: content })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getPosts: function () {
        return __awaiter(this, arguments, void 0, function (limit, offset) {
            var response;
            if (limit === void 0) { limit = 20; }
            if (offset === void 0) { offset = 0; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.get(API_ENDPOINTS.COMMUNITY.POSTS, {
                            params: { limit: limit, offset: offset },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    likePost: function (postId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.post(API_ENDPOINTS.COMMUNITY.LIKE_POST.replace('{id}', postId))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    followUser: function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.post(API_ENDPOINTS.COMMUNITY.FOLLOW_USER.replace('{id}', userId))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    unfollowUser: function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.delete(API_ENDPOINTS.COMMUNITY.FOLLOW_USER.replace('{id}', userId))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    // Market data operations
    getStocks: function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.get(API_ENDPOINTS.MARKET.STOCKS)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getMarketIndices: function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.get(API_ENDPOINTS.MARKET.INDICES)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getStockDetail: function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.get(API_ENDPOINTS.MARKET.STOCK_DETAIL.replace('{symbol}', symbol))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getStockPrices: function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.get(API_ENDPOINTS.MARKET.STOCK_PRICES.replace('{symbol}', symbol))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getNews: function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.get(API_ENDPOINTS.MARKET.NEWS)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getStockNews: function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.get(API_ENDPOINTS.MARKET.STOCK_NEWS.replace('{symbol}', symbol))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getMarketOverview: function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.get(API_ENDPOINTS.MARKET.OVERVIEW)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    // Profile operations
    getProfile: function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.get(API_ENDPOINTS.PROFILE.GET)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    updateProfile: function (updates) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.patch(API_ENDPOINTS.PROFILE.UPDATE, updates)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    // Broker integration operations
    getBrokers: function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.get(API_ENDPOINTS.BROKER.GET_BROKERS)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getBrokerAccounts: function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.get(API_ENDPOINTS.BROKER.GET_ACCOUNTS)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getKycStatus: function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.get(API_ENDPOINTS.BROKER.KYC_STATUS)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    placeBrokerOrder: function (accountId, symbol, quantity, orderType, side) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.post(API_ENDPOINTS.BROKER.PLACE_ORDER, {
                            account_id: accountId,
                            symbol: symbol,
                            quantity: quantity,
                            order_type: orderType,
                            side: side,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getBrokerOrders: function (accountId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.get(API_ENDPOINTS.BROKER.GET_ORDERS, {
                            params: accountId ? { account_id: accountId } : {},
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    getBrokerBalance: function (accountId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.get(API_ENDPOINTS.BROKER.GET_BALANCE.replace('{account_id}', accountId))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
    syncBrokerAccount: function (accountId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, apiClient.post(API_ENDPOINTS.BROKER.SYNC_ACCOUNT.replace('{account_id}', accountId))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    },
};
// Error handling utility
export var handleApiError = function (error) {
    var _a, _b;
    if (error.response) {
        // Server responded with error status
        var message = ((_a = error.response.data) === null || _a === void 0 ? void 0 : _a.message) || ((_b = error.response.data) === null || _b === void 0 ? void 0 : _b.error) || 'An error occurred';
        return { message: message, status: error.response.status };
    }
    else if (error.request) {
        // Request was made but no response received
        return { message: 'Network error. Please check your connection.', status: 0 };
    }
    else {
        // Something else happened
        return { message: error.message || 'An unexpected error occurred', status: 0 };
    }
};
