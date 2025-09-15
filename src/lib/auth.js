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
// Django JWT Authentication utilities
import { sanitizeString, validateEmail, validatePassword, isTokenExpired } from './security';
var AuthManager = /** @class */ (function () {
    function AuthManager() {
        this.accessToken = null;
        this.refreshToken = null;
        this.user = null;
        // Load tokens from localStorage on initialization
        this.loadTokens();
    }
    AuthManager.prototype.loadTokens = function () {
        if (typeof window !== 'undefined') {
            this.accessToken = localStorage.getItem('access_token');
            this.refreshToken = localStorage.getItem('refresh_token');
            var userStr = localStorage.getItem('user');
            if (userStr) {
                this.user = JSON.parse(userStr);
            }
        }
    };
    AuthManager.prototype.saveTokens = function (tokens) {
        this.accessToken = tokens.access;
        this.refreshToken = tokens.refresh;
        if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', tokens.access);
            localStorage.setItem('refresh_token', tokens.refresh);
        }
    };
    AuthManager.prototype.saveUser = function (user) {
        this.user = user;
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(user));
        }
    };
    AuthManager.prototype.clearTokens = function () {
        this.accessToken = null;
        this.refreshToken = null;
        this.user = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
        }
    };
    AuthManager.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var sanitizedEmail, sanitizedPassword, response, errorData, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sanitizedEmail = sanitizeString(email);
                        sanitizedPassword = sanitizeString(password);
                        if (!validateEmail(sanitizedEmail)) {
                            throw new Error('Invalid email format');
                        }
                        if (sanitizedPassword.length === 0) {
                            throw new Error('Password is required');
                        }
                        return [4 /*yield*/, fetch("".concat(import.meta.env.VITE_API_URL, "/auth/login/"), {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    email: sanitizedEmail,
                                    password: sanitizedPassword
                                }),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            return response.json()
                                .then(function(errorData) {
                                    throw new Error(errorData.detail || 'Login failed');
                                })
                                .catch(function() {
                                    throw new Error('Login failed (invalid JSON response)');
                                });
                        }
                        return response.json()
                            .then(function(data) {
                                this.saveTokens(data.tokens);
                                this.saveUser(data.user);
                                return data;
                            }.bind(this))
                            .catch(function() {
                                this.saveTokens(null);
                                this.saveUser(null);
                                return { tokens: null, user: null };
                            }.bind(this));
                }
            });
        });
    };
    AuthManager.prototype.register = function (email, password, first_name, last_name) {
        return __awaiter(this, void 0, void 0, function () {
            var sanitizedEmail, sanitizedPassword, sanitizedFirstName, sanitizedLastName, passwordValidation, response, errorData, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sanitizedEmail = sanitizeString(email);
                        sanitizedPassword = sanitizeString(password);
                        sanitizedFirstName = first_name ? sanitizeString(first_name) : undefined;
                        sanitizedLastName = last_name ? sanitizeString(last_name) : undefined;
                        if (!validateEmail(sanitizedEmail)) {
                            throw new Error('Invalid email format');
                        }
                        passwordValidation = validatePassword(sanitizedPassword);
                        if (!passwordValidation.isValid) {
                            throw new Error(passwordValidation.errors[0]);
                        }
                        return [4 /*yield*/, fetch("".concat(import.meta.env.VITE_API_URL, "/auth/register/"), {
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
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        errorData = _a.sent();
                        throw new Error(errorData.detail || 'Registration failed');
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _a.sent();
                        this.saveTokens(data.tokens);
                        this.saveUser(data.user);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    AuthManager.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.refreshToken) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetch("".concat(import.meta.env.VITE_API_URL, "/auth/logout/"), {
                                method: 'POST',
                                headers: {
                                    'Authorization': "Bearer ".concat(this.accessToken),
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ refresh: this.refreshToken }),
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Logout error:', error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.clearTokens();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthManager.prototype.refreshAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.refreshToken) {
                            return [2 /*return*/, null];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("".concat(import.meta.env.VITE_API_URL, "/auth/token/refresh/"), {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ refresh: this.refreshToken }),
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            this.clearTokens();
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        this.accessToken = data.access;
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('access_token', data.access);
                        }
                        return [2 /*return*/, data.access];
                    case 4:
                        error_2 = _a.sent();
                        console.error('Token refresh error:', error_2);
                        this.clearTokens();
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthManager.prototype.getAccessToken = function () {
        return this.accessToken;
    };
    AuthManager.prototype.getUser = function () {
        return this.user;
    };
    AuthManager.prototype.isAuthenticated = function () {
        return !!this.accessToken && !!this.user;
    };
    AuthManager.prototype.getValidToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.accessToken) {
                            return [2 /*return*/, null];
                        }
                        if (!isTokenExpired(this.accessToken)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.refreshAccessToken()];
                    case 1: 
                    // Token expired, try to refresh
                    return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, this.accessToken];
                }
            });
        });
    };
    return AuthManager;
}());
// Export singleton instance
export var authManager = new AuthManager();
// Export convenience functions
export var login = function (email, password) { return authManager.login(email, password); };
export var register = function (email, password, first_name, last_name) {
    return authManager.register(email, password, first_name, last_name);
};
export var logout = function () { return authManager.logout(); };
export var getCurrentUser = function () { return authManager.getUser(); };
export var isAuthenticated = function () { return authManager.isAuthenticated(); };
export var getValidToken = function () { return authManager.getValidToken(); };
