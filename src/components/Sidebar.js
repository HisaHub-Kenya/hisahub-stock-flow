import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Home, TrendingUp, PieChart, Users, Settings } from 'lucide-react';
// This is a basic sidebar component for navigation
var Sidebar = function () {
    return (_jsx("div", { className: "sidebar", children: _jsxs("nav", { children: [_jsx("a", { href: "/", children: _jsx(Home, { size: 20 }) }), _jsx("a", { href: "/trade", children: _jsx(TrendingUp, { size: 20 }) }), _jsx("a", { href: "/portfolio", children: _jsx(PieChart, { size: 20 }) }), _jsx("a", { href: "/community", children: _jsx(Users, { size: 20 }) }), _jsx("a", { href: "/settings", children: _jsx(Settings, { size: 20 }) })] }) }));
};
export default Sidebar;
