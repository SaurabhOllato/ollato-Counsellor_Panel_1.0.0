// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNotification } from "../context/NotificationContext";

// const myActivityData = [
//   {
//     id: "session1",
//     studentId: "STU001",
//     counselorId: "CS001",
//     clientName: "John Doe",
//     type: "Counseling",
//     details: "Session with John Doe about career guidance.",
//     appointmentDate: new Date(Date.now() + 86400 * 1000).toISOString(), // 1 day in the future
//     timeSlot: `${new Date(Date.now() + 86400 * 1000).getHours()}:00 - ${
//       new Date(Date.now() + 86400 * 1000).getHours() + 1
//     }:00`,
//     mode: "Online",
//     duration: "1 hour",
//     feedbackGiven: false,
//   },
//   {
//     id: "session2",
//     studentId: "STU002",
//     counselorId: "CS002",
//     clientName: "Jane Smith",
//     type: "Therapy",
//     details: "Therapy session with Jane Smith.",
//     appointmentDate: new Date(Date.now() - 3600 * 1000).toISOString(), // 1 hour ago
//     timeSlot: `${new Date(Date.now() - 3600 * 1000).getHours()}:00 - ${
//       new Date(Date.now() - 3600 * 1000).getHours() + 1
//     }:00`,
//     mode: "In-person",
//     duration: "45 minutes",
//     feedbackGiven: true,
//   },
//   {
//     id: "session3",
//     studentId: "STU003",
//     counselorId: "CS003",
//     clientName: "Mark Johnson",
//     type: "Tutoring",
//     details: "Tutoring session with Mark Johnson on Mathematics.",
//     appointmentDate: new Date(Date.now() + 600 * 1000).toISOString(), // 10 minutes in the future
//     timeSlot: `${new Date(Date.now() + 600 * 1000).getHours()}:00 - ${
//       new Date(Date.now() + 600 * 1000).getHours() + 2
//     }:00`,
//     mode: "Online",
//     duration: "2 hours",
//     feedbackGiven: false,
//   },
//   {
//     id: "session4",
//     studentId: "STU004",
//     counselorId: "CS004",
//     clientName: "Emily Davis",
//     type: "Counseling",
//     details: "Session with Emily Davis about personal growth.",
//     appointmentDate: new Date(Date.now() - 86400 * 1000).toISOString(), // 1 day ago
//     timeSlot: `${new Date(Date.now() - 86400 * 1000).getHours()}:00 - ${
//       new Date(Date.now() - 86400 * 1000).getHours() + 1
//     }:00`,
//     mode: "In-person",
//     duration: "30 minutes",
//     feedbackGiven: false,
//   },
//   {
//     id: "session5",
//     studentId: "STU005",
//     counselorId: "CS005",
//     clientName: "Chris Brown",
//     type: "Mentorship",
//     details: "Mentorship session with Chris Brown.",
//     appointmentDate: new Date(Date.now() + 7200 * 1000).toISOString(), // 2 hours in the future
//     timeSlot: `${new Date(Date.now() + 7200 * 1000).getHours()}:00 - ${
//       new Date(Date.now() + 7200 * 1000).getHours() + 1
//     }:00`,
//     mode: "Online",
//     duration: "1 hour",
//     feedbackGiven: false,
//   },
// ];

// function MyActivity() {
//   const [activityLogs, setActivityLogs] = useState(myActivityData);
//   const [selectedSession, setSelectedSession] = useState(null);
//   const [showHistory, setShowHistory] = useState(false);
//   const { triggerNotification } = useNotification();
//   const [joinSession, setJoinSession] = useState(null);
//   const [feedbackSession, setFeedbackSession] = useState(null);
//   const [feedbackText, setFeedbackText] = useState("");

//   // Fetch activity logs from the backend on component mount
//   useEffect(() => {
//     const fetchActivityLogs = async () => {
//       try {
//         // const response = await axios.get("/api/sessions");
//         // setActivityLogs(response.data);
//         setActivityLogs(myActivityData);
//       } catch (error) {
//         triggerNotification("Error fetching activity logs", "error");
//       }
//     };

//     fetchActivityLogs();
//   }, []);

//   const handleGiveFeedback = async (sessionId) => {
//     try {
//       await axios.post(`/api/sessions/${sessionId}/feedback`, {
//         feedback: feedbackText,
//       });
//       setActivityLogs((prev) =>
//         prev.map((session) =>
//           session.id === sessionId
//             ? { ...session, feedbackGiven: true }
//             : session
//         )
//       );
//       triggerNotification("Feedback submitted successfully", "success");
//       setFeedbackSession(null);
//       setFeedbackText("");
//     } catch (error) {
//       triggerNotification("Error submitting feedback", "error");
//     }
//   };

