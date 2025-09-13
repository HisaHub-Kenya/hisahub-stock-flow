import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, MessageCircle, ThumbsUp, Clock } from "lucide-react";
var mockNews = [
    {
        id: 1,
        title: "Safaricom Reports Strong Q3 Results",
        summary: "M-Pesa revenue up 15% YoY, subscriber growth continues at 8.2%",
        source: "Business Daily",
        timestamp: "2 hours ago",
        sentiment: "positive",
        likes: 42,
        comments: 18,
        category: "earnings"
    },
    {
        id: 2,
        title: "Analyst Upgrades SCOM to Buy",
        summary: "Standard Investment Bank raises target price to KES 28.00",
        source: "Capital Markets",
        timestamp: "4 hours ago",
        sentiment: "positive",
        likes: 28,
        comments: 12,
        category: "analyst"
    },
    {
        id: 3,
        title: "NSE Trading Update",
        summary: "Mixed trading session with telecommunications leading gains",
        source: "NSE News",
        timestamp: "6 hours ago",
        sentiment: "neutral",
        likes: 15,
        comments: 7,
        category: "market"
    }
];
var mockCommunity = [
    {
        id: 1,
        user: "KenyanInvestor",
        content: "SCOM looking strong above 22.50 support. Could see 25+ if M-Pesa numbers keep growing 📈",
        timestamp: "1 hour ago",
        likes: 23,
        sentiment: "bullish",
        verified: true
    },
    {
        id: 2,
        user: "TraderJoe254",
        content: "Taking profits at current levels. Waiting for pullback to 21.80 to re-enter",
        timestamp: "3 hours ago",
        likes: 12,
        sentiment: "bearish",
        verified: false
    },
    {
        id: 3,
        user: "FinanceGuru",
        content: "Strong fundamentals but market conditions uncertain. Holding long-term position.",
        timestamp: "5 hours ago",
        likes: 31,
        sentiment: "neutral",
        verified: true
    }
];
var NewsFeed = function (_a) {
    var stock = _a.stock;
    var _b = useState("news"), activeTab = _b[0], setActiveTab = _b[1];
    var _c = useState("all"), sentimentFilter = _c[0], setSentimentFilter = _c[1];
    var getSentimentColor = function (sentiment) {
        switch (sentiment) {
            case "positive":
            case "bullish":
                return "text-green-400";
            case "negative":
            case "bearish":
                return "text-red-400";
            default:
                return "text-gray-400";
        }
    };
    var getSentimentIcon = function (sentiment) {
        switch (sentiment) {
            case "positive":
            case "bullish":
                return _jsx(TrendingUp, { className: "h-3 w-3" });
            case "negative":
            case "bearish":
                return _jsx(TrendingDown, { className: "h-3 w-3" });
            default:
                return _jsx(MessageCircle, { className: "h-3 w-3" });
        }
    };
    var filteredNews = sentimentFilter === "all"
        ? mockNews
        : mockNews.filter(function (item) { return item.sentiment === sentimentFilter; });
    var filteredCommunity = sentimentFilter === "all"
        ? mockCommunity
        : mockCommunity.filter(function (post) { return post.sentiment === sentimentFilter; });
    return (_jsxs("div", { className: "glass-card animate-fade-in", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-bold text-off-white", children: "News & Sentiment" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", variant: activeTab === "news" ? "secondary" : "outline", onClick: function () { return setActiveTab("news"); }, className: "text-xs", children: "News" }), _jsx(Button, { size: "sm", variant: activeTab === "community" ? "secondary" : "outline", onClick: function () { return setActiveTab("community"); }, className: "text-xs", children: "Community" })] })] }), _jsx("div", { className: "flex gap-1 mb-4 overflow-x-auto", children: ["all", "positive", "negative", "neutral"].map(function (filter) { return (_jsx(Button, { size: "sm", variant: sentimentFilter === filter ? "secondary" : "outline", onClick: function () { return setSentimentFilter(filter); }, className: "flex-shrink-0 text-xs capitalize", children: filter }, filter)); }) }), activeTab === "news" && (_jsx("div", { className: "space-y-3", children: filteredNews.map(function (item) { return (_jsx("div", { className: "bg-white/5 rounded-lg p-3", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "mt-1 ".concat(getSentimentColor(item.sentiment)), children: getSentimentIcon(item.sentiment) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Badge, { variant: "outline", className: "text-xs", children: item.category }), _jsx("span", { className: "text-xs text-off-white/60", children: item.source })] }), _jsx("h4", { className: "text-sm font-semibold text-off-white mb-1 leading-tight", children: item.title }), _jsx("p", { className: "text-xs text-off-white/80 mb-2 leading-relaxed", children: item.summary }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3 text-xs text-off-white/60", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(ThumbsUp, { className: "h-3 w-3" }), _jsx("span", { children: item.likes })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MessageCircle, { className: "h-3 w-3" }), _jsx("span", { children: item.comments })] })] }), _jsxs("div", { className: "flex items-center gap-1 text-xs text-off-white/60", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsx("span", { children: item.timestamp })] })] })] })] }) }, item.id)); }) })), activeTab === "community" && (_jsx("div", { className: "space-y-3", children: filteredCommunity.map(function (post) { return (_jsx("div", { className: "bg-white/5 rounded-lg p-3", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "mt-1 ".concat(getSentimentColor(post.sentiment)), children: getSentimentIcon(post.sentiment) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("span", { className: "text-sm font-semibold text-off-white", children: post.user }), post.verified && (_jsx(Badge, { variant: "secondary", className: "text-xs", children: "\u2713 Verified" })), _jsx(Badge, { variant: post.sentiment === "bullish" ? "default" :
                                                    post.sentiment === "bearish" ? "destructive" : "outline", className: "text-xs", children: post.sentiment })] }), _jsx("p", { className: "text-sm text-off-white/90 mb-2 leading-relaxed", children: post.content }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-1 text-xs text-off-white/60", children: [_jsx(ThumbsUp, { className: "h-3 w-3" }), _jsx("span", { children: post.likes })] }), _jsxs("div", { className: "flex items-center gap-1 text-xs text-off-white/60", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsx("span", { children: post.timestamp })] })] })] })] }) }, post.id)); }) })), _jsx("div", { className: "mt-4 pt-4 border-t border-white/10", children: _jsxs("div", { className: "grid grid-cols-3 gap-2 text-center", children: [_jsxs("div", { className: "bg-green-500/20 rounded-lg p-2", children: [_jsx("div", { className: "text-green-400 font-semibold text-sm", children: "65%" }), _jsx("div", { className: "text-xs text-off-white/60", children: "Bullish" })] }), _jsxs("div", { className: "bg-gray-500/20 rounded-lg p-2", children: [_jsx("div", { className: "text-gray-400 font-semibold text-sm", children: "20%" }), _jsx("div", { className: "text-xs text-off-white/60", children: "Neutral" })] }), _jsxs("div", { className: "bg-red-500/20 rounded-lg p-2", children: [_jsx("div", { className: "text-red-400 font-semibold text-sm", children: "15%" }), _jsx("div", { className: "text-xs text-off-white/60", children: "Bearish" })] })] }) })] }));
};
export default NewsFeed;
