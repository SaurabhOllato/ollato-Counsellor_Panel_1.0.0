import React from "react";

import LOGO from "../assets/ollatoLogo.png";

export default function Dashboard() {
  return (
    <main className="flex-1 pt-16 px-8 p-6 lg:ml-64 h-full">
      <div className="p-6 rounded-lg w-full shadow-2xl h-auto mb-6 mt-20  sm:p-4  sm:mr-4 sm:mt-12 md:p-6 lg:h-2/3">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4  ">
          Welcome Ashish
        </h2>
        <hr className="border-gray-300 mb-4" />

        {/* Flex Container for Left and Right */}
        <div className="flex lg:flex-row items-center lg:items-start justify-between mb-6  flex-wrap gap-4  bg-white rounded shadow-lg p-4">
          <div className="w-full flex justify-center sm:justify-start sm:w-auto">
            <img
              className="object-cover w-20 h-20 mt-3 mr-3 rounded-full"
              src="https://lh3.googleusercontent.com/a/AEdFTp70cvwI5eevfcr4LonOEX5gB2rzx7JnudOcnYbS1qU=s96-c"
            />
          </div>
          {/* Counselor Information */}
          <div className="flex-1 p-4 border border-gray-200 rounded shadow-sm w-full sm:w-auto flex flex-col  sm:items-start">
            <h3 className="font-semibold text-gray-700 mb-2 font-display  text-2xl  dark:text-gray-200">
              Counsellor Information
            </h3>
            <div className="mb-4 md:text-lg text-gray-400 sm:items-start">
              <p>Name: Ashish </p>
              <p>Age: 26 Years</p>
              <p>Mobile No.: 976921308</p>
            </div>
          </div>

          <div className="flex-1 p-4 border border-gray-200 rounded shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2  font-display  text-2xl  dark:text-gray-200">
              Education Information
            </h3>
            <div className="mb-4 md:text-lg text-gray-400">
              <p>Qualification: Computer Engineering</p>
              <p>Experience: 2 year 5 months</p>
              <p>Subject Expertise: CSS</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg w-full shadow-2xl h-auto mb-6 mt-20  sm:p-4 bg-white sm:mr-4 sm:mt-12 md:p-6 lg:h-2/3">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 ">
          Overall Session Details
        </h2>
        <hr className="border-gray-300 mb-4" />

        {/* Sessions Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  lg:flex-row items-center lg:items-start justify-between mb-6  flex-wrap gap-4  bg-white rounded shadow-lg p-4">
          {/* Completed Session */}
          <div className="flex justify-between items-center p-4 border-2  cursor-pointer max-w-sm  bg-white   rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div>
              <h3 className="text-green-700 font-semibold ">
                Completed Session
              </h3>
              <p className="text-2xl">0</p>
            </div>
            <img
              src={LOGO} // Replace with actual logo source
              alt="Logo"
              className="h-12 w-12"
            />
          </div>

          {/* Ongoing Session */}
          <div className="flex justify-between items-center p-4 border-2  cursor-pointer max-w-sm  bg-white   rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div>
              <h3 className="text-blue-700 font-semibold">Ongoing Session</h3>
              <p className="text-2xl">0</p>
            </div>
            <img
              src="https://via.placeholder.com/50" // Replace with actual logo source
              alt="Logo"
              className="h-12 w-12"
            />
          </div>

          {/* Pending Session */}
          <div className="flex justify-between items-center p-4 border-2  cursor-pointer max-w-sm  bg-white   rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div>
              <h3 className="text-yellow-700 font-semibold">Pending Session</h3>
              <p className="text-2xl">0</p>
            </div>
            <img
              src="https://via.placeholder.com/50" // Replace with actual logo source
              alt="Logo"
              className="h-12 w-12"
            />
          </div>

          {/* Rescheduled Session */}
          <div className="flex justify-between items-center p-4 border-2  cursor-pointer max-w-sm  bg-white   rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div>
              <h3 className="text-orange-700 font-semibold">
                Rescheduled Session
              </h3>
              <p className="text-2xl">0</p>
            </div>
            <img
              src="https://via.placeholder.com/50" // Replace with actual logo source
              alt="Logo"
              className="h-12 w-12"
            />
          </div>

          {/* Cancelled Session */}
          <div className="flex justify-between items-center p-4 border-2  cursor-pointer max-w-sm  bg-white   rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div>
              <h3 className="text-red-700 font-semibold">Cancelled Session</h3>
              <p className="text-2xl">0</p>
            </div>
            <img
              src="https://via.placeholder.com/50" // Replace with actual logo source
              alt="Logo"
              className="h-12 w-12"
            />
          </div>

          {/* Accept Session */}
          <div className="flex justify-between items-center p-4 border-2  cursor-pointer max-w-sm  bg-white   rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div>
              <h3 className="text-green-600 font-semibold">Accept Session</h3>
              <p className="text-2xl">0</p>
            </div>
            <img
              src="https://via.placeholder.com/50" // Replace with actual logo source
              alt="Logo"
              className="h-12 w-12"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
