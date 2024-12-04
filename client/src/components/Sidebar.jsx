import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { useNotification } from "../context/NotificationContext";
import { RiHome8Line } from "react-icons/ri";
import { MdAssessment } from "react-icons/md";
import { LuPackageSearch } from "react-icons/lu";
import { TbReportMoney } from "react-icons/tb";
import { FaBuildingUser } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BiSupport } from "react-icons/bi";

import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, profileComplete, logout } = useAuth();
  const { triggerNotification } = useNotification();
  const navigate = useNavigate();

  const sidebarItems = [
    { label: "Dashboard", icon: <RiHome8Line />, path: "/dashboard" },
    {
      label: "Availability Management",
      icon: <MdAssessment />,
      path: "/availability-management",
    },
    {
      label: "Session Management",
      icon: <LuPackageSearch />,
      path: "/session-management",
    },
    { label: "My Activity", icon: <FaBuildingUser />, path: "/my-activity" },
    {
      label: "Revenue Details",
      icon: <TbReportMoney />,
      path: "/revenue-details",
    },
    {
      label: "Account Settings",
      icon: <FaUserCog />,
      path: "/account-settings",
    },
    {
      label: "Help & Support",
      icon: <BiSupport />,
      path: "/support",
    },
  ];

  const handleLogout = () => {
    triggerNotification("Logout successfully", "success");
    logout();
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <Card
      className={`h-[calc(100vh-2rem)] ${
        sidebarOpen ? "w-64" : "w-20"
      } fixed top-0 left-0 z-40 pt-20 shadow-md transition-all duration-300 bg-[#363434] h-full text-lg`}
    >
      {/* <hr className="my-2 border-gray-200" /> */}
      <List>
        {sidebarItems.map(({ label, icon, path }) => (
          <NavLink
            key={path}
            to={profileComplete ? path : "#"}
            onClick={(e) => {
              if (!profileComplete) e.preventDefault();
            }}
            className={({ isActive }) =>
              `block rounded-md ${
                isActive
                  ? "bg-[#F0D9DA] text-gray-900"
                  : "hover:bg-[#F0D9DA] hover:text-gray-900  text-[#F0D9DA]"
              } text-lg font-medium`
            }
          >
            <ListItem className="flex items-center gap-4 px-4 py-3">
              <ListItemPrefix className="text-lg">{icon}</ListItemPrefix>
              {sidebarOpen && (
                <Typography className="text-sm">{label}</Typography>
              )}
            </ListItem>
          </NavLink>
        ))}
      </List>
      <hr className="my-2 border-[#E1F1DD]" />
      <div>
        <button
          className="block w-full px-4 py-3 rounded-md hover:text-[#E1F1DD] hover:translate-x-1 text-[#E1F1DD]"
          onClick={handleLogout}
        >
          <div className="flex items-center gap-4">
            <CgLogOut className="text-lg" />
            {sidebarOpen && <Typography className="text-md">Logout</Typography>}
          </div>
        </button>
      </div>
      <button
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-[#E1F1DD] p-2 rounded-full hover:bg-[#B9B4C7] hover:text-[#424153] text-2xl"
      >
        {sidebarOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </button>
    </Card>
  );
};

export default Sidebar;
