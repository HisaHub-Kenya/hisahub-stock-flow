// Security utilities for input sanitization and validation
/**
 * Sanitize string input to prevent XSS attacks
 */
export var sanitizeString = function (input) {
    if (typeof input !== 'string') {
        return '';
    }
    return input
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .trim();
};
/**
 * Validate email format
 */
export var validateEmail = function (email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
/**
 * Validate password strength
 */
export var validatePassword = function (password) {
    var errors = [];
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }
    return {
        isValid: errors.length === 0,
        errors: errors
    };
};
/**
 * Sanitize numeric input
 */
export var sanitizeNumber = function (input) {
    var num = typeof input === 'string' ? parseFloat(input) : input;
    if (isNaN(num) || !isFinite(num)) {
        return 0;
    }
    // Round to 2 decimal places for currency
    return Math.round(num * 100) / 100;
};
/**
 * Validate stock symbol format
 */
export var validateStockSymbol = function (symbol) {
    var symbolRegex = /^[A-Z]{1,10}$/;
    return symbolRegex.test(symbol.toUpperCase());
};
/**
 * Sanitize API response data
 */
export var sanitizeApiResponse = function (data) {
    if (typeof data === 'string') {
        return sanitizeString(data);
    }
    if (typeof data === 'number') {
        return sanitizeNumber(data);
    }
    if (Array.isArray(data)) {
        return data.map(sanitizeApiResponse);
    }
    if (data && typeof data === 'object') {
        var sanitized = {};
        for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            sanitized[sanitizeString(key)] = sanitizeApiResponse(value);
        }
        return sanitized;
    }
    return data;
};
/**
 * Generate secure random string for nonces
 */
export var generateNonce = function (length) {
    if (length === void 0) { length = 16; }
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};
/**
 * Check if token is expired without parsing (safer)
 */
export var isTokenExpired = function (token) {
    try {
        var payload = JSON.parse(atob(token.split('.')[1]));
        var now = Date.now() / 1000;
        return payload.exp < now;
    }
    catch (_a) {
        return true; // If we can't parse, consider it expired
    }
};
