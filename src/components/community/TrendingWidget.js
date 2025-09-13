import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, MessageSquare, Eye, Hash } from 'lucide-react';
var TrendingWidget = function () {
    var trendingTopics = [
        {
            tag: '#EarningsSeason',
            posts: 24,
            trend: 'up',
            category: 'Market News'
        },
        {
            tag: '$KCB',
            posts: 18,
            trend: 'up',
            category: 'Stock Discussion'
        },
        {
            tag: '#ForexAnalysis',
            posts: 15,
            trend: 'stable',
            category: 'Analysis'
        },
        {
            tag: '$EABL',
            posts: 12,
            trend: 'down',
            category: 'Stock Discussion'
        },
        {
            tag: '#TechnicalAnalysis',
            posts: 10,
            trend: 'up',
            category: 'Education'
        }
    ];
    var activeDiscussions = [
        {
            title: 'KCB Q4 earnings predictions?',
            replies: 23,
            views: 156,
            lastActive: '5m ago'
        },
        {
            title: 'Best forex pairs for December',
            replies: 18,
            views: 89,
            lastActive: '12m ago'
        },
        {
            title: 'NSE 20 technical breakdown',
            replies: 15,
            views: 134,
            lastActive: '25m ago'
        }
    ];
    var getTrendIcon = function (trend) {
        switch (trend) {
            case 'up':
                return _jsx(TrendingUp, { className: "w-3 h-3 text-green-500" });
            case 'down':
                return _jsx(TrendingUp, { className: "w-3 h-3 text-red-500 rotate-180" });
            default:
                return _jsx("div", { className: "w-3 h-3 rounded-full bg-yellow-500" });
        }
    };
    var getCategoryColor = function (category) {
        switch (category) {
            case 'Market News':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'Stock Discussion':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'Analysis':
                return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'Education':
                return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
            default:
                return 'bg-secondary/20 text-secondary border-secondary/30';
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "bg-card border-border", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs(CardTitle, { className: "text-lg text-foreground flex items-center gap-2", children: [_jsx(Hash, { className: "w-5 h-5 text-secondary" }), "Trending Topics"] }) }), _jsx(CardContent, { className: "space-y-3", children: trendingTopics.map(function (topic, index) { return (_jsxs("div", { className: "flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("span", { className: "text-secondary font-bold", children: ["#", index + 1] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-medium text-foreground", children: topic.tag }), getTrendIcon(topic.trend)] }), _jsx(Badge, { variant: "outline", className: "text-xs mt-1 ".concat(getCategoryColor(topic.category)), children: topic.category })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-sm font-semibold text-foreground", children: topic.posts }), _jsx("div", { className: "text-xs text-muted-foreground", children: "posts" })] })] }, index)); }) })] }), _jsxs(Card, { className: "bg-card border-border", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs(CardTitle, { className: "text-lg text-foreground flex items-center gap-2", children: [_jsx(MessageSquare, { className: "w-5 h-5 text-secondary" }), "Hot Discussions"] }) }), _jsx(CardContent, { className: "space-y-3", children: activeDiscussions.map(function (discussion, index) { return (_jsxs("div", { className: "p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer", children: [_jsx("h4", { className: "font-medium text-foreground mb-2 line-clamp-2", children: discussion.title }), _jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(MessageSquare, { className: "w-3 h-3" }), discussion.replies] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Eye, { className: "w-3 h-3" }), discussion.views] })] }), _jsx("span", { children: discussion.lastActive })] })] }, index)); }) })] }), _jsx(Card, { className: "bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsxs("div", { className: "mb-3", children: [_jsx("div", { className: "w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2", children: "\uD83E\uDD16" }), _jsx("h3", { className: "font-semibold text-foreground", children: "Invisa AI Insights" })] }), _jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "Get AI-powered market sentiment analysis and trending predictions" }), _jsx(Badge, { className: "bg-purple-500/20 text-purple-400 border-purple-500/30", children: "Coming Soon" })] }) })] }));
};
export default TrendingWidget;
