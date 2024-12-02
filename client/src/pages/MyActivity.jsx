// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNotification } from "../context/NotificationContext";

// const myActivityData = [
//   {
//     id: "session1",
//     studentId: "STU001",
//     clientName: "John Doe",
//     type: "Counseling",
//     details: "Session with John Doe about career guidance.",
//     timestamp: new Date().toISOString(),
//     status: "Upcoming", // Options: Upcoming, Completed, Cancelled
//     feedbackGiven: false,
//   },
//   {
//     id: "session2",
//     studentId: "STU002",
//     clientName: "Jane Smith",
//     type: "Therapy",
//     details: "Therapy session with Jane Smith.",
//     timestamp: new Date(Date.now() - 3600 * 1000).toISOString(), // 1 hour ago
//     status: "Completed",
//     feedbackGiven: true,
//   },
//   {
//     id: "session3",
//     studentId: "STU003",
//     clientName: "Mark Johnson",
//     type: "Tutoring",
//     details: "Tutoring session with Mark Johnson on Mathematics.",
//     timestamp: new Date(Date.now() + 600 * 1000).toISOString(), // 10 minutes from now
//     status: "Upcoming",
//     feedbackGiven: false,
//   },
//   {
//     id: "session4",
//     studentId: "STU004",
//     clientName: "Emily Davis",
//     type: "Counseling",
//     details: "Session with Emily Davis about personal growth.",
//     timestamp: new Date(Date.now() - 86400 * 1000).toISOString(), // 1 day ago
//     status: "Completed",
//     feedbackGiven: false,
//   },
//   {
//     id: "session5",
//     studentId: "STU005",
//     clientName: "Chris Brown",
//     type: "Mentorship",
//     details: "Mentorship session with Chris Brown.",
//     timestamp: new Date(Date.now() + 7200 * 1000).toISOString(), // 2 hours from now
//     status: "Upcoming",
//     feedbackGiven: false,
//   },
// ];

// function MyActivity() {
//   const [activityLogs, setActivityLogs] = useState(myActivityData);
//   const [selectedSession, setSelectedSession] = useState(null);
//   const [showHistory, setShowHistory] = useState(false);
//   const { triggerNotification } = useNotification();

//   // Fetch activity logs from backend on component mount
//   useEffect(() => {
//     const fetchActivityLogs = async () => {
//       try {
//         // const response = await axios.get("/api/sessions");
//         // setActivityLogs(response.data);
//       } catch (error) {
//         // console.error("Error fetching activity logs:", error);
//         triggerNotification("Error fetching activity logs", "error");
//       }
//     };

//     fetchActivityLogs();
//   }, []);

//   const handleViewDetails = (session) => {
//     setSelectedSession(session);
//   };

//   const handleJoinSession = (sessionId) => {
//     try {
//       // Example: Simulate joining a session
//       // alert(`Joining session ID: ${sessionId}`);
//       triggerNotification(`Joining session ID: ${sessionId} `, "success");
//     } catch (error) {
//       // console.error("Error joining session:", error);
//       triggerNotification("Error joining session", "error");
//     }
//   };

//   const handleGiveFeedback = async (sessionId) => {
//     try {
//       // Send feedback to backend
//       // await axios.post(`/api/sessions/${sessionId}/feedback`, {
//       //   feedback: "Sample feedback message",
//       // });

//       // Update session state locally
//       setActivityLogs((prev) =>
//         prev.map((session) =>
//           session.id === sessionId
//             ? { ...session, feedbackGiven: true, status: "Completed" }
//             : session
//         )
//       );
//       triggerNotification("Feedback submitted successfully", "success");
//     } catch (error) {
//       // console.error("Error submitting feedback:", error);
//       triggerNotification("Error submitting feedback", "error");
//     }
//   };

//   const filteredLogs = showHistory
//     ? activityLogs.filter((session) => session.status === "Completed")
//     : activityLogs;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6 text-center">My Activity</h1>

//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => setShowHistory((prev) => !prev)}
//           className="px-4 py-2 bg-[#7047A3] text-white text-sm rounded-lg shadow hover:bg-[#5B3A90]"
//         >
//           {showHistory ? "Back to Activity" : "View History"}
//         </button>
//       </div>

