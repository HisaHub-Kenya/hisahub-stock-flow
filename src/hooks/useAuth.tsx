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
      setUser(null);
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
