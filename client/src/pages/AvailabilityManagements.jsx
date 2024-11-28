import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNotification } from "../context/NotificationContext";
import { MdFirstPage, MdLastPage } from "react-icons/md";
import Calendar from "react-calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CustomCalendar from "../components/CustomCalendar";

function AvailabilityManagements() {
  const [availability, setAvailability] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSlot, setCurrentSlot] = useState(null);
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    time: "",
    mode: "video",
    duration: "",
  });
  const [showAvailabilityTable, setShowAvailabilityTable] = useState(false); //
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showSetAvailability, setShowSetAvailability] = useState(false); //
  const { triggerNotification } = useNotification();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "ascending",
  });
  const slotsPerPage = 10;

  // Fetch availability slots from backend (mocked for now)
  useEffect(() => {
    const fetchAvailability = async () => {
      // Simulate an API call
      const mockData = [
        {
          id: 1,
          date: "2024-11-28",
          day: "Thursday",
          time: "10:00 AM",
          mode: "video",
          duration: 30,
          status: "Available",
        },
        {
          id: 2,
          date: "2024-11-29",
          day: "Friday",
          time: "2:00 PM",
          mode: "call",
          duration: 20,
          status: "Available",
        },
        {
          id: 3,
          date: "2024-12-01",
          day: "Sunday",
          time: "3:00 PM",
          mode: "video",
          duration: 45,
          status: "Available",
        },
        {
          id: 4,
          date: "2024-12-02",
          day: "Monday",
          time: "9:30 AM",
          mode: "call",
          duration: 15,
          status: "Available",
        },
        {
          id: 5,
          date: "2024-12-03",
          day: "Tuesday",
          time: "11:00 AM",
          mode: "video",
          duration: 60,
          status: "Available",
        },
        {
          id: 6,
          date: "2024-12-04",
          day: "Wednesday",
          time: "1:00 PM",
          mode: "call",
          duration: 30,
          status: "Available",
        },
        {
          id: 7,
          date: "2024-12-05",
          day: "Thursday",
          time: "3:00 PM",
          mode: "video",
          duration: 45,
          status: "Available",
        },
        {
          id: 8,
          date: "2024-12-06",
          day: "Friday",
          time: "5:00 PM",
          mode: "call",
          duration: 15,
          status: "Available",
        },
        {
          id: 9,
          date: "2024-12-07",
          day: "Saturday",
          time: "7:00 PM",
          mode: "video",
          duration: 60,
          status: "Available",
        },
        {
          id: 10,
          date: "2024-12-08",
          day: "Sunday",
          time: "9:00 PM",
          mode: "call",
          duration: 30,
          status: "Available",
        },
        {
          id: 11,
          date: "2024-11-28",
          day: "Thursday",
          time: "10:00 AM",
          mode: "video",
          duration: 30,
          status: "Available",
        },
        {
          id: 12,
          date: "2024-11-29",
          day: "Friday",
          time: "2:00 PM",
          mode: "call",
          duration: 20,
          status: "Available",
        },
        {
          id: 13,
          date: "2024-12-01",
          day: "Sunday",
          time: "3:00 PM",
          mode: "video",
          duration: 45,
          status: "Available",
        },
        {
          id: 14,
          date: "2024-12-02",
          day: "Monday",
          time: "9:30 AM",
          mode: "call",
          duration: 15,
          status: "Available",
        },
        {
          id: 15,
          date: "2024-12-03",
          day: "Tuesday",
          time: "11:00 AM",
          mode: "video",
          duration: 60,
          status: "Available",
        },
        {
          id: 16,
          date: "2024-12-04",
          day: "Wednesday",
          time: "1:00 PM",
          mode: "call",
          duration: 30,
          status: "Available",
        },
        {
          id: 17,
          date: "2024-12-05",
          day: "Thursday",
          time: "3:00 PM",
          mode: "video",
          duration: 45,
          status: "Available",
        },
        {
          id: 18,
          date: "2024-12-06",
          day: "Friday",
          time: "5:00 PM",
          mode: "call",
          duration: 15,
          status: "Available",
        },
        {
          id: 19,
          date: "2024-12-07",
          day: "Saturday",
          time: "7:00 PM",
          mode: "video",
          duration: 60,
          status: "Available",
        },
        {
          id: 20,
          date: "2024-12-08",
          day: "Sunday",
          time: "9:00 PM",
          mode: "call",
          duration: 30,
          status: "Available",
        },
        {
          id: 20,
          date: "2024-12-08",
          day: "Sunday",
          time: "9:00 PM",
          mode: "call",
          duration: 30,
          status: "Available",
        },
        {
          id: 20,
          date: "2024-12-08",
          day: "Sunday",
          time: "9:00 PM",
          mode: "call",
          duration: 30,
          status: "Available",
        },
        {
          id: 20,
          date: "2024-12-08",
          day: "Sunday",
          time: "9:00 PM",
          mode: "call",
          duration: 30,
          status: "Available",
        },
        {
          id: 20,
          date: "2024-12-08",
          day: "Sunday",
          time: "9:00 PM",
          mode: "call",
          duration: 30,
          status: "Available",
        },
        {
          id: 20,
          date: "2024-12-08",
          day: "Sunday",
          time: "9:00 PM",
          mode: "call",
          duration: 30,
          status: "Available",
        },
        {
          id: 20,
          date: "2024-12-08",
          day: "Sunday",
          time: "9:00 PM",
          mode: "call",
          duration: 30,
          status: "Available",
        },
        {
          id: 20,
          date: "2024-12-08",
          day: "Sunday",
          time: "9:00 PM",
          mode: "call",
          duration: 30,
          status: "Available",
        },
      ];

      setAvailability(mockData);
    };
    fetchAvailability();
  }, [setAvailability, showAvailabilityTable]);

  const resetForm = () => {
    setFormData({
      start_date: null,
      end_date: null,
      time: "",
      mode: "video",
      duration: "",
    });
    setCurrentSlot(null);
    setIsEditMode(false);
    setShowModal(false);
  };

  const validateSlot = () => {
    const { start_date, end_date, time, duration } = formData;

    if (!start_date || !end_date || !time || !duration) {
      triggerNotification("All fields are required.", "error");
      return false;
    }

    const conflict = availability.some(
      (slot) =>
        new Date(slot.date) >= new Date(start_date) &&
        new Date(slot.date) <= new Date(end_date) &&
        slot.time === time &&
        slot.id !== (currentSlot?.id || null)
    );

    if (conflict) {
      triggerNotification("This slot overlaps with an existing one.", "error");
      return false;
    }

    if (duration <= 0) {
      triggerNotification("Duration must be greater than 0!", "error");
      return false;
    }

    return true;
  };

  const handleStatusChange = (slotId, newStatus) => {
    setAvailability((prev) =>
      prev.map((slot) =>
        slot.id === slotId ? { ...slot, status: newStatus } : slot
      )
    );
    setShowStatusModal(false);
  };
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  const addSlot = (newSlot) => {
    setAvailability((prev) => [...prev, newSlot]);
  };

  const updateSlot = (newSlot) => {
    setAvailability((prev) =>
      prev.map((slot) => (slot.id === currentSlot.id ? newSlot : slot))
    );
  };

  const handleAddOrUpdateSlot = () => {
    if (!validateSlot()) return;

    const newSlot = {
      id: isEditMode ? currentSlot.id : availability.length + 1,
      date: formData.start_date, // Simplified; extend for range support
      day: format(new Date(formData.start_date), "EEEE"),
      time: formData.time,
      mode: formData.mode,
      duration: formData.duration,
      status: "Available",
    };

    if (isEditMode) {
      updateSlot(newSlot);
    } else {
      addSlot(newSlot);
    }

    resetForm();
  };

  const handleDeleteSlot = (id) => {
    setAvailability((prev) => prev.filter((slot) => slot.id !== id));
  };

  const handleEditSlot = (slot) => {
    setIsEditMode(true);
    setCurrentSlot(slot);
    setFormData({
      start_date: slot.date,
      end_date: slot.date,
      time: slot.time,
      mode: slot.mode,
      duration: slot.duration,
    });
    setShowModal(true);
  };

  // Sorting the availability list based on a specific key
  // const sortedAvailability = [...availability].sort((a, b) => {
  //   if (a[sortConfig.key] < b[sortConfig.key]) {
  //     return sortConfig.direction === "ascending" ? -1 : 1;
  //   }
  //   if (a[sortConfig.key] > b[sortConfig.key]) {
  //     return sortConfig.direction === "ascending" ? 1 : -1;
  //   }
  //   return 0;
  // });

  const filteredAvailability = availability.filter((slot) =>
    Object.values(slot)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Sorting Logic
  const sortedAvailability = [...filteredAvailability].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  useEffect(() => setCurrentPage(1), [searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAvailability.length / slotsPerPage);
  const indexOfLastSlot = currentPage * slotsPerPage;
  const indexOfFirstSlot = indexOfLastSlot - slotsPerPage;

  const currentSlots = sortedAvailability.slice(
    (currentPage - 1) * slotsPerPage,
    currentPage * slotsPerPage
  );

  // const currentSlots = filteredAvailability.slice(
  //   indexOfFirstSlot,
  //   indexOfLastSlot
  // );

  // const currentSlots = sortedAvailability.slice(
  //   indexOfFirstSlot,
  //   indexOfLastSlot
  // );

  // Pagination
  useEffect(() => {
    if (currentPage > totalPages)
      setCurrentPage(totalPages > 0 ? totalPages : 1);
  }, [totalPages, currentPage]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">
          Availability Management
        </h1>
      </div>
      {/*  */}
      <div className="flex justify-evenly mb-8">
        <button
          onClick={() => {
            setShowAvailabilityTable(false);
            resetForm();
            setShowSetAvailability(true);
          }}
          className="bg-[#8174A0] hover:bg-[#A888B5] text-white py-2 px-4 rounded w-fit"
        >
          Add Availability
        </button>
        <button
          onClick={() => {
            setShowSetAvailability(false);
            setShowAvailabilityTable(true);
          }}
          className="bg-[#8174A0] hover:bg-[#A888B5] text-white py-2 px-4 rounded w-fit"
        >
          Show Availability
        </button>
      </div>

      {/* set availability */}
      {showSetAvailability && (
        <div>
          <AvailabilityForm
            formData={formData}
            setFormData={setFormData}
            handleAddOrUpdateSlot={handleAddOrUpdateSlot}
            resetForm={resetForm}
          />
        </div>
      )}

      {/* Availability Table */}
      {showAvailabilityTable && (
        <section className="bg-white antialiased">
          {/* Search Bar */}
          <div className="w-full max-w-sm min-w-[200px] px-6">
            <div className="relative border border-[#85A98F] rounded-sm">
              <input
                type="text"
                placeholder="Search sessions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search sessions"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-[#D3F1DF] pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              />
              <button
                className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                Search
              </button>
            </div>
          </div>

          <div className="max-w-screen-xl px-4 py-6 mx-auto lg:px-6 sm:py-16 lg:py-4">
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 ">
                    <th
                      // className="border border-gray-300  px-4 py-2 text-gray-700 "
                      className={`border border-gray-300 px-4 py-2 text-gray-700 cursor-pointer select-none ${
                        sortConfig.key === "sr_no"
                          ? sortConfig.direction === "ascending"
                            ? "bg-gray-200"
                            : "bg-gray-300"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        handleSort("sr_no");
                      }}
                    >
                      Sr. No.
                      {sortConfig.key === "sr_no" && (
                        <span
                          className={`ml-2 ${
                            sortConfig.direction === "ascending"
                              ? "text-blue-500"
                              : "text-red-500"
                          } text-sm`}
                        >
                          {sortConfig.direction === "ascending" ? "▲" : "▼"}
                        </span>
                      )}
                    </th>
                    <th
                      // className="border border-gray-300  px-4 py-2 text-gray-700 "
                      className={`border border-gray-300 px-4 py-2 text-gray-700 cursor-pointer select-none ${
                        sortConfig.key === "date"
                          ? sortConfig.direction === "ascending"
                            ? "bg-gray-200"
                            : "bg-gray-300"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        handleSort("date");
                      }}
                    >
                      Date
                      {sortConfig.key === "date" && (
                        <span
                          className={`ml-2 ${
                            sortConfig.direction === "ascending"
                              ? "text-blue-500"
                              : "text-red-500"
                          } text-sm`}
                        >
                          {sortConfig.direction === "ascending" ? "▲" : "▼"}
                        </span>
                      )}
                    </th>
                    <th
                      // className="border border-gray-300  px-4 py-2 text-gray-700 "
                      className={`border border-gray-300 px-4 py-2 text-gray-700 cursor-pointer select-none ${
                        sortConfig.key === "day"
                          ? sortConfig.direction === "ascending"
                            ? "bg-gray-200"
                            : "bg-gray-300"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        handleSort("day");
                      }}
                    >
                      Day
                      {sortConfig.key === "day" && (
                        <span
                          className={`ml-2 ${
                            sortConfig.direction === "ascending"
                              ? "text-blue-500"
                              : "text-red-500"
                          } text-sm`}
                        >
                          {sortConfig.direction === "ascending" ? "▲" : "▼"}
                        </span>
                      )}
                    </th>
                    <th
                      // className="border border-gray-300  px-4 py-2 text-gray-700 "
                      className={`border border-gray-300 px-4 py-2 text-gray-700 cursor-pointer select-none ${
                        sortConfig.key === "time"
                          ? sortConfig.direction === "ascending"
                            ? "bg-gray-200"
                            : "bg-gray-300"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        handleSort("time");
                      }}
                    >
                      Time
                      {sortConfig.key === "time" && (
                        <span
                          className={`ml-2 ${
                            sortConfig.direction === "ascending"
                              ? "text-blue-500"
                              : "text-red-500"
                          } text-sm`}
                        >
                          {sortConfig.direction === "ascending" ? "▲" : "▼"}
                        </span>
                      )}
                    </th>
                    <th
                      // className="border border-gray-300  px-4 py-2 text-gray-700 "
                      className={`border border-gray-300 px-4 py-2 text-gray-700 cursor-pointer select-none ${
                        sortConfig.key === "mode"
                          ? sortConfig.direction === "ascending"
                            ? "bg-gray-200"
                            : "bg-gray-300"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        handleSort("mode");
                      }}
                    >
                      Mode
                      {sortConfig.key === "mode" && (
                        <span
                          className={`ml-2 ${
                            sortConfig.direction === "ascending"
                              ? "text-blue-500"
                              : "text-red-500"
                          } text-sm`}
                        >
                          {sortConfig.direction === "ascending" ? "▲" : "▼"}
                        </span>
                      )}
                    </th>
                    <th
                      // className="border border-gray-300  px-4 py-2 text-gray-700 "
                      className={`border border-gray-300 px-4 py-2 text-gray-700 cursor-pointer select-none ${
                        sortConfig.key === "duration"
                          ? sortConfig.direction === "ascending"
                            ? "bg-gray-200"
                            : "bg-gray-300"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        handleSort("duration");
                      }}
                    >
                      Duration
                      {sortConfig.key === "duration" && (
                        <span
                          className={`ml-2 ${
                            sortConfig.direction === "ascending"
                              ? "text-blue-500"
                              : "text-red-500"
                          } text-sm`}
                        >
                          {sortConfig.direction === "ascending" ? "▲" : "▼"}
                        </span>
                      )}
                    </th>
                    <th
                      // className="border border-gray-300  px-4 py-2 text-gray-700 "
                      className={`border border-gray-300 px-4 py-2 text-gray-700 cursor-pointer select-none ${
                        sortConfig.key === "status"
                          ? sortConfig.direction === "ascending"
                            ? "bg-gray-200"
                            : "bg-gray-300"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        handleSort("status");
                      }}
                    >
                      Status
                      {sortConfig.key === "status" && (
                        <span
                          className={`ml-2 ${
                            sortConfig.direction === "ascending"
                              ? "text-blue-500"
                              : "text-red-500"
                          } text-sm`}
                        >
                          {sortConfig.direction === "ascending" ? "▲" : "▼"}
                        </span>
                      )}
                    </th>
                    <th
                      className="border border-gray-300  px-4 py-2 text-gray-700 "
                      colSpan="2"
                      onClick={() => {}}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentSlots.length > 0 ? (
                    currentSlots.map((slot, index) => (
                      <tr key={slot.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300  px-4 py-2 text-gray-700 ">
                          {index + 1}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-gray-700 ">
                          {slot.date}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-gray-700 ">
                          {slot.day}
                        </td>
                        <td className="border border-gray-300  px-4 py-2 text-gray-700 ">
                          {slot.time}
                        </td>
                        <td className="border border-gray-300  px-4 py-2 text-gray-700 ">
                          {slot.mode}
                        </td>
                        <td className="border border-gray-300  px-4 py-2 text-gray-700 ">
                          {slot.duration} mins
                        </td>
                        <td className="border border-gray-300  px-4 py-2">
                          <span
                            className={`py-1 px-2 rounded text-white text-sm ${
                              slot.status === "Available"
                                ? "bg-[#347928] "
                                : "bg-gray-500 "
                            } hover:text-[#001F3F]`}
                            // onClick={() => setShowStatusModal(true, slot.id)}
                            onClick={() => {
                              setCurrentSlot(slot); // Save the clicked slot for reference
                              setShowStatusModal(true); // Show the modal
                            }}
                          >
                            {slot.status}
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-gray-700">
                          <button
                            onClick={() => handleEditSlot(slot)}
                            className="bg-[#FFBD73] hover:bg-yellow-600 text-[#001F3F] font-medium py-1 px-3 rounded mr-2 flex items-center"
                          >
                            Edit
                            <CiEdit />
                          </button>
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-gray-700">
                          <button
                            onClick={() => handleDeleteSlot(slot.id)}
                            className="bg-[#AE445A] hover:bg-[#FF4545] text-[#001F3F] font-medium py-1 px-3 rounded flex items-center"
                          >
                            Delete
                            <MdDeleteForever />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center p-4 text-gray-500 font-medium dark:text-gray-400"
                      >
                        No sessions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-l"
                  >
                    <MdFirstPage />
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-r"
                  >
                    <MdLastPage />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      {/* Status modal */}
      {showStatusModal && (
        <div>
          <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg p-6 w-96 flex flex-col">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Change Current Status
              </h2>
              <div className="text-gray-700 mb-4 flex justify-center">
                <button
                  onClick={() =>
                    handleStatusChange(currentSlot.id, "Available")
                  }
                  className="bg-[#347928] hover:bg-[#A5B68D] hover:text-[#001F3F] text-[#dbe1e7] font-medium py-1 px-3 rounded mr-2 flex items-center"
                  aria-label="Set status to Available"
                >
                  Available
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(currentSlot.id, "Not Available")
                  }
                  className="bg-[#FFBD73] hover:bg-[#FFC107] text-[#001F3F] font-medium py-1 px-3 rounded mr-2 flex items-center"
                  aria-label="Set status to Not Available"
                >
                  {" "}
                  Not Available
                </button>
              </div>
              <button
                onClick={() => setShowStatusModal(false)}
                className="bg-[#AE445A] hover:bg-[#FF4545] text-[#001F3F] font-medium py-1 px-3 rounded flex items-center w-fit mx-auto"
                aria-label="Close the status modal"
              >
                Close
                <MdClose />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        //   <div className="bg-[#A6AEBF] rounded shadow-lg p-6 w-96">
        //     <h2 className="text-xl font-semibold mb-4">Edit Availability</h2>
        //     <form
        //       onSubmit={(e) => {
        //         e.preventDefault();
        //         handleAddOrUpdateSlot();
        //       }}
        //     >
        //       {/* Date - Start Date */}
        //       <label className="block mb-4">
        //         <span className="block text-gray-700 mb-2">Start Date:</span>
        //         <input
        //           type="date"
        //           value={formData.start_date}
        //           onChange={(e) =>
        //             setFormData({ ...formData, start_date: e.target.value })
        //           }
        //           className="border border-gray-300 rounded w-full p-2"
        //           required
        //         />
        //       </label>

        //       {/* Date - End Date */}
        //       <label className="block mb-4">
        //         <span className="block text-gray-700 mb-2">End Date:</span>
        //         <input
        //           type="date"
        //           value={formData.end_date}
        //           onChange={(e) =>
        //             setFormData({ ...formData, end_date: e.target.value })
        //           }
        //           className="border border-gray-300 rounded w-full p-2"
        //           required
        //         />
        //       </label>

        //       {/* Time */}
        //       <label className="block mb-4">
        //         <span className="block text-gray-700 mb-2">Time</span>
        //         <input
        //           type="time"
        //           value={formData.time}
        //           onChange={(e) =>
        //             setFormData({ ...formData, time: e.target.value })
        //           }
        //           className="border border-gray-300 rounded w-full p-2"
        //           required
        //         />
        //       </label>

        //       {/* Mode */}
        //       <label className="block mb-4">
        //         <span className="block text-gray-700 mb-2">Mode</span>
        //         <select
        //           value={formData.mode}
        //           onChange={(e) =>
        //             setFormData({ ...formData, mode: e.target.value })
        //           }
        //           className="border border-gray-300 rounded w-full p-2"
        //         >
        //           <option value="video">Video</option>
        //           <option value="call">Call</option>
        //         </select>
        //       </label>

        //       {/* Duration */}
        //       <label className="block mb-4">
        //         <span className="block text-gray-700 mb-2">Duration</span>
        //         <input
        //           type="number"
        //           value={formData.duration}
        //           onChange={(e) =>
        //             setFormData({ ...formData, duration: e.target.value })
        //           }
        //           min="1"
        //           className="border border-gray-300 rounded w-full p-2"
        //           required
        //         />
        //       </label>

        //       <div className="flex justify-end">
        //         <button
        //           type="button"
        //           onClick={resetForm}
        //           className="bg-[#B3C8CF] hover:bg-gray-500 text-[#2C394B] font-medium py-2 px-4 rounded mr-2"
        //         >
        //           Cancel
        //         </button>
        //         <button
        //           type="submit"
        //           className="bg-[#8174A0] hover:bg-[#A888B5] text-white font-medium py-2 px-4 rounded"
        //         >
        //           Update
        //         </button>
        //       </div>
        //     </form>
        //   </div>
        // </div>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#D3F1DF] rounded-lg shadow-lg p-8 w-96 transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center ">
              Edit Availability
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddOrUpdateSlot();
              }}
              className="grid grid-cols-1 gap-4"
            >
              {/* Two Column Layout */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Date - Start Date */}
                <label className="block">
                  <span className="block text-gray-700 mb-2">Start Date:</span>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) =>
                      setFormData({ ...formData, start_date: e.target.value })
                    }
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                    required
                  />
                </label>

                {/* Date - End Date */}
                <label className="block">
                  <span className="block text-gray-700 mb-2">End Date:</span>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) =>
                      setFormData({ ...formData, end_date: e.target.value })
                    }
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                    required
                  />
                </label>
              </div>

              {/* Two Column Layout continued: Time and Mode */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Time */}
                <label className="block">
                  <span className="block text-gray-700 mb-2">Time</span>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                    required
                  />
                </label>

                {/* Mode */}
                <label className="block">
                  <span className="block text-gray-700 mb-2">Mode</span>
                  <select
                    value={formData.mode}
                    onChange={(e) =>
                      setFormData({ ...formData, mode: e.target.value })
                    }
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                  >
                    <option value="video">Video</option>
                    <option value="call">Call</option>
                  </select>
                </label>
              </div>

              {/* Duration */}
              <label className="block mb-6">
                <span className="block text-gray-700 mb-2">
                  Duration (minutes)
                </span>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  min="1"
                  className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                  required
                />
              </label>

              {/* Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#8174A0] hover:bg-[#A888B5] text-white font-medium py-2 px-4 rounded-md transition duration-300"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AvailabilityManagements;

// function AvailabilityForm({
//   formData,
//   setFormData,
//   handleAddOrUpdateSlot,
//   resetForm,
// }) {
//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">
//         Set Availability
//       </h2>

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleAddOrUpdateSlot();
//         }}
//         className="space-y-6"
//       >
//         {/* Date Picker */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Select Date :
//           </label>
//           <DatePicker
//             selected={formData.start_date}
//             onChange={(date) =>
//               setFormData((prev) => ({ ...prev, start_date: date }))
//             }
//             selectsStart
//             startDate={formData.start_date}
//             endDate={formData.end_date}
//             dateFormat="yyyy-MM-dd"
//             className="w-full border border-gray-300 rounded p-2"
//             placeholderText="Select start date"
//           />
//           <DatePicker
//             selected={formData.end_date}
//             onChange={(date) =>
//               setFormData((prev) => ({ ...prev, end_date: date }))
//             }
//             selectsEnd
//             startDate={formData.start_date}
//             endDate={formData.end_date}
//             minDate={formData.start_date}
//             dateFormat="yyyy-MM-dd"
//             className="w-full border border-gray-300 rounded p-2 mt-2"
//             placeholderText="Select end date"
//           />
//         </div>

//         {/* Time Picker */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Select Time
//           </label>
//           <input
//             type="time"
//             value={formData.time}
//             onChange={(e) =>
//               setFormData((prev) => ({ ...prev, time: e.target.value }))
//             }
//             className="w-full border border-gray-300 rounded p-2"
//             required
//           />
//         </div>

//         {/* Mode */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Mode
//           </label>
//           <select
//             value={formData.mode}
//             onChange={(e) =>
//               setFormData((prev) => ({ ...prev, mode: e.target.value }))
//             }
//             className="w-full border border-gray-300 rounded p-2"
//             required
//           >
//             <option value="video">Video</option>
//             <option value="call">Call</option>
//           </select>
//         </div>

//         {/* Duration */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Duration (Minutes)
//           </label>
//           <input
//             type="number"
//             value={formData.duration}
//             onChange={(e) =>
//               setFormData((prev) => ({ ...prev, duration: e.target.value }))
//             }
//             min="1"
//             className="w-full border border-gray-300 rounded p-2"
//             required
//           />
//         </div>

//         {/* Actions */}
//         <div className="flex justify-end space-x-3">
//           <button
//             type="button"
//             onClick={resetForm}
//             className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="bg-[#8174A0] hover:bg-[#A888B5] text-white font-medium py-2 px-4 rounded"
//           >
//             Add
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

function AvailabilityForm({
  formData,
  setFormData,
  handleAddOrUpdateSlot,
  resetForm,
}) {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg relative z-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Set Availability
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddOrUpdateSlot();
        }}
        className="space-y-6"
      >
        {/* Date Picker */}
        <div className="border p-4 rounded-lg shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date :
          </label>
          <div className="flex flex-col space-y-2">
            <DatePicker
              selected={formData.start_date}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, start_date: date }))
              }
              selectsStart
              startDate={formData.start_date}
              endDate={formData.end_date}
              dateFormat="yyyy-MM-dd"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 hover:border-indigo-500"
              placeholderText="Select start date"
            />
            <DatePicker
              selected={formData.end_date}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, end_date: date }))
              }
              selectsEnd
              startDate={formData.start_date}
              endDate={formData.end_date}
              minDate={formData.start_date}
              dateFormat="yyyy-MM-dd"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 hover:border-indigo-500"
              placeholderText="Select end date"
            />
          </div>
        </div>

        {/* Time, Mode, and Duration Sections Here... */}
        <CustomCalendar date={formData} onDateChange={setFormData} />

        {/* Actions */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded shadow"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded shadow"
          >
            Add
          </button>
        </div>
      </form>
      {/* Background gradient */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-blue-300 to-indigo-500 opacity-20 rounded-lg" />
    </div>
  );
}
