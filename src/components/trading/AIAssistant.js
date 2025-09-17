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
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, Bot, User } from "lucide-react";
var AIAssistant = function (_a) {
    var stock = _a.stock, onClose = _a.onClose;
    var _b = useState([
        {
            id: 1,
            type: "ai",
            content: "Hello! I'm your AI trading assistant. I can help you analyze ".concat(stock.symbol, " and provide trading insights. What would you like to know?"),
            timestamp: new Date().toLocaleTimeString()
        }
    ]), messages = _b[0], setMessages = _b[1];
    var _c = useState(""), inputMessage = _c[0], setInputMessage = _c[1];
    var _d = useState(false), isLoading = _d[0], setIsLoading = _d[1];
    var messagesEndRef = useRef(null);
    var scrollToBottom = function () {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(function () {
        scrollToBottom();
    }, [messages]);
    var generateAIResponse = function (userMessage) {
        var lowerMessage = userMessage.toLowerCase();
        if (lowerMessage.includes("price") || lowerMessage.includes("target")) {
            return "Based on current market analysis, ".concat(stock.symbol, " is trading at KES ").concat(stock.price.toFixed(2), ". Technical indicators suggest support at KES ").concat((stock.price * 0.95).toFixed(2), " and resistance at KES ").concat((stock.price * 1.08).toFixed(2), ". Consider your risk tolerance when setting targets.");
        }
        if (lowerMessage.includes("buy") || lowerMessage.includes("sell")) {
            return "For ".concat(stock.symbol, ", consider the following: Current momentum is ").concat(stock.change >= 0 ? 'positive' : 'negative', " with ").concat(stock.change.toFixed(2), "% change. I recommend using limit orders and proper position sizing. Always do your own research and consider market conditions.");
        }
        if (lowerMessage.includes("analysis") || lowerMessage.includes("recommendation")) {
            return "".concat(stock.symbol, " Analysis Summary:\n\u2022 Current Price: KES ").concat(stock.price.toFixed(2), "\n\u2022 Recent Performance: ").concat(stock.change >= 0 ? '+' : '').concat(stock.change.toFixed(2), "%\n\u2022 Market Sentiment: ").concat(stock.change >= 0 ? 'Positive' : 'Cautious', "\n\u2022 Risk Level: Moderate\n\nRemember, this is not financial advice. Please consult with a licensed advisor.");
        }
        if (lowerMessage.includes("risk") || lowerMessage.includes("management")) {
            return "Risk Management Tips:\n\u2022 Never invest more than you can afford to lose\n\u2022 Diversify your portfolio across sectors\n\u2022 Use stop-loss orders to limit downside\n\u2022 Keep position sizes reasonable (2-5% per trade)\n\u2022 Stay updated on company fundamentals";
        }
        return "I understand you're asking about \"".concat(userMessage, "\". For ").concat(stock.symbol, ", I recommend checking recent news, analyzing technical indicators, and considering your investment timeline. Is there a specific aspect you'd like me to focus on?");
    };
    var handleSendMessage = function () { return __awaiter(void 0, void 0, void 0, function () {
        var userMessage;
        return __generator(this, function (_a) {
            if (!inputMessage.trim())
                return [2 /*return*/];
            userMessage = {
                id: Date.now(),
                type: "user",
                content: inputMessage,
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [userMessage], false); });
            setInputMessage("");
            setIsLoading(true);
            // Simulate AI processing delay
            setTimeout(function () {
                var aiResponse = {
                    id: Date.now() + 1,
                    type: "ai",
                    content: generateAIResponse(inputMessage),
                    timestamp: new Date().toLocaleTimeString()
                };
                setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [aiResponse], false); });
                setIsLoading(false);
            }, 1500);
            return [2 /*return*/];
        });
    }); };
    var handleKeyPress = function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    var quickQuestions = [
        "What's your price target for " + stock.symbol + "?",
        "Should I buy or sell now?",
        "Risk management advice?",
        "Technical analysis summary"
    ];
    return (_jsx("div", { className: "fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-primary border border-secondary/20 rounded-xl w-full max-w-md h-[80vh] flex flex-col shadow-2xl", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-secondary/20", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Bot, { className: "h-5 w-5 text-secondary" }), _jsx("h3", { className: "font-semibold text-off-white", children: "AI Trading Assistant" })] }), _jsx(Button, { size: "sm", variant: "outline", onClick: onClose, className: "p-2", children: _jsx(X, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [messages.map(function (message) { return (_jsxs("div", { className: "flex gap-3 ".concat(message.type === "user" ? "justify-end" : "justify-start"), children: [message.type === "ai" && (_jsx("div", { className: "w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0", children: _jsx(Bot, { className: "h-4 w-4 text-primary" }) })), _jsxs("div", { className: "max-w-[80%] rounded-lg p-3 ".concat(message.type === "user"
                                        ? "bg-secondary text-primary"
                                        : "bg-white/10 text-off-white"), children: [_jsx("p", { className: "text-sm whitespace-pre-line", children: message.content }), _jsx("p", { className: "text-xs opacity-60 mt-1", children: message.timestamp })] }), message.type === "user" && (_jsx("div", { className: "w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0", children: _jsx(User, { className: "h-4 w-4 text-off-white" }) }))] }, message.id)); }), isLoading && (_jsxs("div", { className: "flex gap-3 justify-start", children: [_jsx("div", { className: "w-8 h-8 bg-secondary rounded-full flex items-center justify-center", children: _jsx(Bot, { className: "h-4 w-4 text-primary" }) }), _jsx("div", { className: "bg-white/10 rounded-lg p-3", children: _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("div", { className: "w-2 h-2 bg-secondary rounded-full animate-pulse" }), _jsx("div", { className: "w-2 h-2 bg-secondary rounded-full animate-pulse delay-100" }), _jsx("div", { className: "w-2 h-2 bg-secondary rounded-full animate-pulse delay-200" })] }) })] })), _jsx("div", { ref: messagesEndRef })] }), messages.length === 1 && (_jsxs("div", { className: "p-4 border-t border-secondary/20", children: [_jsx("p", { className: "text-xs text-off-white/60 mb-2", children: "Quick questions:" }), _jsx("div", { className: "space-y-1", children: quickQuestions.map(function (question, index) { return (_jsx("button", { onClick: function () { return setInputMessage(question); }, className: "w-full text-left text-xs p-2 bg-white/5 rounded hover:bg-white/10 transition-colors text-off-white/80", children: question }, index)); }) })] })), _jsx("div", { className: "p-4 border-t border-secondary/20", children: _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { value: inputMessage, onChange: function (e) { return setInputMessage(e.target.value); }, onKeyPress: handleKeyPress, placeholder: "Ask me anything about trading...", className: "flex-1 bg-white/10 border-secondary/20 text-off-white placeholder:text-off-white/50", disabled: isLoading }), _jsx(Button, { onClick: handleSendMessage, disabled: !inputMessage.trim() || isLoading, className: "bg-secondary hover:bg-secondary/80 text-primary p-2", children: _jsx(Send, { className: "h-4 w-4" }) })] }) })] }) }));
};
export default AIAssistant;
