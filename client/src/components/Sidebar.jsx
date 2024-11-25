import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { RiHome8Line } from "react-icons/ri";
import { MdAssessment } from "react-icons/md";
import { LuPackageSearch } from "react-icons/lu";
import { TbReportAnalytics } from "react-icons/tb";
import { FaRegFileAlt, FaRegCalendarCheck } from "react-icons/fa";
import { FaUsersCog, FaUserCog } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { CgLogOut } from "react-icons/cg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNotification } from "../context/NotificationContext";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { profileComplete, logout } = useAuth();
  const { triggerNotification } = useNotification();
  const navigate = useNavigate();

  // Sidebar items configuration
  const sidebarItems = [
    { label: "Dashboard", icon: <RiHome8Line />, path: "/dashboard" },
    { label: "Assessment", icon: <MdAssessment />, path: "/assessment" },
    { label: "Packages", icon: <LuPackageSearch />, path: "/packages" },
    { label: "Download Summary", icon: <FaRegFileAlt />, path: "/summary" },
    { label: "Report", icon: <TbReportAnalytics />, path: "/report" },
    {
      label: "Book Sessions",
      icon: <FaRegCalendarCheck />,
      path: "/bookSessions",
    },
    {
      label: "Sessions Management",
      icon: <FaUsersCog />,
      path: "/sessionsManagement",
    },
    { label: "My Activity", icon: <FaBuildingUser />, path: "/myActivity" },
    { label: "Settings", icon: <FaUserCog />, path: "/settings" },
  ];

  // Logout handler
  const handleLogout = () => {
    triggerNotification("Logout successfully", "success");
    logout();
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-40 h-screen pt-20 bg-[#1C325B] border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
        aria-label="Sidebar"
      >
        {/* Sidebar content */}
        <div className={`h-full px-3 pb-4 overflow-y-auto scrollbar-custom`}>
          <ul className="flex flex-col py-4 space-y-3 font-medium">
            {sidebarItems.map(({ label, icon, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-3 rounded transition-colors ${
                      isActive
                        ? "bg-[#1C325B] text-white"
                        : "hover:bg-[#6A669D] hover:text-white text-gray-300"
                    }`
                  }
                  onClick={() => setSidebarOpen(true)} // Ensure sidebar remains open on click
                  aria-disabled={profileComplete}
                >
                  <span className="text-lg">{icon}</span>
                  {sidebarOpen && <span>{label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Logout button */}
          <div className="mt-auto">
            <button
              className="flex items-center space-x-3 p-3 rounded transition-colors hover:bg-gray-700 hover:text-white text-gray-300"
              onClick={handleLogout}
            >
              <CgLogOut className="text-lg" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>

          {/* Collapse/Expand Button */}
          <div>
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white p-2 rounded-full hover:bg-[#0c3e56] transition-colors duration-200 w-fit text-xl shadow-sm"
            >
              {sidebarOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
