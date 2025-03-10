/**
 * Authentication Context Provider
 * 
 * This module provides a React Context for managing authentication state across the application.
 * It handles user login, logout, and authentication status checking.
 * 
 * The context is designed to be wrapped around the application root to provide
 * authentication capabilities to all components.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../services/api';

// Define the shape of the user object
interface User {
  id: number;
  username: string;
  email: string;
}

// Define the shape of the authentication context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async () => {},
  logout: () => {},
});

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication Provider Component
 * 
 * Wraps the application and provides authentication state and methods
 * to all child components.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already authenticated on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        
        // Check if we have a token
        const isAuthenticated = authApi.isAuthenticated();
        
        if (isAuthenticated) {
          // In a real app, we would validate the token and get user info
          // For now, we'll just set a placeholder user
          // This would be replaced with an actual API call to get user profile
          setUser({
            id: 1,
            username: 'user',
            email: 'user@example.com',
          });
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        // If token validation fails, clear it
        authApi.logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  /**
   * Handles user login
   * @param username - User's username
   * @param password - User's password
   */
  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Call login API
      const response = await authApi.login(username, password);
      
      // Set user data
      setUser({
        id: response.user.id,
        username: response.user.username,
        email: response.user.email,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles user logout
   */
  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  // Provide the authentication context to children
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
