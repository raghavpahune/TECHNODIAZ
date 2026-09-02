import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('tdz_token') || null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Load authenticated user on mount or token change
  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const data = await apiRequest('/auth/me');
        if (data.success && data.user) {
          setUser(data.user);
        } else {
          logout();
        }
      } catch (err) {
        console.warn('Session expired or invalid, logging out.');
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [token]);

  const login = async (email, password) => {
    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: { email, password },
      });

      if (data.success && data.token) {
        localStorage.setItem('tdz_token', data.token);
        setToken(data.token);
        setUser(data.user);
        toast.success(`Welcome back, ${data.user.name}!`);
        return { success: true, user: data.user };
      }
    } catch (err) {
      toast.error(err.message || 'Login failed. Please check your credentials.');
      return { success: false, message: err.message };
    }
  };

  const register = async (formData) => {
    try {
      const data = await apiRequest('/auth/register', {
        method: 'POST',
        body: formData,
      });

      if (data.success && data.token) {
        localStorage.setItem('tdz_token', data.token);
        setToken(data.token);
        setUser(data.user);
        toast.success('Registration successful! Welcome to TECHNODIAZ 2K26.');
        return { success: true, user: data.user };
      }
    } catch (err) {
      toast.error(err.message || 'Registration failed.');
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('tdz_token');
    setToken(null);
    setUser(null);
    toast.info('Logged out successfully.');
  };

  const refreshUser = async () => {
    if (!token) return;
    try {
      const data = await apiRequest('/auth/me');
      if (data.success) {
        setUser(data.user);
      }
    } catch (e) {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        refreshUser,
        isAdmin: user?.role === 'admin',
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
