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
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { logout } from '@/lib/auth';
import { toast } from 'sonner';
import { useUserProfile } from '@/hooks/useUserProfile';
import FloatingJoystick from '@/components/FloatingJoystick';
import BottomNav from '@/components/BottomNav';
var Settings = function () {
    var _a = useUserProfile(), profile = _a.profile, loading = _a.loading, updating = _a.updating, updateProfile = _a.updateProfile;
    var _b = useState('personal'), activeTab = _b[0], setActiveTab = _b[1];
    var handleUpdateProfile = function (field, value) { return __awaiter(void 0, void 0, void 0, function () {
        var success;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, updateProfile((_a = {}, _a[field] = value, _a))];
                case 1:
                    success = _b.sent();
                    if (!success) {
                        toast.error('Failed to update profile');
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleLogout = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, logout()];
                case 1:
                    _a.sent();
                    toast.success('Logged out successfully');
                    // Redirect to auth page
                    window.location.href = '/auth';
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    toast.error('Failed to log out');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var renderPersonalSettings = function () { return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { className: "bg-white/5 border-white/10", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Personal Information" }), _jsx(CardDescription, { className: "text-gray-400", children: "Update your personal details" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-white", children: "First Name" }), _jsx(Input, { value: (profile === null || profile === void 0 ? void 0 : profile.first_name) || '', onChange: function (e) { return handleUpdateProfile('first_name', e.target.value); }, className: "bg-white/10 border-white/20 text-white", placeholder: "Enter first name" })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-white", children: "Last Name" }), _jsx(Input, { value: (profile === null || profile === void 0 ? void 0 : profile.last_name) || '', onChange: function (e) { return handleUpdateProfile('last_name', e.target.value); }, className: "bg-white/10 border-white/20 text-white", placeholder: "Enter last name" })] })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-white", children: "Phone Number" }), _jsx(Input, { value: (profile === null || profile === void 0 ? void 0 : profile.phone_number) || '', onChange: function (e) { return handleUpdateProfile('phone_number', e.target.value); }, className: "bg-white/10 border-white/20 text-white", placeholder: "Enter phone number" })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-white", children: "National ID" }), _jsx(Input, { value: (profile === null || profile === void 0 ? void 0 : profile.national_id) || '', onChange: function (e) { return handleUpdateProfile('national_id', e.target.value); }, className: "bg-white/10 border-white/20 text-white", placeholder: "Enter national ID" })] })] })] }) })); };
    var renderSecuritySettings = function () { return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { className: "bg-white/5 border-white/10", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Security Settings" }), _jsx(CardDescription, { className: "text-gray-400", children: "Manage your account security" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-white", children: "Biometric Authentication" }), _jsx("p", { className: "text-sm text-gray-400", children: "Use fingerprint or face recognition" })] }), _jsx(Switch, { checked: (profile === null || profile === void 0 ? void 0 : profile.biometric_enabled) || false, onCheckedChange: function (checked) { return handleUpdateProfile('biometric_enabled', checked); } })] }), _jsx(Button, { onClick: handleLogout, variant: "destructive", className: "w-full", children: "Sign Out" })] })] }) })); };
    var renderTradingSettings = function () { return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { className: "bg-white/5 border-white/10", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Trading Preferences" }), _jsx(CardDescription, { className: "text-gray-400", children: "Configure your trading settings" })] }), _jsx(CardContent, { className: "space-y-6", children: _jsxs("div", { children: [_jsxs(Label, { className: "text-white mb-4 block", children: ["Risk Tolerance: ", (profile === null || profile === void 0 ? void 0 : profile.risk_tolerance) || 50, "%"] }), _jsx(Slider, { value: [(profile === null || profile === void 0 ? void 0 : profile.risk_tolerance) || 50], onValueChange: function (value) { return handleUpdateProfile('risk_tolerance', value[0]); }, max: 100, step: 10, className: "w-full" }), _jsxs("div", { className: "flex justify-between text-sm text-gray-400 mt-2", children: [_jsx("span", { children: "Conservative" }), _jsx("span", { children: "Moderate" }), _jsx("span", { children: "Aggressive" })] })] }) })] }) })); };
    var renderBankingSettings = function () { return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { className: "bg-white/5 border-white/10", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Banking Information" }), _jsx(CardDescription, { className: "text-gray-400", children: "Manage your banking details" })] }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { children: [_jsx(Label, { className: "text-white", children: "Bank Account" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { className: "bg-white/10 border-white/20 text-white", children: _jsx(SelectValue, { placeholder: "Select your bank" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "kcb", children: "KCB Bank" }), _jsx(SelectItem, { value: "equity", children: "Equity Bank" }), _jsx(SelectItem, { value: "coop", children: "Co-operative Bank" }), _jsx(SelectItem, { value: "absa", children: "Absa Bank" })] })] })] }) })] }) })); };
    var renderNotificationSettings = function () { return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { className: "bg-white/5 border-white/10", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Notification Preferences" }), _jsx(CardDescription, { className: "text-gray-400", children: "Choose what notifications you want to receive" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-white", children: "Price Alerts" }), _jsx("p", { className: "text-sm text-gray-400", children: "Get notified when stocks hit target prices" })] }), _jsx(Switch, { defaultChecked: true })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-white", children: "Market News" }), _jsx("p", { className: "text-sm text-gray-400", children: "Receive important market updates" })] }), _jsx(Switch, { defaultChecked: true })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-white", children: "Order Updates" }), _jsx("p", { className: "text-sm text-gray-400", children: "Get notified about order executions" })] }), _jsx(Switch, { defaultChecked: true })] })] })] }) })); };
    var renderAISettings = function () { return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { className: "bg-white/5 border-white/10", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "AI Assistant" }), _jsx(CardDescription, { className: "text-gray-400", children: "Configure your AI trading assistant" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-white", children: "AI Recommendations" }), _jsx("p", { className: "text-sm text-gray-400", children: "Get AI-powered investment suggestions" })] }), _jsx(Switch, { defaultChecked: true })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-white", children: "Auto-Analysis" }), _jsx("p", { className: "text-sm text-gray-400", children: "Enable automatic portfolio analysis" })] }), _jsx(Switch, {})] })] })] }) })); };
    var renderActiveContent = function () {
        switch (activeTab) {
            case 'personal':
                return renderPersonalSettings();
            case 'security':
                return renderSecuritySettings();
            case 'trading':
                return renderTradingSettings();
            case 'banking':
                return renderBankingSettings();
            case 'notifications':
                return renderNotificationSettings();
            case 'ai':
                return renderAISettings();
            default:
                return renderPersonalSettings();
        }
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-primary flex items-center justify-center pb-20", children: _jsx("div", { className: "text-white text-lg", children: "Loading settings..." }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-primary pb-20", children: [_jsxs("div", { className: "container mx-auto px-4 py-6 max-w-4xl", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-white mb-2", children: "Settings" }), _jsx("p", { className: "text-gray-400", children: "Manage your account preferences and settings" })] }), renderActiveContent()] }), _jsx(FloatingJoystick, { activeTab: activeTab, onTabChange: setActiveTab }), _jsx(BottomNav, {})] }));
};
export default Settings;
