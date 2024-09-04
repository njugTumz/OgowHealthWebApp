// src/contexts/AuthContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { authenticate } from '../services/api';

interface AuthContextType {
  user: { token: string } | null;
  permissions: string[] | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ token: string } | null>(null);
  const [permissions, setPermissions] = useState<string[] | null>(null);

  useEffect(() => {
    // Load user data and permissions from localStorage on initial render
    const token = localStorage.getItem('authToken');
    const storedPermissions = localStorage.getItem('permissions');
  
    if (token && storedPermissions) {
      try {
        setUser({ token });
        setPermissions(JSON.parse(storedPermissions));
      } catch (error) {
        console.error('Failed to parse permissions from localStorage:', error);
        // Handle the case where permissions are invalid or corrupted
        setPermissions(null);
      }
    }
  }, []);
  const login = async (credentials: { email: string; password: string }) => {
    try {
      const data = await authenticate(credentials);
      setUser({ token: data.token });
      setPermissions(data.permissions);

      // Store token and permissions in localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('permissions', JSON.stringify(data.permissions));
    } catch (error) {
      console.error('Login failed', error);
      throw error; // Rethrow the error so the calling component can handle it
    }
  };

  const logout = () => {
    setUser(null);
    setPermissions(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('permissions');
  };

  return (
    <AuthContext.Provider value={{ user, permissions, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
