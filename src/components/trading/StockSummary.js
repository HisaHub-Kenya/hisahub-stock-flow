import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Star, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
var StockSummary = function (_a) {
    var stock = _a.stock;
    var _b = useState(false), isWatchlisted = _b[0], setIsWatchlisted = _b[1];
    var isPositive = stock.change >= 0;
    var percentChange = stock.changePercent;
    // Format volume for display
    var formatVolume = function (volume) {
        if (volume >= 1000000) {
            return "".concat((volume / 1000000).toFixed(1), "M");
        }
        else if (volume >= 1000) {
            return "".concat((volume / 1000).toFixed(1), "K");
        }
        return volume.toString();
    };
    return (_jsxs("div", { className: "glass-card animate-fade-in", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h2", { className: "text-lg sm:text-xl font-bold text-off-white", children: stock.name }), _jsx("p", { className: "text-off-white/60 text-sm", children: stock.symbol })] }), _jsx(Button, { size: "sm", variant: "outline", onClick: function () { return setIsWatchlisted(!isWatchlisted); }, className: "p-2 ".concat(isWatchlisted ? 'text-yellow-400' : 'text-off-white/60'), children: _jsx(Star, { className: "h-4 w-4 ".concat(isWatchlisted ? 'fill-current' : '') }) })] }), _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6", children: [_jsxs("span", { className: "text-2xl sm:text-3xl font-bold text-off-white font-mono", children: ["KES ", stock.price.toFixed(2)] }), _jsxs("div", { className: "flex items-center gap-1 px-2 py-1 rounded text-sm font-medium ".concat(isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'), children: [isPositive ? _jsx(TrendingUp, { className: "h-3 w-3" }) : _jsx(TrendingDown, { className: "h-3 w-3" }), _jsxs("span", { children: ["(", isPositive ? '+' : '', percentChange, "%)"] })] })] }), _jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-off-white/60 text-xs", children: "Market Cap" }), _jsx("p", { className: "text-off-white font-semibold text-sm", children: "N/A" })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-off-white/60 text-xs", children: "P/E Ratio" }), _jsx("p", { className: "text-off-white font-semibold text-sm", children: "N/A" })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-off-white/60 text-xs", children: "Volume" }), _jsx("p", { className: "text-off-white font-semibold text-sm", children: formatVolume(stock.volume) })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-off-white/60 text-xs", children: "Day Range" }), _jsxs("p", { className: "text-off-white font-semibold text-xs", children: [stock.low.toFixed(2), " - ", stock.high.toFixed(2)] })] })] }), _jsx("div", { className: "flex items-center justify-center mt-4 pt-4 border-t border-white/10", children: _jsxs("div", { className: "flex items-center gap-2 text-xs text-green-400", children: [_jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }), _jsx("span", { children: "Live Market Data" })] }) })] }));
};
export default StockSummary;
