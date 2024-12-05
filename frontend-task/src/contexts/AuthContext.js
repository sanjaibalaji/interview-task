import React, { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null });

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem('auth'));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, []);

  const login = (user, token) => {
    const newAuth = { user, token };
    setAuth(newAuth);
    localStorage.setItem('auth', JSON.stringify(newAuth)); 
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem('auth'); 
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
