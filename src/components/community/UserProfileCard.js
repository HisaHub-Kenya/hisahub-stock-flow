import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserPlus, UserMinus, MessageCircle } from 'lucide-react';
var UserProfileCard = function (_a) {
    var user = _a.user, isFollowed = _a.isFollowed, onFollow = _a.onFollow, onUnfollow = _a.onUnfollow, onViewPosts = _a.onViewPosts;
    var displayName = user.first_name && user.last_name
        ? "".concat(user.first_name, " ").concat(user.last_name)
        : user.first_name || user.last_name || 'Anonymous User';
    var initials = displayName
        .split(' ')
        .map(function (name) { return name[0]; })
        .join('')
        .toUpperCase()
        .slice(0, 2);
    return (_jsxs(Card, { className: "bg-card border-border", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Avatar, { className: "h-12 w-12", children: _jsx(AvatarFallback, { className: "bg-secondary text-secondary-foreground", children: initials }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-foreground", children: displayName }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(Badge, { variant: "outline", className: "text-xs", children: user.role || 'standard' }), _jsx(Badge, { variant: user.account_status === 'active' ? 'default' : 'secondary', className: "text-xs", children: user.account_status || 'pending' })] })] })] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: isFollowed ? "outline" : "default", size: "sm", onClick: function () { return isFollowed ? onUnfollow(user.id) : onFollow(user.id); }, className: "flex-1", children: isFollowed ? (_jsxs(_Fragment, { children: [_jsx(UserMinus, { className: "w-4 h-4 mr-2" }), "Unfollow"] })) : (_jsxs(_Fragment, { children: [_jsx(UserPlus, { className: "w-4 h-4 mr-2" }), "Follow"] })) }), _jsxs(Button, { variant: "outline", size: "sm", onClick: function () { return onViewPosts(user.id); }, className: "flex-1", children: [_jsx(MessageCircle, { className: "w-4 h-4 mr-2" }), "Posts"] })] }) })] }));
};
export default UserProfileCard;
