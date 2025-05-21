import React, { createContext, useState, useEffect } from 'react';
import authApi from '../api/authApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Check if user is already logged in (token exists)
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        validateToken();
      } catch (err) {
        console.error('Error parsing stored user:', err);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    } else {
      setLoading(false);
    }
  }, []);
  
  // Validate token with backend
  const validateToken = async () => {
    try {
      const response = await authApi.getProfile();
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      setLoading(false);
    } catch (err) {
      console.error('Token validation failed:', err);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
    }
  };
  
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authApi.login(credentials);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      setError(null);
      return response.user;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authApi.register(userData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      setError(null);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };
  
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      const response = await authApi.updateProfile(userData);
      const updatedUser = response.user;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Profile update failed.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      const response = await authApi.forgotPassword(email);
      setError(null);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Password reset request failed.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const resetPassword = async (token, password) => {
    try {
      setLoading(true);
      const response = await authApi.resetPassword(token, password);
      setError(null);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Password reset failed.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const clearError = () => {
    setError(null);
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        forgotPassword,
        resetPassword,
        clearError,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isClubAdmin: user?.role === 'club_admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
