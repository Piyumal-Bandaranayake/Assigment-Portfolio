import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

/**
 * AuthProvider
 * Centralises authentication state: user, token, login, logout.
 * On mount it re-hydrates from localStorage and validates the stored JWT
 * via GET /api/auth/profile.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('portfolio_token'));
  const [loading, setLoading] = useState(true); // true while verifying JWT

  /* ── Hydrate user on mount (or when token changes) ── */
  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem('portfolio_token');

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get('/auth/profile');
        setUser(data);
        setToken(storedToken);
      } catch {
        // Token invalid / expired — clean up
        localStorage.removeItem('portfolio_token');
        localStorage.removeItem('portfolio_user');
        localStorage.removeItem('portfolio_username');
        localStorage.removeItem('portfolio_fullName');
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Login ── */
  const login = useCallback(async (username, password) => {
    const { data } = await api.post('/auth/login', { username, password });

    // Persist
    localStorage.setItem('portfolio_token', data.token);
    localStorage.setItem('portfolio_user', JSON.stringify(data.user));
    // Backward-compat keys used by Dashboard
    localStorage.setItem('portfolio_username', data.user.username);
    localStorage.setItem('portfolio_fullName', data.user.name);

    setToken(data.token);
    setUser(data.user);

    return data;
  }, []);

  /* ── Logout ── */
  const logout = useCallback(() => {
    localStorage.removeItem('portfolio_token');
    localStorage.removeItem('portfolio_user');
    localStorage.removeItem('portfolio_username');
    localStorage.removeItem('portfolio_fullName');
    setToken(null);
    setUser(null);
  }, []);

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to consume the auth context.
 * Throws if used outside the provider.
 */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
