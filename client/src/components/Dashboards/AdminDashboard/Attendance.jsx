// import { useEffect, useState } from "react";
// import { Doughnut } from "react-chartjs-2";
// import { getAllStudents } from "../../../utils";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import LoadingBar from "react-top-loading-bar";

// function Attendance() {
//   const mainUri = import.meta.env.VITE_MAIN_URI;
//   const [progress, setProgress] = useState(0);
//   const [unmarkedStudents, setUnmarkedStudents] = useState([]);
//   const [markedStudents, setMarkedStudents] = useState([]);
//   const [present, setPresent] = useState(0);
//   const [loadingId, setLoadingId] = useState(null);

//   const getALL = async () => {
//     try {
//       setProgress(30);

//       const marked = await fetch(`${mainUri}/api/attendance/getHostelAttendance`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           hostel: JSON.parse(localStorage.getItem("admin")).hostel,
//         }),
//       });

//       setProgress(40);
//       const markedData = await marked.json();
//       setProgress(50);

//       const markedStudents = markedData.attendance.map((student) => ({
//         id: student.student._id,
//         urn: student.student.urn,
//         name: student.student.name,
//         room: student.student.room_no,
//         attendance: student.status === "present",
//       }));

//       setMarkedStudents(markedStudents);
//       setPresent(markedStudents.filter((s) => s.attendance).length);

//       setProgress(70);

//       const data = await getAllStudents();
//       const students = data.students;

//       const unmarked = students
//         .filter(
//           (student) =>
//             !markedStudents.find((markedStudent) => markedStudent.id === student._id)
//         )
//         .map((student) => ({
//           id: student._id,
//           name: student.name,
//           urn: student.urn,
//           room: student.room_no,
//           attendance: undefined,
//         }));

//       setUnmarkedStudents(unmarked);
//       setProgress(100);
//     } catch (err) {
//       toast.error("Error fetching data", { theme: "dark" });
//       setProgress(100);
//     }
//   };

//   const markAttendance = async (id, isPresent) => {
//     try {
//       setLoadingId(id);
//       const res = await fetch(`${mainUri}/api/attendance/mark`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ student: id, status: isPresent ? "present" : "absent" }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         toast.success("Attendance Marked Successfully!", { theme: "dark" });

//         const updatedUnmarked = unmarkedStudents.filter((s) => s.id !== id);
//         const markedStudent = unmarkedStudents.find((s) => s.id === id);
//         markedStudent.attendance = isPresent;

//         setUnmarkedStudents(updatedUnmarked);
//         setMarkedStudents((prev) => [...prev, markedStudent]);

