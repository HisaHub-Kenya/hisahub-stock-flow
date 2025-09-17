import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatFAB from "../components/ChatFAB";
import BottomNav from "../components/BottomNav";
import HisaAIButton from "../components/HisaAIButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import TradingChart from "../components/trading/TradingChart";
import StockSummary from "../components/trading/StockSummary";
import OrderPanel from "../components/trading/OrderPanel";
import PositionsOrders from "../components/trading/PositionsOrders";
import AlertsPanel from "../components/trading/AlertsPanel";
import NewsFeed from "../components/trading/NewsFeed";
import WatchlistPanel from "../components/trading/WatchlistPanel";
import ResearchPanel from "../components/trading/ResearchPanel";
import { useAppStore } from "../stores/useAppStore";
import { useAutoRefresh } from "../hooks/useAutoRefresh";
var Trade = function () {
    var navigate = useNavigate();
    var _a = useAppStore(), stocks = _a.stocks, selectedStock = _a.selectedStock, setSelectedStock = _a.setSelectedStock, placeOrder = _a.placeOrder, logAnalytics = _a.logAnalytics, isLoading = _a.isLoading;
    // Auto-refresh data every 5 seconds for trading page
    useAutoRefresh(5000);
    var _b = useState(selectedStock || stocks[0] || {
        id: '',
        symbol: 'SCOM',
        name: 'Safaricom PLC',
        sector: 'Technology',
        price: 28.50,
        volume: 1000000,
        high: 29.00,
        low: 28.00,
        change: 0.50,
        changePercent: '1.79'
    }), currentStock = _b[0], setCurrentStock = _b[1];
    var handleStockChange = function (stockSymbol) {
        var stock = stocks.find(function (s) { return s.symbol === stockSymbol; });
        if (stock) {
            setCurrentStock(stock);
            setSelectedStock(stock);
            logAnalytics('stock_selected', { symbol: stock.symbol });
        }
    };
    var handleBrokerLogin = function () {
        logAnalytics('broker_login_clicked');
        navigate("/broker-integration");
    };
    // Update selected stock when prices change
    React.useEffect(function () {
        if (stocks.length > 0 && currentStock) {
            var updatedStock = stocks.find(function (s) { return s.symbol === currentStock.symbol; });
            if (updatedStock) {
                setCurrentStock(updatedStock);
            }
        }
    }, [stocks, currentStock]);
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-primary font-sans transition-colors", children: [_jsx(HisaAIButton, {}), _jsxs("main", { className: "flex-1 w-full max-w-7xl mx-auto flex flex-col px-2 sm:px-4 py-4", children: [_jsxs("div", { className: "mb-4 flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "flex-1", children: _jsxs(Select, { value: currentStock.symbol, onValueChange: handleStockChange, children: [_jsx(SelectTrigger, { className: "w-full bg-white/10 border-secondary/20 text-off-white", children: _jsx(SelectValue, { children: _jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsxs("div", { className: "flex flex-col items-start", children: [_jsx("span", { className: "font-semibold", children: currentStock.symbol }), _jsx("span", { className: "text-xs text-off-white/60", children: currentStock.name })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "font-mono", children: ["KES ", currentStock.price.toFixed(2)] }), _jsxs("span", { className: "text-xs ".concat(currentStock.change >= 0 ? 'text-green-400' : 'text-red-400'), children: [currentStock.change >= 0 ? '+' : '', currentStock.change.toFixed(2), "%"] })] })] }) }) }), _jsx(SelectContent, { className: "bg-primary border-secondary/20", children: stocks.map(function (stock) { return (_jsx(SelectItem, { value: stock.symbol, className: "text-off-white focus:bg-white/10", children: _jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsxs("div", { className: "flex flex-col items-start", children: [_jsx("span", { className: "font-semibold", children: stock.symbol }), _jsx("span", { className: "text-xs text-off-white/60", children: stock.name })] }), _jsxs("div", { className: "flex items-center gap-2 ml-4", children: [_jsxs("span", { className: "font-mono text-sm", children: ["KES ", stock.price.toFixed(2)] }), _jsxs("span", { className: "text-xs ".concat(stock.change >= 0 ? 'text-green-400' : 'text-red-400'), children: [stock.change >= 0 ? '+' : '', stock.change.toFixed(2), "%"] })] })] }) }, stock.symbol)); }) })] }) }), _jsx("div", { className: "w-full sm:w-auto", children: _jsxs(Button, { onClick: handleBrokerLogin, className: "w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-secondary/20 text-off-white px-4 py-2 h-full", variant: "outline", children: [_jsx(LogIn, { className: "w-5 h-5 mr-2" }), "Broker Login"] }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 flex-1", children: [_jsxs("div", { className: "lg:col-span-2 space-y-4 sm:space-y-6", children: [_jsx(StockSummary, { stock: currentStock }), _jsx(TradingChart, { symbol: currentStock.symbol })] }), _jsxs("div", { className: "space-y-4 sm:space-y-6", children: [_jsx(OrderPanel, { stock: currentStock }), _jsx("div", { className: "lg:hidden", children: _jsxs(Tabs, { defaultValue: "positions", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-5 bg-white/10 text-xs", children: [_jsx(TabsTrigger, { value: "positions", className: "text-xs", children: "Positions" }), _jsx(TabsTrigger, { value: "watchlist", className: "text-xs", children: "Watch" }), _jsx(TabsTrigger, { value: "research", className: "text-xs", children: "Research" }), _jsx(TabsTrigger, { value: "alerts", className: "text-xs", children: "Alerts" }), _jsx(TabsTrigger, { value: "news", className: "text-xs", children: "News" })] }), _jsx(TabsContent, { value: "positions", className: "mt-4", children: _jsx(PositionsOrders, {}) }), _jsx(TabsContent, { value: "watchlist", className: "mt-4", children: _jsx(WatchlistPanel, {}) }), _jsx(TabsContent, { value: "research", className: "mt-4", children: _jsx(ResearchPanel, { stock: currentStock }) }), _jsx(TabsContent, { value: "alerts", className: "mt-4", children: _jsx(AlertsPanel, { stock: currentStock }) }), _jsx(TabsContent, { value: "news", className: "mt-4", children: _jsx(NewsFeed, { stock: currentStock }) })] }) }), _jsxs("div", { className: "hidden lg:block space-y-6", children: [_jsx(PositionsOrders, {}), _jsx(WatchlistPanel, {}), _jsx(ResearchPanel, { stock: currentStock }), _jsx(AlertsPanel, { stock: currentStock }), _jsx(NewsFeed, { stock: currentStock })] })] })] })] }), _jsx(ChatFAB, {}), _jsx(BottomNav, {})] }));
};
export default Trade;
