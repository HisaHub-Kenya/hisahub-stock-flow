import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
var MarketOverviewSection = function () {
    var scrollRef = useRef(null);
    var _a = useState(false), isDragging = _a[0], setIsDragging = _a[1];
    var _b = useState(0), startX = _b[0], setStartX = _b[1];
    var _c = useState(0), scrollLeft = _c[0], setScrollLeft = _c[1];
    var marketData = [
        { symbol: 'SCOM', name: 'Safaricom', price: 42.50, change: 2.1, changePercent: 5.2 },
        { symbol: 'EQTY', name: 'Equity Group', price: 58.75, change: -1.25, changePercent: -2.1 },
        { symbol: 'KCB', name: 'KCB Group', price: 45.00, change: 0.75, changePercent: 1.7 },
        { symbol: 'COOP', name: 'Co-operative Bank', price: 14.80, change: -0.20, changePercent: -1.3 },
        { symbol: 'ABSA', name: 'Absa Bank Kenya', price: 12.45, change: 0.15, changePercent: 1.2 },
        { symbol: 'DTBK', name: 'Diamond Trust Bank', price: 7.50, change: 0.25, changePercent: 3.4 },
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
    return (_jsx("div", { ref: scrollRef, className: "flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing", style: { scrollbarWidth: 'none', msOverflowStyle: 'none' }, onMouseDown: handleMouseDown, onMouseLeave: handleMouseLeave, onMouseUp: handleMouseUp, onMouseMove: handleMouseMove, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, children: marketData.map(function (stock) { return (_jsx(Card, { className: "min-w-[280px] bg-white/5 border-white/10 flex-shrink-0 select-none", children: _jsx(CardHeader, { className: "pb-3", children: _jsxs(CardTitle, { className: "text-lg text-white flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-bold", children: stock.symbol }), _jsx("div", { className: "text-sm font-normal text-gray-300", children: stock.name })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-xl font-bold", children: ["KES ", stock.price.toFixed(2)] }), _jsxs("div", { className: "flex items-center text-sm ".concat(stock.change >= 0 ? 'text-green-400' : 'text-red-400'), children: [stock.change >= 0 ? _jsx(TrendingUp, { className: "w-4 h-4 mr-1" }) : _jsx(TrendingDown, { className: "w-4 h-4 mr-1" }), stock.change >= 0 ? '+' : '', stock.change.toFixed(2), " (", stock.changePercent >= 0 ? '+' : '', stock.changePercent.toFixed(1), "%)"] })] })] }) }) }, stock.symbol)); }) }));
};
export default MarketOverviewSection;
