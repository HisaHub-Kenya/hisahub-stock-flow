import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Logo from "./Logo";
var SplashScreen = function (_a) {
    var onComplete = _a.onComplete;
    var _b = useState(true), isVisible = _b[0], setIsVisible = _b[1];
    useEffect(function () {
        var timer = setTimeout(function () {
            setIsVisible(false);
            setTimeout(onComplete, 300); // Wait for fade out animation
        }, 2500);
        return function () { return clearTimeout(timer); };
    }, [onComplete]);
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-primary transition-opacity duration-300 ".concat(isVisible ? 'opacity-100' : 'opacity-0'), children: _jsxs("div", { className: "flex flex-col items-center space-y-6", children: [_jsx("div", { className: "animate-pulse", children: _jsx(Logo, { size: 80 }) }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx("h1", { className: "text-4xl font-bold text-secondary", style: { fontFamily: "'Poppins', sans-serif" }, children: "HisaHub" }), _jsx("p", { className: "text-off-white/80 text-lg", children: "Your Gateway to Smart Trading" })] }), _jsxs("div", { className: "flex space-x-2 mt-8", children: [_jsx("div", { className: "w-2 h-2 bg-secondary rounded-full animate-bounce" }), _jsx("div", { className: "w-2 h-2 bg-secondary rounded-full animate-bounce", style: { animationDelay: '0.1s' } }), _jsx("div", { className: "w-2 h-2 bg-secondary rounded-full animate-bounce", style: { animationDelay: '0.2s' } })] })] }) }));
};
export default SplashScreen;
