import React, { useState } from "react";

// Sample Data
const sessionData = [
  { id: 1, title: "Math Tutoring", status: "Booked" },
  { id: 2, title: "Physics Class", status: "Ongoing" },
  { id: 3, title: "Chemistry Lab", status: "Requested" },
  { id: 4, title: "Biology Seminar", status: "Completed" },
  { id: 5, title: "History Lecture", status: "Cancelled" },
  { id: 6, title: "English Workshop", status: "Rescheduled" },
];

const statuses = [
  "Booked",
  "Ongoing",
  "Requested",
  "Completed",
  "Cancelled",
  "Rescheduled",
];

function SessionManagement() {
  const [activeStatus, setActiveStatus] = useState("Booked");

  // Filter sessions based on the active status
  const filteredSessions = sessionData.filter(
    (session) => session.status === activeStatus
  );

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg border border-gray-300">
      <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
        Session Management
      </h1>
      <div className="flex justify-around mb-6">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              activeStatus === status
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="text-center">
        {filteredSessions.length > 0 ? (
          <ul className="space-y-4">
            {filteredSessions.map((session) => (
              <li
                key={session.id}
                className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
              >
                {session.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            No sessions available for this status.
          </p>
        )}
      </div>
    </div>
  );
}

export default SessionManagement;
