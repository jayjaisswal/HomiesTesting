// import { useState, useEffect } from "react";
// import { getAllStudents } from "../../../utils";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function AllStudents() {
//   const mainUri = import.meta.env.VITE_MAIN_URI;
//   const getCSV = async () => {
//     const hostels = JSON.parse(localStorage.getItem('admin'));
//     const res = await fetch(`${mainUri}/api/student/csv`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ hostel: hostels.hostel }),
//     });
//     const data = await res.json();
//     if (data.success) {
//       const link = document.createElement('a');
//       link.href = "data:text/csv;charset=utf-8," + escape(data.csv);
//       link.download = 'students.csv';
//       link.click();
//       toast.success('CSV Downloaded Successfully!', {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//     } else {
//       toast.error(data.errors[0].msg, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//     }
//   };

//   const getAll = async () => {
//     const data = await getAllStudents();
//     setallStudents(data.students);
//   };

//   const [allStudents, setallStudents] = useState([]);

//   const deleteStudent = async (id) => {
//     const res = await fetch(`${mainUri}/api/student/delete-student`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id }),
//     });
//     const data = await res.json();
//     if (data.success) {
//       setallStudents(allStudents.filter((student) => student._id !== id));
//       toast.success('Student Deleted Successfully!', {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//       });
//     } else {
//       toast.error(data.errors[0].msg, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//     }
//   };

//   useEffect(() => {
//     getAll();
//   }, [allStudents.length]);

//   return (
//     <div className="w-full min-h-screen flex flex-col gap-5 items-center justify-start py-28" style={{ backgroundColor: '#f3e8ff' }}>
//       <h1 className="font-bold text-5xl text-black mb-5">All Students</h1>

//       <div className="w-96 flex justify-center mb-5">
//         <button
//           onClick={getCSV}
//           className="px-6 py-3 bg-[#4f46e5] hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg"
//         >
//           Download CSV
//         </button>
//       </div>

//       <div className="bg-white px-8 py-6 rounded-2xl shadow-2xl sm:w-[50%] sm:min-w-[500px] w-full max-h-[500px] overflow-y-auto border border-gray-300">
//         <span className="text-black font-bold text-2xl block mb-5 text-center">Student List</span>

//         <ul role="list" className="divide-y divide-gray-200">
//           {allStudents.length === 0 ? (
//             <p className="text-center text-gray-500">No Students Found</p>
//           ) : (
//             allStudents.map((student) => (
//               <li
//                 key={student._id}
//                 className="py-4 px-4 flex items-center justify-between hover:bg-[#f3e8ff] rounded-lg transition-all group"
//               >
//                 <div className="flex items-center space-x-4">
//                   <div className="flex-shrink-0 text-[#4f46e5]">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="w-8 h-8"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
//                       />
//                     </svg>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-lg font-semibold text-black truncate">
//                       {student.name}
//                     </p>
//                     <p className="text-sm text-gray-600 truncate">
//                       {student.urn} | Room: {student.room_no}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex gap-3">
//                   <button className="hover:text-[#4f46e5] hover:scale-110 transition-all">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="w-6 h-6"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
//                       />
//                     </svg>
//                   </button>
//                   <button
//                     onClick={() => deleteStudent(student._id)}
//                     className="hover:text-red-600 hover:scale-110 transition-all"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="w-6 h-6"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </li>
//             ))
//           )}
//         </ul>
//       </div>

//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </div>
//   );
// }

// export default AllStudents;

import { useState, useEffect } from "react";
import { getAllStudents } from "../../../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function AllStudents() {
  const mainUri = import.meta.env.VITE_MAIN_URI;

  const getCSV = async () => {
    const hostels = JSON.parse(localStorage.getItem("admin"));
    const res = await fetch(`${mainUri}/api/student/csv`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostel: hostels.hostel }),
    });

    const data = await res.json();
    if (data.success) {
      const link = document.createElement("a");
      link.href = "data:text/csv;charset=utf-8," + escape(data.csv);
      link.download = "students.csv";
      link.click();
      toast.success("CSV Downloaded Successfully!", { autoClose: 3000 });
    } else {
      toast.error(data.errors[0].msg, { autoClose: 3000 });
    }
  };

  const getAll = async () => {
    const data = await getAllStudents();
    setAllStudents(data.students);
  };

  const [allStudents, setAllStudents] = useState([]);

  const deleteStudent = async (id) => {
    const res = await fetch(`${mainUri}/api/student/delete-student`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    if (data.success) {
      setAllStudents(allStudents.filter((student) => student._id !== id));
      toast.success("Student Deleted Successfully!", { autoClose: 3000, theme: "dark" });
    } else {
      toast.error(data.errors[0].msg, { autoClose: 3000 });
    }
  };

  useEffect(() => {
    getAll();
  }, [allStudents.length]);

  return (
    <div className="w-full min-h-screen flex flex-col gap-5 items-center justify-start py-28 px-4 bg-[#f3e8ff] overflow-x-hidden">
      <h1 className="font-bold text-4xl md:text-5xl text-black mb-5 text-center">All Students</h1>

      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl flex justify-center mb-5">
        <button
          onClick={getCSV}
          className="w-full md:w-auto px-6 py-3 bg-[#4f46e5] hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg"
        >
          Download CSV
        </button>
      </div>

      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl bg-white px-6 py-5 rounded-2xl shadow-2xl overflow-y-auto max-h-[500px] border border-gray-300">
        <span className="text-black font-bold text-xl md:text-2xl block mb-5 text-center">Student List</span>

        <ul role="list" className="divide-y divide-gray-200">
          {allStudents.length === 0 ? (
            <p className="text-center text-gray-500">No Students Found</p>
          ) : (
            allStudents.map((student) => (
              <li
                key={student._id}
                className="py-4 px-2 flex items-center justify-between hover:bg-[#f3e8ff] rounded-lg transition-all group"
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
                    <p className="text-base md:text-lg font-semibold text-black truncate">{student.name}</p>
                    <p className="text-sm text-gray-600 truncate">{student.urn} | Room: {student.room_no} | A/C: {student.accountNumber}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="hover:text-[#4f46e5] hover:scale-110 transition-all">
                    <Link to={`/admin-dashboard/student/${student._id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
                      />
                    </svg>
                    </Link>
                  </button>
                  <button
                    onClick={() => deleteStudent(student._id)}
                    className="hover:text-red-600 hover:scale-110 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default AllStudents;

