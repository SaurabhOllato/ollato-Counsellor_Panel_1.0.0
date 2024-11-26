import React, { createContext, useState, useContext, useEffect } from "react";

// Create the User Context
const UserContext = createContext({
  user: null,
  profileComplete: false,
  profileStatus: "incomplete",
  completedSteps: [],
  isDashboardAccessible: false,
  login: () => {},
  logout: () => {},
  updateProfileStatus: () => {},
  updateCompletedSteps: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [profileStatus, setProfileStatus] = useState(() => {
    return localStorage.getItem("profileStatus") || "incomplete";
  }); // three options: "incomplete",waiting_approval ,"approved"

  const [completedSteps, setCompletedSteps] = useState(() => {
    const storedSteps = localStorage.getItem("completedSteps");
    return storedSteps ? JSON.parse(storedSteps) : [];
  });

  const [profileComplete, setProfileComplete] = useState(() => {
    return profileStatus === "approved";
  });

  const isDashboardAccessible =
    profileStatus === "approved" &&
    completedSteps.includes("emailVerified") &&
    completedSteps.includes("phoneVerified");

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    setProfileComplete(profileStatus === "approved");
    localStorage.setItem("profileStatus", profileStatus);
  }, [profileStatus]);

  useEffect(() => {
    localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
  }, [completedSteps]);

  const login = (userData) => {
    setUser(userData);
    setProfileStatus(userData.profileStatus || "incomplete");
    setCompletedSteps(userData.completedSteps || []);
  };

  const logout = () => {
    setUser(null);
    setProfileComplete(false);
    setProfileStatus("incomplete");
    setCompletedSteps([]);
    localStorage.removeItem("user");
    localStorage.removeItem("completedSteps");
    localStorage.removeItem("profileStatus");
  };

  const updateProfileStatus = (newStatus) => {
    setProfileStatus(newStatus);
    localStorage.setItem("profileStatus", newStatus);
  };

  const updateCompletedSteps = (step) => {
    if (!completedSteps.includes(step)) {
      const updatedSteps = [...completedSteps, step];
      setCompletedSteps(updatedSteps);
      localStorage.setItem("completedSteps", JSON.stringify(updatedSteps));
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        profileComplete,
        profileStatus,
        completedSteps,
        isDashboardAccessible,
        login,
        logout,
        updateProfileStatus,
        updateCompletedSteps,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
