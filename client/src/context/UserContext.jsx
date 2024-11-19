import React, { createContext, useState, useContext } from "react";

// Create the User Context
const UserContext = createContext();

// Create the UserProvider component

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores current user data
  const [profileComplete, setProfileComplete] = useState(false); // Tracks profile completion status

  const login = (userData) => {
    setUser(userData);
    setProfileComplete(userData.profileComplete || false);
    localStorage.setItem("user", JSON.stringify(userData)); // Save userData directly
  };

  const logout = () => {
    setUser(null);
    setProfileComplete(false);
    localStorage.removeItem("user"); // Remove user data from local storage
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        profileComplete,
        setProfileComplete,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// custom hook to access the UserContext
export const useUser = () => useContext(UserContext);
