import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNotification } from "../context/NotificationContext";
import { MdFirstPage, MdLastPage } from "react-icons/md";
import Calendar from "react-calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

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
  const { triggerNotification } = useNotification();
  const [currentPage, setCurrentPage] = useState(1);
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
      ];

      setAvailability(mockData);
    };
    fetchAvailability();
  }, []);

  const resetForm = () => {
    setFormData({
      start_date: "",
      end_date: "",
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
        slot.date >= start_date &&
        slot.date <= end_date &&
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
      setAvailability((prev) =>
        prev.map((slot) => (slot.id === currentSlot.id ? newSlot : slot))
      );
    } else {
      setAvailability((prev) => [...prev, newSlot]);
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

  const filteredAvailability = availability.filter((slot) =>
    Object.values(slot)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  useEffect(() => setCurrentPage(1), [searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAvailability.length / slotsPerPage);
  const indexOfLastSlot = currentPage * slotsPerPage;
  const indexOfFirstSlot = indexOfLastSlot - slotsPerPage;

  const currentSlots = filteredAvailability.slice(
    indexOfFirstSlot,
    indexOfLastSlot
  );

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">
          Availability Management
        </h1>
      </div>

      <div className="flex justify-between mb-8">
        <input
          type="text"
          placeholder="Search sessions..."
          className="border border-gray-300 rounded w-fit p-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search sessions"
        />
      </div>

      <button
        onClick={() => {
          resetForm();
        }}
        className="bg-[#8174A0] hover:bg-[#A888B5] text-white py-2 px-4 rounded w-fit"
      >
        Set Availability
      </button>

      {/* set availability */}
      <div className="">
        <AvailabilityForm
          formData={formData}
          setFormData={setFormData}
          handleAddOrUpdateSlot={handleAddOrUpdateSlot}
          resetForm={resetForm}
          isEditMode={isEditMode}
        />
      </div>

      {/* Availability Table */}

      {/* <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#A6AEBF]">
            <th className="border border-[#DFF2EB] px-4 py-2">Sr.No.</th>
            <th className="border border-[#DFF2EB] px-4 py-2">Date</th>
            <th className="border border-[#DFF2EB] px-4 py-2">Day</th>
            <th className="border border-[#DFF2EB] px-4 py-2">Time</th>
            <th className="border border-[#DFF2EB] px-4 py-2">Mode</th>
            <th className="border border-[#DFF2EB] px-4 py-2">Duration</th>
            <th className="border border-[#DFF2EB] px-4 py-2">Status</th>
            <th className="border border-[#DFF2EB] px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentSlots.length > 0 ? (
            currentSlots.map((slot, index) => (
              <tr key={slot.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {indexOfFirstSlot + index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {slot.date}
                </td>
                <td className="border border-gray-300 px-4 py-2">{slot.day}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {slot.time}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {slot.mode}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {slot.duration} mins
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span
                    className={`py-1 px-2 rounded text-white ${
                      slot.status === "Available"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {slot.status}
                  </span>
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEditSlot(slot)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 px-3 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSlot(slot.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center p-4 text-gray-500 font-medium"
              >
                No sessions found.
              </td>
            </tr>
          )}
        </tbody>
      </table> */}

      <section className="bg-white antialiased">
        <div className="max-w-screen-xl px-4 py-6 mx-auto lg:px-6 sm:py-16 lg:py-24">
          <div className="overflow-x-auto mt-8">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 ">
                  <th className="border border-gray-300  px-4 py-2 text-gray-700 ">
                    Sr. No.
                  </th>
                  <th className="border border-gray-300  px-4 py-2 text-gray-700 ">
                    Date
                  </th>
                  <th className="border border-gray-300  px-4 py-2 text-gray-700 ">
                    Day
                  </th>
                  <th className="border border-gray-300  px-4 py-2 text-gray-700 ">
                    Time
                  </th>
                  <th className="border border-gray-300  px-4 py-2 text-gray-700 ">
                    Mode
                  </th>
                  <th className="border border-gray-300  px-4 py-2 text-gray-700 ">
                    Duration
                  </th>
                  <th className="border border-gray-300  px-4 py-2 text-gray-700 ">
                    Status
                  </th>
                  <th className="border border-gray-300  px-4 py-2 text-gray-700 ">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentSlots.length > 0 ? (
                  currentSlots.map((slot, index) => (
                    <tr key={slot.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300  px-4 py-2 text-gray-700 ">
                        {indexOfFirstSlot + index + 1}
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
                              ? "bg-green-500 "
                              : "bg-gray-500 "
                          }`}
                        >
                          {slot.status}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-700">
                        <button
                          onClick={() => handleEditSlot(slot)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 px-3 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded"
                        >
                          Delete
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
                  onClick={() => handleChangePage(1)}
                  disabled={currentPage === 1}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-l"
                >
                  <MdFirstPage />
                </button>
                <button
                  onClick={() => handleChangePage(totalPages)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex  items-center justify-center">
          <div className="bg-[#A6AEBF] rounded shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Add Availability</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddOrUpdateSlot();
              }}
            >
              {/* Date-start date*/}
              <label className="block mb-4">
                <span className="block text-gray-700 mb-2">Start Date:</span>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="border border-gray-300 rounded w-full p-2"
                  required
                />
              </label>

              {/* Date-end date*/}
              <label className="block mb-4">
                <span className="block text-gray-700 mb-2">End Date:</span>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="border border-gray-300 rounded w-full p-2"
                  required
                />
              </label>
              {/* Time */}
              <label className="block mb-4">
                <span className="block text-gray-700 mb-2">Time</span>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  className="border border-gray-300 rounded w-full p-2"
                  required
                />
              </label>

              {/* Mode */}
              <label className="block mb-4">
                <span className="block text-gray-700 mb-2">Mode</span>
                <select
                  value={formData.mode}
                  onChange={(e) =>
                    setFormData({ ...formData, mode: e.target.value })
                  }
                  className="border border-gray-300 rounded w-full p-2"
                >
                  <option value="video">Video</option>
                  <option value="call">Call</option>
                </select>
              </label>

              <label className="block mb-4">
                <span className="block text-gray-700 mb-2">Duration</span>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  min="1"
                  className="border border-gray-300 rounded w-full p-2"
                  required
                />
              </label>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-[#B3C8CF] hover:bg-gray-500 text-[#2C394B] font-medium py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#8174A0] hover:bg-[#A888B5] text-white font-medium py-2 px-4 rounded"
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

//
function AvailabilityForm({
  formData,
  setFormData,
  handleAddOrUpdateSlot,
  resetForm,
  isEditMode,
}) {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {isEditMode ? "Edit Availability" : "Set Availability"}
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddOrUpdateSlot();
        }}
        className="space-y-6"
      >
        {/* Date Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <DatePicker
            selected={formData.start_date}
            onChange={(date) =>
              setFormData((prev) => ({ ...prev, start_date: date }))
            }
            selectsStart
            startDate={formData.start_date}
            endDate={formData.end_date}
            dateFormat="yyyy-MM-dd"
            className="w-full border border-gray-300 rounded p-2"
            placeholderText="Click to select start date"
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
            className="w-full border border-gray-300 rounded p-2 mt-2"
            placeholderText="Click to select end date"
          />
        </div>

        {/* Time Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Time
          </label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, time: e.target.value }))
            }
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        {/* Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mode
          </label>
          <select
            value={formData.mode}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, mode: e.target.value }))
            }
            className="w-full border border-gray-300 rounded p-2"
            required
          >
            <option value="video">Video</option>
            <option value="call">Call</option>
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (Minutes)
          </label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, duration: e.target.value }))
            }
            min="1"
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#8174A0] hover:bg-[#A888B5] text-white font-medium py-2 px-4 rounded"
          >
            {isEditMode ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
