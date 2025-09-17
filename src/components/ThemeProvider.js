import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
var ThemeContext = createContext(undefined);
export var ThemeProvider = function (_a) {
    var children = _a.children, _b = _a.defaultTheme, defaultTheme = _b === void 0 ? 'dark' : _b, _c = _a.storageKey, storageKey = _c === void 0 ? 'theme' : _c;
    var _d = useState(defaultTheme), theme = _d[0], setTheme = _d[1];
    useEffect(function () {
        var savedTheme = localStorage.getItem(storageKey);
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, [storageKey]);
    useEffect(function () {
        localStorage.setItem(storageKey, theme);
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'light') {
            document.documentElement.classList.remove('dark');
            document.body.style.background = '#F8F9FA';
        }
        else {
            document.documentElement.classList.add('dark');
            document.body.style.background = '#131b26';
        }
    }, [theme, storageKey]);
    var toggleTheme = function () {
        setTheme(function (prev) { return prev === 'dark' ? 'light' : 'dark'; });
    };
    return (_jsx(ThemeContext.Provider, { value: { theme: theme, toggleTheme: toggleTheme }, children: children }));
};
export var useTheme = function () {
    var context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
