

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventRequestVerification = () => {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [remarks, setRemarks] = useState({});
  const [activeTab, setActiveTab] = useState("Pending");

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`${mainUri}/api/Event/EventFund/get`);
        setEvents(response.data.eventFundData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEventData();
  }, []);

  const handleStatusChange = (eventId, newStatus) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [eventId]: newStatus,
    }));
  };

  const handleRemarkChange = (eventId, value) => {
    setRemarks((prev) => ({
      ...prev,
      [eventId]: value,
    }));
  };

  const updateStatus = async (eventId) => {
    const selectedStatus = statusUpdates[eventId];
    const remarkText = remarks[eventId] || "";

    if (!selectedStatus) {
      toast.warn("Please select a status before updating.");
      return;
    }

    if (selectedStatus === "failed" && remarkText.trim() === "") {
      toast.error("Remark is required for failed requests.");
      return;
    }

    try {
      await axios.put(`${mainUri}/api/Event/EventFund/admin/update`, {
        eventFundId: eventId,
        status: selectedStatus,
        remark: selectedStatus === "failed" ? remarkText : "not required",
      });

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId
            ? {
                ...event,
                status: selectedStatus,
                remark: selectedStatus === "failed" ? remarkText : "not required",
              }
            : event
        )
      );

      toast.success("Status updated successfully!");
    } catch (err) {
      toast.error("Failed to update status.");
      console.error(err);
    }
  };

  const filteredEvents = events.filter(
    (event) => event.status === activeTab.toLowerCase()
  );

  const tabs = ["Pending", "Success", "Failed"];

  if (loading) return <p className="text-center text-black">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 mt-24">
      <h2 className="text-black text-center text-xl font-bold mb-6">
        Event Fund Requests
      </h2>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab
                ? "bg-[#4f46e5] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div className="max-h-[500px] overflow-y-auto space-y-4">
        {filteredEvents.length === 0 ? (
          <p className="text-center text-gray-500">
            No events in "{activeTab}" tab.
          </p>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event._id}
              className="p-5 border border-gray-200 rounded-lg bg-white shadow-sm"
            >
              <h3 className="text-lg font-semibold text-[#4f46e5] mb-2">
                Student Details
              </h3>
              <p className="text-gray-700">
                <span className="font-medium text-black">Name:</span> {event.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-black">URN:</span> {event.urn}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-black">Room No:</span> {event.roomNumber}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-black">Hostel No:</span> {event.hostelNumber}
              </p>

              <hr className="my-3" />

              <h3 className="text-lg font-semibold text-[#4f46e5] mb-2">
                Event Details
              </h3>
              <p className="text-gray-700">
                <span className="font-medium text-black">Event Description:</span>{" "}
                {event.eventDetails}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-black">Fund Required:</span> ₹
                {event.fundRequired}
              </p>

              <p className="text-gray-700 mt-2">
                <span className="font-medium text-black">Status:</span>{" "}
                <span
                  className={`font-semibold ${
                    event.status === "success"
                      ? "text-green-600"
                      : event.status === "failed"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {event.status}
                </span>
              </p>

              {event.status === "pending" && (
                <div className="mt-4 space-y-3">
                  <select
                    className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5]"
                    value={statusUpdates[event._id] || ""}
                    onChange={(e) =>
                      handleStatusChange(event._id, e.target.value)
                    }
                  >
                    <option value="">Select Status</option>
                    <option value="success">Success</option>
                    <option value="failed">Failed</option>
                  </select>

                  {/* Remark Input for failed */}
                  {statusUpdates[event._id] === "failed" && (
                    <textarea
                      placeholder="Enter remark (required for failed requests)"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-400"
                      value={remarks[event._id] || ""}
                      onChange={(e) =>
                        handleRemarkChange(event._id, e.target.value)
                      }
                      required
                    />
                  )}

                  <button
                    className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-4 py-2 rounded-md"
                    onClick={() => updateStatus(event._id)}
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EventRequestVerification;
