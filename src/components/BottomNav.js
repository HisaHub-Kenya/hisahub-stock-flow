import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Home, PieChart, LineChart, Settings, Newspaper } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
var navItems = [
    { name: "Home", to: "/", icon: _jsx(Home, { size: 24, strokeWidth: 2.3 }) },
    { name: "Trade", to: "/trade", icon: _jsx(LineChart, { size: 24, strokeWidth: 2.3 }) },
    { name: "Portfolio", to: "/portfolio", icon: _jsx(PieChart, { size: 24, strokeWidth: 2.3 }) },
    { name: "News", to: "/news", icon: _jsx(Newspaper, { size: 24, strokeWidth: 2.3 }) },
    { name: "Settings", to: "/settings", icon: _jsx(Settings, { size: 24, strokeWidth: 2.3 }) },
];
var BottomNav = function () {
    var location = useLocation();
    return (_jsx("nav", { className: "fixed bottom-0 left-0 right-0 z-50 bg-primary border-t border-secondary/50 shadow-lg\r\n      flex justify-evenly items-center h-16 md:h-18 px-2 md:px-16\r\n      md:max-w-2xl md:left-1/2 md:-translate-x-1/2 rounded-t-xl md:rounded-xl", style: { fontFamily: "'Poppins', sans-serif" }, role: "navigation", "aria-label": "Bottom navigation", children: navItems.map(function (item) {
            var isActive = location.pathname === item.to;
            return (_jsxs(Link, { to: item.to, className: "flex flex-col items-center justify-center gap-0.5 px-3 pt-2 pb-1 rounded-lg transition\n              ".concat(isActive ? "bg-secondary/90 text-primary font-bold shadow" : "text-secondary hover:bg-secondary/10", "\n              focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"), tabIndex: 0, "aria-current": isActive ? "page" : undefined, style: { minWidth: 50 }, children: [_jsx("span", { className: "w-6 h-6 flex items-center justify-center", children: item.icon }), _jsx("span", { className: "text-[11px] leading-3 mt-0.5", children: item.name.split('-')[0] })] }, item.name));
        }) }));
};
export default BottomNav;
