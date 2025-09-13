var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Bell, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
var AlertsPanel = function (_a) {
    var stock = _a.stock;
    var _b = useState([
        {
            id: 1,
            symbol: "SCOM",
            type: "above",
            price: 25.00,
            isActive: true,
            method: "push",
            createdAt: "2024-01-10"
        },
        {
            id: 2,
            symbol: "SCOM",
            type: "below",
            price: 20.00,
            isActive: false,
            method: "sms",
            createdAt: "2024-01-08"
        }
    ]), alerts = _b[0], setAlerts = _b[1];
    var _c = useState(""), newAlertPrice = _c[0], setNewAlertPrice = _c[1];
    var _d = useState("above"), newAlertType = _d[0], setNewAlertType = _d[1];
    var _e = useState("push"), newAlertMethod = _e[0], setNewAlertMethod = _e[1];
    var _f = useState(false), showAddForm = _f[0], setShowAddForm = _f[1];
    var addAlert = function () {
        if (!newAlertPrice || parseFloat(newAlertPrice) <= 0) {
            toast.error("Please enter a valid price");
            return;
        }
        var price = parseFloat(newAlertPrice);
        var currentPrice = stock.price;
        if ((newAlertType === "above" && price <= currentPrice) ||
            (newAlertType === "below" && price >= currentPrice)) {
            toast.error("Price must be ".concat(newAlertType, " current price of KES ").concat(currentPrice.toFixed(2)));
            return;
        }
        var newAlert = {
            id: Date.now(),
            symbol: stock.symbol,
            type: newAlertType,
            price: price,
            isActive: true,
            method: newAlertMethod,
            createdAt: new Date().toISOString().split('T')[0]
        };
        setAlerts(__spreadArray(__spreadArray([], alerts, true), [newAlert], false));
        setNewAlertPrice("");
        setShowAddForm(false);
        toast.success("Alert set for ".concat(stock.symbol, " ").concat(newAlertType, " KES ").concat(price.toFixed(2)));
    };
    var toggleAlert = function (id) {
        setAlerts(alerts.map(function (alert) {
            return alert.id === id ? __assign(__assign({}, alert), { isActive: !alert.isActive }) : alert;
        }));
    };
    var deleteAlert = function (id) {
        setAlerts(alerts.filter(function (alert) { return alert.id !== id; }));
        toast.success("Alert deleted");
    };
    var stockAlerts = alerts.filter(function (alert) { return alert.symbol === stock.symbol; });
    return (_jsxs("div", { className: "glass-card animate-fade-in", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Bell, { className: "h-4 w-4 text-secondary" }), _jsx("h3", { className: "text-lg font-bold text-off-white", children: "Price Alerts" })] }), _jsx(Button, { size: "sm", onClick: function () { return setShowAddForm(!showAddForm); }, className: "bg-secondary hover:bg-secondary/80", children: _jsx(Plus, { className: "h-4 w-4" }) })] }), showAddForm && (_jsxs("div", { className: "bg-white/5 rounded-lg p-4 mb-4 space-y-3", children: [_jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-off-white text-xs", children: "Alert Type" }), _jsxs("div", { className: "flex gap-2 mt-1", children: [_jsx(Button, { size: "sm", variant: newAlertType === "above" ? "secondary" : "outline", onClick: function () { return setNewAlertType("above"); }, className: "flex-1 text-xs", children: "Above" }), _jsx(Button, { size: "sm", variant: newAlertType === "below" ? "secondary" : "outline", onClick: function () { return setNewAlertType("below"); }, className: "flex-1 text-xs", children: "Below" })] })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-off-white text-xs", children: "Price (KES)" }), _jsx(Input, { type: "number", step: "0.01", placeholder: "Current: ".concat(stock.price.toFixed(2)), value: newAlertPrice, onChange: function (e) { return setNewAlertPrice(e.target.value); }, className: "bg-white/10 border-secondary/20 text-off-white text-xs mt-1" })] })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-off-white text-xs", children: "Notification Method" }), _jsxs("div", { className: "flex gap-2 mt-1", children: [_jsx(Button, { size: "sm", variant: newAlertMethod === "push" ? "secondary" : "outline", onClick: function () { return setNewAlertMethod("push"); }, className: "flex-1 text-xs", children: "Push" }), _jsx(Button, { size: "sm", variant: newAlertMethod === "sms" ? "secondary" : "outline", onClick: function () { return setNewAlertMethod("sms"); }, className: "flex-1 text-xs", children: "SMS" }), _jsx(Button, { size: "sm", variant: newAlertMethod === "email" ? "secondary" : "outline", onClick: function () { return setNewAlertMethod("email"); }, className: "flex-1 text-xs", children: "Email" })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", onClick: addAlert, className: "flex-1 bg-green-600 hover:bg-green-700", children: "Add Alert" }), _jsx(Button, { size: "sm", variant: "outline", onClick: function () { return setShowAddForm(false); }, className: "flex-1", children: "Cancel" })] })] })), _jsx("div", { className: "space-y-2", children: stockAlerts.length === 0 ? (_jsxs("div", { className: "text-center py-6 text-off-white/60", children: [_jsx(Bell, { className: "h-8 w-8 mx-auto mb-2 opacity-50" }), _jsxs("p", { className: "text-sm", children: ["No alerts set for ", stock.symbol] }), _jsx("p", { className: "text-xs", children: "Create your first price alert above" })] })) : (stockAlerts.map(function (alert) { return (_jsxs("div", { className: "bg-white/5 rounded-lg p-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Badge, { variant: alert.type === "above" ? "default" : "destructive", className: "text-xs", children: [alert.type === "above" ? "↗" : "↘", " ", alert.type] }), _jsxs("span", { className: "text-off-white font-semibold", children: ["KES ", alert.price.toFixed(2)] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Switch, { checked: alert.isActive, onCheckedChange: function () { return toggleAlert(alert.id); } }), _jsx(Button, { size: "sm", variant: "outline", onClick: function () { return deleteAlert(alert.id); }, className: "p-1", children: _jsx(Trash2, { className: "h-3 w-3" }) })] })] }), _jsxs("div", { className: "flex justify-between items-center text-xs text-off-white/60", children: [_jsxs("span", { children: ["via ", alert.method.toUpperCase()] }), _jsxs("span", { children: ["Created: ", alert.createdAt] })] })] }, alert.id)); })) }), _jsxs("div", { className: "mt-4 pt-4 border-t border-white/10", children: [_jsx("p", { className: "text-xs text-off-white/60 mb-2", children: "Notification Settings" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-off-white", children: "Push Notifications" }), _jsx(Switch, { defaultChecked: true })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-off-white", children: "SMS Alerts" }), _jsx(Switch, {})] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-off-white", children: "Email Alerts" }), _jsx(Switch, {})] })] })] })] }));
};
export default AlertsPanel;
