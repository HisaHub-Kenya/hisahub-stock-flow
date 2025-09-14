import { useState, useEffect } from 'react';
import { getCurrentUser, isAuthenticated, logout as authLogout } from '@/lib/auth';
import { User } from '@/lib/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth state on mount
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    try {
      await authLogout();
      try { localStorage.removeItem('hisahub-store'); } catch (e) { console.warn('Failed clearing hisahub-store', e); }
      setUser(null);
      // Force navigation back to auth
      try { window.location.href = '/auth'; } catch (e) { console.warn('Logout redirect failed', e); }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refreshUser = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  };

  return {
    user,
    loading,
    isAuthenticated: isAuthenticated(),
    logout: handleLogout,
    refreshUser
  };
};
