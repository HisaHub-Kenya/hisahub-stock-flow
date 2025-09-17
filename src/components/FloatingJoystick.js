import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { User, CreditCard, TrendingUp, Shield, Bell, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
var menuItems = [
    { id: 'personal', icon: User, label: 'Personal', color: 'text-blue-400' },
    { id: 'banking', icon: CreditCard, label: 'Banking', color: 'text-green-400' },
    { id: 'trading', icon: TrendingUp, label: 'Trading', color: 'text-yellow-400' },
    { id: 'security', icon: Shield, label: 'Security', color: 'text-red-400' },
    { id: 'notifications', icon: Bell, label: 'Alerts', color: 'text-purple-400' },
    { id: 'ai', icon: Bot, label: 'AI', color: 'text-cyan-400' }
];
var FloatingJoystick = function (_a) {
    var activeTab = _a.activeTab, onTabChange = _a.onTabChange;
    var _b = useState(false), isExpanded = _b[0], setIsExpanded = _b[1];
    var _c = useState(true), showHint = _c[0], setShowHint = _c[1];
    useEffect(function () {
        var timer = setTimeout(function () { return setShowHint(false); }, 3000);
        return function () { return clearTimeout(timer); };
    }, []);
    var toggleExpanded = function () {
        setIsExpanded(!isExpanded);
        setShowHint(false);
    };
    var handleTabSelect = function (tabId) {
        onTabChange(tabId);
        setIsExpanded(false);
    };
    var getItemPosition = function (index) {
        var angle = (index * 60) - 90; // 60 degrees apart, starting from top
        var radius = 80;
        var radian = (angle * Math.PI) / 180;
        return {
            x: Math.cos(radian) * radius,
            y: Math.sin(radian) * radius
        };
    };
    var activeItem = menuItems.find(function (item) { return item.id === activeTab; });
    return (_jsxs(_Fragment, { children: [showHint && (_jsx("div", { className: "fixed top-1/2 right-24 z-40 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white text-sm animate-fade-in transform -translate-y-1/2", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-blue-400 rounded-full animate-pulse" }), "Tap to navigate sections"] }) })), _jsx("div", { className: "fixed top-1/2 right-12 z-30 transform -translate-y-1/2", children: _jsxs("div", { className: "relative", children: [isExpanded && (_jsx("div", { className: "absolute -top-8 left-1/2 transform -translate-x-1/2", children: menuItems.map(function (item, index) {
                                var position = getItemPosition(index);
                                var Icon = item.icon;
                                var isActive = item.id === activeTab;
                                return (_jsxs("button", { onClick: function () { return handleTabSelect(item.id); }, className: cn("absolute w-12 h-12 rounded-full border-2 border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 group", isActive
                                        ? "bg-white/20 border-white/40 shadow-lg"
                                        : "bg-white/10 hover:bg-white/20"), style: {
                                        transform: "translate(".concat(position.x, "px, ").concat(position.y, "px)"),
                                        animationDelay: "".concat(index * 50, "ms")
                                    }, children: [_jsx(Icon, { className: cn("w-5 h-5 mx-auto transition-colors", isActive ? "text-white" : item.color) }), _jsx("div", { className: "absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap", children: item.label })] }, item.id));
                            }) })), _jsxs("button", { onClick: toggleExpanded, className: cn("w-16 h-16 rounded-full border-2 backdrop-blur-md transition-all duration-300 shadow-lg hover:scale-105", isExpanded
                                ? "bg-white/20 border-white/40 rotate-45"
                                : "bg-white/10 border-white/30"), children: [activeItem && (_jsxs("div", { className: "flex flex-col items-center justify-center", children: [_jsx(activeItem.icon, { className: cn("w-6 h-6 transition-colors", isExpanded ? "text-white" : activeItem.color) }), !isExpanded && (_jsx("div", { className: "text-xs text-white/80 mt-1 font-medium", children: activeItem.label }))] })), _jsx("div", { className: cn("absolute top-1 right-1 w-3 h-3 rounded-full border border-white/40 transition-all duration-300", isExpanded ? "bg-red-400" : "bg-green-400"), children: _jsx("div", { className: cn("absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold", isExpanded ? "rotate-45" : ""), children: isExpanded ? "×" : "+" }) })] })] }) }), isExpanded && (_jsx("div", { className: "fixed inset-0 z-20 bg-black/20 backdrop-blur-sm", onClick: function () { return setIsExpanded(false); } }))] }));
};
export default FloatingJoystick;
