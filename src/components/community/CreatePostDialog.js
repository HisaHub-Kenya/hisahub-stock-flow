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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PenSquare } from 'lucide-react';
var CreatePostDialog = function (_a) {
    var onCreatePost = _a.onCreatePost;
    var _b = useState(''), content = _b[0], setContent = _b[1];
    var _c = useState(false), isSubmitting = _c[0], setIsSubmitting = _c[1];
    var _d = useState(false), isOpen = _d[0], setIsOpen = _d[1];
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!content.trim() || isSubmitting)
                        return [2 /*return*/];
                    setIsSubmitting(true);
                    return [4 /*yield*/, onCreatePost(content.trim())];
                case 1:
                    success = _a.sent();
                    setIsSubmitting(false);
                    if (success) {
                        setContent('');
                        setIsOpen(false);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs(Dialog, { open: isOpen, onOpenChange: setIsOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "bg-secondary text-primary hover:bg-secondary/90", children: [_jsx(PenSquare, { className: "w-4 h-4 mr-2" }), "Create Post"] }) }), _jsxs(DialogContent, { className: "bg-primary border-secondary/20", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "text-off-white", children: "Create New Post" }) }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx(Textarea, { placeholder: "What's on your mind about trading?", value: content, onChange: function (e) { return setContent(e.target.value); }, className: "min-h-[120px] bg-primary border-secondary/20 text-off-white", maxLength: 500 }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("span", { className: "text-sm text-off-white/60", children: [content.length, "/500 characters"] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { type: "button", variant: "outline", onClick: function () { return setIsOpen(false); }, className: "border-secondary/20 text-off-white hover:bg-white/10", children: "Cancel" }), _jsx(Button, { type: "submit", disabled: !content.trim() || isSubmitting, className: "bg-secondary text-primary hover:bg-secondary/90", children: isSubmitting ? 'Posting...' : 'Post' })] })] })] })] })] }));
};
export default CreatePostDialog;
