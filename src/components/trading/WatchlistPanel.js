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
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Star, StarOff, Plus, Search, TrendingUp, TrendingDown } from 'lucide-react';
import { useFinancialData } from '../../contexts/FinancialDataContext';
import { toast } from 'sonner';
var WatchlistPanel = function () {
    var state = useFinancialData().state;
    var _a = useState(['SCOM', 'KCB']), watchlist = _a[0], setWatchlist = _a[1];
    var _b = useState(''), searchTerm = _b[0], setSearchTerm = _b[1];
    var _c = useState(false), showAddStock = _c[0], setShowAddStock = _c[1];
    var watchedStocks = state.stocks.filter(function (stock) { return watchlist.includes(stock.symbol); });
    var availableStocks = state.stocks.filter(function (stock) {
        return !watchlist.includes(stock.symbol) &&
            stock.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    });
    var addToWatchlist = function (symbol) {
        if (!watchlist.includes(symbol)) {
            setWatchlist(__spreadArray(__spreadArray([], watchlist, true), [symbol], false));
            toast.success("".concat(symbol, " added to watchlist"));
            setSearchTerm('');
            setShowAddStock(false);
        }
    };
    var removeFromWatchlist = function (symbol) {
        setWatchlist(watchlist.filter(function (s) { return s !== symbol; }));
        toast.success("".concat(symbol, " removed from watchlist"));
    };
    return (_jsxs("div", { className: "glass-card animate-fade-in", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Star, { className: "h-4 w-4 text-secondary" }), _jsx("h3", { className: "text-lg font-bold text-off-white", children: "Watchlist" })] }), _jsx(Button, { size: "sm", onClick: function () { return setShowAddStock(!showAddStock); }, className: "bg-secondary hover:bg-secondary/80", children: _jsx(Plus, { className: "h-4 w-4" }) })] }), showAddStock && (_jsxs("div", { className: "bg-white/5 rounded-lg p-3 mb-4", children: [_jsx("div", { className: "flex gap-2 mb-2", children: _jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-off-white/60" }), _jsx(Input, { placeholder: "Search stocks...", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, className: "pl-8 bg-white/10 border-secondary/20 text-off-white text-sm" })] }) }), searchTerm && (_jsx("div", { className: "space-y-1 max-h-32 overflow-y-auto", children: availableStocks.map(function (stock) { return (_jsxs("div", { onClick: function () { return addToWatchlist(stock.symbol); }, className: "flex items-center justify-between p-2 hover:bg-white/10 rounded cursor-pointer", children: [_jsxs("div", { children: [_jsx("span", { className: "font-semibold text-off-white text-sm", children: stock.symbol }), _jsx("p", { className: "text-xs text-off-white/60", children: stock.name })] }), _jsxs("span", { className: "text-xs text-off-white", children: ["KES ", stock.price.toFixed(2)] })] }, stock.symbol)); }) }))] })), _jsx("div", { className: "space-y-2", children: watchedStocks.length === 0 ? (_jsxs("div", { className: "text-center py-6 text-off-white/60", children: [_jsx(Star, { className: "h-8 w-8 mx-auto mb-2 opacity-50" }), _jsx("p", { className: "text-sm", children: "No stocks in watchlist" })] })) : (watchedStocks.map(function (stock) {
                    var isPositive = stock.change >= 0;
                    return (_jsx("div", { className: "bg-white/5 rounded-lg p-3", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-semibold text-off-white", children: stock.symbol }), _jsxs(Badge, { variant: isPositive ? "default" : "destructive", className: "text-xs", children: [isPositive ? _jsx(TrendingUp, { className: "h-3 w-3 mr-1" }) : _jsx(TrendingDown, { className: "h-3 w-3 mr-1" }), isPositive ? '+' : '', stock.change.toFixed(2), "%"] })] }), _jsx("p", { className: "text-xs text-off-white/60", children: stock.name })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "font-mono font-semibold text-off-white text-sm", children: ["KES ", stock.price.toFixed(2)] }), _jsx(Button, { size: "sm", variant: "ghost", onClick: function () { return removeFromWatchlist(stock.symbol); }, className: "p-1 h-auto", children: _jsx(StarOff, { className: "h-3 w-3" }) })] })] }) }, stock.symbol));
                })) })] }));
};
export default WatchlistPanel;
