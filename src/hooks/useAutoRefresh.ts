import { useEffect } from 'react';
import { useAppStore } from '../stores/useAppStore';

export const useAutoRefresh = (intervalMs = 10000) => {
  const refreshAllData = useAppStore((state) => state.refreshAllData);
  
  useEffect(() => {
    const interval = setInterval(() => {
      refreshAllData();
    }, intervalMs);
    
    return () => clearInterval(interval);
  }, [refreshAllData, intervalMs]);
};
