import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  // Login function
  const login = (token) => {
    localStorage.setItem("token", token); // Save token to localStorage
    setAuth(token); // Update the state
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setAuth(null); // Clear the state
  };

  // Restore auth state on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setAuth(storedToken); // Restore token from localStorage
    }
    setLoading(false); // Mark the loading process as complete
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
