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
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
export var useLocalAIChat = function () {
    var _a = useState([]), messages = _a[0], setMessages = _a[1];
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    var toast = useToast().toast;
    var sendMessage = function (message) { return __awaiter(void 0, void 0, void 0, function () {
        var userMessage, response, errorText, data, aiMessage_1, error_1, errorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!message.trim())
                        return [2 /*return*/];
                    setLoading(true);
                    userMessage = { role: 'user', content: message };
                    setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [userMessage], false); });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    console.log('Sending request to local AI:', {
                        url: 'http://127.0.0.1:11434/api/generate',
                        model: 'finance-chat',
                        prompt: "You are Invisa, a helpful and knowledgeable Kenyan financial assistant. ".concat(message)
                    });
                    return [4 /*yield*/, fetch('http://127.0.0.1:11434/api/generate', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                model: 'finance-chat',
                                prompt: "You are Invisa, a helpful and knowledgeable Kenyan financial assistant. ".concat(message),
                                stream: false
                            })
                        })];
                case 2:
                    response = _a.sent();
                    console.log('Response status:', response.status);
                    console.log('Response headers:', response.headers);
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.text()];
                case 3:
                    errorText = _a.sent();
                    console.error('Response error:', errorText);
                    throw new Error("HTTP error! status: ".concat(response.status, ", message: ").concat(errorText));
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    data = _a.sent();
                    console.log('AI Response data:', data);
                    aiMessage_1 = { role: 'assistant', content: data.response || 'No response received' };
                    setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [aiMessage_1], false); });
                    return [3 /*break*/, 8];
                case 6:
                    error_1 = _a.sent();
                    console.error('Local AI Chat error details:', {
                        error: error_1,
                        message: error_1.message,
                        stack: error_1.stack
                    });
                    errorMessage = "Failed to connect to local Invisa model.";
                    if (error_1.message.includes('Failed to fetch')) {
                        errorMessage += " This is likely a CORS issue. Try running the app locally or configure CORS on your AI server.";
                    }
                    else if (error_1.message.includes('404')) {
                        errorMessage += " The model 'finance-chat' was not found. Check if the model is loaded.";
                    }
                    else {
                        errorMessage += " Error: ".concat(error_1.message);
                    }
                    toast({
                        title: "Chat Error",
                        description: errorMessage,
                        variant: "destructive"
                    });
                    // Remove the user message since it failed
                    setMessages(function (prev) { return prev.slice(0, -1); });
                    return [3 /*break*/, 8];
                case 7:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var clearChat = function () {
        setMessages([]);
    };
    return {
        messages: messages,
        loading: loading,
        sendMessage: sendMessage,
        clearChat: clearChat
    };
};