//   const handleJoinSession = (session) => {
//     triggerNotification(`Joining session with ID: ${session.id}`, "success");
//     setJoinSession(session);
//   };

//   const isJoinSessionEnabled = (timestamp) => {
//     const currentTime = new Date();
//     const sessionTime = new Date(timestamp);
//     const diffInMinutes = (sessionTime - currentTime) / (1000 * 60);
//     return diffInMinutes <= 10 && diffInMinutes >= -10;
//   };

//   const determineStatus = (timestamp, feedbackGiven) => {
//     const currentTime = new Date();
//     const sessionTime = new Date(timestamp);
//     if (feedbackGiven) return "Feedback Given";
//     if (sessionTime < currentTime) return "Completed";
//     return "Upcoming";
//   };

//   const filteredLogs = showHistory
//     ? activityLogs.filter(
//         (session) =>
//           determineStatus(session.timestamp, session.feedbackGiven) ===
//           "Completed"
//       )
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
//             <th className="px-4 py-2">Sr No</th>
//             <th className="px-4 py-2">Session ID</th>
//             <th className="px-4 py-2">Counselor ID</th>
//             <th className="px-4 py-2">Appointment Date</th>
//             <th className="px-4 py-2">Time Slot</th>
//             <th className="px-4 py-2">Mode</th>
//             <th className="px-4 py-2">Duration</th>
//             <th className="px-4 py-2">Status</th>
//             <th className="px-4 py-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredLogs.map((session, index) => (
//             <tr key={session.id}>
//               <td className="px-4 py-3">{index + 1}</td>
//               <td className="px-4 py-3">{session.id}</td>
//               <td className="px-4 py-3">{session.counselorId}</td>
//               <td className="px-4 py-3">{session.appointmentDate}</td>
//               <td className="px-4 py-3">{session.timeSlot}</td>
//               <td className="px-4 py-3">{session.mode}</td>
//               <td className="px-4 py-3">{session.duration}</td>
//               <td className="px-4 py-3">
//                 {determineStatus(session.timestamp, session.feedbackGiven)}
//               </td>
//               <td className="px-4 py-3 space-x-2">
//                 <button
//                   onClick={() => setSelectedSession(session)}
//                   className="px-2 py-1 bg-[#1E3E62] text-white text-sm rounded-lg"
//                 >
//                   View Details
//                 </button>
//                 {determineStatus(session.timeSlot, session.feedbackGiven) ===
//                   "Upcoming" &&
//                   isJoinSessionEnabled(session.timestamp) && (
//                     <button
//                       onClick={() => handleJoinSession(session)}
//                       className="px-2 py-1 bg-blue-500 text-white rounded-lg"
//                     >
//                       Join Session
//                     </button>
//                   )}
//                 {determineStatus(session.timeSlot, session.feedbackGiven) ===
//                   "Completed" &&
//                   !session.feedbackGiven && (
//                     <button
//                       onClick={() => setFeedbackSession(session)}
//                       className="px-2 py-1 bg-[#1f5d7a] text-white text-sm rounded-lg"
//                     >
//                       Give Feedback
//                     </button>
//                   )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {/* View Details Modal */}
//       {selectedSession && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby="sessionDetailsTitle"
//         >
//           <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3">
//             <h2 id="sessionDetailsTitle" className="text-xl font-semibold mb-4">
//               Session Details
//             </h2>
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
//               <strong>Appointment Date:</strong>{" "}
//               {new Date(selectedSession.timestamp).toLocaleDateString()}
//             </p>
//             <p className="mb-2">
//               <strong>Time Slot:</strong>{" "}
//               {new Date(selectedSession.timestamp).toLocaleTimeString()}
//             </p>
//             <p className="mb-2">
//               <strong>Mode:</strong> {selectedSession.mode}
//             </p>
//             <p className="mb-2">
//               <strong>Duration:</strong> {selectedSession.duration}
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

