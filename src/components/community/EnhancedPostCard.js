import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Bookmark, Share2, DollarSign } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
var EnhancedPostCard = function (_a) {
    var _b, _c, _d, _e;
    var post = _a.post, onToggleLike = _a.onToggleLike;
    var _f = useState(false), isBookmarked = _f[0], setIsBookmarked = _f[1];
    var displayName = ((_b = post.profiles) === null || _b === void 0 ? void 0 : _b.first_name) && ((_c = post.profiles) === null || _c === void 0 ? void 0 : _c.last_name)
        ? "".concat(post.profiles.first_name, " ").concat(post.profiles.last_name)
        : ((_d = post.profiles) === null || _d === void 0 ? void 0 : _d.first_name) || ((_e = post.profiles) === null || _e === void 0 ? void 0 : _e.last_name) || 'Anonymous Trader';
    var initials = displayName
        .split(' ')
        .map(function (name) { return name[0]; })
        .join('')
        .toUpperCase()
        .slice(0, 2);
    // Extract stock tickers from content
    var extractTickers = function (content) {
        var tickerRegex = /\$([A-Z]{2,5})/g;
        return content.match(tickerRegex) || [];
    };
    // Extract hashtags from content
    var extractHashtags = function (content) {
        var hashtagRegex = /#(\w+)/g;
        return content.match(hashtagRegex) || [];
    };
    var tickers = extractTickers(post.content);
    var hashtags = extractHashtags(post.content);
    // Enhanced content with clickable tickers and hashtags
    var enhancedContent = post.content
        .replace(/\$([A-Z]{2,5})/g, '<span class="ticker-tag">$$$1</span>')
        .replace(/#(\w+)/g, '<span class="hashtag-tag">#$1</span>');
    var handleBookmark = function () {
        setIsBookmarked(!isBookmarked);
    };
    var handleShare = function () {
        // Share functionality would be implemented here
    };
    return (_jsxs("div", { className: "w-full mb-3 bg-white/5 border border-secondary/20 rounded-xl p-3.5 hover:bg-white/10 transition-colors", children: [_jsx("div", { className: "flex items-start justify-between mb-4", children: _jsxs("div", { className: "flex items-center space-x-3 min-w-0 flex-1", children: [_jsx(Avatar, { className: "h-10 w-10 flex-shrink-0", children: _jsx(AvatarFallback, { className: "bg-secondary text-primary font-semibold", children: initials }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [_jsx("h4", { className: "font-medium text-off-white truncate", children: displayName }), _jsx(Badge, { variant: "secondary", className: "text-xs bg-secondary/20 flex-shrink-0", children: "Trader" })] }), _jsx("p", { className: "text-sm text-off-white/60 truncate", children: formatDistanceToNow(new Date(post.created_at), { addSuffix: true }) })] })] }) }), _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "text-off-white whitespace-pre-wrap", dangerouslySetInnerHTML: { __html: enhancedContent } }), (tickers.length > 0 || hashtags.length > 0) && (_jsxs("div", { className: "flex flex-wrap gap-2", children: [tickers.map(function (ticker, index) { return (_jsxs(Badge, { variant: "outline", className: "bg-green-500/10 text-green-500 border-green-500/30", children: [_jsx(DollarSign, { className: "w-3 h-3 mr-1" }), ticker.replace('$', '')] }, "ticker-".concat(index))); }), hashtags.map(function (hashtag, index) { return (_jsx(Badge, { variant: "outline", className: "bg-blue-500/10 text-blue-500 border-blue-500/30", children: hashtag }, "hashtag-".concat(index))); })] })), _jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-white/10", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: function () { return onToggleLike(post.id); }, className: "flex items-center gap-2 hover:bg-red-500/10 ".concat(post.is_liked ? 'text-red-500' : 'text-off-white/60'), children: [_jsx(Heart, { className: "w-4 h-4 ".concat(post.is_liked ? 'fill-current' : '') }), post.likes_count] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "flex items-center gap-2 text-off-white/60 hover:bg-blue-500/10 hover:text-blue-500", children: [_jsx(MessageCircle, { className: "w-4 h-4" }), post.replies_count] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: handleBookmark, className: "p-2 hover:bg-yellow-500/10 ".concat(isBookmarked ? 'text-yellow-500' : 'text-off-white/60'), children: _jsx(Bookmark, { className: "w-4 h-4 ".concat(isBookmarked ? 'fill-current' : '') }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: handleShare, className: "p-2 text-off-white/60 hover:bg-secondary/10 hover:text-secondary", children: _jsx(Share2, { className: "w-4 h-4" }) })] })] })] })] }));
};
export default EnhancedPostCard;
