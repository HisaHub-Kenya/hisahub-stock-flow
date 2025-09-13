import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocalAIChat } from '@/hooks/useLocalAIChat';
var LocalChatInterface = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose;
    var _b = useState(''), inputValue = _b[0], setInputValue = _b[1];
    var _c = useLocalAIChat(), messages = _c.messages, loading = _c.loading, sendMessage = _c.sendMessage;
    var messagesEndRef = useRef(null);
    var scrollToBottom = function () {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(function () {
        scrollToBottom();
    }, [messages]);
    var handleSendMessage = function () {
        if (!inputValue.trim() || loading)
            return;
        sendMessage(inputValue);
        setInputValue('');
    };
    var handleKeyPress = function (e) {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden", children: [_jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between shrink-0", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center", children: _jsx(Bot, { size: 20, className: "text-white" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-lg font-bold", children: "Local Nomic AI" }), _jsx("p", { className: "text-sm text-blue-100", children: "Running on 127.0.0.1:11434" })] })] }), _jsx(Button, { onClick: onClose, variant: "ghost", size: "icon", className: "text-white hover:bg-white/20 rounded-full w-10 h-10", children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [messages.length === 0 && (_jsxs("div", { className: "text-center text-gray-500 mt-8", children: [_jsx(Bot, { size: 48, className: "mx-auto mb-4 text-gray-300" }), _jsx("p", { children: "Start a conversation with your local Nomic model!" })] })), messages.map(function (message, index) { return (_jsx("div", { className: "flex ".concat(message.role === 'user' ? 'justify-end' : 'justify-start'), children: _jsxs("div", { className: "flex items-start gap-3 max-w-[80%]", children: [message.role === 'assistant' && (_jsx("div", { className: "w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0", children: _jsx(Bot, { size: 16, className: "text-blue-600" }) })), _jsx("div", { className: "px-4 py-2 rounded-2xl ".concat(message.role === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-800'), children: _jsx("p", { className: "text-sm whitespace-pre-wrap", children: message.content }) }), message.role === 'user' && (_jsx("div", { className: "w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0", children: _jsx(User, { size: 16, className: "text-gray-600" }) }))] }) }, index)); }), loading && (_jsx("div", { className: "flex justify-start", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center", children: _jsx(Bot, { size: 16, className: "text-blue-600" }) }), _jsx("div", { className: "bg-gray-100 px-4 py-2 rounded-2xl", children: _jsxs("div", { className: "flex space-x-1", children: [_jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce" }), _jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0.1s' } }), _jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0.2s' } })] }) })] }) })), _jsx("div", { ref: messagesEndRef })] }), _jsx("div", { className: "border-t p-4 shrink-0", children: _jsxs("div", { className: "flex gap-3", children: [_jsx(Input, { value: inputValue, onChange: function (e) { return setInputValue(e.target.value); }, onKeyPress: handleKeyPress, placeholder: "Ask your local Nomic model anything...", className: "flex-1", disabled: loading }), _jsx(Button, { onClick: handleSendMessage, disabled: !inputValue.trim() || loading, className: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4", children: _jsx(Send, { size: 18 }) })] }) })] }) }));
};
export default LocalChatInterface;
