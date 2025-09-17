import { jsx as _jsx } from "react/jsx-runtime";
var Logo = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 44 : _b;
    return (_jsx("div", { className: "flex items-center select-none cursor-pointer", style: { minWidth: size, minHeight: size }, title: "HisaHub", children: _jsx("div", { className: "rounded-full bg-secondary flex items-center justify-center", style: { width: size, height: size }, children: _jsx("span", { className: "font-bold text-primary text-3xl animate-logo-float transition-transform duration-400", style: {
                    fontFamily: "'Poppins', sans-serif",
                    color: "#000080",
                }, children: "H" }) }) }));
};
export default Logo;
