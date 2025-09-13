import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
var OpenPositionsCard = function () {
    var scrollRef = useRef(null);
    var _a = useState(false), isDragging = _a[0], setIsDragging = _a[1];
    var _b = useState(0), startX = _b[0], setStartX = _b[1];
    var _c = useState(0), scrollLeft = _c[0], setScrollLeft = _c[1];
    var positions = [
        { symbol: 'SCOM', shares: 100, avgPrice: 40.25, currentPrice: 42.50, value: 4250 },
        { symbol: 'EQTY', shares: 50, avgPrice: 60.00, currentPrice: 58.75, value: 2937.50 },
        { symbol: 'KCB', shares: 75, avgPrice: 44.50, currentPrice: 45.00, value: 3375 },
    ];
    var handleMouseDown = function (e) {
        var _a, _b;
        setIsDragging(true);
        setStartX(e.pageX - (((_a = scrollRef.current) === null || _a === void 0 ? void 0 : _a.offsetLeft) || 0));
        setScrollLeft(((_b = scrollRef.current) === null || _b === void 0 ? void 0 : _b.scrollLeft) || 0);
    };
    var handleMouseLeave = function () {
        setIsDragging(false);
    };
    var handleMouseUp = function () {
        setIsDragging(false);
    };
    var handleMouseMove = function (e) {
        if (!isDragging || !scrollRef.current)
            return;
        e.preventDefault();
        var x = e.pageX - (scrollRef.current.offsetLeft || 0);
        var walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };
    var handleTouchStart = function (e) {
        var _a, _b;
        setIsDragging(true);
        setStartX(e.touches[0].pageX - (((_a = scrollRef.current) === null || _a === void 0 ? void 0 : _a.offsetLeft) || 0));
        setScrollLeft(((_b = scrollRef.current) === null || _b === void 0 ? void 0 : _b.scrollLeft) || 0);
    };
    var handleTouchMove = function (e) {
        if (!isDragging || !scrollRef.current)
            return;
        var x = e.touches[0].pageX - (scrollRef.current.offsetLeft || 0);
        var walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };
    var handleTouchEnd = function () {
        setIsDragging(false);
    };
    var calculatePnL = function (position) {
        var gainLoss = (position.currentPrice - position.avgPrice) * position.shares;
        var gainLossPercent = ((position.currentPrice - position.avgPrice) / position.avgPrice) * 100;
        return { gainLoss: gainLoss, gainLossPercent: gainLossPercent };
    };
    return (_jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-off-white", children: "Open Positions" }) }), _jsx(CardContent, { children: _jsx("div", { ref: scrollRef, className: "flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing", style: { scrollbarWidth: 'none', msOverflowStyle: 'none' }, onMouseDown: handleMouseDown, onMouseLeave: handleMouseLeave, onMouseUp: handleMouseUp, onMouseMove: handleMouseMove, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, children: positions.map(function (position) {
                        var _a = calculatePnL(position), gainLoss = _a.gainLoss, gainLossPercent = _a.gainLossPercent;
                        return (_jsxs("div", { className: "min-w-[250px] bg-white/5 border border-white/10 rounded-lg p-4 flex-shrink-0 select-none", children: [_jsxs("div", { className: "flex justify-between items-start mb-3", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-off-white font-semibold", children: position.symbol }), _jsxs("p", { className: "text-off-white/60 text-sm", children: [position.shares, " shares"] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-off-white font-semibold", children: ["KES ", position.value.toLocaleString()] }), _jsxs("div", { className: "flex items-center text-sm ".concat(gainLoss >= 0 ? 'text-green-400' : 'text-red-400'), children: [gainLoss >= 0 ? _jsx(TrendingUp, { className: "w-3 h-3 mr-1" }) : _jsx(TrendingDown, { className: "w-3 h-3 mr-1" }), gainLoss >= 0 ? '+' : '', "KES ", gainLoss.toFixed(2)] })] })] }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-off-white/60", children: "Avg Price:" }), _jsxs("span", { className: "text-off-white", children: ["KES ", position.avgPrice.toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-off-white/60", children: "Current:" }), _jsxs("span", { className: "text-off-white", children: ["KES ", position.currentPrice.toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-off-white/60", children: "Return:" }), _jsxs("span", { className: gainLoss >= 0 ? 'text-green-400' : 'text-red-400', children: [gainLossPercent >= 0 ? '+' : '', gainLossPercent.toFixed(2), "%"] })] })] })] }, position.symbol));
                    }) }) })] }));
};
export default OpenPositionsCard;
