import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, MessageSquare, Brain, GraduationCap, Signal, Bookmark } from 'lucide-react';
import { useCommunity } from '@/hooks/useCommunity';
import CommunityFeed from '@/components/community/CommunityFeed';
import SidebarWidgets from '@/components/community/SidebarWidgets';
import CreatePostFAB from '@/components/community/CreatePostFAB';
import LeaderboardWidget from '@/components/community/LeaderboardWidget';
import TrendingWidget from '@/components/community/TrendingWidget';
var Community = function () {
    var _a = useState('feed'), activeTab = _a[0], setActiveTab = _a[1];
    var _b = useCommunity(), posts = _b.posts, users = _b.users, followedUsers = _b.followedUsers, loading = _b.loading, followUser = _b.followUser, unfollowUser = _b.unfollowUser, createPost = _b.createPost, toggleLike = _b.toggleLike, getUserPosts = _b.getUserPosts;
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-primary p-4 flex items-center justify-center", children: _jsxs("div", { className: "text-center text-off-white", children: [_jsx("div", { className: "animate-spin w-8 h-8 border-2 border-secondary border-t-transparent rounded-full mx-auto mb-4" }), "Loading HisaHub Community..."] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-primary", children: [_jsx("div", { className: "bg-primary/95 backdrop-blur-md border-b border-secondary/20 sticky top-0 z-40", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 py-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-off-white", children: "HisaHub Community" }), _jsx("p", { className: "text-off-white/80", children: "Your trading social hub" })] }), _jsx("div", { className: "flex items-center gap-3", children: _jsxs(Button, { variant: "outline", size: "sm", className: "border-secondary/30", children: [_jsx(Bookmark, { className: "w-4 h-4 mr-2" }), "Saved"] }) })] }), _jsx("div", { className: "flex space-x-1 bg-primary/50 p-1 rounded-lg", children: [
                                { id: 'feed', label: 'Following', icon: MessageSquare },
                                { id: 'trending', label: 'Trending', icon: TrendingUp },
                                { id: 'discussions', label: 'Discussions', icon: Users },
                                { id: 'signals', label: 'Signals', icon: Signal },
                                { id: 'ai-insights', label: 'AI Insights', icon: Brain },
                                { id: 'mentorship', label: 'Mentorship', icon: GraduationCap },
                            ].map(function (tab) { return (_jsxs("button", { onClick: function () { return setActiveTab(tab.id); }, className: "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ".concat(activeTab === tab.id
                                    ? 'bg-secondary text-primary shadow-sm'
                                    : 'text-off-white/70 hover:text-off-white hover:bg-white/5'), children: [_jsx(tab.icon, { className: "w-4 h-4 mr-2" }), tab.label] }, tab.id)); }) })] }) }), _jsx("div", { className: "w-full px-4 lg:px-0", children: _jsxs("div", { className: "flex flex-col lg:flex-row lg:max-w-7xl lg:mx-auto", children: [_jsx("div", { className: "flex-1 lg:max-w-2xl lg:mx-auto", children: _jsx(CommunityFeed, { activeTab: activeTab, posts: posts, onToggleLike: toggleLike, onCreatePost: createPost }) }), _jsx("div", { className: "hidden lg:block lg:w-80 lg:pl-6 space-y-6", children: _jsxs("div", { className: "sticky top-20", children: [_jsx(SidebarWidgets, {}), _jsx(LeaderboardWidget, { users: users }), _jsx(TrendingWidget, {})] }) })] }) }), _jsx(CreatePostFAB, { onCreatePost: createPost })] }));
};
export default Community;
