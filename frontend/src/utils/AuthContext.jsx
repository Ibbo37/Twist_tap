import React, { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Define the AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State for user data
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedLoginStatus = localStorage.getItem("isLoggedIn");

    try {
      // Parse and set user data if valid
      if (storedUser && storedLoginStatus === "true") {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      // Clear invalid data
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
    }
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Export both the provider and the hook
export { AuthProvider, useAuth };
