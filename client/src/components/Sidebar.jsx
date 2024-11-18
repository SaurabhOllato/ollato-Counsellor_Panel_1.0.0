import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <>
      return (
      <aside
        id="logo-sidebar"
        className="custom1 fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-blue-900 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto  dark:bg-gray-800">
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
          {/* <div className="p-4 border-t border-gray-700">
          <Logout />
        </div> */}
        </div>
      </aside>
      )
    </>
  );
}

export default Sidebar;
