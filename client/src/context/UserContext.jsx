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
  const [user, setUser] = useState(null);
  const [profileComplete, setProfileComplete] = useState(false);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     const parsedUser = JSON.parse(storedUser);
  //     setUser(parsedUser);
  //     setProfileComplete(parsedUser?.profileComplete || false);
  //   }
  // }, []);

  const login = (userData) => {
    setUser(userData);
    setProfileComplete(userData?.profileComplete || false);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setProfileComplete(false);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, profileComplete, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