//       {/* Join Session Modal */}
//       {joinSession && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby="joinSessionTitle"
//         >
//           <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3">
//             {/* Modal Header */}
//             <div className="flex justify-between items-center border-b pb-4 mb-4">
//               <h2
//                 id="joinSessionTitle"
//                 className="text-xl font-semibold text-gray-800"
//               >
//                 Join Session
//               </h2>
//               <button
//                 onClick={() => setJoinSession(null)}
//                 className="text-gray-500 hover:text-gray-700"
//                 aria-label="Close"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.5}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="space-y-4">
//               <p>
//                 <strong>Session ID:</strong> {joinSession.id}
//               </p>
//               <p>
//                 <strong>Name:</strong> {joinSession.clientName}
//               </p>
//               <p>
//                 <strong>Appointment Date:</strong>{" "}
//                 {new Date(joinSession.timestamp).toLocaleDateString()}
//               </p>
//               <p>
//                 <strong>Time Slot:</strong>{" "}
//                 {new Date(joinSession.timestamp).toLocaleTimeString()}
//               </p>
//               <div className="flex justify-between space-x-2 mt-4">
//                 <a
//                   href="https://meet.google.com/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-block w-full rounded bg-blue-500 px-6 py-2 text-center text-white shadow hover:bg-blue-600"
//                 >
//                   Google Meet
//                 </a>
//                 <a
//                   href="https://zoom.us/join"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-block w-full rounded bg-purple-500 px-6 py-2 text-center text-white shadow hover:bg-purple-600"
//                 >
//                   Zoom
//                 </a>
//               </div>
//             </div>

//             {/* Modal Footer */}
//             <div className="flex justify-end mt-6">
//               <button
//                 onClick={() => setJoinSession(null)}
//                 className="rounded bg-gray-500 px-6 py-2 text-white hover:bg-gray-600"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Feedback Modal */}
//       {feedbackSession && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby="feedbackSessionTitle"
//         >
//           <form
//             className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3"
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleGiveFeedback(feedbackSession.id, feedbackText);
//             }}
//           >
//             <h2
//               id="feedbackSessionTitle"
//               className="text-xl font-semibold mb-4"
//             >
//               Submit Feedback
//             </h2>
//             <textarea
//               className="w-full p-2 border rounded mb-4"
//               rows="4"
//               placeholder="Enter your feedback..."
//               value={feedbackText}
//               onChange={(e) => setFeedbackText(e.target.value)}
//             />
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setFeedbackSession(null)}
//                 className="px-4 py-2 bg-gray-500 text-white rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-green-500 text-white rounded-lg"
//               >
//                 Submit
//               </button>
//             </div>
//           </form>
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
    counselorId: "CS001",
    clientName: "John Doe",
    type: "Counseling",
    details: "Session with John Doe about career guidance.",
    appointmentDate: new Date(Date.now() + 86400 * 1000).toISOString(), // 1 day in the future
    timeSlot: `${new Date(Date.now() + 86400 * 1000).getHours()}:00 - ${
      new Date(Date.now() + 86400 * 1000).getHours() + 1
    }:00`,
    mode: "Online",
    duration: "1 hour",
    feedbackGiven: false,
  },
  {
    id: "session2",
    studentId: "STU002",
    counselorId: "CS002",
    clientName: "Jane Smith",
    type: "Therapy",
    details: "Therapy session with Jane Smith.",
    appointmentDate: new Date(Date.now() - 3600 * 1000).toISOString(), // 1 hour ago
    timeSlot: `${new Date(Date.now() - 3600 * 1000).getHours()}:00 - ${
      new Date(Date.now() - 3600 * 1000).getHours() + 1
    }:00`,
    mode: "In-person",
    duration: "45 minutes",
    feedbackGiven: true,
  },
  {
    id: "session3",
    studentId: "STU003",
    counselorId: "CS003",
    clientName: "Mark Johnson",
    type: "Tutoring",
    details: "Tutoring session with Mark Johnson on Mathematics.",
    appointmentDate: new Date(Date.now() + 600 * 1000).toISOString(), // 10 minutes in the future
    timeSlot: `${new Date(Date.now() + 600 * 1000).getHours()}:00 - ${
      new Date(Date.now() + 600 * 1000).getHours() + 2
    }:00`,
    mode: "Online",
    duration: "2 hours",
    feedbackGiven: false,
  },
  {
    id: "session4",
    studentId: "STU004",
    counselorId: "CS004",
    clientName: "Emily Davis",
    type: "Counseling",
    details: "Session with Emily Davis about personal growth.",
    appointmentDate: new Date(Date.now() - 86400 * 1000).toISOString(), // 1 day ago
    timeSlot: `${new Date(Date.now() - 86400 * 1000).getHours()}:00 - ${
      new Date(Date.now() - 86400 * 1000).getHours() + 1
    }:00`,
    mode: "In-person",
    duration: "30 minutes",
    feedbackGiven: false,
  },
  {
    id: "session5",
    studentId: "STU005",
    counselorId: "CS005",
    clientName: "Chris Brown",
    type: "Mentorship",
    details: "Mentorship session with Chris Brown.",
    appointmentDate: new Date(Date.now() + 7200 * 1000).toISOString(), // 2 hours in the future
    timeSlot: `${new Date(Date.now() + 7200 * 1000).getHours()}:00 - ${
      new Date(Date.now() + 7200 * 1000).getHours() + 1
    }:00`,
    mode: "Online",
    duration: "1 hour",
    feedbackGiven: false,
  },
];

