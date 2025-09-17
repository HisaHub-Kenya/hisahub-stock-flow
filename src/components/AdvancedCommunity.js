var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { Heart, MessageCircle, Share2, TrendingUp, TrendingDown, Plus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTheme } from "./ThemeProvider";
var MOCK_USER = {
    id: "user1",
    username: "TraderJoe",
    tier: "Active Trader"
};
var MOCK_POSTS = [
    {
        id: "1",
        userId: "user1",
        username: "TraderJoe",
        content: "Just bought more $SCOM on this dip. Their Q4 earnings look promising and the PE ratio is attractive at current levels. Anyone else bullish on telco stocks? 📈",
        timestamp: Date.now() - 3600000,
        upvotes: 12,
        downvotes: 2,
        likes: 8,
        userHasUpvoted: false,
        userHasDownvoted: false,
        userHasLiked: false,
        tickers: ["SCOM"],
        replies: [
            {
                id: "r1",
                userId: "user2",
                username: "NSEQueen",
                content: "Agreed! SCOM has been oversold. Good entry point.",
                timestamp: Date.now() - 3000000,
                likes: 3,
                userHasLiked: false,
                replies: []
            }
        ]
    },
    {
        id: "2",
        userId: "user3",
        username: "MarketMaven",
        content: "PSA: Remember to diversify your portfolio! Don't put all your eggs in one basket. The NSE has been volatile lately but that creates opportunities for smart money. 🧠💰",
        timestamp: Date.now() - 7200000,
        upvotes: 25,
        downvotes: 1,
        likes: 15,
        userHasUpvoted: true,
        userHasDownvoted: false,
        userHasLiked: true,
        replies: []
    }
];
var AdvancedCommunity = function () {
    var theme = useTheme().theme;
    var _a = useState(MOCK_POSTS), posts = _a[0], setPosts = _a[1];
    var _b = useState(""), newPostContent = _b[0], setNewPostContent = _b[1];
    var _c = useState(false), isCreatePostOpen = _c[0], setIsCreatePostOpen = _c[1];
    var _d = useState(""), replyContent = _d[0], setReplyContent = _d[1];
    var _e = useState(null), activeReplyPost = _e[0], setActiveReplyPost = _e[1];
    var getTierColor = function (tier) {
        switch (tier) {
            case "New Member": return "bg-gray-500";
            case "Active Trader": return "bg-blue-500";
            case "Top 1%": return "bg-purple-500";
            case "Pro Trader": return "bg-gold-500";
            default: return "bg-gray-500";
        }
    };
    var formatTimestamp = function (timestamp) {
        var diff = Date.now() - timestamp;
        var hours = Math.floor(diff / 3600000);
        var minutes = Math.floor(diff / 60000);
        if (hours > 0)
            return "".concat(hours, "h ago");
        return "".concat(minutes, "m ago");
    };
    var extractTickers = function (content) {
        var tickerRegex = /\$([A-Z]{3,5})/g;
        var matches = content.match(tickerRegex);
        return matches ? matches.map(function (ticker) { return ticker.substring(1); }) : [];
    };
    var handleCreatePost = function () {
        if (newPostContent.trim()) {
            var tickers = extractTickers(newPostContent);
            var newPost = {
                id: Date.now().toString(),
                userId: MOCK_USER.id,
                username: MOCK_USER.username,
                content: newPostContent,
                timestamp: Date.now(),
                upvotes: 0,
                downvotes: 0,
                likes: 0,
                userHasUpvoted: false,
                userHasDownvoted: false,
                userHasLiked: false,
                tickers: tickers,
                replies: []
            };
            setPosts(__spreadArray([newPost], posts, true));
            setNewPostContent("");
            setIsCreatePostOpen(false);
        }
    };
    var handleVote = function (postId, voteType) {
        setPosts(posts.map(function (post) {
            if (post.id === postId) {
                var newPost = __assign({}, post);
                if (voteType === 'up') {
                    if (newPost.userHasUpvoted) {
                        newPost.upvotes--;
                        newPost.userHasUpvoted = false;
                    }
                    else {
                        newPost.upvotes++;
                        newPost.userHasUpvoted = true;
                        if (newPost.userHasDownvoted) {
                            newPost.downvotes--;
                            newPost.userHasDownvoted = false;
                        }
                    }
                }
                else {
                    if (newPost.userHasDownvoted) {
                        newPost.downvotes--;
                        newPost.userHasDownvoted = false;
                    }
                    else {
                        newPost.downvotes++;
                        newPost.userHasDownvoted = true;
                        if (newPost.userHasUpvoted) {
                            newPost.upvotes--;
                            newPost.userHasUpvoted = false;
                        }
                    }
                }
                return newPost;
            }
            return post;
        }));
    };
    var handleLike = function (postId) {
        setPosts(posts.map(function (post) {
            if (post.id === postId) {
                return __assign(__assign({}, post), { likes: post.userHasLiked ? post.likes - 1 : post.likes + 1, userHasLiked: !post.userHasLiked });
            }
            return post;
        }));
    };
    var handleReply = function (postId) {
        if (replyContent.trim()) {
            var newReply_1 = {
                id: Date.now().toString(),
                userId: MOCK_USER.id,
                username: MOCK_USER.username,
                content: replyContent,
                timestamp: Date.now(),
                likes: 0,
                userHasLiked: false,
                replies: []
            };
            setPosts(posts.map(function (post) {
                if (post.id === postId) {
                    return __assign(__assign({}, post), { replies: __spreadArray(__spreadArray([], post.replies, true), [newReply_1], false) });
                }
                return post;
            }));
            setReplyContent("");
            setActiveReplyPost(null);
        }
    };
    var renderReply = function (reply, depth) {
        if (depth === void 0) { depth = 0; }
        return (_jsxs("div", { className: "ml-".concat(Math.min(depth * 4, 12), " mt-3"), children: [_jsxs("div", { className: "".concat(theme === 'light' ? 'bg-gray-50' : 'bg-white/5', " p-3 rounded-lg border-l-2 border-secondary/30"), children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Avatar, { className: "w-6 h-6", children: _jsx(AvatarFallback, { className: "text-xs bg-secondary text-primary", children: reply.username[0].toUpperCase() }) }), _jsx("span", { className: "text-sm font-medium ".concat(theme === 'light' ? 'text-gray-900' : 'text-off-white'), children: reply.username }), _jsx("span", { className: "text-xs text-neutral", children: formatTimestamp(reply.timestamp) })] }), _jsx("p", { className: "text-sm ".concat(theme === 'light' ? 'text-gray-700' : 'text-off-white/90', " mb-2"), children: reply.content }), _jsx("div", { className: "flex items-center gap-2", children: _jsxs(Button, { variant: "ghost", size: "sm", className: "h-6 text-xs", children: [_jsx(Heart, { className: "w-3 h-3 mr-1" }), reply.likes] }) })] }), reply.replies.map(function (nestedReply) { return renderReply(nestedReply, depth + 1); })] }, reply.id));
    };
    return (_jsxs("div", { children: [_jsx("div", { className: "space-y-4 mb-6", children: posts.map(function (post) { return (_jsxs("div", { className: "glass-card", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx(Avatar, { className: "w-10 h-10", children: _jsx(AvatarFallback, { className: "bg-secondary text-primary font-bold", children: post.username[0].toUpperCase() }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-semibold ".concat(theme === 'light' ? 'text-gray-900' : 'text-off-white'), children: post.username }), _jsx(Badge, { className: "".concat(getTierColor(MOCK_USER.tier), " text-white text-xs px-2 py-0.5"), children: MOCK_USER.tier })] }), _jsx("span", { className: "text-xs text-neutral", children: formatTimestamp(post.timestamp) })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("p", { className: "".concat(theme === 'light' ? 'text-gray-800' : 'text-off-white', " leading-relaxed"), children: post.content }), post.tickers && post.tickers.length > 0 && (_jsx("div", { className: "flex gap-2 mt-2", children: post.tickers.map(function (ticker) { return (_jsxs(Badge, { variant: "outline", className: "text-secondary border-secondary", children: ["$", ticker] }, ticker)); }) }))] }), _jsxs("div", { className: "flex items-center justify-between border-t border-white/10 pt-3", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: function () { return handleVote(post.id, 'up'); }, className: "h-8 ".concat(post.userHasUpvoted ? 'text-green-500' : 'text-neutral hover:text-green-500'), children: [_jsx(TrendingUp, { className: "w-4 h-4 mr-1" }), post.upvotes] }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: function () { return handleVote(post.id, 'down'); }, className: "h-8 ".concat(post.userHasDownvoted ? 'text-red-500' : 'text-neutral hover:text-red-500'), children: [_jsx(TrendingDown, { className: "w-4 h-4 mr-1" }), post.downvotes] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: function () { return handleLike(post.id); }, className: "h-8 ".concat(post.userHasLiked ? 'text-red-500' : 'text-neutral hover:text-red-500'), children: [_jsx(Heart, { className: "w-4 h-4 mr-1 ".concat(post.userHasLiked ? 'fill-current' : '') }), post.likes] }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: function () { return setActiveReplyPost(activeReplyPost === post.id ? null : post.id); }, className: "h-8 text-neutral hover:text-secondary", children: [_jsx(MessageCircle, { className: "w-4 h-4 mr-1" }), post.replies.length] }), _jsx(Button, { variant: "ghost", size: "sm", className: "h-8 text-neutral hover:text-secondary", children: _jsx(Share2, { className: "w-4 h-4" }) })] })] }), activeReplyPost === post.id && (_jsx("div", { className: "mt-4 pt-4 border-t border-white/10", children: _jsxs("div", { className: "flex gap-2", children: [_jsx(Avatar, { className: "w-8 h-8", children: _jsx(AvatarFallback, { className: "bg-secondary text-primary text-sm", children: MOCK_USER.username[0].toUpperCase() }) }), _jsxs("div", { className: "flex-1", children: [_jsx(Textarea, { placeholder: "Write a reply...", value: replyContent, onChange: function (e) { return setReplyContent(e.target.value); }, className: "min-h-[80px] resize-none" }), _jsxs("div", { className: "flex justify-end gap-2 mt-2", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: function () { return setActiveReplyPost(null); }, children: "Cancel" }), _jsxs(Button, { size: "sm", onClick: function () { return handleReply(post.id); }, disabled: !replyContent.trim(), children: [_jsx(Send, { className: "w-4 h-4 mr-1" }), "Reply"] })] })] })] }) })), post.replies.length > 0 && (_jsx("div", { className: "mt-4 pt-4 border-t border-white/10", children: post.replies.map(function (reply) { return renderReply(reply); }) }))] }, post.id)); }) }), _jsxs(Dialog, { open: isCreatePostOpen, onOpenChange: setIsCreatePostOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { className: "fixed bottom-24 right-4 w-14 h-14 rounded-full bg-secondary text-primary shadow-lg hover:shadow-xl transition-all z-40", size: "icon", children: _jsx(Plus, { className: "w-6 h-6" }) }) }), _jsxs(DialogContent, { className: "".concat(theme === 'light' ? 'bg-white' : 'bg-primary', " border-secondary/20"), children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "".concat(theme === 'light' ? 'text-gray-900' : 'text-secondary'), children: "Create New Post" }) }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Avatar, { className: "w-10 h-10", children: _jsx(AvatarFallback, { className: "bg-secondary text-primary font-bold", children: MOCK_USER.username[0].toUpperCase() }) }), _jsxs("div", { children: [_jsx("span", { className: "font-semibold ".concat(theme === 'light' ? 'text-gray-900' : 'text-off-white'), children: MOCK_USER.username }), _jsx(Badge, { className: "ml-2 ".concat(getTierColor(MOCK_USER.tier), " text-white text-xs"), children: MOCK_USER.tier })] })] }), _jsx(Textarea, { placeholder: "What's on your mind? Use $TICKER to mention stocks...", value: newPostContent, onChange: function (e) { return setNewPostContent(e.target.value); }, className: "min-h-[120px] resize-none", maxLength: 500 }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("span", { className: "text-xs text-neutral", children: [newPostContent.length, "/500 characters"] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "ghost", onClick: function () { return setIsCreatePostOpen(false); }, children: "Cancel" }), _jsx(Button, { onClick: handleCreatePost, disabled: !newPostContent.trim(), className: "bg-secondary text-primary hover:bg-secondary/90", children: "Post" })] })] })] })] })] })] }));
};
export default AdvancedCommunity;
