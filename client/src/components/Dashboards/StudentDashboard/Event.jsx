
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import "react-toastify/dist/ReactToastify.css";

const Event = () => {
  const storedStudent = JSON.parse(localStorage.getItem("student"));
  const studentId = storedStudent?._id || "";
  const mainUri = import.meta.env.VITE_MAIN_URI;

  const [formData, setFormData] = useState({
    eventDetails: "",
    fundRequired: "",
    hostelNumber: "",
  });
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);

  const hostelOptions = [
    { value: "", label: "Select Hostel" },
    { value: 1, label: "Hostel No 1" },
    { value: 2, label: "Hostel No 2" },
    { value: 3, label: "Hostel No 3" },
    { value: 4, label: "Hostel No 4" },
    { value: 5, label: "Hostel No 5" },
  ];

  // ✅ Fetch all events of current student
  const fetchEvents = async () => {
  try {
    console.log("studentId", studentId);
    setLoading(true);

    // ✅ Pass studentId in the request body correctly
    const res = await axios.post(
      `${mainUri}/api/Event/EventFund/student/get`,
      { studentId }
    );

    if (res.data.success) {
      setEventList(res.data.eventDetails);
    } else {
      setEventList([]);
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to load event data.");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    if (studentId) fetchEvents();
  }, [studentId]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit event fund form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!storedStudent) {
      toast.error("Please login first!");
      return;
    }
    if (!formData.hostelNumber) {
      toast.error("Please select a hostel number!");
      return;
    }

    const payload = {
      student: studentId,
      name: storedStudent.name,
      urn: storedStudent.urn,
      roomNumber: storedStudent.room_no,
      hostelNumber: formData.hostelNumber,
      eventDetails: formData.eventDetails,
      fundRequired: formData.fundRequired,
    };

    try {
      const response = await axios.post(`${mainUri}/api/Event/EventFund`, payload);
      console.log(response)
      if (response.data.success) {
        toast.success("Event Fund Submitted Successfully!");
        setFormData({ eventDetails: "", fundRequired: "", hostelNumber: "" });
        fetchEvents();
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Server Error!");
    }
  };

  // ✅ Function to get color class based on status
  const getStatusClass = (status) => {
    switch (status) {
      case "Success":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      case "Rejected":
        return "text-red-600";
      case "In Progress":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const statusIcons = {
    Sent: PaperAirplaneIcon,
    "In Progress": ClockIcon,
    Success: CheckCircleIcon,
    Pending: XCircleIcon,
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#f3e8ff] pt-24 px-4 sm:px-6">
      <ToastContainer />

      {/* ✅ Event Form */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-10">
        <h2 className="text-3xl font-bold text-[#4f46e5] text-center mb-4">
          Event Fund Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black font-semibold mb-1">
              Event Details
            </label>
            <textarea
              name="eventDetails"
              rows="3"
              className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
              value={formData.eventDetails}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-black font-semibold mb-1">
              Hostel Number
            </label>
            <select
              name="hostelNumber"
              className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
              value={formData.hostelNumber}
              onChange={handleChange}
              required
            >
              {hostelOptions.map((hostel) => (
                <option key={hostel.value} value={hostel.value}>
                  {hostel.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-black font-semibold mb-1">
              Fund Required (₹)
            </label>
            <input
              type="number"
              name="fundRequired"
              className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
              value={formData.fundRequired}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-[#4f46e5] hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* ✅ Display Event Requests */}
      <div className="w-full max-w-4xl text-black">
        <h2 className="text-xl font-bold mb-4 text-[#4f46e5]">
          Your Event Fund Requests
        </h2>

        {loading ? (
          <p>Loading events...</p>
        ) : eventList.length > 0 ? (
          eventList.map((event) => {
            const Icon =
              statusIcons[event.status] || PaperAirplaneIcon;
            return (
              <div
                key={event._id}
                className="p-5 mb-4 bg-white shadow-md border border-gray-200 rounded-xl"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-[#4f46e5]">
                    {event.eventDetails}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Icon className={`h-6 w-6 ${getStatusClass(event.status)}`} />
                    <span
                      className={`font-semibold ${getStatusClass(event.status)}`}
                    >
                      {event.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm mb-1">
                  <strong>Fund Required:</strong> ₹{event.fundRequired}
                </p>
                <p className="text-sm mb-1">
                  <strong>Hostel:</strong> {event.hostelNumber}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Submitted on:{" "}
                  {new Date(event.createdAt).toLocaleString("en-IN")}
                </p>

                {/* ✅ Show Admin Remark if available */}
                {event.remark && (
                  <p className="text-sm text-red-600 mt-2">
                    <strong>Remark:</strong> {event.remark}
                  </p>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-600">No event requests found.</p>
        )}
      </div>
    </div>
  );
};

export default Event;