//       <table className="min-w-full bg-white shadow-md rounded-lg">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
//               Type
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
//               Details
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
//               Timestamp
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {filteredLogs.map((session) => (
//             <tr key={session.id}>
//               <td className="px-4 py-3">{session.type}</td>
//               <td className="px-4 py-3">{session.details}</td>
//               <td className="px-4 py-3">
//                 {new Date(session.timestamp).toLocaleString()}
//               </td>
//               <td className="px-4 py-3 space-x-2">
//                 <button
//                   onClick={() => handleViewDetails(session)}
//                   className="px-2 py-1 bg-[#1E3E62] text-white text-sm rounded-lg"
//                 >
//                   View Details
//                 </button>

//                 {session.status === "Upcoming" && (
//                   <button
//                     onClick={() => handleJoinSession(session.id)}
//                     className="px-2 py-1 bg-[#247924] text-white text-sm rounded-lg"
//                   >
//                     Join Session
//                   </button>
//                 )}

//                 {session.status === "Completed" && !session.feedbackGiven && (
//                   <button
//                     onClick={() => handleGiveFeedback(session.id)}
//                     className="px-2 py-1 bg-[#1f5d7a] text-white text-sm rounded-lg"
//                   >
//                     Give Feedback
//                   </button>
//                 )}

//                 {session.status === "Completed" && session.feedbackGiven && (
//                   <span className="text-[#247924] text-sm">Completed</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* View Details Modal */}
//       {selectedSession && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3">
//             <h2 className="text-xl font-semibold mb-4">Session Details</h2>
//             <p className="mb-2">
//               <strong>Student ID:</strong> {selectedSession.studentId}
//             </p>
//             <p className="mb-2">
//               <strong>Session ID:</strong> {selectedSession.id}
//             </p>
//             <p className="mb-2">
//               <strong>Name:</strong> {selectedSession.clientName}
//             </p>
//             <p className="mb-2">
//               <strong>Date:</strong>{" "}
//               {new Date(selectedSession.timestamp).toLocaleDateString()}
//             </p>
//             <p className="mb-2">
//               <strong>Time:</strong>{" "}
//               {new Date(selectedSession.timestamp).toLocaleTimeString()}
//             </p>
//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={() => setSelectedSession(null)}
//                 className="px-4 py-2 bg-gray-500 text-white rounded-lg"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MyActivity;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNotification } from "../context/NotificationContext";

const myActivityData = [
  {
    id: "session1",
    studentId: "STU001",
    counselorId: "CS001", // Added counselor ID
    clientName: "John Doe",
    type: "Counseling",
    details: "Session with John Doe about career guidance.",
    timestamp: new Date().toISOString(),
    mode: "Online", // Added mode
    duration: "1 hour", // Added duration
    status: "Upcoming", // Options: Upcoming, Completed, Cancelled
    feedbackGiven: false,
  },
  {
    id: "session2",
    studentId: "STU002",
    counselorId: "CS002",
    clientName: "Jane Smith",
    type: "Therapy",
    details: "Therapy session with Jane Smith.",
    timestamp: new Date(Date.now() - 3600 * 1000).toISOString(), // 1 hour ago
    mode: "In-person",
    duration: "45 minutes",
    status: "Completed",
    feedbackGiven: true,
  },
  {
    id: "session3",
    studentId: "STU003",
    counselorId: "CS003",
    clientName: "Mark Johnson",
    type: "Tutoring",
    details: "Tutoring session with Mark Johnson on Mathematics.",
    timestamp: new Date(Date.now() + 600 * 1000).toISOString(), // 10 minutes from now
    mode: "Online",
    duration: "2 hours",
    status: "Upcoming",
    feedbackGiven: false,
  },
  {
    id: "session4",
    studentId: "STU004",
    counselorId: "CS004",
    clientName: "Emily Davis",
    type: "Counseling",
    details: "Session with Emily Davis about personal growth.",
    timestamp: new Date(Date.now() - 86400 * 1000).toISOString(), // 1 day ago
    mode: "In-person",
    duration: "30 minutes",
    status: "Completed",
    feedbackGiven: false,
  },
  {
    id: "session5",
    studentId: "STU005",
    counselorId: "CS005",
    clientName: "Chris Brown",
    type: "Mentorship",
    details: "Mentorship session with Chris Brown.",
    timestamp: new Date(Date.now() + 7200 * 1000).toISOString(), // 2 hours from now
    mode: "Online",
    duration: "1 hour",
    status: "Upcoming",
    feedbackGiven: false,
  },
];

function MyActivity() {
  const [activityLogs, setActivityLogs] = useState(myActivityData);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const { triggerNotification } = useNotification();

  // Fetch activity logs from backend on component mount
  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        // const response = await axios.get("/api/sessions");
        // setActivityLogs(response.data);
      } catch (error) {
        // console.error("Error fetching activity logs:", error);
        triggerNotification("Error fetching activity logs", "error");
      }
    };

    fetchActivityLogs();
  }, []);

  const handleViewDetails = (session) => {
    setSelectedSession(session);
  };

  const handleJoinSession = (sessionId) => {
    try {
      // Example: Simulate joining a session
      triggerNotification(`Joining session ID: ${sessionId} `, "success");
    } catch (error) {
      // console.error("Error joining session:", error);
      triggerNotification("Error joining session", "error");
    }
  };

  const handleGiveFeedback = async (sessionId) => {
    try {
      // Send feedback to backend
      // await axios.post(`/api/sessions/${sessionId}/feedback`, {
      //   feedback: "Sample feedback message",
      // });

      // Update session state locally
      setActivityLogs((prev) =>
        prev.map((session) =>
          session.id === sessionId
            ? { ...session, feedbackGiven: true, status: "Completed" }
            : session
        )
      );
      triggerNotification("Feedback submitted successfully", "success");
    } catch (error) {
      // console.error("Error submitting feedback:", error);
      triggerNotification("Error submitting feedback", "error");
    }
  };

  const filteredLogs = showHistory
    ? activityLogs.filter((session) => session.status === "Completed")
    : activityLogs;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">My Activity</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowHistory((prev) => !prev)}
          className="px-4 py-2 bg-[#7047A3] text-white text-sm rounded-lg shadow hover:bg-[#5B3A90]"
        >
          {showHistory ? "Back to Activity" : "View History"}
        </button>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Sr No
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Session ID
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Counselor ID
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Appointment Date
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Mode
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Duration
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Time Slot
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredLogs.map((session, index) => (
            <tr key={session.id}>
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">{session.id}</td>
              <td className="px-4 py-3">{session.counselorId}</td>
              <td className="px-4 py-3">
                {new Date(session.timestamp).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">{session.mode}</td>
              <td className="px-4 py-3">{session.duration}</td>
              <td className="px-4 py-3">
                {new Date(session.timestamp).toLocaleTimeString()}
              </td>
              <td className="px-4 py-3 space-x-2">
                <button
                  onClick={() => handleViewDetails(session)}
                  className="px-2 py-1 bg-[#1E3E62] text-white text-sm rounded-lg"
                >
                  View Details
                </button>

                {session.status === "Upcoming" && (
                  <button
                    onClick={() => handleJoinSession(session.id)}
                    className="px-2 py-1 bg-[#247924] text-white text-sm rounded-lg"
                  >
                    Join Session
                  </button>
                )}

                {session.status === "Completed" && !session.feedbackGiven && (
                  <button
                    onClick={() => handleGiveFeedback(session.id)}
                    className="px-2 py-1 bg-[#1f5d7a] text-white text-sm rounded-lg"
                  >
                    Give Feedback
                  </button>
                )}

                {session.status === "Completed" && session.feedbackGiven && (
                  <span className="text-[#247924] text-sm">Completed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Details Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3">
            <h2 className="text-xl font-semibold mb-4">Session Details</h2>
            <p className="mb-2">
              <strong>Student ID:</strong> {selectedSession.studentId}
            </p>
            <p className="mb-2">
              <strong>Session ID:</strong> {selectedSession.id}
            </p>
            <p className="mb-2">
              <strong>Name:</strong> {selectedSession.clientName}
            </p>
            <p className="mb-2">
              <strong>Appointment Date:</strong>{" "}
              {new Date(selectedSession.timestamp).toLocaleDateString()}
            </p>
            <p className="mb-2">
              <strong>Time Slot:</strong>{" "}
              {new Date(selectedSession.timestamp).toLocaleTimeString()}
            </p>
            <p className="mb-2">
              <strong>Mode:</strong> {selectedSession.mode}
            </p>
            <p className="mb-2">
              <strong>Duration:</strong> {selectedSession.duration}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedSession(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyActivity;