function MyActivity() {
  const [activityLogs, setActivityLogs] = useState(myActivityData);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const { triggerNotification } = useNotification();
  const [joinSession, setJoinSession] = useState(null);
  const [feedbackSession, setFeedbackSession] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  // Fetch activity logs from the backend on component mount
  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        // const response = await axios.get("/api/sessions");
        // setActivityLogs(response.data);
        setActivityLogs(myActivityData);
      } catch (error) {
        triggerNotification("Error fetching activity logs", "error");
      }
    };

    fetchActivityLogs();
  }, []);

  const handleGiveFeedback = async (sessionId) => {
    try {
      await axios.post(`/api/sessions/${sessionId}/feedback`, {
        feedback: feedbackText,
      });
      setActivityLogs((prev) =>
        prev.map((session) =>
          session.id === sessionId
            ? { ...session, feedbackGiven: true }
            : session
        )
      );
      triggerNotification("Feedback submitted successfully", "success");
      setFeedbackSession(null);
      setFeedbackText("");
    } catch (error) {
      triggerNotification("Error submitting feedback", "error");
    }
  };

  const handleJoinSession = (session) => {
    triggerNotification(`Joining session with ID: ${session.id}`, "success");
    setJoinSession(session);
  };

  const isJoinSessionEnabled = (appointmentDate) => {
    const currentTime = new Date();
    const sessionTime = new Date(appointmentDate);
    const diffInMinutes = (sessionTime - currentTime) / (1000 * 60);
    return diffInMinutes <= 10 && diffInMinutes >= -10;
  };

  const determineStatus = (appointmentDate, feedbackGiven) => {
    const currentTime = new Date();
    const sessionTime = new Date(appointmentDate);
    if (feedbackGiven) return "Feedback Given";
    if (sessionTime < currentTime) return "Completed";
    return "Upcoming";
  };

  const filteredLogs = showHistory
    ? activityLogs.filter(
        (session) =>
          determineStatus(session.appointmentDate, session.feedbackGiven) ===
          "Completed"
      )
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
            <th className="px-4 py-2">Sr No</th>
            <th className="px-4 py-2">Session ID</th>
            <th className="px-4 py-2">Counselor ID</th>
            <th className="px-4 py-2">Appointment Date</th>
            <th className="px-4 py-2">Time Slot</th>
            <th className="px-4 py-2">Mode</th>
            <th className="px-4 py-2">Duration</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((session, index) => (
            <tr key={session.id}>
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">{session.id}</td>
              <td className="px-4 py-3">{session.counselorId}</td>
              <td className="px-4 py-3">
                {new Date(session.appointmentDate).toLocaleString()}
              </td>
              <td className="px-4 py-3">{session.timeSlot}</td>
              <td className="px-4 py-3">{session.mode}</td>
              <td className="px-4 py-3">{session.duration}</td>
              <td className="px-4 py-3">
                {determineStatus(
                  session.appointmentDate,
                  session.feedbackGiven
                )}
              </td>
              <td className="px-4 py-3">
                {determineStatus(
                  session.appointmentDate,
                  session.feedbackGiven
                ) === "Upcoming" && !session.feedbackGiven ? (
                  <button
                    onClick={() => handleJoinSession(session)}
                    className={`w-full px-4 py-2 bg-[#355F2E] text-white text-sm rounded-lg shadow hover:bg-[#388E3C] ${
                      !isJoinSessionEnabled(session.appointmentDate)
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                    disabled={!isJoinSessionEnabled(session.appointmentDate)}
                  >
                    Join
                  </button>
                ) : (
                  <button
                    onClick={() => setFeedbackSession(session)}
                    className="w-full px-4 py-2 bg-[#AA5486] text-white text-sm rounded-lg shadow hover:bg-[#6d3254] "
                  >
                    Feedback
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Feedback Modal */}
      {feedbackSession && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center"
          onClick={() => setFeedbackSession(null)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg lg:text-2xl font-bold text-gray-900 mb-6">
              Feedback for Session
            </h3>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="px-4 w-full text-sm text-gray-900 border border-gray-200 rounded-lg mb-4 focus:ring-0 focus:outline-none"
              rows="4"
              placeholder="Please provide your feedback."
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={() => setFeedbackSession(null)}
                className="px-4 py-2 bg-gray-300 text-black text-sm rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleGiveFeedback(feedbackSession.id)}
                className="px-4 py-2 bg-primary-700 text-white bg-[#1f5d7a] text-sm rounded-lg"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyActivity;
