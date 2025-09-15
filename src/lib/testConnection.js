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
// Test Django backend connection
export var testDjangoConnection = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, fetch("".concat(import.meta.env.VITE_API_URL || 'http://localhost:8000', "/api/health/"), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok) return [3 /*break*/, 3];
                return response.json()
                    .then(function(data) {
                        console.log('✅ Django backend connection successful:', data);
                        return { success: true, data: data };
                    })
                    .catch(function() {
                        console.log('✅ Django backend connection successful: {}');
                        return { success: true, data: {} };
                    });
            case 3:
                console.error('❌ Django backend connection failed:', response.status, response.statusText);
                return [2 /*return*/, { success: false, error: "HTTP ".concat(response.status, ": ").concat(response.statusText) }];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.error('❌ Django backend connection error:', error_1);
                return [2 /*return*/, { success: false, error: error_1.message }];
            case 6: return [2 /*return*/];
        }
    });
}); };
// Test all API endpoints
export var testAllEndpoints = function () { return __awaiter(void 0, void 0, void 0, function () {
    var baseUrl, endpoints, results, _i, endpoints_1, endpoint, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
                endpoints = [
                    { name: 'Health Check', url: '/api/health/', method: 'GET', auth: false },
                    { name: 'User Registration', url: '/api/auth/register/', method: 'POST', auth: false },
                    { name: 'User Login', url: '/api/auth/login/', method: 'POST', auth: false },
                    { name: 'Portfolio Summary', url: '/api/portfolio/summary/', method: 'GET', auth: true },
                    { name: 'Market Stocks', url: '/api/market/stocks/', method: 'GET', auth: false },
                    { name: 'Community Posts', url: '/api/community/posts/', method: 'GET', auth: true },
                    { name: 'Trading Orders', url: '/api/trading/orders/', method: 'GET', auth: true },
                    { name: 'Broker List', url: '/api/broker/brokers/', method: 'GET', auth: true },
                ];
                results = [];
                _i = 0, endpoints_1 = endpoints;
                _a.label = 1;
            case 1:
                if (!(_i < endpoints_1.length)) return [3 /*break*/, 6];
                endpoint = endpoints_1[_i];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, fetch("".concat(baseUrl).concat(endpoint.url), {
                        method: endpoint.method,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })];
            case 3:
                response = _a.sent();
                return response.json()
                    .then(function(respData) {
                        results.push({
                            name: endpoint.name,
                            url: endpoint.url,
                            status: response.status,
                            success: response.ok,
                            auth_required: endpoint.auth,
                            data: respData
                        });
                    })
                    .catch(function() {
                        results.push({
                            name: endpoint.name,
                            url: endpoint.url,
                            status: response.status,
                            success: response.ok,
                            auth_required: endpoint.auth,
                            data: {}
                        });
                    });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                results.push({
                    name: endpoint.name,
                    url: endpoint.url,
                    status: 'ERROR',
                    success: false,
                    error: error_2.message,
                    auth_required: endpoint.auth,
                });
                return [3 /*break*/, 5];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/, results];
        }
    });
}); };
// Test authentication endpoints
export var testAuthEndpoints = function () { return __awaiter(void 0, void 0, void 0, function () {
    var baseUrl, endpoints, results, _i, endpoints_2, endpoint, response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
                endpoints = [
                    '/api/auth/login/',
                    '/api/auth/register/',
                    '/api/auth/logout/',
                    '/api/auth/token/refresh/',
                    '/api/auth/profile/',
                ];
                results = [];
                _i = 0, endpoints_2 = endpoints;
                _a.label = 1;
            case 1:
                if (!(_i < endpoints_2.length)) return [3 /*break*/, 6];
                endpoint = endpoints_2[_i];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, fetch("".concat(baseUrl).concat(endpoint), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })];
            case 3:
                response = _a.sent();
                results.push({
                    endpoint: endpoint,
                    status: response.status,
                    available: response.status !== 404,
                });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                results.push({
                    endpoint: endpoint,
                    status: 'ERROR',
                    available: false,
                    error: error_3.message,
                });
                return [3 /*break*/, 5];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/, results];
        }
    });
}); };
