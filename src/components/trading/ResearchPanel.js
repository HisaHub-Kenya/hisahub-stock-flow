import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, FileText, BarChart3, Calendar, ExternalLink } from 'lucide-react';
var ResearchPanel = function (_a) {
    var stock = _a.stock;
    var _b = useState('overview'), activeTab = _b[0], setActiveTab = _b[1];
    // Mock research data
    var analystRatings = {
        buy: 8,
        hold: 3,
        sell: 1,
        targetPrice: stock.price * 1.15
    };
    var fundamentals = {
        peRatio: '12.4',
        dividend: '2.8%',
        marketCap: 'KES 450B',
        revenue: 'KES 120B',
        eps: '3.25'
    };
    var recentNews = [
        {
            id: 1,
            title: "".concat(stock.symbol, " Reports Strong Q4 Earnings"),
            summary: 'Company exceeds expectations with 15% revenue growth',
            time: '2 hours ago',
            sentiment: 'positive'
        },
        {
            id: 2,
            title: 'NSE Market Update: Banking Sector Shows Resilience',
            summary: 'Financial stocks maintain steady performance amid market volatility',
            time: '4 hours ago',
            sentiment: 'neutral'
        },
        {
            id: 3,
            title: "".concat(stock.symbol, " Announces New Partnership"),
            summary: 'Strategic alliance expected to drive future growth',
            time: '1 day ago',
            sentiment: 'positive'
        }
    ];
    return (_jsxs("div", { className: "glass-card animate-fade-in", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(FileText, { className: "h-4 w-4 text-secondary" }), _jsx("h3", { className: "text-lg font-bold text-off-white", children: "Research" })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 bg-white/10", children: [_jsx(TabsTrigger, { value: "overview", className: "text-xs", children: "Overview" }), _jsx(TabsTrigger, { value: "fundamentals", className: "text-xs", children: "Fundamentals" }), _jsx(TabsTrigger, { value: "news", className: "text-xs", children: "News" })] }), _jsxs(TabsContent, { value: "overview", className: "mt-4 space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-off-white mb-2", children: "Analyst Ratings" }), _jsxs("div", { className: "bg-white/5 rounded-lg p-3", children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("span", { className: "text-sm text-off-white/60", children: "Consensus" }), _jsx(Badge, { className: "bg-green-600", children: "BUY" })] }), _jsxs("div", { className: "grid grid-cols-3 gap-2 text-xs", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-green-400 font-semibold", children: analystRatings.buy }), _jsx("div", { className: "text-off-white/60", children: "Buy" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-yellow-400 font-semibold", children: analystRatings.hold }), _jsx("div", { className: "text-off-white/60", children: "Hold" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-red-400 font-semibold", children: analystRatings.sell }), _jsx("div", { className: "text-off-white/60", children: "Sell" })] })] }), _jsx("div", { className: "mt-3 pt-2 border-t border-white/10", children: _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-off-white/60", children: "Price Target:" }), _jsxs("span", { className: "text-secondary font-semibold", children: ["KES ", analystRatings.targetPrice.toFixed(2)] })] }) })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-off-white mb-2", children: "Performance" }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs("div", { className: "bg-white/5 rounded-lg p-2", children: [_jsx("div", { className: "text-xs text-off-white/60", children: "52W High" }), _jsxs("div", { className: "font-semibold text-off-white", children: ["KES ", (stock.price * 1.25).toFixed(2)] })] }), _jsxs("div", { className: "bg-white/5 rounded-lg p-2", children: [_jsx("div", { className: "text-xs text-off-white/60", children: "52W Low" }), _jsxs("div", { className: "font-semibold text-off-white", children: ["KES ", (stock.price * 0.75).toFixed(2)] })] })] })] })] }), _jsx(TabsContent, { value: "fundamentals", className: "mt-4", children: _jsx("div", { className: "space-y-3", children: Object.entries(fundamentals).map(function (_a) {
                                var key = _a[0], value = _a[1];
                                return (_jsxs("div", { className: "flex justify-between items-center py-2 border-b border-white/10 last:border-b-0", children: [_jsx("span", { className: "text-sm text-off-white/60 capitalize", children: key.replace(/([A-Z])/g, ' $1').trim() }), _jsx("span", { className: "font-semibold text-off-white", children: value })] }, key));
                            }) }) }), _jsx(TabsContent, { value: "news", className: "mt-4", children: _jsx("div", { className: "space-y-3", children: recentNews.map(function (news) { return (_jsx("div", { className: "bg-white/5 rounded-lg p-3", children: _jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h5", { className: "font-semibold text-off-white text-sm mb-1", children: news.title }), _jsx("p", { className: "text-xs text-off-white/60 mb-2", children: news.summary }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "h-3 w-3 text-off-white/40" }), _jsx("span", { className: "text-xs text-off-white/40", children: news.time }), _jsxs(Badge, { variant: news.sentiment === 'positive' ? 'default' : 'secondary', className: "text-xs", children: [news.sentiment === 'positive' ? _jsx(TrendingUp, { className: "h-2 w-2 mr-1" }) : _jsx(BarChart3, { className: "h-2 w-2 mr-1" }), news.sentiment] })] })] }), _jsx(Button, { size: "sm", variant: "ghost", className: "p-1", children: _jsx(ExternalLink, { className: "h-3 w-3" }) })] }) }, news.id)); }) }) })] })] }));
};
export default ResearchPanel;