//         if (isPresent) setPresent((prev) => prev + 1);
//       } else {
//         toast.error("Failed to mark attendance", { theme: "dark" });
//       }
//     } catch (err) {
//       toast.error("An error occurred", { theme: "dark" });
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   useEffect(() => {
//     getALL();
//   }, []);

//   const date = new Date().toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

//   const labels = ["Present", "Absentees", "Unmarked Students"];
//   const graph = (
//     <div className="flex flex-col-reverse md:flex-row-reverse items-center gap-3 h-64">
//       <Doughnut
//         datasetIdKey="id"
//         data={{
//           labels,
//           datasets: [
//             {
//               label: "No. of Students",
//               data: [
//                 present,
//                 markedStudents.length - present,
//                 unmarkedStudents.length,
//               ],
//               backgroundColor: ["#4f46e5", "#F26916", "#808080"],
//               borderColor: "rgba(0,0,0,0)",
//               hoverOffset: 10,
//             },
//           ],
//         }}
//         options={{ plugins: { legend: { display: false } } }}
//       />
//       <ul className="text-black text-sm md:text-base">
//         <li className="flex gap-2 items-center">
//           <span className="w-6 h-3 bg-orange-500 block rounded-sm"></span> Absent
//         </li>
//         <li className="flex gap-2 items-center">
//           <span className="w-6 h-3 bg-blue-500 block rounded-sm"></span> Present
//         </li>
//       </ul>
//     </div>
//   );

//   return (
//   <div className="w-full min-h-screen flex flex-col gap-3 items-center pt-24 md:pt-40 justify-start bg-[#f3e8ff] px-4 lg:pl-64">
//     <LoadingBar color="#4f46e5" progress={progress} onLoaderFinished={() => setProgress(0)} />
//     <h1 className="text-black font-bold text-3xl md:text-5xl text-center">Attendance</h1>
//     <p className="text-black text-lg md:text-xl mb-10">Date: {date}</p>

//     <div className="flex flex-col md:flex-row gap-5 items-center justify-center w-full max-w-6xl">
//       {graph}

//       <div className="flow-root w-full md:w-[400px] bg-white px-4 py-5 rounded-lg shadow-xl max-h-[300px] overflow-auto">
//         <span
//           className={`font-bold text-xl text-black ${unmarkedStudents.length ? "block" : "hidden"}`}
//         >
//           Unmarked Students
//         </span>
//         <ul role="list" className="divide-y divide-gray-300 text-black">
//           {unmarkedStudents.length === 0
//             ? "All students are marked!"
//             : unmarkedStudents.map((student) =>
//                 student.attendance === undefined ? (
//                   <li
//                     className="py-3 sm:py-4 px-5 rounded hover:bg-neutral-200 hover:scale-105 transition-all"
//                     key={student.id}
//                   >
//                     <div className="flex items-center space-x-4">
//                       <div className="flex-shrink-0 text-black">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none"
//                           viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
//                           className="w-6 h-6">
//                           <path strokeLinecap="round" strokeLinejoin="round"
//                             d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z
//                             M4.501 20.118a7.5 7.5 0 0114.998 0
//                             A17.933 17.933 0 0112 21.75
//                             c-2.676 0-5.216-.584-7.499-1.632z"
//                           />
//                         </svg>
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium truncate text-black">
//                           {student.name}
//                         </p>
//                         <p className="text-sm truncate text-gray-600">
//                           {student.urn} | Room: {student.room}
//                         </p>
//                       </div>
//                       <button
//                         className="hover:underline hover:text-green-600 hover:scale-125 transition-all"
//                         onClick={() => markAttendance(student.id, true)}
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none"
//                           viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
//                           className="w-6 h-6">
//                           <path strokeLinecap="round" strokeLinejoin="round"
//                             d="M9 12.75L11.25 15 15 9.75
//                             M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                           />
//                         </svg>
//                       </button>
//                       <button
//                         className="hover:underline hover:text-red-600 hover:scale-125 transition-all"
//                         onClick={() => markAttendance(student.id, false)}
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none"
//                           viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
//                           className="w-6 h-6">
//                           <path strokeLinecap="round" strokeLinejoin="round"
//                             d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5
//                             M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                           />
//                         </svg>
//                       </button>
//                     </div>
//                   </li>
//                 ) : null
//               )}
//         </ul>
//       </div>
//     </div>

//     <ToastContainer
//       position="top-right"
//       autoClose={2000}
//       hideProgressBar={false}
//       newestOnTop={false}
//       closeOnClick
//       rtl={false}
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//       theme="dark"
//     />
//   </div>
// );

// }

// export default Attendance;

import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { getAllStudents } from "../../../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Attendance() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const [progress, setProgress] = useState(0);
  const [unmarkedStudents, setUnmarkedStudents] = useState([]);
  const [markedStudents, setMarkedStudents] = useState([]);
  const [present, setPresent] = useState(0);
  const [loadingId, setLoadingId] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // ---------------------- Fetch Attendance Data ----------------------
  const getALL = async () => {
    try {
      setProgress(30);

      const marked = await fetch(
        `${mainUri}/api/attendance/getHostelAttendance`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hostel: JSON.parse(localStorage.getItem("admin")).hostel,
          }),
        }
      );

      setProgress(40);
      const markedData = await marked.json();
      setProgress(50);

      const markedStudents = markedData.attendance.map((student) => ({
        id: student.student._id,
        urn: student.student.urn,
        name: student.student.name,
        room: student.student.room_no,
        attendance: student.status === "present",
      }));

      setMarkedStudents(markedStudents);
      setPresent(markedStudents.filter((s) => s.attendance).length);

      setProgress(70);

      const data = await getAllStudents();
      const allStudents = data.students;
      setStudents(allStudents);

      const unmarked = allStudents
        .filter(
          (student) =>
            !markedStudents.find(
              (markedStudent) => markedStudent.id === student._id
            )
        )
        .map((student) => ({
          id: student._id,
          name: student.name,
          urn: student.urn,
          room: student.room_no,
          attendance: undefined,
        }));

      setUnmarkedStudents(unmarked);
      setProgress(100);
    } catch (err) {
      toast.error("Error fetching data", { theme: "dark" });
      setProgress(100);
    }
  };

  // ---------------------- Mark Attendance ----------------------
  const markAttendance = async (id, isPresent) => {
    try {
      setLoadingId(id);
      const res = await fetch(`${mainUri}/api/attendance/mark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student: id,
          status: isPresent ? "present" : "absent",
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Attendance Marked Successfully!", { theme: "dark" });

        const updatedUnmarked = unmarkedStudents.filter((s) => s.id !== id);
        const markedStudent = unmarkedStudents.find((s) => s.id === id);
        markedStudent.attendance = isPresent;

        setUnmarkedStudents(updatedUnmarked);
        setMarkedStudents((prev) => [...prev, markedStudent]);

        if (isPresent) setPresent((prev) => prev + 1);
      } else {
        toast.error("Failed to mark attendance", { theme: "dark" });
      }
    } catch (err) {
      toast.error("An error occurred", { theme: "dark" });
    } finally {
      setLoadingId(null);
    }
  };

  // ---------------------- Fetch Single Student Attendance ----------------------
  const fetchStudentAttendance = async (student) => {
    try {
      const res = await fetch(`${mainUri}/api/attendance/get`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student }),
      });

      const data = await res.json();
      if (data.success) {
        console.log("Attendance Data:", data.attendance);
        setStudentAttendance(data.attendance);
      } else {
        toast.error("Unable to fetch student attendance", { theme: "dark" });
      }
    } catch (error) {
      toast.error("Error fetching attendance details", { theme: "dark" });
    }
  };

  // ---------------------- View Attendance Modal ----------------------
  const handleViewAttendance = async (student) => {
    setSelectedStudent(student);
    setShowModal(true);
    // console.log("student id", student._id);
    await fetchStudentAttendance(student._id);
  };

  // ---------------------- Download PDF Report ----------------------
  const downloadPDF = () => {
    if (!selectedStudent) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Attendance Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${selectedStudent.name}`, 14, 30);
    doc.text(`Email: ${selectedStudent.email}`, 14, 62);
    doc.text(`URN: ${selectedStudent.urn}`, 14, 38);
    doc.text(`Room No: ${selectedStudent.room_no}`, 14, 46);
    doc.text(`Department: ${selectedStudent.dept}`, 14, 54);

    // format date as YYYY-MM-DD for the PDF table
    const rows = studentAttendance.map((a) => [
      a.date ? new Date(a.date).toLocaleDateString("en-IN") : "",
      a.status,
    ]);

    // use the imported autoTable function to attach the table to the doc
    autoTable(doc, {
      startY: 70,
      head: [["Date", "Status"]],
      body: rows,
    });

    doc.save(`${selectedStudent.name}_AttendanceReport.pdf`);
  };

  useEffect(() => {
    getALL();
  }, []);

  const date = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const labels = ["Present", "Absentees", "Unmarked Students"];
  const graph = (
    <div className="flex flex-col-reverse md:flex-row-reverse items-center gap-3 h-64">
      <Doughnut
        datasetIdKey="id"
        data={{
          labels,
          datasets: [
            {
              label: "No. of Students",
              data: [
                present,
                markedStudents.length - present,
                unmarkedStudents.length,
              ],
              backgroundColor: ["#4f46e5", "#F26916", "#808080"],
              borderColor: "rgba(0,0,0,0)",
              hoverOffset: 10,
            },
          ],
        }}
        options={{ plugins: { legend: { display: false } } }}
      />
      <ul className="text-black text-sm md:text-base">
        <li className="flex gap-2 items-center">
          <span className="w-6 h-3 bg-orange-500 block rounded-sm"></span>{" "}
          Absent
        </li>
        <li className="flex gap-2 items-center">
          <span className="w-6 h-3 bg-blue-500 block rounded-sm"></span> Present
        </li>
      </ul>
    </div>
  );

  // ---------------------- Component Render ----------------------
  return (
    <div className="w-full min-h-screen flex flex-col gap-3 items-center pt-24 md:pt-40 justify-start bg-[#f3e8ff] px-4 lg:pl-64">
      <LoadingBar
        color="#4f46e5"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <h1 className="text-black font-bold text-3xl md:text-5xl text-center">
        Attendance
      </h1>
      <p className="text-black text-lg md:text-xl mb-10">Date: {date}</p>

      {/* ==================== GRAPH + UNMARKED SECTION ==================== */}
      <div className="flex flex-col md:flex-row gap-5 items-center justify-center w-full max-w-6xl">
        {graph}
        <div className="flow-root w-full md:w-[400px] bg-white px-4 py-5 rounded-lg shadow-xl max-h-[300px] overflow-auto">
          <span
            className={`font-bold text-xl text-black ${
              unmarkedStudents.length ? "block" : "hidden"
            }`}
          >
            Unmarked Students
          </span>
          <ul role="list" className="divide-y divide-gray-300 text-black">
            {unmarkedStudents.length === 0
              ? "All students are marked!"
              : unmarkedStudents.map((student) =>
                  student.attendance === undefined ? (
                    <li
                      className="py-3 sm:py-4 px-5 rounded hover:bg-neutral-200 hover:scale-105 transition-all"
                      key={student.id}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-black">
                            {student.name}
                          </p>
                          <p className="text-sm truncate text-gray-600">
                            {student.urn} | Room: {student.room}
                          </p>
                        </div>
                        <button
                          className="hover:underline hover:text-green-600 hover:scale-125 transition-all"
                          onClick={() => markAttendance(student.id, true)}
                        >
                          ✅
                        </button>
                        <button
                          className="hover:underline hover:text-red-600 hover:scale-125 transition-all"
                          onClick={() => markAttendance(student.id, false)}
                        >
                          ❌
                        </button>
                      </div>
                    </li>
                  ) : null
                )}
          </ul>
        </div>
      </div>

      {/* ==================== ALL STUDENTS SECTION ==================== */}
      <div className="w-full max-w-6xl mt-12 bg-white rounded-lg shadow-xl p-5 overflow-x-auto">
        <h2 className="text-black font-bold text-2xl mb-5 text-center">
          Hostel Students List
        </h2>
        <table className="w-full text-sm md:text-base text-black">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">URN</th>
              <th className="p-2 text-left">Room No</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No Students Found
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr
                  key={student._id}
                  className="border-b hover:bg-gray-100 transition-all"
                >
                  <td className="p-2">{student.name}</td>
                  <td className="p-2">{student.urn}</td>
                  <td className="p-2">{student.room_no}</td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleViewAttendance(student)}
                      className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-800 transition-all text-xs md:text-sm"
                    >
                      View Attendance
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ==================== MODAL ==================== */}
      {showModal && selectedStudent && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md md:max-w-2xl p-6 overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold text-black mb-2">
              {selectedStudent.name}'s Attendance
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              URN: {selectedStudent.urn} | Room: {selectedStudent.room_no}
            </p>

            {studentAttendance.length === 0 ? (
              <p className="text-gray-600 text-center">
                No attendance data found.
              </p>
            ) : (
              <ul className="divide-y divide-gray-200 text-black text-sm">
                {studentAttendance.map((item, index) => (
                  <li key={index} className="py-2 flex justify-between">
                    <span>
                      {item.date
                        ? new Date(item.date).toLocaleDateString("en-IN")
                        : ""}
                    </span>
                    <span
                      className={`font-medium ${
                        item.status === "present"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex justify-between items-center mt-5">
              <button
                onClick={downloadPDF}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition-all"
              >
                Download PDF
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Attendance;
