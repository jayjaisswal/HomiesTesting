import { useState, useEffect } from "react";
import { getAllStudents } from "../../../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Invoices() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const [allStudents, setAllStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [messAmount, setMessAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAll = async () => {
    const data = await getAllStudents();
    setAllStudents(data.students);
  };

  const handleGenerateBill = async () => {
    if (!messAmount || isNaN(messAmount)) {
      toast.error("Please enter a valid mess amount", { autoClose: 3000 });
      return;
    }

    const res = await fetch(`${mainUri}/api/student/generate-mess-bill`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selectedStudent._id,
        messAmount,
      }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Mess Bill Generated!", { autoClose: 3000 });
      setIsModalOpen(false);
      setMessAmount("");
    } else {
      toast.error(data.errors[0].msg, { autoClose: 3000 });
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col gap-5 items-center justify-start py-28 px-4 bg-[#f3e8ff] overflow-x-hidden">
      <h1 className="font-bold text-4xl md:text-5xl text-black mb-5 text-center">
        All Students
      </h1>

      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl bg-white px-6 py-5 rounded-2xl shadow-2xl overflow-y-auto max-h-[500px] border border-gray-300">
        <span className="text-black font-bold text-xl md:text-2xl block mb-5 text-center">
          Student List
        </span>

        <ul role="list" className="divide-y divide-gray-200">
          {allStudents.length === 0 ? (
            <p className="text-center text-gray-500">No Students Found</p>
          ) : (
            allStudents.map((student) => (
              <li
                key={student._id}
                className="py-4 px-2 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:bg-[#f3e8ff] rounded-lg transition-all group"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-[#4f46e5]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base md:text-lg font-semibold text-black truncate">
                      {student.name}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {student.urn} | Room: {student.room_no}
                    </p>
                  </div>
                </div>
                <div className="mt-3 sm:mt-0">
                  <button
                    onClick={() => {
                      setSelectedStudent(student);
                      setIsModalOpen(true);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700"
                  >
                    Generate Bill
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Generate Mess Bill
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={selectedStudent.name}
                  readOnly
                  className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">URN</label>
                <input
                  type="text"
                  value={selectedStudent.urn}
                  readOnly
                  className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Room No
                </label>
                <input
                  type="text"
                  value={selectedStudent.room_no}
                  readOnly
                  className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Mess Bill
                </label>
                <input
                  type="number"
                  value={messAmount}
                  onChange={(e) => setMessAmount(e.target.value)}
                  placeholder="Enter Mess Bill"
                  className="w-full px-3 py-2 mt-1 border rounded-lg"
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setMessAmount("");
                }}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateBill}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Generate Bill
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default Invoices;
