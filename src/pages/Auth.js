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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { login, register } from "@/lib/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
var Auth = function (_a) {
    var onLogin = _a.onLogin;
    var navigate = useNavigate();
    var _b = useState({ email: '', password: '' }), loginForm = _b[0], setLoginForm = _b[1];
    var _c = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }), signupForm = _c[0], setSignupForm = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    var handleLogin = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var email, password, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setLoading(true);
                    email = loginForm.email, password = loginForm.password;
                    if (!email || !password) {
                        toast.error("Please fill in both email and password.");
                        setLoading(false);
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, login(email, password)];
                case 2:
                    _a.sent();
                    toast.success("Login successful!");
                    onLogin();
                    if (location && location.state && location.state.redirectToTrade) {
                        navigate('/trade');
                    } else {
                        navigate('/'); // Redirect to home page
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    toast.error(error_1.message || "An unexpected error occurred during login.");
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleSignup = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var name, email, password, confirmPassword, nameParts, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    setLoading(true);
                    name = signupForm.name, email = signupForm.email, password = signupForm.password, confirmPassword = signupForm.confirmPassword;
                    if (!name || !email || !password || !confirmPassword) {
                        toast.error("Please fill in all fields.");
                        setLoading(false);
                        return [2 /*return*/];
                    }
                    if (password !== confirmPassword) {
                        toast.error("Passwords do not match.");
                        setLoading(false);
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    nameParts = name.split(' ');
                    return [4 /*yield*/, register(email, password, nameParts[0], nameParts.slice(1).join(' '))];
                case 2:
                    _b.sent();
                    toast.success("Account created successfully!");
                    onLogin();
                    if (location && location.state && location.state.redirectToTrade) {
                        navigate('/trade');
                    } else {
                        navigate('/'); // Redirect to home page
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _b.sent();
                    if ((_a = error_2.message) === null || _a === void 0 ? void 0 : _a.includes("already exists")) {
                        toast.error("An account with this email already exists. Please try logging in instead.");
                    }
                    else {
                        toast.error(error_2.message || "An unexpected error occurred during signup.");
                    }
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // Add location from react-router-dom
    var location = require('react-router-dom').useLocation();
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-primary px-4", children: _jsxs(Card, { className: "w-full max-w-md bg-white/10 border-secondary/20", children: [_jsxs(CardHeader, { className: "text-center", children: [_jsx("div", { className: "rounded-lg border-4 border-secondary p-3 mb-4 flex justify-center items-center mx-auto w-fit", children: _jsx("span", { className: "font-extrabold text-secondary text-4xl", style: { fontFamily: "'Poppins',sans-serif" }, children: "H" }) }), _jsx(CardTitle, { className: "text-2xl font-bold text-off-white", children: "Welcome to HisaHub" }), _jsx(CardDescription, { className: "text-off-white/80", children: "Your gateway to the Nairobi Securities Exchange" })] }), _jsx(CardContent, { children: _jsxs(Tabs, { defaultValue: "login", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2 bg-white/10", children: [_jsx(TabsTrigger, { value: "login", className: "text-off-white", children: "Login" }), _jsx(TabsTrigger, { value: "signup", className: "text-off-white", children: "Sign Up" })] }), _jsx(TabsContent, { value: "login", className: "space-y-4", children: _jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", className: "text-off-white", children: "Email" }), _jsx(Input, { id: "email", type: "email", value: loginForm.email, onChange: function (e) { return setLoginForm(__assign(__assign({}, loginForm), { email: e.target.value })); }, className: "bg-white/10 border-secondary/20 text-off-white", placeholder: "Enter your email", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", className: "text-off-white", children: "Password" }), _jsx(Input, { id: "password", type: "password", value: loginForm.password, onChange: function (e) { return setLoginForm(__assign(__assign({}, loginForm), { password: e.target.value })); }, className: "bg-white/10 border-secondary/20 text-off-white", placeholder: "Enter your password", required: true })] }), _jsx(Button, { type: "submit", className: "w-full bg-secondary text-primary hover:bg-secondary/90", disabled: loading, children: loading ? "Logging in..." : "Login" })] }) }), _jsx(TabsContent, { value: "signup", className: "space-y-4", children: _jsxs("form", { onSubmit: handleSignup, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", className: "text-off-white", children: "Full Name" }), _jsx(Input, { id: "name", type: "text", value: signupForm.name, onChange: function (e) { return setSignupForm(__assign(__assign({}, signupForm), { name: e.target.value })); }, className: "bg-white/10 border-secondary/20 text-off-white", placeholder: "Enter your full name", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "signup-email", className: "text-off-white", children: "Email" }), _jsx(Input, { id: "signup-email", type: "email", value: signupForm.email, onChange: function (e) { return setSignupForm(__assign(__assign({}, signupForm), { email: e.target.value })); }, className: "bg-white/10 border-secondary/20 text-off-white", placeholder: "Enter your email", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "signup-password", className: "text-off-white", children: "Password" }), _jsx(Input, { id: "signup-password", type: "password", value: signupForm.password, onChange: function (e) { return setSignupForm(__assign(__assign({}, signupForm), { password: e.target.value })); }, className: "bg-white/10 border-secondary/20 text-off-white", placeholder: "Create a password", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "confirm-password", className: "text-off-white", children: "Confirm Password" }), _jsx(Input, { id: "confirm-password", type: "password", value: signupForm.confirmPassword, onChange: function (e) { return setSignupForm(__assign(__assign({}, signupForm), { confirmPassword: e.target.value })); }, className: "bg-white/10 border-secondary/20 text-off-white", placeholder: "Confirm your password", required: true })] }), _jsx(Button, { type: "submit", className: "w-full bg-secondary text-primary hover:bg-secondary/90", disabled: loading, children: loading ? "Creating Account..." : "Create Account" })] }) })] }) })] }) }));
};
export default Auth;
