import React, { useEffect, useState } from "react";
import { useNotification } from "../context/NotificationContext";

const sessionData = {
  sessions: [
    {
      id: "session1",
      clientName: "John Doe",
      type: "Virtual",
      scheduledTime: "2024-12-01T10:00:00Z",
      status: "Completed",
    },
    {
      id: "session2",
      clientName: "Jane Smith",
      type: "In-person",
      scheduledTime: "2024-12-01T12:00:00Z",
      status: "Cancelled",
    },
    {
      id: "session3",
      clientName: "Alice Brown",
      type: "Virtual",
      scheduledTime: "2024-12-02T09:00:00Z",
      status: "Rescheduled",
    },
    {
      id: "session4",
      clientName: "Bob Johnson",
      type: "In-person",
      scheduledTime: "2024-11-30T15:00:00Z",
      status: "Rescheduled",
    },
    {
      id: "session5",
      clientName: "Charlie Wilson",
      type: "Virtual",
      scheduledTime: "2024-11-29T16:00:00Z",
      status: "Completed",
    },
    {
      id: "session6",
      clientName: "Emily Davis",
      type: "In-person",
      scheduledTime: "2024-12-03T14:00:00Z",
      status: "Completed",
    },
    {
      id: "session7",
      clientName: "Michael Clark",
      type: "Virtual",
      scheduledTime: "2024-12-01T11:30:00Z",
      status: "Completed",
    },
    {
      id: "session8",
      clientName: "Sophia White",
      type: "In-person",
      scheduledTime: "2024-11-30T13:00:00Z",
      status: "Completed",
    },
  ],
};

