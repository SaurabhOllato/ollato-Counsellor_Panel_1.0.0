import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { HiOutlineLogout } from "react-icons/hi";
import Notification from "./Notification/Notification";

function Sidebar() {
  const { profileComplete, logout } = useUser();
  const [notification, setNotification] = useState({ message: "", type: "" });
  const triggerNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };
  return (
    <>
      return (
      <aside
        id="logo-sidebar"
        className="custom1 fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-blue-900 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto  dark:bg-gray-800">
          {/* overlay div if profile not complete */}
          {!profileComplete && (
            <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
              <span className="text-white font-semibold">
                Complete your profile to access the dashboard.
              </span>
            </div>
          )}
          <ul className="flex flex-col py-4 space-y-3 font-medium text-white">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                {/* <FaHome className="text-lg text-white" /> */}
                <span className="text-white">Dashboard</span>
              </NavLink>
            </li>
          </ul>
          {/*  */}
          <ul className="flex flex-col py-4 space-y-3 font-medium text-white">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-700 hover:text-white"
                  } ${!profileComplete ? "pointer-events-none" : ""}`
                }
              >
                <span className="text-white">Dashboard</span>
              </NavLink>
            </li>
          </ul>
          <ul className="flex flex-col py-4 space-y-3 font-medium text-white">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-700 hover:text-white"
                  } ${!profileComplete ? "pointer-events-none" : ""}`
                }
              >
                {/* <FaHome className="text-lg text-white" /> */}
                <span className="text-white">Dashboard</span>
              </NavLink>
            </li>
          </ul>

          <div className="mt-auto">
            <button
              className="flex items-center space-x-3 p-3 rounded transition-colors hover:bg-gray-700 hover:text-white"
              onClick={() => {
                triggerNotification("Logout successful", "success");
                logout();
              }}
            >
              <HiOutlineLogout />
              logout
            </button>
          </div>
        </div>
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      </aside>
      )
    </>
  );
}

export default Sidebar;
