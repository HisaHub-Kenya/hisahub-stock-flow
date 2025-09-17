var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { FileText, Newspaper, MessageSquare, Download, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
import BottomNav from "../components/BottomNav";
import HisaAIButton from "../components/HisaAIButton";
import { useTheme } from "../components/ThemeProvider";
import AdvancedCommunity from "../components/AdvancedCommunity";
var DUMMY_NEWS = [
    { headline: "Safaricom stocks rally as quarterly results impress", date: "2025-05-18" },
    { headline: "NSE trading volumes hit 2-year high", date: "2025-05-17" },
    { headline: "Equity Bank eyes regional expansion", date: "2025-05-16" },
    { headline: "Kengen dividends announced for 2025", date: "2025-05-15" },
    { headline: "Centum posts improved annual results", date: "2025-05-14" },
];
var DUMMY_ARTICLES = [
    {
        title: "How to Analyze Stocks in Kenya",
        excerpt: "A beginner's guide to stock analysis on the NSE, including key ratios and market trends.",
    },
    {
        title: "Why Long-term Investing Wins",
        excerpt: "Insights into the benefits of holding stocks over longer periods in the Kenyan market.",
    }
];
var DUMMY_FINANCIALS = [
    { company: "Safaricom PLC", symbol: "SCOM", revenue: "KSh 310B", profit: "KSh 71B" },
    { company: "Equity Group", symbol: "EQTY", revenue: "KSh 130B", profit: "KSh 45B" },
    { company: "KCB Group", symbol: "KCB", revenue: "KSh 109B", profit: "KSh 37B" },
    { company: "EABL", symbol: "EABL", revenue: "KSh 86B", profit: "KSh 12B" },
    { company: "Nation Media Group", symbol: "NMG", revenue: "KSh 7B", profit: "KSh 0.8B" },
];
var News = function () {
    var theme = useTheme().theme;
    var _a = useState([
        { name: "TraderJoe", content: "Excited for upcoming earning releases!", timestamp: Date.now() - 60000 },
        { name: "NSEQueen", content: "Which stock are you bullish on this week?", timestamp: Date.now() - 360000 },
    ]), posts = _a[0], setPosts = _a[1];
    var _b = useState(""), postName = _b[0], setPostName = _b[1];
    var _c = useState(""), postContent = _c[0], setPostContent = _c[1];
    var _d = useState("news"), activeSection = _d[0], setActiveSection = _d[1];
    var handlePostSubmit = function (e) {
        e.preventDefault();
        if (postName.trim() && postContent.trim()) {
            setPosts(__spreadArray([{ name: postName, content: postContent, timestamp: Date.now() }], posts, true));
            setPostName("");
            setPostContent("");
        }
    };
    var downloadCSV = function () {
        var rows = __spreadArray([["Company", "Symbol", "Revenue", "Profit"]], DUMMY_FINANCIALS.map(function (d) { return [d.company, d.symbol, d.revenue, d.profit]; }), true);
        var csv = rows.map(function (r) { return r.join(","); }).join("\n");
        var blob = new Blob([csv], { type: "text/csv" });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "nse-financials.csv";
        a.click();
        window.URL.revokeObjectURL(url);
    };
    var menuItems = [
        { id: "news", label: "NSE Stock News", icon: _jsx(Newspaper, { size: 18 }) },
        { id: "articles", label: "Articles", icon: _jsx(FileText, { size: 18 }) },
        { id: "community", label: "Community", icon: _jsx(MessageSquare, { size: 18 }) },
        { id: "financials", label: "Financials", icon: _jsx(Download, { size: 18 }) },
    ];
    var renderContent = function () {
        switch (activeSection) {
            case "news":
                return (_jsx("div", { className: "space-y-3", children: DUMMY_NEWS.map(function (n, idx) { return (_jsxs("div", { className: "bg-background p-3 rounded-lg shadow border-l-4 border-secondary/80", children: [_jsx("div", { className: "text-sm font-bold ".concat(theme === 'light' ? 'text-white' : 'text-off-white'), children: n.headline }), _jsx("div", { className: "text-xs text-neutral", children: n.date })] }, idx)); }) }));
            case "articles":
                return (_jsx("div", { className: "space-y-4", children: DUMMY_ARTICLES.map(function (a, idx) { return (_jsxs("div", { className: "bg-background rounded-lg p-3", children: [_jsx("div", { className: "font-bold text-secondary", children: a.title }), _jsx("div", { className: "text-off-white text-xs mt-1", children: a.excerpt })] }, idx)); }) }));
            case "community":
                return (_jsx(AdvancedCommunity, {}));
            case "financials":
                return (_jsxs("div", { children: [_jsx("div", { className: "mb-3", children: _jsxs(Button, { onClick: downloadCSV, className: "bg-secondary text-primary font-bold rounded hover:bg-secondary/90", children: [_jsx(Download, { size: 18, className: "mr-2 -ml-1" }), " Download NSE Data (.csv)"] }) }), _jsx("div", { className: "bg-background p-2 rounded-lg overflow-x-auto", children: _jsxs("table", { className: "w-full text-xs text-left", children: [_jsx("thead", { children: _jsxs("tr", { className: "text-secondary", children: [_jsx("th", { className: "p-1", children: "Company" }), _jsx("th", { className: "p-1", children: "Symbol" }), _jsx("th", { className: "p-1", children: "Revenue" }), _jsx("th", { className: "p-1", children: "Profit" })] }) }), _jsx("tbody", { children: DUMMY_FINANCIALS.map(function (row, i) { return (_jsxs("tr", { children: [_jsx("td", { className: "p-1", children: row.company }), _jsx("td", { className: "p-1", children: row.symbol }), _jsx("td", { className: "p-1", children: row.revenue }), _jsx("td", { className: "p-1", children: row.profit })] }, i)); }) })] }) })] }));
            default:
                return null;
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-primary font-sans transition-colors pb-20", children: [_jsx(HisaAIButton, {}), _jsxs("main", { className: "flex-1 w-full max-w-2xl mx-auto flex flex-col items-center px-4 md:px-8 py-7", children: [_jsxs("div", { className: "w-full flex items-center justify-between mb-5", children: [_jsxs("h2", { className: "text-3xl font-bold text-secondary flex items-center gap-2", children: [_jsx(Newspaper, { size: 30 }), " News & Community"] }), _jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "icon", className: "bg-white/10 border-secondary/20 text-off-white hover:bg-white/20", children: _jsx(Menu, { className: "h-4 w-4" }) }) }), _jsxs(SheetContent, { className: "bg-primary border-secondary/20", children: [_jsxs(SheetHeader, { children: [_jsx(SheetTitle, { className: "text-secondary", children: "Navigation" }), _jsx(SheetDescription, { className: "text-off-white/60", children: "Choose a section to explore" })] }), _jsx("div", { className: "mt-6 space-y-2", children: menuItems.map(function (item) { return (_jsxs(Button, { variant: activeSection === item.id ? "secondary" : "ghost", className: "w-full justify-start gap-2 text-off-white hover:bg-white/10", onClick: function () { return setActiveSection(item.id); }, children: [item.icon, item.label] }, item.id)); }) })] })] })] }), _jsx("div", { className: "w-full glass-card mb-4 px-1", children: _jsx("div", { className: "p-4", children: renderContent() }) })] }), _jsx(BottomNav, {})] }));
};
export default News;
