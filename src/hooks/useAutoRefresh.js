import { useEffect } from 'react';
import { useAppStore } from '../stores/useAppStore';
export var useAutoRefresh = function (intervalMs) {
    if (intervalMs === void 0) { intervalMs = 10000; }
    var refreshAllData = useAppStore(function (state) { return state.refreshAllData; });
    useEffect(function () {
        var interval = setInterval(function () {
            refreshAllData();
        }, intervalMs);
        return function () { return clearInterval(interval); };
    }, [refreshAllData, intervalMs]);
};
