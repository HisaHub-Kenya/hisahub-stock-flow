import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { useLocalAIChat } from "@/hooks/useLocalAIChat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
var ChatFAB = function () {
    var _a = useState(false), open = _a[0], setOpen = _a[1];
    var _b = useState(""), inputMessage = _b[0], setInputMessage = _b[1];
    var _c = useLocalAIChat(), messages = _c.messages, loading = _c.loading, sendMessage = _c.sendMessage, clearChat = _c.clearChat;
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
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "fixed bottom-6 right-6 z-50 bg-secondary shadow-xl rounded-full w-16 h-16 flex items-center justify-center animate-fade-in hover:scale-110 transition transform", style: { boxShadow: "0 2px 12px 0 rgba(0,0,0,0.12)" }, onClick: function () { return setOpen(true); }, title: "Chat with Invisa (AI)", children: _jsx(MessageSquare, { color: "#000080", size: 32 }) }), open && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-40 flex items-end md:items-center justify-end z-[99] animate-fade-in", children: _jsxs("div", { className: "bg-white rounded-t-3xl md:rounded-2xl w-full max-w-md shadow-2xl relative flex flex-col h-[500px] md:h-[600px] m-0 md:m-8", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "inline-block bg-secondary text-primary px-3 py-1 rounded-full font-bold text-lg", children: "I" }), _jsx("span", { className: "font-semibold text-charcoal", children: "Invisa AI Assistant" })] }), _jsx("button", { className: "text-secondary hover:text-primary transition p-1", onClick: function () { return setOpen(false); }, "aria-label": "Close Chat", children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-3", children: [messages.length === 0 && (_jsx("div", { className: "text-neutral text-center py-8", children: "Hello! I'm Invisa, your Kenyan financial assistant. How can I help you with NSE investing today?" })), messages.map(function (message, index) { return (_jsx("div", { className: "flex ".concat(message.role === 'user' ? 'justify-end' : 'justify-start'), children: _jsx("div", { className: "max-w-[80%] px-3 py-2 rounded-lg ".concat(message.role === 'user'
                                            ? 'bg-secondary text-primary'
                                            : 'bg-gray-100 text-charcoal'), children: _jsx("p", { className: "text-sm whitespace-pre-wrap", children: message.content }) }) }, index)); }), loading && (_jsx("div", { className: "flex justify-start", children: _jsx("div", { className: "bg-gray-100 px-3 py-2 rounded-lg", children: _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-pulse" }), _jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100" }), _jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200" })] }) }) }))] }), _jsxs("div", { className: "p-4 border-t", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { value: inputMessage, onChange: function (e) { return setInputMessage(e.target.value); }, onKeyPress: handleKeyPress, placeholder: "Ask about NSE stocks, investment advice...", className: "flex-1", disabled: loading }), _jsx(Button, { onClick: handleSendMessage, disabled: !inputMessage.trim() || loading, className: "bg-secondary hover:bg-secondary/80 text-primary", children: _jsx(Send, { size: 16 }) })] }), messages.length > 0 && (_jsx("button", { onClick: clearChat, className: "text-xs text-gray-500 mt-2 hover:text-gray-700", children: "Clear chat" }))] })] }) }))] }));
};
export default ChatFAB;
