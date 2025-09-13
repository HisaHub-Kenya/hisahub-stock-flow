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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useTrading } from "@/hooks/useTrading";
var OrderPanel = function (_a) {
    var stock = _a.stock;
    var _b = useState("market"), orderType = _b[0], setOrderType = _b[1];
    var _c = useState(""), quantity = _c[0], setQuantity = _c[1];
    var _d = useState(""), limitPrice = _d[0], setLimitPrice = _d[1];
    var _e = useState(""), stopPrice = _e[0], setStopPrice = _e[1];
    var _f = useState(false), showConfirmation = _f[0], setShowConfirmation = _f[1];
    var _g = useState("buy"), orderSide = _g[0], setOrderSide = _g[1];
    var _h = useState(false), isPlacingOrder = _h[0], setIsPlacingOrder = _h[1];
    // Default broker for now (can be updated when broker login is implemented)
    var defaultBroker = { id: "genghis", name: "Genghis Capital", fee: "0.25%" };
    // Connect to trading API
    var _j = useTrading(), buyStock = _j.buyStock, sellStock = _j.sellStock;
    var calculateTotal = function () {
        var qty = parseFloat(quantity) || 0;
        var price = orderType === "market" ? stock.price : parseFloat(limitPrice) || stock.price;
        var total = qty * price;
        var brokerFee = total * 0.0025; // 0.25% fee
        return {
            subtotal: total,
            fee: brokerFee,
            total: total + brokerFee
        };
    };
    var handlePlaceOrder = function () {
        if (!quantity || parseFloat(quantity) <= 0) {
            toast.error("Please enter a valid quantity");
            return;
        }
        if (orderType === "limit" && (!limitPrice || parseFloat(limitPrice) <= 0)) {
            toast.error("Please enter a valid limit price");
            return;
        }
        if (orderType === "stop" && (!stopPrice || parseFloat(stopPrice) <= 0)) {
            toast.error("Please enter a valid stop price");
            return;
        }
        setShowConfirmation(true);
    };
    var confirmOrder = function () { return __awaiter(void 0, void 0, void 0, function () {
        var qty, total, success, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsPlacingOrder(true);
                    qty = parseFloat(quantity);
                    total = calculateTotal().total;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    success = false;
                    if (!(orderSide === 'buy')) return [3 /*break*/, 3];
                    return [4 /*yield*/, buyStock(stock.symbol, qty, orderType)];
                case 2:
                    success = _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, sellStock(stock.symbol, qty, orderType)];
                case 4:
                    success = _a.sent();
                    _a.label = 5;
                case 5:
                    if (success) {
                        toast.success("".concat(orderSide.toUpperCase(), " order placed for ").concat(quantity, " shares of ").concat(stock.symbol, " via ").concat(defaultBroker.name, " - Total: KES ").concat(total.toFixed(2)));
                        setShowConfirmation(false);
                        setQuantity("");
                        setLimitPrice("");
                        setStopPrice("");
                    }
                    return [3 /*break*/, 8];
                case 6:
                    error_1 = _a.sent();
                    console.error('Order placement error:', error_1);
                    toast.error('Failed to place order. Please try again.');
                    return [3 /*break*/, 8];
                case 7:
                    setIsPlacingOrder(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var _k = calculateTotal(), subtotal = _k.subtotal, fee = _k.fee, total = _k.total;
    return (_jsxs("div", { className: "glass-card animate-fade-in", children: [_jsxs(Tabs, { value: orderSide, onValueChange: function (value) { return setOrderSide(value); }, children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2 bg-white/10", children: [_jsx(TabsTrigger, { value: "buy", className: "text-green-400 data-[state=active]:bg-green-500/20", children: "Buy" }), _jsx(TabsTrigger, { value: "sell", className: "text-red-400 data-[state=active]:bg-red-500/20", children: "Sell" })] }), _jsx(TabsContent, { value: "buy", className: "space-y-4 mt-4", children: _jsx(OrderForm, { orderType: orderType, setOrderType: setOrderType, quantity: quantity, setQuantity: setQuantity, limitPrice: limitPrice, setLimitPrice: setLimitPrice, stopPrice: stopPrice, setStopPrice: setStopPrice, stock: stock, subtotal: subtotal, fee: fee, total: total, onPlaceOrder: handlePlaceOrder, orderSide: "buy", currentBroker: defaultBroker }) }), _jsx(TabsContent, { value: "sell", className: "space-y-4 mt-4", children: _jsx(OrderForm, { orderType: orderType, setOrderType: setOrderType, quantity: quantity, setQuantity: setQuantity, limitPrice: limitPrice, setLimitPrice: setLimitPrice, stopPrice: stopPrice, setStopPrice: setStopPrice, stock: stock, subtotal: subtotal, fee: fee, total: total, onPlaceOrder: handlePlaceOrder, orderSide: "sell", currentBroker: defaultBroker }) })] }), _jsx(Dialog, { open: showConfirmation, onOpenChange: setShowConfirmation, children: _jsxs(DialogContent, { className: "bg-primary border-secondary/20", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "text-off-white", children: "Confirm Order" }), _jsx(DialogDescription, { className: "text-off-white/60", children: "Please review your order details before confirmation." })] }), _jsxs("div", { className: "space-y-3 py-4", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-off-white/60", children: "Action:" }), _jsxs("span", { className: "font-semibold ".concat(orderSide === 'buy' ? 'text-green-400' : 'text-red-400'), children: [orderSide.toUpperCase(), " ", stock.symbol] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-off-white/60", children: "Quantity:" }), _jsxs("span", { className: "text-off-white", children: [quantity, " shares"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-off-white/60", children: "Order Type:" }), _jsx("span", { className: "text-off-white capitalize", children: orderType })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-off-white/60", children: "Price:" }), _jsxs("span", { className: "text-off-white", children: ["KES ", orderType === "market" ? stock.price.toFixed(2) : limitPrice] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-off-white/60", children: "Broker:" }), _jsx("span", { className: "text-off-white", children: defaultBroker.name })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-off-white/60", children: "Broker Fee:" }), _jsxs("span", { className: "text-off-white", children: ["KES ", fee.toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between font-semibold border-t border-secondary/20 pt-2", children: [_jsx("span", { className: "text-off-white", children: "Total:" }), _jsxs("span", { className: "text-secondary", children: ["KES ", total.toFixed(2)] })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: function () { return setShowConfirmation(false); }, children: "Cancel" }), _jsx(Button, { onClick: confirmOrder, disabled: isPlacingOrder, className: orderSide === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700', children: isPlacingOrder ? 'Placing Order...' : "Confirm ".concat(orderSide) })] })] }) })] }));
};
var OrderForm = function (_a) {
    var orderType = _a.orderType, setOrderType = _a.setOrderType, quantity = _a.quantity, setQuantity = _a.setQuantity, limitPrice = _a.limitPrice, setLimitPrice = _a.setLimitPrice, stopPrice = _a.stopPrice, setStopPrice = _a.setStopPrice, stock = _a.stock, subtotal = _a.subtotal, fee = _a.fee, total = _a.total, onPlaceOrder = _a.onPlaceOrder, orderSide = _a.orderSide, currentBroker = _a.currentBroker;
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-off-white", children: "Order Type" }), _jsxs(Select, { value: orderType, onValueChange: setOrderType, children: [_jsx(SelectTrigger, { className: "bg-white/10 border-secondary/20 text-off-white", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { className: "bg-primary border-secondary/20", children: [_jsx(SelectItem, { value: "market", children: "Market Order" }), _jsx(SelectItem, { value: "limit", children: "Limit Order" }), _jsx(SelectItem, { value: "stop", children: "Stop Order" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-off-white", children: "Quantity" }), _jsx(Input, { type: "number", placeholder: "Enter shares", value: quantity, onChange: function (e) { return setQuantity(e.target.value); }, className: "bg-white/10 border-secondary/20 text-off-white placeholder:text-off-white/50" })] }), orderType === "limit" && (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-off-white", children: "Limit Price" }), _jsx(Input, { type: "number", step: "0.01", placeholder: "Current: KES ".concat(stock.price), value: limitPrice, onChange: function (e) { return setLimitPrice(e.target.value); }, className: "bg-white/10 border-secondary/20 text-off-white placeholder:text-off-white/50" })] })), orderType === "stop" && (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-off-white", children: "Stop Price" }), _jsx(Input, { type: "number", step: "0.01", placeholder: "Current: KES ".concat(stock.price), value: stopPrice, onChange: function (e) { return setStopPrice(e.target.value); }, className: "bg-white/10 border-secondary/20 text-off-white placeholder:text-off-white/50" })] })), _jsx("div", { className: "bg-white/5 rounded-lg p-3", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-off-white/60 text-sm", children: "Selected Broker:" }), _jsxs("div", { className: "text-right", children: [_jsx("span", { className: "text-off-white font-medium", children: currentBroker === null || currentBroker === void 0 ? void 0 : currentBroker.name }), _jsxs("div", { className: "text-xs text-off-white/60", children: ["Fee: ", currentBroker === null || currentBroker === void 0 ? void 0 : currentBroker.fee] })] })] }) }), quantity && parseFloat(quantity) > 0 && (_jsxs("div", { className: "bg-white/5 rounded-lg p-3 space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-off-white/60", children: "Subtotal:" }), _jsxs("span", { className: "text-off-white", children: ["KES ", subtotal.toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-off-white/60", children: "Broker Fee:" }), _jsxs("span", { className: "text-off-white", children: ["KES ", fee.toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between font-semibold border-t border-white/10 pt-2", children: [_jsx("span", { className: "text-off-white", children: "Total:" }), _jsxs("span", { className: "text-secondary", children: ["KES ", total.toFixed(2)] })] })] })), _jsxs(Button, { onClick: onPlaceOrder, className: "w-full font-bold py-3 ".concat(orderSide === 'buy'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'), disabled: !quantity || parseFloat(quantity) <= 0, children: ["Place ", orderSide, " Order"] })] }));
};
export default OrderPanel;
