var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Plus, PenTool, Camera, BarChart3, Brain } from 'lucide-react';
import { toast } from 'sonner';
var CreatePostFAB = function (_a) {
    var onCreatePost = _a.onCreatePost;
    var _b = useState(false), isMainOpen = _b[0], setIsMainOpen = _b[1];
    var _c = useState(false), isPostDialogOpen = _c[0], setIsPostDialogOpen = _c[1];
    var _d = useState(''), postContent = _d[0], setPostContent = _d[1];
    var _e = useState(false), isSubmitting = _e[0], setIsSubmitting = _e[1];
    var handleSubmitPost = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!postContent.trim() || isSubmitting)
                        return [2 /*return*/];
                    setIsSubmitting(true);
                    return [4 /*yield*/, onCreatePost(postContent.trim())];
                case 1:
                    success = _a.sent();
                    setIsSubmitting(false);
                    if (success) {
                        setPostContent('');
                        setIsPostDialogOpen(false);
                        setIsMainOpen(false);
                        toast.success('Post shared successfully!');
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var fabActions = [
        {
            icon: PenTool,
            label: 'Share Idea',
            color: 'bg-blue-500 hover:bg-blue-600',
            action: function () {
                setIsPostDialogOpen(true);
                setIsMainOpen(false);
            }
        },
        {
            icon: BarChart3,
            label: 'Share Trade',
            color: 'bg-green-500 hover:bg-green-600',
            action: function () {
                toast.info('Trade sharing coming soon!');
                setIsMainOpen(false);
            }
        },
        {
            icon: Brain,
            label: 'Ask AI',
            color: 'bg-purple-500 hover:bg-purple-600',
            action: function () {
                toast.info('AI assistant coming soon!');
                setIsMainOpen(false);
            }
        },
        {
            icon: Camera,
            label: 'Share Chart',
            color: 'bg-orange-500 hover:bg-orange-600',
            action: function () {
                toast.info('Chart sharing coming soon!');
                setIsMainOpen(false);
            }
        }
    ];
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed bottom-5 right-5 z-50", children: _jsxs("div", { className: "relative", children: [isMainOpen && (_jsx("div", { className: "absolute bottom-16 right-0 space-y-3 animate-fade-in", children: fabActions.map(function (action, index) { return (_jsxs("div", { className: "flex items-center gap-3 animate-fade-in", style: { animationDelay: "".concat(index * 0.1, "s") }, children: [_jsx("span", { className: "bg-primary text-off-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg", children: action.label }), _jsx(Button, { onClick: action.action, className: "h-12 w-12 rounded-full shadow-lg ".concat(action.color, " text-white hover:scale-110 transition-all duration-200"), children: _jsx(action.icon, { className: "h-5 w-5" }) })] }, index)); }) })), _jsx(Button, { onClick: function () { return setIsMainOpen(!isMainOpen); }, className: "h-14 w-14 rounded-full bg-secondary text-primary shadow-lg hover:bg-secondary/90 hover:scale-110 transition-all duration-200 ".concat(isMainOpen ? 'rotate-45' : 'rotate-0'), children: _jsx(Plus, { className: "h-6 w-6" }) })] }) }), isMainOpen && (_jsx("div", { className: "fixed inset-0 bg-black/20 z-40 animate-fade-in", onClick: function () { return setIsMainOpen(false); } })), _jsx(Dialog, { open: isPostDialogOpen, onOpenChange: setIsPostDialogOpen, children: _jsxs(DialogContent, { className: "bg-primary border-secondary/20 max-w-2xl", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "text-off-white", children: "Share Your Trading Idea" }) }), _jsxs("form", { onSubmit: handleSubmitPost, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Textarea, { placeholder: "What's happening in the markets? Share your thoughts, analysis, or questions...\r\n\r\nUse $TICKER to mention stocks (e.g., $KCB, $EABL)\r\nUse #hashtags for topics (e.g., #Forex, #Equities, #TechnicalAnalysis)", value: postContent, onChange: function (e) { return setPostContent(e.target.value); }, className: "min-h-[150px] bg-primary border-secondary/20 text-off-white resize-none", maxLength: 500 }), _jsxs("div", { className: "flex justify-between items-center text-sm", children: [_jsxs("span", { className: "text-off-white/60", children: [postContent.length, "/500 characters"] }), _jsx("div", { className: "flex gap-2 text-off-white/60", children: _jsx("span", { children: "\uD83D\uDCA1 Tip: Use $TICKER and #hashtags" }) })] })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: ['$KCB', '$EABL', '$SCOM', '#TechnicalAnalysis', '#Forex', '#MarketUpdate'].map(function (suggestion) { return (_jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: function () { return setPostContent(postContent + ' ' + suggestion); }, className: "border-secondary/30 text-off-white hover:bg-secondary/10", children: suggestion }, suggestion)); }) }), _jsxs("div", { className: "flex justify-end gap-3", children: [_jsx(Button, { type: "button", variant: "outline", onClick: function () { return setIsPostDialogOpen(false); }, className: "border-secondary/20 text-off-white hover:bg-white/10", children: "Cancel" }), _jsx(Button, { type: "submit", disabled: !postContent.trim() || isSubmitting, className: "bg-secondary text-primary hover:bg-secondary/90", children: isSubmitting ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" }), "Posting..."] })) : ('Share Post') })] })] })] }) })] }));
};
export default CreatePostFAB;
