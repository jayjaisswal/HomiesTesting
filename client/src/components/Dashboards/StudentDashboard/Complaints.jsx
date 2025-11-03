import axios from "axios";
import { useEffect, useState } from "react";

// Reusable Input Component
const Input = ({ field }) => (
  <div className="mb-2">
    <label
      htmlFor={field.name}
      className="block mb-2 text-sm font-medium text-gray-800"
    >
      {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
    </label>
    <input
      type={field.type}
      id={field.name}
      placeholder={field.placeholder}
      required={field.req}
      onChange={field.onChange}
      value={field.value}
      className="border text-sm rounded-lg block w-full p-2.5 bg-white border-gray-300 text-black-800 focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

// Notification Component
const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div
        className={`p-4 rounded-lg shadow-lg flex items-center justify-between ${
          type === "success"
            ? "bg-green-600 text-white"
            : "bg-red-600 text-white"
        }`}
      >
        <div className="flex items-center">
          <span className="mr-2">{type === "success" ? "✅" : "❌"}</span>
          <span>{message}</span>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

function Complaints() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("Electric");
  const [regComplaints, setRegComplaints] = useState([]);
  const [notification, setNotification] = useState(null);

  const types = ["Electric", "Furniture", "Cleaning", "Others"];

  const student = JSON.parse(localStorage.getItem("student"));
  const fetchComplaints = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_MAIN_URI}/api/complaint/student`,
        {
          student: student._id,
        }
      );
      console.log(res.data.complaints);
      setRegComplaints(res.data.complaints || []);
    } catch (err) {
      console.error("Error fetching complaints:", err);
      setNotification({ message: "Failed to fetch complaints", type: "error" });
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const registerComplaint = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
  const res = await axios.post(
    `${import.meta.env.VITE_MAIN_URI}/api/complaint/register`,
    {
      student: student._id,
      hostel: student.hostel,
      type,
      title,
      description: desc,
    }
  );

  // ✅ Fetch message directly from backend
  setNotification({
    message: res.data.msg || "Complaint Registered Successfully!",
    type: res.data.success ? "success" : "error",
  });

  if (res.data.success) {
    setTitle("");
    setDesc("");
    setType("Electric");
    fetchComplaints();
  }
} catch (err) {
  console.error(err);

  // ❌ Show backend error if available
  setNotification({
    message:
      err.response?.data?.msg || "Something went wrong while registering complaint!",
    type: "error",
  });
}

  };

  return (
    <div className="min-h-screen w-full p-6 mt-10 flex flex-col items-center justify-start bg-white">
      <h1 className="font-bold text-4xl mt-6 mb-8 text-indigo-700">
        Complaints
      </h1>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="flex gap-8 flex-wrap items-start justify-center max-w-5xl">
        {/* Complaint Form */}
        <form
          onSubmit={registerComplaint}
          className="w-full md:w-96 p-6 bg-white rounded-xl shadow-lg flex flex-col gap-5 border border-indigo-100"
        >
          <h2 className="text-xl font-semibold text-indigo-700">
            Register New Complaint
          </h2>

          <div>
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Complaint Type
            </label>
            <select
              className="border text-sm rounded-lg block w-full p-2.5 bg-white border-gray-300 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {type.toLowerCase() === "others" && (
            <Input
              field={{
                name: "complaint type",
                placeholder: "Type...",
                req: true,
                type: "text",
                value: type,
                onChange: (e) => setType(e.target.value),
              }}
            />
          )}

          <Input
            field={{
              name: "complaint title",
              placeholder: "Title",
              req: true,
              type: "text",
              value: title,
              onChange: (e) => setTitle(e.target.value),
            }}
          />

          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Complaint Description
            </label>
            <textarea
              placeholder="Details of complaint"
              className="border text-sm rounded-lg block w-full p-2.5 bg-white border-gray-300 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 outline-none min-h-24"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
            <button
              type="submit"
              className="w-full text-white rounded-lg px-5 py-2.5 mt-5 text-center font-medium hover:scale-95 transition-all duration-200"
              disabled={loading}
              style={{ backgroundColor: "#4f46e5" }}
            >
              {loading ? "Registering..." : "Register Complaint"}
            </button>
          </div>
        </form>

        {/* Complaints List */}
        <div className="w-full md:w-96 max-h-96 p-5 rounded-xl shadow-lg bg-white border border-indigo-100 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-indigo-700">
              Registered Complaints
            </h2>
          </div>

          <ul className="divide-y divide-gray-200">
            {regComplaints.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No complaints found
              </p>
            ) : (
              regComplaints.map(
                (complain, index) => (
                  console.log(complain.status),
                  (
                    // <li key={index} className="py-3">
                    //   <div className="flex items-center space-x-4">
                    //     <div className="flex-shrink-0">
                    //       {complain.status?.toLowerCase() === "solved" ? "Sloved" : "Pending"}
                    //     </div>
                    //     <div className="flex-1 min-w-0">
                    //       <p className="text-sm font-medium truncate text-gray-800">{complain.title}</p>
                    //       <p className="text-sm truncate text-gray-500">{complain.date || "No Date"}</p>
                    //     </div>
                    //   </div>
                    // </li>
                    <li key={index} className="py-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-gray-800">
                            {complain.title}
                          </p>
                          <p className="text-sm truncate text-gray-500">
                            {complain.date
                              ? new Date(complain.date).toLocaleDateString()
                              : "No Date"}
                          </p>
                        </div>
                         <div className="flex-shrink-0">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              complain.status?.toLowerCase() === "solved"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {complain.status?.toLowerCase() === "solved"
                              ? "Solved"
                              : "Pending"}
                          </span>
                        </div>
                      </div>
                    </li>
                  )
                )
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Complaints;
