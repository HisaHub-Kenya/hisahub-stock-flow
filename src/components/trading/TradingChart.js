var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, ReferenceLine, ComposedChart } from "recharts";
import { Moon, Sun, TrendingUp, BarChart3, Activity, Target, Crosshair, TrendingDown, Palette, Settings } from "lucide-react";
var timeframes = ['1D', '1W', '1M', '3M', '1Y'];
// Enhanced mock data generator with OHLC data for candlesticks
var generateMockData = function (days) {
    var data = [];
    var basePrice = 22.70;
    var rsi = 50;
    var macdLine = 0;
    var signalLine = 0;
    for (var i = 0; i < days; i++) {
        var change = (Math.random() - 0.5) * 2;
        var open_1 = basePrice;
        basePrice += change;
        var close_1 = basePrice;
        var high = Math.max(open_1, close_1) + Math.random() * 1;
        var low = Math.min(open_1, close_1) - Math.random() * 1;
        // Calculate RSI (simplified)
        rsi = Math.max(0, Math.min(100, rsi + (Math.random() - 0.5) * 10));
        // Calculate MACD (simplified)
        macdLine += (Math.random() - 0.5) * 0.5;
        signalLine = signalLine * 0.9 + macdLine * 0.1;
        // Calculate Bollinger Bands (simplified)
        var sma = basePrice;
        var upperBand = sma + 2;
        var lowerBand = sma - 2;
        data.push({
            time: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
            price: Number(basePrice.toFixed(2)),
            open: Number(open_1.toFixed(2)),
            high: Number(high.toFixed(2)),
            low: Number(low.toFixed(2)),
            close: Number(close_1.toFixed(2)),
            volume: Math.floor(Math.random() * 1000000),
            rsi: Number(rsi.toFixed(2)),
            macdLine: Number(macdLine.toFixed(3)),
            signalLine: Number(signalLine.toFixed(3)),
            histogram: Number((macdLine - signalLine).toFixed(3)),
            sma: Number(sma.toFixed(2)),
            upperBand: Number(upperBand.toFixed(2)),
            lowerBand: Number(lowerBand.toFixed(2)),
            // Candlestick color based on open vs close
            fill: close_1 >= open_1 ? "#22C55E" : "#EF4444"
        });
    }
    return data;
};
var TradingChart = function (_a) {
    var _b;
    var symbol = _a.symbol;
    var _c = useState('1D'), selectedTimeframe = _c[0], setSelectedTimeframe = _c[1];
    var _d = useState('line'), chartType = _d[0], setChartType = _d[1];
    var _e = useState(true), isDarkTheme = _e[0], setIsDarkTheme = _e[1];
    var _f = useState(generateMockData(30)), chartData = _f[0], setChartData = _f[1];
    var _g = useState([]), activeIndicators = _g[0], setActiveIndicators = _g[1];
    var _h = useState(null), activeTool = _h[0], setActiveTool = _h[1];
    var _j = useState(null), supportLevel = _j[0], setSupportLevel = _j[1];
    var _k = useState(null), resistanceLevel = _k[0], setResistanceLevel = _k[1];
    var _l = useState([]), trendLines = _l[0], setTrendLines = _l[1];
    var indicators = [
        { id: 'rsi', name: 'RSI', icon: Activity },
        { id: 'macd', name: 'MACD', icon: TrendingDown },
        { id: 'bollinger', name: 'Bollinger Bands', icon: BarChart3 },
        { id: 'sma', name: 'Simple Moving Average', icon: TrendingUp }
    ];
    var tools = [
        { id: 'trendline', name: 'Trendline', icon: TrendingUp },
        { id: 'horizontal', name: 'Horizontal Line', icon: Crosshair },
        { id: 'vertical', name: 'Vertical Line', icon: Crosshair },
        { id: 'fibonacci', name: 'Fibonacci', icon: Settings },
        { id: 'rectangle', name: 'Rectangle', icon: Target },
        { id: 'brush', name: 'Free Draw', icon: Palette }
    ];
    useEffect(function () {
        // Simulate data update when timeframe changes
        var days = selectedTimeframe === '1D' ? 24 :
            selectedTimeframe === '1W' ? 7 :
                selectedTimeframe === '1M' ? 30 :
                    selectedTimeframe === '3M' ? 90 : 365;
        var newData = generateMockData(days);
        setChartData(newData);
        // Calculate support and resistance levels
        var prices = newData.map(function (d) { return d.price; });
        setSupportLevel(Math.min.apply(Math, prices) * 1.02);
        setResistanceLevel(Math.max.apply(Math, prices) * 0.98);
    }, [selectedTimeframe, symbol]);
    var toggleIndicator = function (indicatorId) {
        setActiveIndicators(function (prev) {
            return prev.includes(indicatorId)
                ? prev.filter(function (id) { return id !== indicatorId; })
                : __spreadArray(__spreadArray([], prev, true), [indicatorId], false);
        });
    };
    var handleToolSelect = function (toolId) {
        var _a;
        setActiveTool(toolId);
        // Simulate adding analysis lines
        if (toolId === 'trendline' || toolId === 'horizontal') {
            var newLine_1 = {
                id: "".concat(toolId, "-").concat(Date.now()),
                y: ((_a = chartData[Math.floor(chartData.length / 2)]) === null || _a === void 0 ? void 0 : _a.price) || 0,
                label: toolId === 'trendline' ? 'Trend' : 'Level'
            };
            setTrendLines(function (prev) { return __spreadArray(__spreadArray([], prev, true), [newLine_1], false); });
        }
    };
    // Custom candlestick component
    var CandlestickBar = function (props) {
        var payload = props.payload, x = props.x, y = props.y, width = props.width, height = props.height;
        if (!payload)
            return null;
        var open = payload.open, high = payload.high, low = payload.low, close = payload.close;
        var isGreen = close >= open;
        var color = isGreen ? "#22C55E" : "#EF4444";
        var bodyHeight = Math.abs(close - open) * (height / (payload.high - payload.low));
        var bodyY = y + (Math.max(open, close) - payload.high) * (height / (payload.high - payload.low));
        return (_jsxs("g", { children: [_jsx("line", { x1: x + width / 2, y1: y, x2: x + width / 2, y2: y + height, stroke: color, strokeWidth: 1 }), _jsx("rect", { x: x + width * 0.2, y: bodyY, width: width * 0.6, height: bodyHeight || 1, fill: color, stroke: color })] }));
    };
    return (_jsxs("div", { className: "glass-card animate-fade-in", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2", children: [_jsxs("h3", { className: "text-lg font-bold text-off-white", children: [symbol, " Chart"] }), _jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [_jsx(Button, { size: "sm", variant: "outline", onClick: function () { return setIsDarkTheme(!isDarkTheme); }, className: "p-2", children: isDarkTheme ? _jsx(Sun, { className: "h-4 w-4" }) : _jsx(Moon, { className: "h-4 w-4" }) }), _jsx(Button, { size: "sm", variant: "outline", onClick: function () { return setChartType(chartType === 'line' ? 'candlestick' : 'line'); }, className: "p-2", children: chartType === 'line' ? _jsx(BarChart3, { className: "h-4 w-4" }) : _jsx(TrendingUp, { className: "h-4 w-4" }) }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { size: "sm", variant: activeIndicators.length > 0 ? "secondary" : "outline", className: "text-xs px-2", children: [_jsx(Activity, { className: "h-3 w-3 mr-1" }), "Indicators (", activeIndicators.length, ")"] }) }), _jsx(PopoverContent, { className: "w-64 bg-primary border-secondary/20 p-3", children: _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-medium text-off-white mb-3", children: "Technical Indicators" }), indicators.map(function (indicator) {
                                                    var Icon = indicator.icon;
                                                    return (_jsx("div", { className: "flex items-center space-x-2", children: _jsxs(Button, { size: "sm", variant: activeIndicators.includes(indicator.id) ? "secondary" : "outline", onClick: function () { return toggleIndicator(indicator.id); }, className: "flex-1 justify-start text-xs", children: [_jsx(Icon, { className: "h-3 w-3 mr-2" }), indicator.name] }) }, indicator.id));
                                                })] }) })] }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { size: "sm", variant: activeTool ? "secondary" : "outline", className: "text-xs px-2", children: [_jsx(Target, { className: "h-3 w-3 mr-1" }), "Tools"] }) }), _jsx(PopoverContent, { className: "w-64 bg-primary border-secondary/20 p-3", children: _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-medium text-off-white mb-3", children: "Chart Analysis Tools" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: tools.map(function (tool) {
                                                        var Icon = tool.icon;
                                                        return (_jsxs(Button, { size: "sm", variant: activeTool === tool.id ? "secondary" : "outline", onClick: function () { return handleToolSelect(tool.id); }, className: "text-xs p-2 h-auto flex flex-col items-center gap-1", children: [_jsx(Icon, { className: "h-3 w-3" }), _jsx("span", { className: "text-xs leading-none", children: tool.name })] }, tool.id));
                                                    }) }), activeTool && (_jsxs("div", { className: "mt-3 p-2 bg-white/5 rounded text-xs text-off-white/80", children: ["Selected: ", (_b = tools.find(function (t) { return t.id === activeTool; })) === null || _b === void 0 ? void 0 : _b.name] }))] }) })] })] })] }), _jsx("div", { className: "flex gap-1 mb-4 overflow-x-auto pb-2", children: timeframes.map(function (tf) { return (_jsx(Button, { size: "sm", variant: selectedTimeframe === tf ? "secondary" : "outline", onClick: function () { return setSelectedTimeframe(tf); }, className: "flex-shrink-0 text-xs px-3", children: tf }, tf)); }) }), _jsx("div", { className: "h-64 sm:h-80 w-full bg-white/5 rounded-lg p-2 sm:p-4 mb-4", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: chartType === 'line' ? (_jsxs(ComposedChart, { data: chartData, children: [_jsx(XAxis, { dataKey: "time", axisLine: false, tickLine: false, style: { fontSize: 10, fill: '#8B949E' }, tick: { fontSize: 10 } }), _jsx(YAxis, { hide: true }), _jsx(Tooltip, { contentStyle: {
                                    backgroundColor: '#21262d',
                                    border: '1px solid #30363d',
                                    borderRadius: '6px',
                                    color: '#f0f6fc',
                                    fontSize: '12px'
                                } }), _jsx(Line, { type: "monotone", dataKey: "price", stroke: "#FFBF00", strokeWidth: 2, dot: false, activeDot: { r: 4, fill: '#FFBF00' } }), activeIndicators.includes('sma') && (_jsx(Line, { type: "monotone", dataKey: "sma", stroke: "#00D2FF", strokeWidth: 1, dot: false, strokeDasharray: "5 5" })), activeIndicators.includes('bollinger') && (_jsxs(_Fragment, { children: [_jsx(Line, { type: "monotone", dataKey: "upperBand", stroke: "#8B5CF6", strokeWidth: 1, dot: false, strokeDasharray: "2 2" }), _jsx(Line, { type: "monotone", dataKey: "lowerBand", stroke: "#8B5CF6", strokeWidth: 1, dot: false, strokeDasharray: "2 2" })] })), supportLevel && (_jsx(ReferenceLine, { y: supportLevel, stroke: "#22C55E", strokeDasharray: "3 3", label: { value: "Support", position: "right" } })), resistanceLevel && (_jsx(ReferenceLine, { y: resistanceLevel, stroke: "#EF4444", strokeDasharray: "3 3", label: { value: "Resistance", position: "right" } })), trendLines.map(function (line) { return (_jsx(ReferenceLine, { y: line.y, stroke: "#FFBF00", strokeDasharray: "5 5", label: { value: line.label, position: "right" } }, line.id)); })] })) : (_jsxs(BarChart, { data: chartData, children: [_jsx(XAxis, { dataKey: "time", axisLine: false, tickLine: false, style: { fontSize: 10, fill: '#8B949E' }, tick: { fontSize: 10 } }), _jsx(YAxis, { hide: true }), _jsx(Tooltip, { contentStyle: {
                                    backgroundColor: '#21262d',
                                    border: '1px solid #30363d',
                                    borderRadius: '6px',
                                    color: '#f0f6fc',
                                    fontSize: '12px'
                                }, formatter: function (value, name) {
                                    if (name === 'close') {
                                        var data = chartData.find(function (d) { return d.close === value; });
                                        return [
                                            "O: ".concat(data === null || data === void 0 ? void 0 : data.open, " H: ").concat(data === null || data === void 0 ? void 0 : data.high, " L: ").concat(data === null || data === void 0 ? void 0 : data.low, " C: ").concat(data === null || data === void 0 ? void 0 : data.close),
                                            'OHLC'
                                        ];
                                    }
                                    return [value, name];
                                } }), _jsx(Bar, { dataKey: "close", shape: CandlestickBar }), supportLevel && (_jsx(ReferenceLine, { y: supportLevel, stroke: "#22C55E", strokeDasharray: "3 3", label: { value: "Support", position: "right" } })), resistanceLevel && (_jsx(ReferenceLine, { y: resistanceLevel, stroke: "#EF4444", strokeDasharray: "3 3", label: { value: "Resistance", position: "right" } }))] })) }) }), activeIndicators.length > 0 && (_jsxs("div", { className: "space-y-3", children: [activeIndicators.includes('rsi') && (_jsxs("div", { className: "h-24 w-full bg-white/5 rounded-lg p-2", children: [_jsx("div", { className: "text-xs text-off-white/60 mb-1", children: "RSI (14)" }), _jsx(ResponsiveContainer, { width: "100%", height: "80%", children: _jsxs(LineChart, { data: chartData, children: [_jsx(XAxis, { dataKey: "time", hide: true }), _jsx(YAxis, { domain: [0, 100], hide: true }), _jsx(Tooltip, { contentStyle: {
                                                backgroundColor: '#21262d',
                                                border: '1px solid #30363d',
                                                borderRadius: '6px',
                                                color: '#f0f6fc',
                                                fontSize: '12px'
                                            } }), _jsx(Line, { type: "monotone", dataKey: "rsi", stroke: "#8B5CF6", strokeWidth: 2, dot: false }), _jsx(ReferenceLine, { y: 70, stroke: "#EF4444", strokeDasharray: "2 2" }), _jsx(ReferenceLine, { y: 30, stroke: "#22C55E", strokeDasharray: "2 2" })] }) })] })), activeIndicators.includes('macd') && (_jsxs("div", { className: "h-24 w-full bg-white/5 rounded-lg p-2", children: [_jsx("div", { className: "text-xs text-off-white/60 mb-1", children: "MACD (12,26,9)" }), _jsx(ResponsiveContainer, { width: "100%", height: "80%", children: _jsxs(ComposedChart, { data: chartData, children: [_jsx(XAxis, { dataKey: "time", hide: true }), _jsx(YAxis, { hide: true }), _jsx(Tooltip, { contentStyle: {
                                                backgroundColor: '#21262d',
                                                border: '1px solid #30363d',
                                                borderRadius: '6px',
                                                color: '#f0f6fc',
                                                fontSize: '12px'
                                            } }), _jsx(Bar, { dataKey: "histogram", fill: "#FFBF00", opacity: 0.7 }), _jsx(Line, { type: "monotone", dataKey: "macdLine", stroke: "#00D2FF", strokeWidth: 1, dot: false }), _jsx(Line, { type: "monotone", dataKey: "signalLine", stroke: "#EF4444", strokeWidth: 1, dot: false })] }) })] }))] })), _jsxs("div", { className: "flex justify-between items-center mt-4 text-xs text-off-white/60", children: [_jsxs("div", { className: "flex items-center gap-4 flex-wrap", children: [_jsx("span", { children: "Real-time data simulation" }), activeIndicators.length > 0 && (_jsxs("span", { className: "hidden sm:inline", children: ["Active: ", activeIndicators.join(', ').toUpperCase()] }))] }), _jsxs("span", { className: "hidden sm:block", children: ["Last updated: ", new Date().toLocaleTimeString()] })] })] }));
};
export default TradingChart;
