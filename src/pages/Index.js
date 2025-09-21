import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ChatFAB from "../components/ChatFAB";
import BottomNav from "../components/BottomNav";
import HisaAIButton from "../components/HisaAIButton";
import AccountSummaryCard from "../components/home/AccountSummaryCard";
import OpenPositionsCard from "../components/home/OpenPositionsCard";
import MarketOverviewSection from "../components/home/MarketOverviewSection";
import { Link } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import { useAutoRefresh } from "../hooks/useAutoRefresh";
var Index = function () {
    var { logAnalytics, isAuthenticated } = useAppStore();
    useAutoRefresh(10000);
    var navigate = require('react-router-dom').useNavigate();
    var handleStartTradingClick = function () {
        logAnalytics('start_trading_clicked');
        if (isAuthenticated) {
            navigate('/trade');
        } else {
            navigate('/auth', { state: { redirectToTrade: true } });
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col justify-between bg-primary font-sans pb-20", children: [_jsx(HisaAIButton, {}), _jsxs("main", { className: "flex-1 flex flex-col px-4 py-6 w-full max-w-6xl mx-auto", children: [_jsx("section", { className: "w-full mb-6", children: _jsxs("div", { className: "glass-card flex flex-col items-center text-center animate-fade-in", children: [_jsx("div", { className: "rounded-lg border-4 border-secondary p-3 mb-4 flex justify-center items-center", children: _jsx("span", { className: "font-extrabold text-secondary text-4xl", style: { fontFamily: "'Poppins',sans-serif" }, children: "H" }) }), _jsx("h1", { className: "text-2xl font-bold text-off-white mb-1", children: "Welcome to HisaHub" }), _jsx("div", { className: "text-off-white/80 mb-4", style: { fontFamily: "'Poppins',sans-serif" }, children: "Democratize access to the Nairobi Securities Exchange (NSE) for everyday Kenyans." }), _jsx("button", { onClick: handleStartTradingClick, className: "w-full max-w-xs block bg-secondary text-primary font-bold px-8 py-3 rounded-xl shadow hover:scale-105 hover:shadow-lg transition text-lg", children: "Start Trading" })] }) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6", children: [_jsx("div", { className: "lg:col-span-1", children: _jsx(AccountSummaryCard, {}) }), _jsx("div", { className: "lg:col-span-2", children: _jsx(OpenPositionsCard, {}) })] }), _jsxs("section", { className: "w-full", children: [_jsx("h2", { className: "text-xl font-bold text-off-white mb-4", children: "Market Overview" }), _jsx(MarketOverviewSection, {})] }), _jsx(ChatFAB, {})] }), _jsx(BottomNav, {})] }));
};
export default Index;