const statuses = [
  "Booked",
  "Ongoing",
  "Requested",
  "Completed",
  "Cancelled",
  "Rescheduled",
];
function SessionManagement() {
  const [activeStatus, setActiveStatus] = useState("");
  const [sessions, setSessions] = useState([]);
  const [editSession, setEditSession] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [rescheduleSession, setRescheduleSession] = useState(null);
  const [newDateTime, setNewDateTime] = useState("");
  const { triggerNotification } = useNotification();

  // Fetch sessions on component mount
  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      // const response = await axios.get("/api/sessions");
      const response = sessionData.sessions;
      setSessions(response);
    } catch (err) {
      triggerNotification("Failed to fetch sessions.", "error");
      setSessions([]);
    }

    // return sessionData.sessions;
  };

  const handleReschedule = (session) => {
    setRescheduleSession(session);
  };

  const handleRescheduleSave = async () => {
    if (!rescheduleSession || !newDateTime) {
      triggerNotification("Please select a new date and time.", "error");
      return;
    }

    try {
      const updatedSession = {
        ...rescheduleSession,
        scheduledTime: newDateTime,
        status: "Rescheduled",
      };

      // Mock backend API call
      // await axios.put(`/api/sessions/${rescheduleSession.id}/reschedule`, updatedSession);

      setSessions((prev) =>
        prev.map((session) =>
          session.id === rescheduleSession.id ? updatedSession : session
        )
      );

      setRescheduleSession(null);
      setNewDateTime("");
      triggerNotification("Session rescheduled successfully.", "success");
    } catch (err) {
      triggerNotification("Failed to reschedule session.", "error");
    }
  };

  const handleCancelReschedule = () => {
    setRescheduleSession(null);
    setNewDateTime("");
  };

  const handleEndSession = async (sessionId) => {
    try {
      // await axios.post(`/api/counselor/sessions/${sessionId}/end`);
      // setSessions((prev) => {
      //   prev.filter((session) => session.id !== sessionId);
      // });
      // triggerNotification("Session ended successfully.", "success");
      setSessions((prev) =>
        prev.map((session) =>
          session.id === sessionId
            ? { ...session, status: "Completed" }
            : session
        )
      );
      triggerNotification("Session marked as completed.", "success");
    } catch (err) {
      triggerNotification("Failed to end session.", "error");
    }
  };

  const handleEdit = (session) => {
    setEditSession(session);
    setNewStatus(session.status);
  };

  const handleSave = async () => {
    if (!editSession) return;

    try {
      const updatedSession = {
        ...editSession,
        status: newStatus,
      };

      // await axios.put(
      //   `/api/counselor/sessions/${editSession.id}`,
      //   updatedSession
      // );

      // Update local state
      setSessions((prev) =>
        prev.map((session) =>
          session.id === editSession.id ? updatedSession : session
        )
      );
      setEditSession(null);
      triggerNotification("Session updated successfully.", "success");
    } catch (err) {
      triggerNotification("Failed to update session.", "error");
    }
  };

  const handleCancel = () => {
    setEditSession(null);
  };

  // Filter sessions based on the active status
  const filteredSessions =
    activeStatus === ""
      ? sessions
      : sessions.filter((session) => session.status === activeStatus);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Session Management
      </h1>

      {/* Status Filter */}

      {/* <div className="flex justify-around mb-6">
        <button
          onClick={() => setActiveStatus("")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
            activeStatus === ""
              ? "bg-[#7047A3] text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          All
        </button>
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              activeStatus === status
                ? "bg-[#7047A3] text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {status}
          </button>
        ))}
      </div> */}

      <div className="flex justify-around mb-6">
        <button
          onClick={() => setActiveStatus("")}
          className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300
      ${
        activeStatus === ""
          ? "bg-[#7047A3] text-white"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
      }`}
        >
          All
        </button>
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300
        ${
          activeStatus === status
            ? "bg-[#7047A3] text-white"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
        }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Sessions Table */}
      <div>
        {filteredSessions && filteredSessions.length > 0 ? (
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200  bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-200 ">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Session Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                        >
                          Scheduled Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase 0"
                        >
                          Edit
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase 0"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">
                      {filteredSessions.map((session, index) => (
                        <tr key={session.id} className="hover:bg-gray-100 ">
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 ">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 ">
                            {session.clientName}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 ">
                            {session.type}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 ">
                            {new Date(session.scheduledTime).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 ">
                            {session.status}
                          </td>
                          <td className="px-6 py-4 text-end text-sm font-medium">
                            <button
                              onClick={() => handleEdit(session)}
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#7047A3] hover:text-[#4d3072] focus:outline-none focus:text-[#4d3072] disabled:opacity-50 disabled:pointer-events-none "
                            >
                              Edit
                            </button>
                          </td>
                          <td className="px-6 py-4 text-end text-sm font-medium">
                            {session.status === "Ongoing" ? (
                              <button
                                onClick={() => handleEndSession(session.id)}
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#AE445A] text-white px-3 py-1 hover:bg-[#FF677D]"
                              >
                                End Session
                              </button>
                            ) : (
                              <button
                                disabled
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-300 text-gray-600 px-3 py-1 cursor-not-allowed"
                              >
                                N/A
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-6">
            No sessions available.
          </p>
        )}
      </div>

      {/* Edit Modal */}
      {editSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#dad8d8]  p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Edit Session
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-600 ">
                Client Name:
              </label>
              <p className="text-sm text-gray-800 ">{editSession.clientName}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-600 ">
                Session Type:
              </label>
              <p className="text-sm text-gray-800 ">{editSession.type}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-600 ">
                Status:
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-800"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            if (editSession.status === "Rescheduled")
            {
              <button
                onClick={() => handleReschedule(editSession)}
                className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Reschedule
              </button>
            }
            <div className="flex justify-end gap-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#1E3E62] text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-[#243642] transition-all  "
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-[#BB3441] text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-[#C62E2E] transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3">
            <h2 className="text-2xl font-semibold mb-6">Reschedule Session</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Client Name:
              </label>
              <p>{rescheduleSession.clientName}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                New Date & Time:
              </label>
              <input
                type="datetime-local"
                value={newDateTime}
                onChange={(e) => setNewDateTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleRescheduleSave}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={handleCancelReschedule}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SessionManagement;
