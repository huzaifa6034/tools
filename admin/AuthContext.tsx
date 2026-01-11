
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('admin_token') === 'active');
  const [user, setUser] = useState<string | null>(localStorage.getItem('admin_user'));

  const login = async (username: string, pass: string): Promise<boolean> => {
    // In a production environment, this would be a fetch to a Cloudflare Worker
    // that validates credentials against a D1 database.
    if (username.toLowerCase() === 'huzaifa' && pass === 'Admin@Toolly2024') {
      setIsAuthenticated(true);
      setUser(username);
      localStorage.setItem('admin_token', 'active');
      localStorage.setItem('admin_user', username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
