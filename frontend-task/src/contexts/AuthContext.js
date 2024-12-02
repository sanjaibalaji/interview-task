import React, { createContext, useState, useEffect } from 'react';

// Initialize the context
export const AuthContext = createContext();

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null });

  // Use effect to check for existing login on page load
  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem('auth'));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, []);

  const login = (user, token) => {
    const newAuth = { user, token };
    setAuth(newAuth);
    localStorage.setItem('auth', JSON.stringify(newAuth)); // Save in localStorage
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem('auth'); // Clear from localStorage
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
