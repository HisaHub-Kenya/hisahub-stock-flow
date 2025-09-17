import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Shield, TrendingDown, AlertTriangle, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
var RiskManagementModule = function () {
    var _a = useState(''), portfolioValue = _a[0], setPortfolioValue = _a[1];
    var _b = useState(null), riskScore = _b[0], setRiskScore = _b[1];
    var calculateRisk = function () {
        var value = parseFloat(portfolioValue);
        if (value > 0) {
            var baseScore = Math.min(8, Math.max(1, Math.floor(value / 500000) + 2));
            var marketVolatility = Math.random() * 2;
            var finalScore = Math.min(10, Math.max(1, baseScore + marketVolatility));
            setRiskScore(Math.round(finalScore));
        }
    };
    var getRiskLevel = function (score) {
        if (score <= 3)
            return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50 border-green-200' };
        if (score <= 6)
            return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' };
        if (score <= 8)
            return { level: 'High', color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' };
        return { level: 'Very High', color: 'text-red-600', bg: 'bg-red-50 border-red-200' };
    };
    return (_jsxs("div", { className: "p-3 md:p-6 h-full space-y-4 md:space-y-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Shield, { className: "text-blue-600", size: 20 }), _jsx("h2", { className: "text-lg md:text-xl font-bold text-gray-800", children: "Risk Management" })] }), _jsxs("div", { className: "bg-white p-4 rounded-lg border shadow-sm", children: [_jsx("h3", { className: "font-semibold text-gray-700 mb-4", children: "Portfolio Risk Assessment" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "portfolio-value", className: "text-sm font-medium", children: "Portfolio Value ($)" }), _jsx(Input, { id: "portfolio-value", type: "number", value: portfolioValue, onChange: function (e) { return setPortfolioValue(e.target.value); }, placeholder: "Enter portfolio value", className: "mt-1" })] }), _jsx(Button, { onClick: calculateRisk, className: "w-full", children: "Analyze Risk" })] })] }), riskScore && (_jsxs("div", { className: "p-4 rounded-lg border shadow-sm ".concat(getRiskLevel(riskScore).bg), children: [_jsxs("div", { className: "text-center mb-4", children: [_jsxs("div", { className: "text-3xl font-bold text-gray-800 mb-1", children: [riskScore, "/10"] }), _jsxs("div", { className: "text-lg font-semibold ".concat(getRiskLevel(riskScore).color), children: [getRiskLevel(riskScore).level, " Risk"] })] }), _jsx(Progress, { value: riskScore * 10, className: "h-3" })] })), _jsxs("div", { className: "bg-white p-4 rounded-lg border shadow-sm", children: [_jsx("h3", { className: "font-semibold text-gray-700 mb-4", children: "Market Indicators" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "VIX Index" }), _jsx("span", { className: "font-bold text-orange-600", children: "23.5" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Market Beta" }), _jsx("span", { className: "font-bold text-blue-600", children: "1.2" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Sharpe Ratio" }), _jsx("span", { className: "font-bold text-green-600", children: "1.8" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "NSE Volatility" }), _jsx("span", { className: "font-bold text-purple-600", children: "15.2%" })] })] })] }), _jsxs("div", { className: "bg-blue-50 p-4 rounded-lg border shadow-sm", children: [_jsx("h3", { className: "font-semibold text-gray-700 mb-4", children: "Risk Management Tips" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(AlertTriangle, { className: "text-yellow-600 mt-0.5", size: 16 }), _jsxs("div", { className: "text-sm", children: [_jsx("div", { className: "font-medium", children: "Diversification" }), _jsx("div", { className: "text-gray-600", children: "Spread investments across different sectors and asset classes" })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(PieChart, { className: "text-blue-600 mt-0.5", size: 16 }), _jsxs("div", { className: "text-sm", children: [_jsx("div", { className: "font-medium", children: "Portfolio Rebalancing" }), _jsx("div", { className: "text-gray-600", children: "Review and adjust portfolio allocation quarterly" })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(TrendingDown, { className: "text-red-600 mt-0.5", size: 16 }), _jsxs("div", { className: "text-sm", children: [_jsx("div", { className: "font-medium", children: "Stop-Loss Orders" }), _jsx("div", { className: "text-gray-600", children: "Set automatic sell orders at 8-10% below purchase price" })] })] })] })] })] }));
};
export default RiskManagementModule;
