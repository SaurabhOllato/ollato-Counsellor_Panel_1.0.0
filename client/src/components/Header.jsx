import React from "react";
import LOGO from "../assets/ollatoLogo.png";
import { FaUserCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";
function Header() {
  const { user, logout, profileComplete } = useAuth();
  return (
    <>
      return (
      <nav className="fixed left-0 top-0 z-50 w-full bg-blue-800 border-gray-200 dark:bg-gray-800 text-white dark:border-gray-700 px-10">
        <div className="px-3 py-3 lg:px-5 shadow-lg lg:pl-3">
          <div className="flex items-center justify-between">
            {/* Left Section: Logo and Toggle */}
            <div className="flex items-center justify-start rtl:justify-end">
              {/* Sidebar Toggle Button (Visible on small screens) */}
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center w-10 p-2 text-sm text-white-500 rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white-400"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              {/* Logo */}
              <Link to={"/dashboard"} className="flex ms-2 md:me-24">
                <img
                  src={LOGO}
                  alt="Logo"
                  className="lg:w-32 h-14 object-contain"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white hidden sm:block">
                  Ollato's Mind Mapping
                </span>
              </Link>
            </div>
            {/* user profile */}
            <div className="flex items-center gap-4">
              <FaUserCog className="text-2xl text-[#F5F5F5] hidden sm:block" />
              {user?.first_name}
            </div>
          </div>
        </div>
      </nav>
      )
    </>
  );
}

export default Header;
