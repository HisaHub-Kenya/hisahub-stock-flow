import * as React from "react";
var MOBILE_BREAKPOINT = 768;
export function useIsMobile() {
    var _a = React.useState(typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false), isMobile = _a[0], setIsMobile = _a[1];
    React.useEffect(function () {
        var mql = window.matchMedia("(max-width: ".concat(MOBILE_BREAKPOINT - 1, "px)"));
        var onChange = function (e) {
            setIsMobile(e.matches);
        };
        // Modern API
        if (mql.addEventListener) {
            mql.addEventListener("change", onChange);
        }
        else {
            // Fallback for Safari <14
            mql.addListener(onChange);
        }
        // Ensure initial check
        setIsMobile(mql.matches);
        return function () {
            if (mql.removeEventListener) {
                mql.removeEventListener("change", onChange);
            }
            else {
                mql.removeListener(onChange);
            }
        };
    }, []);
    return isMobile;
}
