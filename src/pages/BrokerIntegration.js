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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, Plus, Lightbulb, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getCurrentUser } from "@/lib/auth";
import { apiHelpers, handleApiError } from "@/lib/api";
import HisaAIButton from "../components/HisaAIButton";
var brokers = [
    {
        id: "genghis",
        name: "Genghis Capital",
        logo: "/placeholder.svg",
        license: "CMA/S/001",
        fee: "0.25%",
        hasApi: true
    },
    {
        id: "abc",
        name: "ABC Capital",
        logo: "/placeholder.svg",
        license: "CMA/S/002",
        fee: "0.30%",
        hasApi: false
    },
    {
        id: "sterling",
        name: "Sterling Capital",
        logo: "/placeholder.svg",
        license: "CMA/S/003",
        fee: "0.28%",
        hasApi: true
    },
    {
        id: "dyer",
        name: "Dyer & Blair",
        logo: "/placeholder.svg",
        license: "CMA/S/004",
        fee: "0.35%",
        hasApi: false
    }
];
var BrokerIntegration = function () {
    var navigate = useNavigate();
    var _a = useState(""), selectedBroker = _a[0], setSelectedBroker = _a[1];
    var _b = useState(null), hasAccount = _b[0], setHasAccount = _b[1];
    var _c = useState(false), isLoading = _c[0], setIsLoading = _c[1];
    var _d = useState([]), linkedBrokers = _d[0], setLinkedBrokers = _d[1];
    // Login form state
    var _e = useState({
        cdsNumber: "",
        password: "",
        otp: ""
    }), loginData = _e[0], setLoginData = _e[1];
    // KYC form state
    var _f = useState({
        fullName: "",
        idNumber: "",
        kraPin: "",
        phoneNumber: "",
        email: "",
        bankAccount: ""
    }), kycData = _f[0], setKycData = _f[1];
    var selectedBrokerData = brokers.find(function (b) { return b.id === selectedBroker; });
    var handleBrokerLogin = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedBroker || !loginData.cdsNumber) {
                        toast.error("Please select a broker and enter your CDS number");
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    // Call broker integration API
                    return [4 /*yield*/, apiHelpers.linkBrokerAccount({
                            broker_id: selectedBroker,
                            cds_number: loginData.cdsNumber,
                            password: loginData.password,
                            otp: loginData.otp
                        })];
                case 2:
                    // Call broker integration API
                    _a.sent();
                    setLinkedBrokers(function (prev) { return __spreadArray(__spreadArray([], prev, true), [selectedBroker], false); });
                    toast.success("Successfully linked ".concat(selectedBrokerData === null || selectedBrokerData === void 0 ? void 0 : selectedBrokerData.name));
                    setSelectedBroker("");
                    setHasAccount(null);
                    setLoginData({ cdsNumber: "", password: "", otp: "" });
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Broker login error:', error_1);
                    message = handleApiError(error_1).message;
                    toast.error("Failed to link broker account: ".concat(message));
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleKycSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_2, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedBroker || !kycData.fullName || !kycData.idNumber) {
                        toast.error("Please fill in all required fields");
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    // Call KYC submission API
                    return [4 /*yield*/, apiHelpers.submitKyc({
                            broker_id: selectedBroker,
                            full_name: kycData.fullName,
                            id_number: kycData.idNumber,
                            kra_pin: kycData.kraPin,
                            phone_number: kycData.phoneNumber,
                            email: kycData.email,
                            bank_account: kycData.bankAccount
                        })];
                case 2:
                    // Call KYC submission API
                    _a.sent();
                    setLinkedBrokers(function (prev) { return __spreadArray(__spreadArray([], prev, true), [selectedBroker], false); });
                    toast.success("Account created and linked with ".concat(selectedBrokerData === null || selectedBrokerData === void 0 ? void 0 : selectedBrokerData.name));
                    setSelectedBroker("");
                    setHasAccount(null);
                    setKycData({
                        fullName: "",
                        idNumber: "",
                        kraPin: "",
                        phoneNumber: "",
                        email: "",
                        bankAccount: ""
                    });
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    console.error('KYC submission error:', error_2);
                    message = handleApiError(error_2).message;
                    toast.error("Failed to submit KYC: ".concat(message));
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleDemoAccount = function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, error_3, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    user = getCurrentUser();
                    if (!user) {
                        toast.error("Please log in to activate demo mode");
                        setIsLoading(false);
                        return [2 /*return*/];
                    }
                    // Create demo portfolio through Django API
                    return [4 /*yield*/, apiHelpers.depositFunds(10000, 'demo_activation')];
                case 2:
                    // Create demo portfolio through Django API
                    _a.sent();
                    toast.success("Demo account activated! You now have KES 10,000 to practice trading.");
                    navigate("/trade");
                    return [3 /*break*/, 5];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error activating demo account:', error_3);
                    message = handleApiError(error_3).message;
                    toast.error("Failed to activate demo account: ".concat(message));
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs("div", { className: "min-h-screen bg-primary font-sans", children: [_jsx(HisaAIButton, {}), _jsxs("main", { className: "container mx-auto px-4 py-8 max-w-4xl", children: [_jsxs("div", { className: "flex items-center gap-4 mb-8", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: function () { return navigate("/trade"); }, className: "text-off-white hover:bg-white/10", children: _jsx(ArrowLeft, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-off-white", children: "Broker Integration" }), _jsx("p", { className: "text-off-white/60", children: "Connect your trading accounts securely" })] })] }), linkedBrokers.length > 0 && (_jsxs(Card, { className: "mb-6 bg-white/10 border-secondary/20", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-off-white", children: "Linked Brokers" }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid gap-3", children: linkedBrokers.map(function (brokerId) {
                                        var broker = brokers.find(function (b) { return b.id === brokerId; });
                                        return (_jsxs("div", { className: "flex items-center justify-between p-3 bg-white/5 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: broker === null || broker === void 0 ? void 0 : broker.logo, alt: broker === null || broker === void 0 ? void 0 : broker.name, className: "w-8 h-8 rounded" }), _jsxs("div", { children: [_jsx("span", { className: "text-off-white font-medium", children: broker === null || broker === void 0 ? void 0 : broker.name }), _jsx(Badge, { variant: "secondary", className: "ml-2 text-xs", children: "Connected" })] })] }), _jsxs(Badge, { variant: "outline", className: "text-green-400 border-green-400", children: [_jsx(Shield, { className: "w-3 h-3 mr-1" }), "Active"] })] }, brokerId));
                                    }) }) })] })), _jsxs(Card, { className: "bg-white/10 border-secondary/20", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "text-off-white flex items-center gap-2", children: [_jsx(Shield, { className: "w-5 h-5" }), "Broker Selection"] }), _jsx(CardDescription, { className: "text-off-white/60", children: "Choose a CMA-regulated broker to link your trading account" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-off-white", children: "Select Broker" }), _jsxs(Select, { value: selectedBroker, onValueChange: setSelectedBroker, children: [_jsx(SelectTrigger, { className: "bg-white/10 border-secondary/20 text-off-white", children: _jsx(SelectValue, { placeholder: "Choose your broker" }) }), _jsx(SelectContent, { className: "bg-primary border-secondary/20", children: brokers.map(function (broker) { return (_jsx(SelectItem, { value: broker.id, className: "text-off-white focus:bg-white/10", children: _jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: broker.logo, alt: broker.name, className: "w-6 h-6 rounded" }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: broker.name }), _jsxs("div", { className: "text-xs text-off-white/60", children: ["License: ", broker.license, " \u2022 Fee: ", broker.fee] })] })] }), _jsx(Badge, { variant: "secondary", className: "text-xs", children: "CMA Regulated \u2705" })] }) }, broker.id)); }) })] })] }), selectedBroker && (_jsxs("div", { className: "space-y-4 pt-4 border-t border-white/10", children: [_jsx(Label, { className: "text-off-white", children: "Account Status" }), _jsxs("div", { className: "grid gap-3", children: [_jsx(Card, { className: "cursor-pointer transition-all border-2 ".concat(hasAccount === true
                                                            ? 'border-secondary bg-secondary/10'
                                                            : 'border-white/20 bg-white/5 hover:bg-white/10'), onClick: function () { return setHasAccount(true); }, children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("input", { type: "radio", checked: hasAccount === true, onChange: function () { return setHasAccount(true); }, className: "text-secondary" }), _jsxs("div", { children: [_jsx("h3", { className: "text-off-white font-medium", children: "I already have a CDS & Broker Account" }), _jsx("p", { className: "text-off-white/60 text-sm", children: "Login with your existing credentials" })] })] }) }) }), _jsx(Card, { className: "cursor-pointer transition-all border-2 ".concat(hasAccount === false
                                                            ? 'border-secondary bg-secondary/10'
                                                            : 'border-white/20 bg-white/5 hover:bg-white/10'), onClick: function () { return setHasAccount(false); }, children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("input", { type: "radio", checked: hasAccount === false, onChange: function () { return setHasAccount(false); }, className: "text-secondary" }), _jsxs("div", { children: [_jsx("h3", { className: "text-off-white font-medium", children: "I'm new - Create CDS & Broker Account" }), _jsx("p", { className: "text-off-white/60 text-sm", children: "Complete KYC process to open new accounts" })] })] }) }) })] })] })), hasAccount !== null && selectedBroker && (_jsx("div", { className: "pt-4 border-t border-white/10", children: hasAccount ? (
                                        // Login Form
                                        _jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-off-white font-medium", children: ["Login to ", selectedBrokerData === null || selectedBrokerData === void 0 ? void 0 : selectedBrokerData.name] }), _jsxs("div", { className: "grid gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-off-white", children: "CDS Number" }), _jsx(Input, { type: "text", placeholder: "Enter your CDS number", value: loginData.cdsNumber, onChange: function (e) { return setLoginData(function (prev) { return (__assign(__assign({}, prev), { cdsNumber: e.target.value })); }); }, className: "bg-white/10 border-secondary/20 text-off-white placeholder:text-off-white/50" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-off-white", children: "Password" }), _jsx(Input, { type: "password", placeholder: "Enter your password", value: loginData.password, onChange: function (e) { return setLoginData(function (prev) { return (__assign(__assign({}, prev), { password: e.target.value })); }); }, className: "bg-white/10 border-secondary/20 text-off-white placeholder:text-off-white/50" })] }), (selectedBrokerData === null || selectedBrokerData === void 0 ? void 0 : selectedBrokerData.hasApi) && (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-off-white", children: "OTP (if required)" }), _jsx(Input, { type: "text", placeholder: "Enter OTP", value: loginData.otp, onChange: function (e) { return setLoginData(function (prev) { return (__assign(__assign({}, prev), { otp: e.target.value })); }); }, className: "bg-white/10 border-secondary/20 text-off-white placeholder:text-off-white/50" })] })), _jsx(Button, { onClick: handleBrokerLogin, disabled: isLoading, className: "w-full bg-secondary hover:bg-secondary/90 text-primary font-bold", children: isLoading ? "Connecting..." : "Connect Account" })] })] })) : (
                                        // KYC Form
                                        _jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-off-white font-medium", children: ["KYC Information for ", selectedBrokerData === null || selectedBrokerData === void 0 ? void 0 : selectedBrokerData.name] }), _jsxs("div", { className: "grid gap-4", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-off-white", children: "Full Name *" }), _jsx(Input, { type: "text", placeholder: "As per ID", value: kycData.fullName, onChange: function (e) { return setKycData(function (prev) { return (__assign(__assign({}, prev), { fullName: e.target.value })); }); }, className: "bg-white/10 border-secondary/20 text-off-white placeholder:text-off-white/50" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-off-white", children: "ID Number *" }), _jsx(Input, { type: "text", placeholder: "National ID", value: kycData.idNumber, onChange: function (e) { return setKycData(function (prev) { return (__assign(__assign({}, prev), { idNumber: e.target.value })); }); }, className: "bg-white/10 border-secondary/20 text-off-white placeholder:text-off-white/50" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-off-white", children: "KRA PIN" }), _jsx(Input, { type: "text", placeholder: "Tax PIN", value: kycData.kraPin, onChange: function (e) { return setKycData(function (prev) { return (__assign(__assign({}, prev), { kraPin: e.target.value })); }); }, className: "bg-white/10 border-secondary/20 text-off-white placeholder:text-off-white/50" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-off-white", children: "Phone Number" }), _jsx(Input, { type: "tel", placeholder: "+254...", value: kycData.phoneNumber, onChange: function (e) { return setKycData(function (prev) { return (__assign(__assign({}, prev), { phoneNumber: e.target.value })); }); }, className: "bg-white/10 border-secondary/20 text-off-white placeholder:text-off-white/50" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-off-white", children: "Email" }), _jsx(Input, { type: "email", placeholder: "your@email.com", value: kycData.email, onChange: function (e) { return setKycData(function (prev) { return (__assign(__assign({}, prev), { email: e.target.value })); }); }, className: "bg-white/10 border-secondary/20 text-off-white placeholder:text-off-white/50" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-off-white", children: "Bank Account" }), _jsx(Input, { type: "text", placeholder: "Account number", value: kycData.bankAccount, onChange: function (e) { return setKycData(function (prev) { return (__assign(__assign({}, prev), { bankAccount: e.target.value })); }); }, className: "bg-white/10 border-secondary/20 text-off-white placeholder:text-off-white/50" })] })] }), _jsx(Button, { onClick: handleKycSubmit, disabled: isLoading, className: "w-full bg-secondary hover:bg-secondary/90 text-primary font-bold", children: isLoading ? "Creating Account..." : "Submit KYC & Create Account" })] })] })) }))] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mt-6", children: [_jsxs(Button, { variant: "outline", onClick: function () {
                                    setSelectedBroker("");
                                    setHasAccount(null);
                                }, className: "flex items-center gap-2 bg-white/10 border-secondary/20 text-off-white hover:bg-white/20", children: [_jsx(Plus, { className: "w-4 h-4" }), "Link Another Broker"] }), _jsxs(Button, { variant: "outline", onClick: handleDemoAccount, disabled: isLoading, className: "flex items-center gap-2 bg-white/10 border-secondary/20 text-off-white hover:bg-white/20", children: [_jsx(Lightbulb, { className: "w-4 h-4" }), isLoading ? "Activating Demo..." : "Use Demo Account"] })] }), _jsxs("div", { className: "mt-8 p-4 bg-white/5 rounded-lg border border-white/10", children: [_jsxs("div", { className: "flex items-center justify-center gap-2 text-off-white/60 text-sm", children: [_jsx(Lock, { className: "w-4 h-4" }), _jsx("span", { children: "\uD83D\uDD10 Secure | \uD83D\uDCC3 CMA/CDSC Compliant" })] }), _jsx("p", { className: "text-center text-xs text-off-white/40 mt-2", children: "All data is encrypted and stored securely. HisaHub is compliant with CMA regulations." })] })] })] }));
};
export default BrokerIntegration;
