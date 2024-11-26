import React, { useState, useEffect } from "react";
import LOGO from "../assets/ollatoLogo.png";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";

export default function Dashboard() {
  const { user, profileComplete, setProfileComplete, profileStatus, logout } =
    useAuth();
  const { triggerNotification } = useNotification();
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Trigger notification for `waiting_approval` status
  //   if (profileStatus === "waiting_approval") {
  //     triggerNotification(
  //       "Your profile is under review. Please wait for approval.",
  //       "info"
  //     );
  //   }
  // }, [profileStatus, triggerNotification]);

  // useEffect(() => {
  //   if (profileComplete) {
  //     return;
  //   }
  //   setProfileComplete(true); // Set profileComplete to true if not already
  // }, [profileComplete, setProfileComplete]);

  const completeProfile = () => {
    navigate("/registration-complete");
  };

  // Dynamically render the session cards
  const sessionData = [
    { status: "Completed Session", count: 0, color: "green", icon: LOGO },
    {
      status: "Ongoing Session",
      count: 0,
      color: "blue",
      icon: "https://via.placeholder.com/50",
    },
    {
      status: "Pending Session",
      count: 0,
      color: "yellow",
      icon: "https://via.placeholder.com/50",
    },
    {
      status: "Rescheduled Session",
      count: 0,
      color: "orange",
      icon: "https://via.placeholder.com/50",
    },
    {
      status: "Cancelled Session",
      count: 0,
      color: "red",
      icon: "https://via.placeholder.com/50",
    },
    {
      status: "Accept Session",
      count: 0,
      color: "green",
      icon: "https://via.placeholder.com/50",
    },
  ];

  if (profileStatus === "incomplete") {
    return (
      <div className="flex-1 h-full">
        <div className="p-6 rounded-lg w-full shadow-2xl h-auto mb-6 mt-20 sm:p-4 sm:mr-4 sm:mt-12 md:p-6 lg:h-2/3">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Welcome to your dashboard
          </h2>
          <hr className="border-gray-300 mb-4" />
          <div className="flex flex-col items-center">
            <p className="text-[#640D5F] text-md">
              Access Denied !!. Complete your registration to get started.
            </p>
            <button
              onClick={completeProfile}
              className="mt-4 bg-[#AE445A] hover:bg-[#3e5679] text-white font-semibold py-2 px-4 rounded"
            >
              Complete Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (profileStatus === "waiting_approval") {
    return (
      <div className="flex-1 h-full">
        <div className="p-6 rounded-lg w-full shadow-2xl h-auto mb-6 mt-20 sm:p-4 sm:mr-4 sm:mt-12 md:p-6 lg:h-2/3">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Welcome to your dashboard
          </h2>
          <hr className="border-gray-300 mb-4" />
          <div className="flex flex-col items-center">
            <p className="text-[#640D5F] text-md">
              Your profile is under review. Please wait for approval to access
              your dashboard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard Content
  return (
    <div className="flex-1 pt-16 px-8 p-6 h-full">
      <div className="p-6 rounded-lg w-full shadow-2xl h-auto mb-6 mt-20 sm:p-4 sm:mr-4 sm:mt-12 md:p-6 lg:h-2/3">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Welcome {user?.name}
        </h2>
        <hr className="border-gray-300 mb-4" />

        {/* Flex Container for Left and Right */}
        <div className="flex lg:flex-row items-center lg:items-start justify-between mb-6 flex-wrap gap-4 bg-white rounded shadow-lg p-4">
          <div className="w-full flex justify-center sm:justify-start sm:w-auto">
            <img
              className="object-cover w-20 h-20 mt-3 mr-3 rounded-full"
              src={
                user?.profileImage ||
                "https://lh3.googleusercontent.com/a/AEdFTp70cvwI5eevfcr4LonOEX5gB2rzx7JnudOcnYbS1qU=s96-c"
              }
              alt="Profile"
            />
          </div>
          {/* Counselor Information */}
          <div className="flex-1 p-4 border border-gray-200 rounded shadow-sm w-full sm:w-auto flex flex-col sm:items-start">
            <h3 className="font-semibold text-gray-700 mb-2 text-2xl">
              Counselor Information
            </h3>
            <div className="mb-4 md:text-lg text-gray-400 sm:items-start">
              <p>Name: {user?.first_name}</p>
              <p>Age: 26 Years</p>
              <p>Mobile No.: {user?.phone_number}</p>
            </div>
          </div>

          <div className="flex-1 p-4 border border-gray-200 rounded shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2 text-2xl">
              Education Information
            </h3>
            <div className="mb-4 md:text-lg text-gray-400">
              <p>Qualification: Computer Engineering</p>
              <p>Experience: 2 years 5 months</p>
              <p>Subject Expertise: CSS</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg w-full shadow-2xl h-auto mb-6 mt-20 sm:p-4 bg-white sm:mr-4 sm:mt-12 md:p-6 lg:h-2/3">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Overall Session Details
        </h2>
        <hr className="border-gray-300 mb-4" />

        {/* Sessions Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:flex-row items-center lg:items-start justify-between mb-6 flex-wrap gap-4 bg-white rounded shadow-lg p-4">
          {sessionData.map((session, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-4 border-2 cursor-pointer max-w-sm bg-white rounded-lg shadow hover:bg-gray-100 ${
                session.color === "green" ? "border-green-500" : ""
              } ${session.color === "blue" ? "border-blue-500" : ""} ${
                session.color === "yellow" ? "border-yellow-500" : ""
              } ${session.color === "orange" ? "border-orange-500" : ""} ${
                session.color === "red" ? "border-red-500" : ""
              }`}
            >
              <div>
                <h3 className={`text-${session.color}-700 font-semibold`}>
                  {session.status}
                </h3>
                <p className="text-2xl">{session.count}</p>
              </div>
              <img
                src={session.icon}
                alt={`${session.status} icon`}
                className="h-12 w-12"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
