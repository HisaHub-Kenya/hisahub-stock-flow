import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import ChatFAB from "../components/ChatFAB";
import BottomNav from "../components/BottomNav";
import HisaAIButton from "../components/HisaAIButton";
import { Menu, TrendingUp, TrendingDown, Download, RefreshCw, Plus, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { useAppStore } from "../stores/useAppStore";
import { useAutoRefresh } from "../hooks/useAutoRefresh";
var Portfolio = function () {
    var _a = useAppStore(), portfolioData = _a.portfolioData, holdings = _a.holdings, transactions = _a.transactions, isLoading = _a.isLoading, depositFunds = _a.depositFunds, withdrawFunds = _a.withdrawFunds, logAnalytics = _a.logAnalytics;
    var _b = useState("overview"), activeSection = _b[0], setActiveSection = _b[1];
    var _c = useState("value"), sortBy = _c[0], setSortBy = _c[1];
    var _d = useState("all"), filterType = _d[0], setFilterType = _d[1];
    // Auto-refresh data every 10 seconds
    useAutoRefresh(10000);
    // Mock data for sections not yet implemented with real data
    var allocationData = [
        { name: "Banking", value: 17154, color: "#FFBF00" },
        { name: "Telecommunications", value: 5255.50, color: "#00C851" },
        { name: "Beverages", value: 6682.50, color: "#FF4444" },
        { name: "Others", value: 3158.34, color: "#33B5E5" },
    ];
    var dividends = [
        { symbol: "EQTY", amount: 200.00, exDate: "2025-05-10", payDate: "2025-05-25", status: "Upcoming" },
        { symbol: "COOP", amount: 150.00, exDate: "2025-04-15", payDate: "2025-04-30", status: "Paid" },
        { symbol: "KCB", amount: 180.00, exDate: "2025-06-01", payDate: "2025-06-15", status: "Announced" },
    ];
    var performanceData = [
        { date: "Jan", value: 95000 },
        { date: "Feb", value: 98000 },
        { date: "Mar", value: 105000 },
        { date: "Apr", value: 112000 },
        { date: "May", value: portfolioData.totalValue },
    ];
    var menuItems = [
        { id: "overview", label: "Portfolio Overview", icon: _jsx(BarChart3, { size: 18 }) },
        { id: "holdings", label: "Holdings", icon: _jsx(TrendingUp, { size: 18 }) },
        { id: "allocation", label: "Allocation", icon: _jsx(BarChart3, { size: 18 }) },
        { id: "transactions", label: "Transactions", icon: _jsx(RefreshCw, { size: 18 }) },
        { id: "dividends", label: "Dividends", icon: _jsx(Download, { size: 18 }) },
        { id: "performance", label: "Performance", icon: _jsx(TrendingUp, { size: 18 }) },
    ];
    var renderOverview = function () { return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "glass-card p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-off-white/60 text-sm", children: "Total Portfolio Value" }), _jsx(RefreshCw, { size: 16, className: "text-secondary animate-spin" })] }), _jsxs("div", { className: "text-3xl font-bold text-off-white mb-2", children: ["KES ", portfolioData.totalValue.toLocaleString()] }), _jsx("div", { className: "flex items-center gap-4", children: _jsxs("div", { className: "flex items-center gap-1 ".concat(portfolioData.dailyChange >= 0 ? 'text-green-400' : 'text-red-400'), children: [portfolioData.dailyChange >= 0 ? _jsx(TrendingUp, { size: 16 }) : _jsx(TrendingDown, { size: 16 }), _jsxs("span", { className: "font-semibold", children: [portfolioData.dailyChange >= 0 ? '+' : '', "KES ", Math.abs(portfolioData.dailyChange).toLocaleString()] }), _jsxs("span", { children: ["(", portfolioData.dailyChangePercent >= 0 ? '+' : '', portfolioData.dailyChangePercent, "%)"] })] }) }), _jsxs("div", { className: "flex gap-4 mt-3 text-xs", children: [_jsxs("span", { className: "text-off-white/60", children: ["Week: ", _jsxs("span", { className: "text-green-400", children: ["+", portfolioData.weeklyChangePercent, "%"] })] }), _jsxs("span", { className: "text-off-white/60", children: ["Month: ", _jsxs("span", { className: "text-green-400", children: ["+", portfolioData.monthlyChangePercent, "%"] })] })] })] }), _jsxs("div", { className: "glass-card p-4", children: [_jsx("h3", { className: "font-semibold text-off-white mb-3", children: "Portfolio Trend" }), _jsx("div", { className: "h-32", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: performanceData, children: [_jsx(XAxis, { dataKey: "date", axisLine: false, tickLine: false, style: { fontSize: 10 } }), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "value", stroke: "#FFBF00", strokeWidth: 2, dot: false })] }) }) })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { className: "flex-1 bg-secondary text-primary hover:bg-secondary/90", onClick: function () {
                            var amount = 1000; // Default amount
                            depositFunds(amount);
                            logAnalytics('add_funds_clicked', { amount: amount });
                        }, disabled: isLoading, children: [_jsx(Plus, { size: 16, className: "mr-2" }), isLoading ? 'Processing...' : 'Add Funds'] }), _jsx(Button, { variant: "outline", className: "flex-1 border-secondary/20 text-off-white hover:bg-white/10", onClick: function () {
                            logAnalytics('rebalance_clicked');
                            // TODO: Implement rebalance functionality
                        }, children: "Rebalance" })] })] })); };
    var renderHoldings = function () { return (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "flex gap-2 mb-4", children: _jsxs("select", { className: "bg-charcoal text-off-white rounded px-3 py-1 text-sm border border-secondary/20", value: sortBy, onChange: function (e) { return setSortBy(e.target.value); }, children: [_jsx("option", { value: "value", children: "Sort by Value" }), _jsx("option", { value: "profitLoss", children: "Sort by P&L" }), _jsx("option", { value: "symbol", children: "Sort by Symbol" })] }) }), holdings.length === 0 ? (_jsxs("div", { className: "glass-card p-8 text-center", children: [_jsx("p", { className: "text-off-white/60 mb-4", children: "No holdings found" }), _jsx(Button, { className: "bg-secondary text-primary hover:bg-secondary/90", children: "Start Trading" })] })) : (holdings
                .sort(function (a, b) {
                if (sortBy === "value")
                    return b.market_value - a.market_value;
                if (sortBy === "profitLoss")
                    return b.profitLoss - a.profitLoss;
                return a.symbol.localeCompare(b.symbol);
            })
                .map(function (holding) { return (_jsxs("div", { className: "glass-card p-4", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsxs("div", { children: [_jsx("div", { className: "font-semibold text-off-white text-lg", children: holding.symbol }), _jsx("div", { className: "text-xs text-neutral", children: holding.name }), _jsxs("div", { className: "text-xs text-off-white/60 mt-1", children: [holding.quantity, " shares @ KES ", holding.average_price] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "font-bold text-lg text-off-white", children: ["KES ", holding.market_value.toLocaleString()] }), _jsxs("div", { className: "text-sm text-off-white/60", children: ["KES ", holding.current_price.toFixed(2)] })] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-1 ".concat(holding.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'), children: [holding.profitLoss >= 0 ? _jsx(TrendingUp, { size: 14 }) : _jsx(TrendingDown, { size: 14 }), _jsxs("span", { className: "font-semibold text-sm", children: [holding.profitLoss >= 0 ? '+' : '', "KES ", Math.abs(holding.profitLoss).toFixed(2)] }), _jsxs("span", { className: "text-xs", children: ["(", holding.profitLossPercent >= 0 ? '+' : '', holding.profitLossPercent.toFixed(2), "%)"] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", variant: "outline", className: "text-xs border-secondary/20 text-secondary hover:bg-secondary/10", onClick: function () {
                                            logAnalytics('buy_stock_clicked', { symbol: holding.symbol });
                                            // TODO: Navigate to trade page with pre-selected stock
                                        }, children: "Buy" }), _jsx(Button, { size: "sm", variant: "outline", className: "text-xs border-red-500/20 text-red-400 hover:bg-red-500/10", onClick: function () {
                                            logAnalytics('sell_stock_clicked', { symbol: holding.symbol });
                                            // TODO: Navigate to trade page with pre-selected stock and sell mode
                                        }, children: "Sell" })] })] })] }, holding.id)); }))] })); };
    var renderAllocation = function () { return (_jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "glass-card p-4", children: [_jsx("h3", { className: "font-semibold text-off-white mb-4", children: "Asset Allocation" }), _jsx("div", { className: "h-48 mb-4", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: allocationData, cx: "50%", cy: "50%", innerRadius: 40, outerRadius: 80, dataKey: "value", children: allocationData.map(function (entry, index) { return (_jsx(Cell, { fill: entry.color }, index)); }) }), _jsx(Tooltip, {})] }) }) }), _jsx("div", { className: "space-y-2", children: allocationData.map(function (item, index) { return (_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: item.color } }), _jsx("span", { className: "text-off-white text-sm", children: item.name })] }), _jsxs("div", { className: "text-off-white font-semibold text-sm", children: ["KES ", item.value.toLocaleString()] })] }, index)); }) })] }) })); };
    var renderTransactions = function () { return (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "flex gap-2 mb-4", children: _jsxs("select", { className: "bg-charcoal text-off-white rounded px-3 py-1 text-sm border border-secondary/20", value: filterType, onChange: function (e) { return setFilterType(e.target.value); }, children: [_jsx("option", { value: "all", children: "All Transactions" }), _jsx("option", { value: "BUY", children: "Buy Orders" }), _jsx("option", { value: "SELL", children: "Sell Orders" }), _jsx("option", { value: "DIVIDEND", children: "Dividends" })] }) }), transactions
                .filter(function (tx) { return filterType === "all" || tx.type === filterType; })
                .map(function (tx, index) { return (_jsx("div", { className: "glass-card p-4", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "px-2 py-1 rounded text-xs font-semibold ".concat(tx.type === 'BUY' ? 'bg-green-500/20 text-green-400' :
                                                tx.type === 'SELL' ? 'bg-red-500/20 text-red-400' :
                                                    'bg-blue-500/20 text-blue-400'), children: tx.type }), _jsx("span", { className: "font-semibold text-off-white", children: tx.symbol })] }), _jsxs("div", { className: "text-xs text-off-white/60", children: [tx.quantity, " shares @ KES ", tx.price] }), _jsx("div", { className: "text-xs text-neutral", children: tx.date })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "font-semibold text-off-white", children: ["KES ", tx.total.toLocaleString()] }), _jsx("div", { className: "text-xs ".concat(tx.status === 'Completed' || tx.status === 'Paid' ? 'text-green-400' : 'text-yellow-400'), children: tx.status })] })] }) }, index)); })] })); };
    var renderDividends = function () { return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "glass-card p-4", children: [_jsx("h3", { className: "font-semibold text-off-white mb-2", children: "Total Dividend Income" }), _jsx("div", { className: "text-2xl font-bold text-green-400 mb-2", children: "KES 530.00" }), _jsx("div", { className: "text-xs text-off-white/60", children: "This year" })] }), _jsx("div", { className: "space-y-3", children: dividends.map(function (dividend, index) { return (_jsx("div", { className: "glass-card p-4", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("div", { className: "font-semibold text-off-white", children: dividend.symbol }), _jsxs("div", { className: "text-xs text-off-white/60", children: ["Ex-Date: ", dividend.exDate] }), _jsxs("div", { className: "text-xs text-off-white/60", children: ["Pay Date: ", dividend.payDate] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "font-semibold text-off-white", children: ["KES ", dividend.amount.toFixed(2)] }), _jsx("div", { className: "text-xs ".concat(dividend.status === 'Paid' ? 'text-green-400' :
                                            dividend.status === 'Upcoming' ? 'text-yellow-400' :
                                                'text-blue-400'), children: dividend.status })] })] }) }, index)); }) })] })); };
    var renderPerformance = function () { return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "glass-card p-4", children: [_jsx("h3", { className: "font-semibold text-off-white mb-4", children: "Performance Metrics" }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xs text-off-white/60", children: "Total Return" }), _jsx("div", { className: "text-lg font-semibold text-green-400", children: "+30.8%" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-xs text-off-white/60", children: "Annualized Return" }), _jsx("div", { className: "text-lg font-semibold text-green-400", children: "+18.2%" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-xs text-off-white/60", children: "vs NSE20 Index" }), _jsx("div", { className: "text-lg font-semibold text-green-400", children: "+5.4%" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-xs text-off-white/60", children: "Sharpe Ratio" }), _jsx("div", { className: "text-lg font-semibold text-off-white", children: "1.34" })] })] }), _jsx("div", { className: "h-32", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: performanceData, children: [_jsx(XAxis, { dataKey: "date", axisLine: false, tickLine: false, style: { fontSize: 10 } }), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "value", stroke: "#FFBF00", strokeWidth: 2, dot: false })] }) }) })] }), _jsxs(Button, { className: "w-full bg-secondary text-primary hover:bg-secondary/90", children: [_jsx(Download, { size: 16, className: "mr-2" }), "Download Performance Report"] })] })); };
    var renderContent = function () {
        switch (activeSection) {
            case "overview": return renderOverview();
            case "holdings": return renderHoldings();
            case "allocation": return renderAllocation();
            case "transactions": return renderTransactions();
            case "dividends": return renderDividends();
            case "performance": return renderPerformance();
            default: return renderOverview();
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-primary font-sans transition-colors", children: [_jsx(HisaAIButton, {}), _jsxs("main", { className: "flex-1 flex flex-col items-center px-4 py-7 w-full max-w-2xl mx-auto", children: [_jsxs("div", { className: "w-full flex items-center justify-between mb-4", children: [_jsx("h1", { className: "text-2xl font-bold text-secondary", children: "Portfolio" }), _jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "icon", className: "bg-white/10 border-secondary/20 text-off-white hover:bg-white/20", children: _jsx(Menu, { className: "h-4 w-4" }) }) }), _jsxs(SheetContent, { className: "bg-primary border-secondary/20", children: [_jsxs(SheetHeader, { children: [_jsx(SheetTitle, { className: "text-secondary", children: "Portfolio Menu" }), _jsx(SheetDescription, { className: "text-off-white/60", children: "Navigate through your portfolio sections" })] }), _jsx("div", { className: "mt-6 space-y-2", children: menuItems.map(function (item) { return (_jsxs(Button, { variant: activeSection === item.id ? "secondary" : "ghost", className: "w-full justify-start gap-2 text-off-white hover:bg-white/10", onClick: function () { return setActiveSection(item.id); }, children: [item.icon, item.label] }, item.id)); }) })] })] })] }), _jsx("div", { className: "w-full", children: renderContent() }), _jsx(ChatFAB, {})] }), _jsx(BottomNav, {})] }));
};
export default Portfolio;
