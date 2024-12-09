import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNotification } from "../context/NotificationContext";

const myActivityData = [
  {
    session_id: "session1",
    student_id: "STU001",
    counsellor_id: "CS001",
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
        // const response = await axios.get(`${process.env.VITE_APP_API_ENDPOINT_URL}/api/sessions`);
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
