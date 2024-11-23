// UserContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

// Create the User Context
const UserContext = createContext({
  user: null,
  profileComplete: false,
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [profileComplete, setProfileComplete] = useState(false);

  // Rehydrate the user state from localStorage on mount
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(user));
    // setProfileComplete(userData?.profileComplete || false);
  };

  const logout = () => {
    setUser(null);
    setProfileComplete(false);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{ user, profileComplete, setProfileComplete, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
