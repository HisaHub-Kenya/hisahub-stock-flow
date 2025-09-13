import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Send } from "lucide-react";
import BottomNav from "../components/BottomNav";
import HisaAIButton from "../components/HisaAIButton";
import { useLocalAIChat } from "@/hooks/useLocalAIChat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
var Chatbot = function () {
    var _a = useState(""), inputMessage = _a[0], setInputMessage = _a[1];
    var _b = useLocalAIChat(), messages = _b.messages, loading = _b.loading, sendMessage = _b.sendMessage, clearChat = _b.clearChat;
    var handleSendMessage = function () {
        if (inputMessage.trim()) {
            sendMessage(inputMessage.trim());
            setInputMessage("");
        }
    };
    var handleKeyPress = function (e) {
        if (e.key === 'Enter' && !loading) {
            handleSendMessage();
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-primary font-sans transition-colors pb-20", children: [_jsx(HisaAIButton, {}), _jsxs("main", { className: "flex-1 flex flex-col px-4 py-10 max-w-4xl mx-auto w-full", children: [_jsx("h2", { className: "text-3xl font-bold text-secondary mb-7 text-center", style: { fontFamily: "'Poppins',sans-serif" }, children: "Chat with Invisa AI" }), _jsxs("div", { className: "flex-1 glass-card bg-white/10 mb-4 flex flex-col", children: [_jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-3", children: [messages.length === 0 && (_jsx("div", { className: "text-off-white/80 text-center py-8", children: "Hello! I'm Invisa, your Kenyan financial assistant. How can I help you with NSE investing today?" })), messages.map(function (message, index) { return (_jsx("div", { className: "flex ".concat(message.role === 'user' ? 'justify-end' : 'justify-start'), children: _jsx("div", { className: "max-w-[80%] px-4 py-3 rounded-lg ".concat(message.role === 'user'
                                                ? 'bg-secondary text-primary'
                                                : 'bg-white/20 text-off-white'), children: _jsx("p", { className: "text-sm whitespace-pre-wrap", children: message.content }) }) }, index)); }), loading && (_jsx("div", { className: "flex justify-start", children: _jsx("div", { className: "bg-white/20 px-4 py-3 rounded-lg", children: _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("div", { className: "w-2 h-2 bg-secondary rounded-full animate-pulse" }), _jsx("div", { className: "w-2 h-2 bg-secondary rounded-full animate-pulse delay-100" }), _jsx("div", { className: "w-2 h-2 bg-secondary rounded-full animate-pulse delay-200" })] }) }) }))] }), _jsxs("div", { className: "p-4 border-t border-white/10", children: [_jsxs("div", { className: "flex gap-3", children: [_jsx(Input, { value: inputMessage, onChange: function (e) { return setInputMessage(e.target.value); }, onKeyPress: handleKeyPress, placeholder: "Ask about NSE stocks, investment strategies, market analysis...", className: "flex-1 bg-white/10 border-white/20 text-off-white placeholder:text-off-white/60", disabled: loading }), _jsx(Button, { onClick: handleSendMessage, disabled: !inputMessage.trim() || loading, className: "bg-secondary hover:bg-secondary/80 text-primary px-6", children: _jsx(Send, { size: 16 }) })] }), messages.length > 0 && (_jsx("button", { onClick: clearChat, className: "text-xs text-off-white/60 mt-2 hover:text-off-white/80", children: "Clear conversation" }))] })] })] }), _jsx(BottomNav, {})] }));
};
export default Chatbot;
