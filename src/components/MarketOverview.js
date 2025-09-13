import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useFinancialData } from "../contexts/FinancialDataContext";
var MarketOverview = function () {
    var state = useFinancialData().state;
    // Use the first 3 stocks from our real data, or fallback to mock data
    var displayStocks = state.stocks.slice(0, 3).length > 0
        ? state.stocks.slice(0, 3).map(function (stock) { return ({
            symbol: stock.symbol,
            name: stock.name,
            price: stock.price,
            change: "".concat(stock.changePercent),
            changeDir: stock.change >= 0 ? "up" : "down"
        }); })
        : [
            {
                symbol: "SCOM",
                name: "Safaricom PLC",
                price: 28.50,
                change: "+1.79%",
                changeDir: "up",
            },
            {
                symbol: "KCB",
                name: "KCB Group",
                price: 38.25,
                change: "-0.85%",
                changeDir: "down",
            },
            {
                symbol: "EQTY",
                name: "Equity Group",
                price: 45.75,
                change: "+2.15%",
                changeDir: "up",
            },
        ];
    return (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6", children: displayStocks.map(function (stock) { return (_jsxs("div", { className: "glass-card flex flex-col items-start animate-fade-in", children: [_jsxs("div", { className: "flex justify-between w-full items-center", children: [_jsx("span", { className: "font-mono text-lg font-semibold text-primary", children: stock.symbol }), _jsx("span", { className: "flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ".concat(stock.changeDir === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"), children: stock.changeDir === "up" ? (_jsxs(_Fragment, { children: [stock.change, _jsx(TrendingUp, { size: 14, strokeWidth: 2, className: "text-green-700" })] })) : (_jsxs(_Fragment, { children: [stock.change, _jsx(TrendingDown, { size: 14, strokeWidth: 2, className: "text-red-600" })] })) })] }), _jsxs("div", { className: "font-semibold text-charcoal text-xl market-mono mt-2 mb-1", children: ["KES ", stock.price.toFixed(2)] }), _jsx("div", { className: "text-sm text-neutral", children: stock.name })] }, stock.symbol)); }) }));
};
export default MarketOverview;
