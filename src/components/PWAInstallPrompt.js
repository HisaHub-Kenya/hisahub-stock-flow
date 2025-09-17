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
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, X, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
var PWAInstallPrompt = function () {
    var _a = useState(null), deferredPrompt = _a[0], setDeferredPrompt = _a[1];
    var _b = useState(false), showInstallPrompt = _b[0], setShowInstallPrompt = _b[1];
    var _c = useState(false), isStandalone = _c[0], setIsStandalone = _c[1];
    useEffect(function () {
        // Check if app is already installed (running in standalone mode)
        var checkStandalone = function () {
            return window.matchMedia('(display-mode: standalone)').matches ||
                window.navigator.standalone ||
                document.referrer.includes('android-app://');
        };
        setIsStandalone(checkStandalone());
        var handleBeforeInstallPrompt = function (e) {
            e.preventDefault();
            setDeferredPrompt(e);
            // Show install prompt after user has been using the app for a bit
            setTimeout(function () {
                if (!checkStandalone()) {
                    setShowInstallPrompt(true);
                }
            }, 10000); // Show after 10 seconds
        };
        var handleAppInstalled = function () {
            setDeferredPrompt(null);
            setShowInstallPrompt(false);
            toast.success('HisaHub installed successfully! You can now access it from your home screen.');
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);
        return function () {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);
    var handleInstallClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var outcome, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!deferredPrompt)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, deferredPrompt.prompt()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, deferredPrompt.userChoice];
                case 3:
                    outcome = (_a.sent()).outcome;
                    if (outcome === 'accepted') {
                        toast.success('Installing HisaHub...');
                    }
                    else {
                        toast.info('Installation cancelled. You can install later from your browser menu.');
                    }
                    setDeferredPrompt(null);
                    setShowInstallPrompt(false);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Installation failed:', error_1);
                    toast.error('Installation failed. Please try again.');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleDismiss = function () {
        setShowInstallPrompt(false);
        // Don't show again for this session
        sessionStorage.setItem('pwa-install-dismissed', 'true');
    };
    // Don't show if already dismissed in this session or if already installed
    if (isStandalone ||
        !showInstallPrompt ||
        !deferredPrompt ||
        sessionStorage.getItem('pwa-install-dismissed')) {
        return null;
    }
    return (_jsx("div", { className: "fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80", children: _jsxs(Card, { className: "bg-primary border-secondary/20 shadow-lg", children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Smartphone, { className: "w-5 h-5 text-secondary" }), _jsx(CardTitle, { className: "text-lg text-off-white", children: "Install HisaHub" })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: handleDismiss, className: "text-off-white/60 hover:text-off-white", children: _jsx(X, { className: "w-4 h-4" }) })] }), _jsx(CardDescription, { className: "text-off-white/80", children: "Install HisaHub on your device for quick access and a better experience." })] }), _jsx(CardContent, { className: "pt-0", children: _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: handleInstallClick, className: "flex-1 bg-secondary text-primary hover:bg-secondary/90", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Install App"] }), _jsx(Button, { variant: "outline", onClick: handleDismiss, className: "border-secondary/20 text-off-white hover:bg-white/10", children: "Later" })] }) })] }) }));
};
export default PWAInstallPrompt;
