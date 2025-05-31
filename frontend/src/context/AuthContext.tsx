'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PurchasedCourse {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  instructor: string;
  videos?: { title: string; link: string }[];
}

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
  token: string | null;
  purchasedCourses: PurchasedCourse[];
  hasPurchased: (courseId: string) => boolean;
  purchaseCourse: (courseId: string) => Promise<boolean>;
  fetchPurchasedCourses: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [purchasedCourses, setPurchasedCourses] = useState<PurchasedCourse[]>([]);

  useEffect(() => {
    // Check for stored auth data on mount
    const storedToken = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('username');

    if (storedToken && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setToken(storedToken);
      
      // Fetch purchased courses if user is logged in
      fetchPurchasedCourses();
    }
  }, []);

  const fetchPurchasedCourses = async () => {
    if (!isLoggedIn || !token) return;
    
    try {
      const response = await fetch('http://localhost:3000/users/courses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setPurchasedCourses(data.purchasedCourses || []);
      }
    } catch (error) {
      console.error('Failed to fetch purchased courses:', error);
    }
  };

  const hasPurchased = (courseId: string): boolean => {
    return purchasedCourses.some(course => course._id === courseId);
  };

  const purchaseCourse = async (courseId: string): Promise<boolean> => {
    if (!isLoggedIn || !token) return false;
    
    try {
      const response = await fetch(`http://localhost:3000/users/courses/${courseId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        // Refresh the purchased courses list
        await fetchPurchasedCourses();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to purchase course:', error);
      return false;
    }
  };

  const login = (username: string, token: string) => {
    setIsLoggedIn(true);
    setUsername(username);
    setToken(token);
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
    
    // Fetch purchased courses after login
    fetchPurchasedCourses();
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    setToken(null);
    setPurchasedCourses([]);
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
  };

  const value = {
    isLoggedIn,
    username,
    login,
    logout,
    token,
    purchasedCourses,
    hasPurchased,
    purchaseCourse,
    fetchPurchasedCourses
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 