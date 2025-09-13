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
import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, TrendingUp, Shield, DollarSign, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import CRMModule from './modules/CRMModule';
import RiskManagementModule from './modules/RiskManagementModule';
import PersonalFinanceModule from './modules/PersonalFinanceModule';
import TradingCoachModule from './modules/TradingCoachModule';
var ChatInterface = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose;
    var _b = useState('crm'), activeModule = _b[0], setActiveModule = _b[1];
    var _c = useState([
        {
            id: '1',
            sender: 'bot',
            content: 'Welcome to Hisa AI! I\'m your intelligent financial assistant. How can I help you today?',
            timestamp: new Date()
        }
    ]), messages = _c[0], setMessages = _c[1];
    var _d = useState(''), inputValue = _d[0], setInputValue = _d[1];
    var _e = useState(false), isTyping = _e[0], setIsTyping = _e[1];
    var messagesEndRef = useRef(null);
    var scrollToBottom = function () {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(function () {
        scrollToBottom();
    }, [messages]);
    var getModulePlaceholder = function () {
        switch (activeModule) {
            case 'crm': return 'Ask about customer management, leads, or sales analytics...';
            case 'risk': return 'Ask about portfolio risk, market volatility, or risk assessment...';
            case 'finance': return 'Ask about budgeting, financial planning, or investment advice...';
            case 'trading': return 'Ask about trading strategies, market analysis, or educational content...';
            default: return 'How can I help you today?';
        }
    };
    var getModuleResponse = function () {
        var responses = {
            crm: [
                'Based on your CRM data, I recommend focusing on your top 20% leads for maximum conversion.',
                'Your customer satisfaction rate of 94.2% is excellent! Consider implementing loyalty programs.',
                'I notice your response time is 2.3 hours. Automating initial responses could improve this.',
                'Your conversion rate can be improved by segmenting customers based on behavior patterns.',
                'Consider scheduling follow-ups with high-value prospects to increase closing rates.',
            ],
            risk: [
                'Your portfolio shows moderate risk levels. Consider diversifying across different sectors.',
                'Current market volatility suggests implementing stop-loss orders for protection.',
                'Your Sharpe ratio of 1.8 indicates good risk-adjusted returns.',
                'Market beta of 1.2 means your portfolio is slightly more volatile than the market.',
                'VIX at 23.5 suggests elevated market uncertainty - consider hedging strategies.',
            ],
            finance: [
                'Following the 50/30/20 rule could optimize your budget allocation.',
                'Building an emergency fund should be your priority before aggressive investing.',
                'Your savings rate indicates you could increase investments by 15%.',
                'Consider tax-advantaged accounts like retirement funds for long-term goals.',
                'Debt consolidation might reduce your monthly payments and interest burden.',
            ],
            trading: [
                'Technical analysis suggests a bullish trend in the NSE index.',
                'Consider learning about support and resistance levels for better entry points.',
                'Risk management is crucial - never risk more than 2% per trade.',
                'Moving averages indicate a potential trend reversal - monitor closely.',
                'Your trading course progress shows good fundamentals - practice with paper trading.',
            ]
        };
        return responses[activeModule][Math.floor(Math.random() * 5)];
    };
    var handleSendMessage = function () {
        if (!inputValue.trim())
            return;
        var userMessage = {
            id: Date.now().toString(),
            sender: 'user',
            content: inputValue,
            timestamp: new Date()
        };
        setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [userMessage], false); });
        setInputValue('');
        setIsTyping(true);
        setTimeout(function () {
            var botMessage = {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                content: getModuleResponse(),
                timestamp: new Date()
            };
            setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [botMessage], false); });
            setIsTyping(false);
        }, 1500);
    };
    var handleKeyPress = function (e) {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };
    var handleModuleChange = function (module) {
        setActiveModule(module);
        var welcomeMessages = {
            crm: 'Switched to CRM module. I can help with customer management, lead tracking, and sales analytics.',
            risk: 'Switched to Risk Management. Let\'s assess your portfolio risk and market exposure.',
            finance: 'Switched to Personal Finance. I\'ll help with budgeting, planning, and financial goals.',
            trading: 'Switched to Trading Coach. Ready to enhance your trading knowledge and strategies.'
        };
        var botMessage = {
            id: Date.now().toString(),
            sender: 'bot',
            content: welcomeMessages[module],
            timestamp: new Date()
        };
        setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [botMessage], false); });
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4", children: _jsxs("div", { className: "bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-7xl h-[95vh] md:h-[90vh] flex flex-col overflow-hidden", children: [_jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 md:p-6 flex items-center justify-between shrink-0", children: [_jsxs("div", { className: "flex items-center gap-2 md:gap-3", children: [_jsxs("div", { className: "w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg md:rounded-xl flex items-center justify-center", children: [_jsx(Bot, { size: 16, className: "md:hidden text-white" }), _jsx(Bot, { size: 24, className: "hidden md:block text-white" })] }), _jsxs("div", { children: [_jsx("h1", { className: "text-lg md:text-2xl font-bold", children: "Hisa AI" }), _jsx("p", { className: "text-xs md:text-sm text-blue-100", children: "AI-Driven Financial Brain" })] })] }), _jsxs(Button, { onClick: onClose, variant: "ghost", size: "icon", className: "text-white hover:bg-white/20 rounded-full w-8 h-8 md:w-10 md:h-10", children: [_jsx(X, { size: 18, className: "md:hidden" }), _jsx(X, { size: 24, className: "hidden md:block" })] })] }), _jsx("div", { className: "bg-gradient-to-r from-blue-50 to-purple-50 border-b shrink-0 p-3 md:p-4", children: _jsxs("div", { className: "flex gap-2 md:gap-3 justify-center overflow-x-auto", children: [_jsxs(Button, { onClick: function () { return handleModuleChange('crm'); }, variant: activeModule === 'crm' ? 'default' : 'outline', className: "flex items-center gap-2 whitespace-nowrap px-3 md:px-4 py-2 rounded-lg transition-all ".concat(activeModule === 'crm'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white hover:bg-blue-50 border-blue-200'), children: [_jsx(TrendingUp, { size: 16 }), _jsx("span", { className: "text-sm font-medium", children: "CRM Dashboard" })] }), _jsxs(Button, { onClick: function () { return handleModuleChange('risk'); }, variant: activeModule === 'risk' ? 'default' : 'outline', className: "flex items-center gap-2 whitespace-nowrap px-3 md:px-4 py-2 rounded-lg transition-all ".concat(activeModule === 'risk'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white hover:bg-blue-50 border-blue-200'), children: [_jsx(Shield, { size: 16 }), _jsx("span", { className: "text-sm font-medium", children: "Risk Management" })] }), _jsxs(Button, { onClick: function () { return handleModuleChange('finance'); }, variant: activeModule === 'finance' ? 'default' : 'outline', className: "flex items-center gap-2 whitespace-nowrap px-3 md:px-4 py-2 rounded-lg transition-all ".concat(activeModule === 'finance'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white hover:bg-blue-50 border-blue-200'), children: [_jsx(DollarSign, { size: 16 }), _jsx("span", { className: "text-sm font-medium", children: "Personal Finance" })] }), _jsxs(Button, { onClick: function () { return handleModuleChange('trading'); }, variant: activeModule === 'trading' ? 'default' : 'outline', className: "flex items-center gap-2 whitespace-nowrap px-3 md:px-4 py-2 rounded-lg transition-all ".concat(activeModule === 'trading'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white hover:bg-blue-50 border-blue-200'), children: [_jsx(GraduationCap, { size: 16 }), _jsx("span", { className: "text-sm font-medium", children: "Trading Coach" })] })] }) }), _jsxs("div", { className: "flex flex-col lg:flex-row flex-1 overflow-hidden", children: [_jsxs("div", { className: "flex-1 flex flex-col min-h-0", children: [_jsxs("div", { className: "flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4", children: [messages.map(function (message) { return (_jsx("div", { className: "flex ".concat(message.sender === 'user' ? 'justify-end' : 'justify-start'), children: _jsxs("div", { className: "max-w-[85%] sm:max-w-xs lg:max-w-md px-3 md:px-4 py-2 rounded-2xl ".concat(message.sender === 'user'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-800'), children: [_jsx("p", { className: "text-xs md:text-sm break-words", children: message.content }), _jsx("p", { className: "text-xs opacity-70 mt-1", children: message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })] }) }, message.id)); }), isTyping && (_jsx("div", { className: "flex justify-start", children: _jsx("div", { className: "bg-gray-100 text-gray-800 px-3 md:px-4 py-2 rounded-2xl", children: _jsxs("div", { className: "flex space-x-1", children: [_jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce" }), _jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0.1s' } }), _jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0.2s' } })] }) }) })), _jsx("div", { ref: messagesEndRef })] }), _jsx("div", { className: "border-t p-3 md:p-6 shrink-0", children: _jsxs("div", { className: "flex gap-2 md:gap-3", children: [_jsx(Input, { value: inputValue, onChange: function (e) { return setInputValue(e.target.value); }, onKeyPress: handleKeyPress, placeholder: getModulePlaceholder(), className: "flex-1 text-xs md:text-sm" }), _jsxs(Button, { onClick: handleSendMessage, className: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-3 md:px-4", children: [_jsx(Send, { size: 16, className: "md:hidden" }), _jsx(Send, { size: 18, className: "hidden md:block" })] })] }) })] }), _jsx("div", { className: "w-full lg:w-80 border-t lg:border-t-0 lg:border-l bg-gray-50 overflow-y-auto", children: _jsxs(Tabs, { value: activeModule, className: "w-full h-full", children: [_jsx(TabsContent, { value: "crm", className: "h-full m-0", children: _jsx(CRMModule, {}) }), _jsx(TabsContent, { value: "risk", className: "h-full m-0", children: _jsx(RiskManagementModule, {}) }), _jsx(TabsContent, { value: "finance", className: "h-full m-0", children: _jsx(PersonalFinanceModule, {}) }), _jsx(TabsContent, { value: "trading", className: "h-full m-0", children: _jsx(TradingCoachModule, {}) })] }) })] })] }) }));
};
export default ChatInterface;
