import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";
// Critical routes loaded immediately
import Index from "./pages/Index";
import Auth from "./pages/Auth";
// Non-critical routes loaded lazily
var Trade = lazy(function () { return import("./pages/Trade"); });
var Portfolio = lazy(function () { return import("./pages/Portfolio"); });
var News = lazy(function () { return import("./pages/News"); });
var Community = lazy(function () { return import("./pages/Community"); });
var Settings = lazy(function () { return import("./pages/Settings"); });
var BrokerIntegration = lazy(function () { return import("./pages/BrokerIntegration"); });
var Chatbot = lazy(function () { return import("./pages/Chatbot"); });
var NotFound = lazy(function () { return import("./pages/NotFound"); });
// Loading component
var PageLoader = function () { return (_jsx("div", { className: "min-h-screen bg-primary flex items-center justify-center", children: _jsxs("div", { className: "space-y-4 w-full max-w-md", children: [_jsx(Skeleton, { className: "h-12 w-full bg-white/10" }), _jsx(Skeleton, { className: "h-32 w-full bg-white/10" }), _jsx(Skeleton, { className: "h-8 w-3/4 bg-white/10" })] }) })); };
import { ThemeProvider } from "./components/ThemeProvider";
import { useAppStore } from "./stores/useAppStore";
import SplashScreen from "./components/SplashScreen";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
var queryClient = new QueryClient();
var App = function () {
    var _a = useState(true), showSplash = _a[0], setShowSplash = _a[1];
    var _b = useAppStore(), user = _b.user, isAuthenticated = _b.isAuthenticated, setUser = _b.setUser, syncAuthState = _b.syncAuthState, loadPortfolioData = _b.loadPortfolioData, loadMarketData = _b.loadMarketData;
    var handleSplashComplete = function () {
        setShowSplash(false);
    };
    var handleLogin = function () {
        // Sync auth state after login
        syncAuthState();
        if (isAuthenticated) {
            // Load data after successful login
            loadPortfolioData();
            loadMarketData();
        }
    };
    useEffect(function () {
        // Sync auth state on app load
        syncAuthState();
        if (isAuthenticated) {
            // Load data if user is already authenticated
            loadPortfolioData();
            loadMarketData();
        }
    }, [syncAuthState, loadPortfolioData, loadMarketData, isAuthenticated]);
    if (showSplash) {
        return _jsx(SplashScreen, { onComplete: handleSplashComplete });
    }
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(ThemeProvider, { defaultTheme: "dark", storageKey: "vite-ui-theme", children: _jsxs(TooltipProvider, { children: [_jsx(Toaster, {}), _jsxs(BrowserRouter, { children: [_jsxs(Routes, { children: [_jsx(Route, { path: "/auth", element: _jsx(Auth, { onLogin: handleLogin }) }), isAuthenticated ? (_jsxs(_Fragment, { children: [_jsx(Route, { path: "/", element: _jsx(Index, {}) }), _jsx(Route, { path: "/trade", element: _jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsx(Trade, {}) }) }), _jsx(Route, { path: "/portfolio", element: _jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsx(Portfolio, {}) }) }), _jsx(Route, { path: "/news", element: _jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsx(News, {}) }) }), _jsx(Route, { path: "/community", element: _jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsx(Community, {}) }) }), _jsx(Route, { path: "/settings", element: _jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsx(Settings, {}) }) }), _jsx(Route, { path: "/broker-integration", element: _jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsx(BrokerIntegration, {}) }) }), _jsx(Route, { path: "/chatbot", element: _jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsx(Chatbot, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsx(NotFound, {}) }) })] })) : (
                                    // Redirect all routes to auth if not authenticated
                                    _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/auth", replace: true }) }))] }), isAuthenticated && _jsx(PWAInstallPrompt, {})] })] }) }) }));
};
export default App;
