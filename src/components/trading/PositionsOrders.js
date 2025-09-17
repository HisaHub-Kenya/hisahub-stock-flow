import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Filter } from "lucide-react";
import { useFinancialData } from "../../contexts/FinancialDataContext";
var PositionsOrders = function () {
    var state = useFinancialData().state;
    var _a = useState("symbol"), sortBy = _a[0], setSortBy = _a[1];
    var _b = useState("all"), filterStatus = _b[0], setFilterStatus = _b[1];
    var totalPortfolioValue = state.portfolioData.totalValue;
    var totalUnrealizedPnL = state.holdings.reduce(function (sum, pos) { return sum + pos.profitLoss; }, 0);
    var totalUnrealizedPnLPercent = state.portfolioData.dailyChangePercent;
    // Mock orders data - in real app this would come from context too
    var mockOrders = [
        {
            id: 1,
            symbol: "KCB",
            type: "Buy",
            orderType: "Limit",
            quantity: 75,
            price: 37.50,
            status: "Pending",
            timestamp: "2024-01-15 10:30:00"
        },
        {
            id: 2,
            symbol: "COOP",
            type: "Sell",
            orderType: "Market",
            quantity: 200,
            price: 12.85,
            status: "Filled",
            timestamp: "2024-01-15 09:15:00"
        }
    ];
    return (_jsxs("div", { className: "glass-card animate-fade-in", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-bold text-off-white", children: "Positions & Orders" }), _jsx(Button, { size: "sm", variant: "outline", className: "p-2", children: _jsx(Filter, { className: "h-4 w-4" }) })] }), _jsxs(Tabs, { defaultValue: "positions", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 bg-white/10", children: [_jsx(TabsTrigger, { value: "positions", className: "text-xs", children: "Positions" }), _jsx(TabsTrigger, { value: "orders", className: "text-xs", children: "Orders" }), _jsx(TabsTrigger, { value: "history", className: "text-xs", children: "History" })] }), _jsxs(TabsContent, { value: "positions", className: "mt-4 space-y-4", children: [_jsxs("div", { className: "bg-white/5 rounded-lg p-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-off-white/60 text-sm", children: "Total Value:" }), _jsxs("span", { className: "text-off-white font-semibold", children: ["KES ", totalPortfolioValue.toLocaleString()] })] }), _jsxs("div", { className: "flex justify-between items-center mt-1", children: [_jsx("span", { className: "text-off-white/60 text-sm", children: "Unrealized P&L:" }), _jsxs("div", { className: "flex items-center gap-1 ".concat(totalUnrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'), children: [totalUnrealizedPnL >= 0 ? _jsx(TrendingUp, { className: "h-3 w-3" }) : _jsx(TrendingDown, { className: "h-3 w-3" }), _jsxs("span", { className: "font-semibold", children: ["KES ", totalUnrealizedPnL.toFixed(2), " (", totalUnrealizedPnLPercent.toFixed(2), "%)"] })] })] })] }), _jsx("div", { className: "space-y-2", children: state.holdings.map(function (position) { return (_jsxs("div", { className: "bg-white/5 rounded-lg p-3", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsxs("div", { children: [_jsx("span", { className: "font-semibold text-off-white", children: position.symbol }), _jsx("p", { className: "text-xs text-off-white/60", children: position.name })] }), _jsxs("div", { className: "flex items-center gap-1 ".concat(position.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'), children: [position.profitLoss >= 0 ? _jsx(TrendingUp, { className: "h-3 w-3" }) : _jsx(TrendingDown, { className: "h-3 w-3" }), _jsxs("span", { className: "text-sm font-semibold", children: [position.profitLossPercent >= 0 ? '+' : '', position.profitLossPercent.toFixed(2), "%"] })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [_jsxs("div", { children: [_jsx("span", { className: "text-off-white/60", children: "Qty: " }), _jsx("span", { className: "text-off-white", children: position.quantity })] }), _jsxs("div", { children: [_jsx("span", { className: "text-off-white/60", children: "Avg: " }), _jsxs("span", { className: "text-off-white", children: ["KES ", position.avgPrice.toFixed(2)] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-off-white/60", children: "Current: " }), _jsxs("span", { className: "text-off-white", children: ["KES ", position.currentPrice.toFixed(2)] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-off-white/60", children: "Value: " }), _jsxs("span", { className: "text-off-white", children: ["KES ", position.value.toLocaleString()] })] })] })] }, position.id)); }) })] }), _jsx(TabsContent, { value: "orders", className: "mt-4 space-y-2", children: mockOrders.map(function (order) { return (_jsxs("div", { className: "bg-white/5 rounded-lg p-3", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsxs("div", { children: [_jsx("span", { className: "font-semibold text-off-white", children: order.symbol }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(Badge, { variant: order.type === 'Buy' ? 'default' : 'destructive', className: "text-xs", children: order.type }), _jsx(Badge, { variant: "outline", className: "text-xs", children: order.orderType })] })] }), _jsx(Badge, { variant: order.status === 'Filled' ? 'default' : order.status === 'Pending' ? 'secondary' : 'destructive', className: "text-xs", children: order.status })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [_jsxs("div", { children: [_jsx("span", { className: "text-off-white/60", children: "Qty: " }), _jsx("span", { className: "text-off-white", children: order.quantity })] }), _jsxs("div", { children: [_jsx("span", { className: "text-off-white/60", children: "Price: " }), _jsxs("span", { className: "text-off-white", children: ["KES ", order.price.toFixed(2)] })] })] }), _jsx("p", { className: "text-xs text-off-white/60 mt-2", children: order.timestamp })] }, order.id)); }) }), _jsx(TabsContent, { value: "history", className: "mt-4 space-y-2", children: state.transactions.slice(0, 5).map(function (trade) { return (_jsxs("div", { className: "bg-white/5 rounded-lg p-3", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsxs("div", { children: [_jsx("span", { className: "font-semibold text-off-white", children: trade.symbol }), _jsx(Badge, { variant: trade.type === 'BUY' ? 'default' : 'destructive', className: "text-xs ml-2", children: trade.type })] }), _jsxs("span", { className: "text-off-white font-semibold", children: ["KES ", trade.total.toLocaleString()] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [_jsxs("div", { children: [_jsx("span", { className: "text-off-white/60", children: "Qty: " }), _jsx("span", { className: "text-off-white", children: trade.quantity })] }), _jsxs("div", { children: [_jsx("span", { className: "text-off-white/60", children: "Price: " }), _jsxs("span", { className: "text-off-white", children: ["KES ", trade.price.toFixed(2)] })] })] }), _jsx("p", { className: "text-xs text-off-white/60 mt-2", children: trade.date })] }, trade.id)); }) })] })] }));
};
export default PositionsOrders;
