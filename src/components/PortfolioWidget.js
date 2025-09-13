import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PieChart } from "lucide-react";
var PortfolioWidget = function () {
    // Mock data. Later, plug real portfolio
    return (_jsxs("div", { className: "glass-card flex flex-col gap-2 items-start w-full animate-fade-in", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(PieChart, { size: 23, className: "text-secondary" }), _jsx("span", { className: "font-semibold", style: { fontFamily: "'Poppins', sans-serif" }, children: "Portfolio Balance" })] }), _jsx("div", { className: "mt-1 text-2xl market-mono font-bold text-primary", children: "KSh 124,250.34" }), _jsxs("div", { className: "text-xs text-neutral flex gap-2 items-end", children: ["+2.6% today", _jsx("span", { className: "text-green-700 font-semibold", children: "\u25B2" })] })] }));
};
export default PortfolioWidget;
