import React, { createContext, useContext, useState, useEffect } from "react";

// Create the RefreshTokenContext
const AccessTokenContext = createContext();

// RefreshTokenProvider component
export const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null); 

  
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken) {
      setAccessToken(storedToken); 
    }
  }, []);

  
  const setToken = (token) => {
    setAccessToken(token); 

    
    localStorage.setItem("accessToken", token);
  };

  // Clear refresh token
  const clearToken = () => {
    setAccessToken(null); // Clear refresh token

    // Remove refresh token from localStorage
    localStorage.removeItem("accessToken");
  };

  return (
    <AccessTokenContext.Provider value={{ accessToken, setToken, clearToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

// Custom hook to use RefreshTokenContext
export const useAccessToken = () => useContext(AccessTokenContext);
