import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Crown, Medal, Award, TrendingUp } from 'lucide-react';
var LeaderboardWidget = function (_a) {
    var users = _a.users;
    // Mock leaderboard data - in real app, this would be calculated based on engagement metrics
    var leaderboardData = [
        {
            user: users[0] || { first_name: 'John', last_name: 'Trader', id: '1' },
            score: 2850,
            badge: 'Market Guru',
            posts: 45,
            followers: 128
        },
        {
            user: users[1] || { first_name: 'Sarah', last_name: 'Analyst', id: '2' },
            score: 2340,
            badge: 'Top Analyst',
            posts: 38,
            followers: 95
        },
        {
            user: users[2] || { first_name: 'Mike', last_name: 'Expert', id: '3' },
            score: 2120,
            badge: 'Rising Star',
            posts: 32,
            followers: 76
        },
        {
            user: users[3] || { first_name: 'Lisa', last_name: 'Pro', id: '4' },
            score: 1890,
            badge: 'Active Trader',
            posts: 28,
            followers: 64
        },
        {
            user: users[4] || { first_name: 'Alex', last_name: 'Smith', id: '5' },
            score: 1650,
            badge: 'Mentor',
            posts: 24,
            followers: 52
        }
    ];
    var getRankIcon = function (index) {
        switch (index) {
            case 0:
                return _jsx(Crown, { className: "w-5 h-5 text-yellow-500" });
            case 1:
                return _jsx(Medal, { className: "w-5 h-5 text-gray-400" });
            case 2:
                return _jsx(Award, { className: "w-5 h-5 text-amber-600" });
            default:
                return _jsxs("span", { className: "text-secondary font-bold", children: ["#", index + 1] });
        }
    };
    var getBadgeColor = function (badge) {
        switch (badge) {
            case 'Market Guru':
                return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'Top Analyst':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'Rising Star':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'Active Trader':
                return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
            case 'Mentor':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            default:
                return 'bg-secondary/20 text-secondary border-secondary/30';
        }
    };
    var getDisplayName = function (user) {
        return user.first_name && user.last_name
            ? "".concat(user.first_name, " ").concat(user.last_name)
            : user.first_name || user.last_name || 'Anonymous Trader';
    };
    var getInitials = function (user) {
        var name = getDisplayName(user);
        return name
            .split(' ')
            .map(function (n) { return n[0]; })
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };
    return (_jsxs(Card, { className: "bg-card border-border", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs(CardTitle, { className: "text-lg text-foreground flex items-center gap-2", children: [_jsx(TrendingUp, { className: "w-5 h-5 text-secondary" }), "Community Leaders"] }) }), _jsxs(CardContent, { className: "space-y-3", children: [leaderboardData.map(function (entry, index) { return (_jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-white/5 ".concat(index < 3 ? 'bg-secondary/5 border border-secondary/10' : 'bg-white/5'), children: [_jsx("div", { className: "flex items-center justify-center w-8", children: getRankIcon(index) }), _jsx(Avatar, { className: "h-10 w-10", children: _jsx(AvatarFallback, { className: "bg-secondary text-primary font-semibold", children: getInitials(entry.user) }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "flex items-center gap-2", children: _jsx("h4", { className: "font-medium text-foreground truncate", children: getDisplayName(entry.user) }) }), _jsx(Badge, { variant: "outline", className: "text-xs mt-1 ".concat(getBadgeColor(entry.badge)), children: entry.badge })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-sm font-bold text-secondary", children: entry.score.toLocaleString() }), _jsx("div", { className: "text-xs text-muted-foreground", children: "XP" })] })] }, entry.user.id)); }), _jsxs("div", { className: "mt-4 p-3 bg-secondary/10 rounded-lg border border-secondary/20 text-center", children: [_jsx("p", { className: "text-sm text-foreground font-medium mb-1", children: "\uD83C\uDFAF Climb the leaderboard!" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Share insights, help others, and earn XP to unlock badges" })] })] })] }));
};
export default LeaderboardWidget;
