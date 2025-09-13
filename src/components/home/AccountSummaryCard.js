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
import { useState } from "react";
import { PlusCircle, MinusCircle, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFinancialData } from "../../contexts/FinancialDataContext";
import { apiHelpers, handleApiError } from "@/lib/api";
import { toast } from "sonner";
var AccountSummaryCard = function () {
    var _a = useFinancialData(), state = _a.state, dispatch = _a.dispatch;
    var _b = useState(false), isProcessing = _b[0], setIsProcessing = _b[1];
    var handleAddFunds = function () { return __awaiter(void 0, void 0, void 0, function () {
        var amount, result, error_1, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsProcessing(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    amount = 10000;
                    return [4 /*yield*/, apiHelpers.depositFunds(amount, 'bank_transfer')];
                case 2:
                    result = _a.sent();
                    // Update local state
                    dispatch({ type: 'ADD_FUNDS', payload: amount });
                    toast.success("Successfully deposited KES ".concat(amount.toLocaleString()));
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    message = handleApiError(error_1).message;
                    toast.error("Deposit failed: ".concat(message));
                    return [3 /*break*/, 5];
                case 4:
                    setIsProcessing(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleWithdraw = function () { return __awaiter(void 0, void 0, void 0, function () {
        var amount, result, error_2, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (state.accountData.balance < 5000) {
                        toast.error('Insufficient balance for withdrawal');
                        return [2 /*return*/];
                    }
                    setIsProcessing(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    amount = 5000;
                    return [4 /*yield*/, apiHelpers.withdrawFunds(amount, 'bank_transfer')];
                case 2:
                    result = _a.sent();
                    // Update local state
                    dispatch({ type: 'ADD_FUNDS', payload: -amount });
                    toast.success("Withdrawal request submitted for KES ".concat(amount.toLocaleString()));
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    message = handleApiError(error_2).message;
                    toast.error("Withdrawal failed: ".concat(message));
                    return [3 /*break*/, 5];
                case 4:
                    setIsProcessing(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var isPositiveChange = state.portfolioData.dailyChangePercent >= 0;
    return (_jsxs("div", { className: "glass-card animate-fade-in", children: [_jsx("h2", { className: "text-lg font-bold text-off-white mb-4", children: "Account Summary" }), _jsxs("div", { className: "mb-4", children: [_jsx("p", { className: "text-off-white/60 text-sm", children: "Account Balance" }), _jsxs("p", { className: "text-2xl font-bold text-secondary font-mono", children: ["KES ", state.accountData.balance.toLocaleString()] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("p", { className: "text-off-white/60 text-sm", children: "Total Portfolio Value" }), _jsxs("p", { className: "text-xl font-bold text-off-white font-mono", children: ["KES ", state.portfolioData.totalValue.toLocaleString()] })] }), _jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-off-white/60 text-sm", children: "Today's Change" }), _jsxs("div", { className: "flex items-center gap-1 px-2 py-1 rounded text-sm ".concat(isPositiveChange ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'), children: [isPositiveChange ? _jsx(TrendingUp, { className: "h-3 w-3" }) : _jsx(TrendingDown, { className: "h-3 w-3" }), _jsxs("span", { children: [isPositiveChange ? '+' : '', state.portfolioData.dailyChangePercent.toFixed(2), "%"] })] })] }), _jsxs("p", { className: "font-mono font-semibold ".concat(state.portfolioData.dailyChange >= 0 ? 'text-green-400' : 'text-red-400'), children: [state.portfolioData.dailyChange >= 0 ? '+' : '', "KES ", state.portfolioData.dailyChange.toLocaleString()] })] }), _jsxs("div", { className: "flex gap-3", children: [_jsxs(Button, { onClick: handleAddFunds, disabled: isProcessing, className: "flex-1 bg-green-600 hover:bg-green-700 text-white", size: "sm", children: [_jsx(PlusCircle, { className: "h-4 w-4 mr-2" }), isProcessing ? 'Processing...' : 'Deposit'] }), _jsxs(Button, { onClick: handleWithdraw, disabled: isProcessing || state.accountData.balance < 5000, variant: "outline", className: "flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10", size: "sm", children: [_jsx(MinusCircle, { className: "h-4 w-4 mr-2" }), isProcessing ? 'Processing...' : 'Withdraw'] })] })] }));
};
export default AccountSummaryCard;
