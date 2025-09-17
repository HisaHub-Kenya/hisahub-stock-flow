import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
;
var PostCard = function (_a) {
    var _b, _c, _d, _e;
    var post = _a.post, onToggleLike = _a.onToggleLike;
    var displayName = ((_b = post.author) === null || _b === void 0 ? void 0 : _b.first_name) && ((_c = post.author) === null || _c === void 0 ? void 0 : _c.last_name)
        ? "".concat(post.author.first_name, " ").concat(post.author.last_name)
        : ((_d = post.author) === null || _d === void 0 ? void 0 : _d.first_name) || ((_e = post.author) === null || _e === void 0 ? void 0 : _e.last_name) || 'Anonymous User';
    var initials = displayName
        .split(' ')
        .map(function (name) { return name[0]; })
        .join('')
        .toUpperCase()
        .slice(0, 2);
    return (_jsxs(Card, { className: "bg-card border-border", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Avatar, { className: "h-10 w-10", children: _jsx(AvatarFallback, { className: "bg-secondary text-secondary-foreground", children: initials }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-medium text-foreground", children: displayName }), _jsx("p", { className: "text-sm text-muted-foreground", children: formatDistanceToNow(new Date(post.created_at), { addSuffix: true }) })] })] }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-foreground mb-4 whitespace-pre-wrap", children: post.content }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: function () { return onToggleLike(post.id); }, className: "flex items-center gap-2 ".concat(post.is_liked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground'), children: [_jsx(Heart, { className: "w-4 h-4 ".concat(post.is_liked ? 'fill-current' : '') }), post.likes_count] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "flex items-center gap-2", children: [_jsx(MessageCircle, { className: "w-4 h-4" }), post.replies_count] })] })] })] }));
};
export default PostCard;
