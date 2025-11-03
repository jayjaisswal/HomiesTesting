
// import { useEffect, useState } from "react";
// import { Modal } from "./Modal";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Loader } from "../../Dashboards/Common/Loader";

// function Suggestions() {
//   const mainUri = import.meta.env.VITE_MAIN_URI;

//   const [loader, setLoader] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [suggestions, setSuggestions] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalData, setModalData] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchHistory, setSearchHistory] = useState("");

//   // Fetch all pending suggestions by hostel
//   const getSuggestions = async () => {
//     try {
//       setLoading(true);
//       const hostels = JSON.parse(localStorage.getItem("admin"));
//       const response = await fetch(`${mainUri}/api/suggestion/hostel`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ hostel: hostels.hostel }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         const pending = data.suggestions.filter((s) => s.status === "pending");
//         setSuggestions(pending);
//       } else {
//         toast.error("Failed to fetch suggestions");
//       }
//     } catch (error) {
//       toast.error("Error fetching suggestions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Fetch 1-month suggestion history (for all students)
//   const getHistory = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${mainUri}/api/suggestion/admin/history`);
//       const data = await response.json();
//       if (data.success) setHistory(data.suggestions);
//       else toast.error("Failed to fetch history");
//     } catch (error) {
//       toast.error("Error loading history");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update suggestion status (approve)
//   const updateSuggestion = async (id) => {
//     setLoader(true);
//     try {
//       const response = await fetch(`${mainUri}/api/suggestion/update`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id, status: "approved" }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success("Suggestion Approved");
//         getSuggestions();
//       } else {
//         toast.error("Something went wrong");
//       }
//     } catch (error) {
//       toast.error("Error approving suggestion");
//     } finally {
//       setLoader(false);
//     }
//   };

//   // Modal toggle
//   const toggleModal = (suggestion = null) => {
//     setModalData(suggestion);
//     setShowModal((prev) => !prev);
//   };

//   // Filter suggestions and history
//   const filteredSuggestions = suggestions.filter((s) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       s.title.toLowerCase().includes(query) ||
//       s.description.toLowerCase().includes(query) ||
//       (s.student?.name?.toLowerCase() || "").includes(query) ||
//       (s.student?.urn?.toLowerCase() || "").includes(query)
//     );
//   });

//   const filteredHistory = history.filter((s) => {
//     const query = searchHistory.toLowerCase();
//     return (
//       s.title.toLowerCase().includes(query) ||
//       s.description.toLowerCase().includes(query) ||
//       (s.student?.name?.toLowerCase() || "").includes(query) ||
//       (s.student?.urn?.toLowerCase() || "").includes(query)
//     );
//   });

//   useEffect(() => {
//     getSuggestions();
//     getHistory();
//   }, []);

//   return (
//     <div className="m-14 w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
//       <div className="w-full max-w-7xl">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <h1 className="text-gray-800 font-bold text-4xl mb-2 tracking-tight">
//             Student Suggestions Dashboard
//           </h1>
//           <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
//         </div>

//         {/* Two sections side by side */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* ===== LEFT: Pending Suggestions ===== */}
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
//             <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50 border-b border-gray-200 gap-4">
//               <h2 className="text-gray-800 font-semibold text-lg md:text-xl">
//                 Pending Suggestions
//               </h2>
//               <input
//                 type="search"
//                 className="block w-full md:w-60 pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>

//             <div className="p-6 max-h-[70vh] overflow-auto">
//               {loading ? (
//                 <div className="flex justify-center items-center h-40">
//                   <Loader />
//                 </div>
//               ) : filteredSuggestions.length === 0 ? (
//                 <p className="text-center text-gray-500 py-10">
//                   No pending suggestions found.
//                 </p>
//               ) : (
//                 <ul role="list" className="space-y-4">
//                   {filteredSuggestions.map((s) => (
//                     <li
//                       key={s._id}
//                       className="p-5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition duration-200 shadow-sm hover:shadow-md"
//                     >
//                       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                         <div className="flex-1 min-w-0">
//                           <p className="text-lg font-semibold text-gray-900">
//                             {s.title}
//                           </p>
//                           <p className="text-sm text-gray-600 mt-1">
//                             {s.description}
//                           </p>
//                           {s.student && (
//                             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 bg-white p-3 border border-gray-100 rounded-lg text-sm">
//                               <p>
//                                 <strong>Name:</strong> {s.student.name}
//                               </p>
//                               <p>
//                                 <strong>URN:</strong> {s.student.urn}
//                               </p>
//                               <p>
//                                 <strong>Room:</strong> {s.student.room_no}
//                               </p>
//                               <p>
//                                 <strong>Branch:</strong> {s.student.dept}
//                               </p>
//                             </div>
//                           )}
//                         </div>

//                         <button
//                           onClick={() => updateSuggestion(s._id)}
//                           className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition duration-150 shadow-sm"
//                         >
//                           {loader ? (
//                             <Loader />
//                           ) : (
//                             <>
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 strokeWidth={1.5}
//                                 stroke="currentColor"
//                                 className="w-5 h-5 mr-1"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M5 13l4 4L19 7"
//                                 />
//                               </svg>
//                               Approve
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>

//           {/* ===== RIGHT: Last 1 Month History ===== */}
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
//             <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50 border-b border-gray-200 gap-4">
//               <h2 className="text-gray-800 font-semibold text-lg md:text-xl">
//                 Last 1 Month History
//               </h2>
//               <input
//                 type="search"
//                 className="block w-full md:w-60 pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Search..."
//                 value={searchHistory}
//                 onChange={(e) => setSearchHistory(e.target.value)}
//               />
//             </div>

//             <div className="p-6 max-h-[70vh] overflow-auto">
//               {loading ? (
//                 <div className="flex justify-center items-center h-40">
//                   <Loader />
//                 </div>
//               ) : filteredHistory.length === 0 ? (
//                 <p className="text-center text-gray-500 py-10">
//                   No history found.
//                 </p>
//               ) : (
//                 <ul role="list" className="space-y-4">
//                   {filteredHistory.map((s) => (
//                     <li
//                       key={s._id}
//                       className="p-5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition duration-200 shadow-sm hover:shadow-md"
//                     >
//                       <div className="flex flex-col gap-2">
//                         <p className="text-lg font-semibold text-gray-900">
//                           {s.title}
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           {s.description}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           Status:{" "}
//                           <span
//                             className={`font-medium ${
//                               s.status === "approved"
//                                 ? "text-green-600"
//                                 : "text-yellow-600"
//                             }`}
//                           >
//                             {s.status}
//                           </span>
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           Date: {new Date(s.date).toLocaleDateString()}
//                         </p>
//                         {s.student && (
//                           <p className="text-sm text-gray-700">
//                             By: {s.student.name} ({s.student.urn})
//                           </p>
//                         )}
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end items-center px-6 mt-6">
//           <button
//             onClick={() => {
//               getSuggestions();
//               getHistory();
//             }}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-sm transition-colors duration-150"
//           >
//             Refresh All
//           </button>
//         </div>
//       </div>

//       {showModal && <Modal closeModal={toggleModal} suggestion={modalData} />}
//       <ToastContainer position="top-right" autoClose={3000} theme="light" />
//     </div>
//   );
// }

// export default Suggestions;

// import { useEffect, useState, useMemo } from "react";
// import { Modal } from "./Modal";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Loader } from "../../Dashboards/Common/Loader";

// function Suggestions() {
//   const mainUri = import.meta.env.VITE_MAIN_URI;

//   const [loader, setLoader] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [suggestions, setSuggestions] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalData, setModalData] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchHistory, setSearchHistory] = useState("");

//   // Fetch all pending suggestions by hostel
//   const getSuggestions = async () => {
//     try {
//       setLoading(true);
//       const hostels = JSON.parse(localStorage.getItem("admin"));
//       const response = await fetch(`${mainUri}/api/suggestion/hostel`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ hostel: hostels?.hostel }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         const pending = data.suggestions.filter(
//           (s) => s.status === "pending"
//         );
//         setSuggestions(pending);
//       } else {
//         toast.error("Failed to fetch suggestions");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error fetching suggestions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch 1-month suggestion history
//   const getHistory = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${mainUri}/api/suggestion/admin/history`);
//       const data = await response.json();
//       if (data.success) setHistory(data.suggestions);
//       else toast.error("Failed to fetch history");
//     } catch (error) {
//       console.error(error);
//       toast.error("Error loading history");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Approve suggestion
//   const updateSuggestion = async (id) => {
//     setLoader(true);
//     try {
//       const response = await fetch(`${mainUri}/api/suggestion/update`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id, status: "approved" }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success("Suggestion Approved");
//         getSuggestions();
//       } else {
//         toast.error("Something went wrong");
//       }
//     } catch (error) {
//       toast.error("Error approving suggestion");
//     } finally {
//       setLoader(false);
//     }
//   };

//   const toggleModal = (suggestion = null) => {
//     setModalData(suggestion);
//     setShowModal((prev) => !prev);
//   };

//   // ✅ Debounced search inputs
//   const [debouncedQuery, setDebouncedQuery] = useState("");
//   const [debouncedHistoryQuery, setDebouncedHistoryQuery] = useState("");

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedQuery(searchQuery.trim().toLowerCase());
//     }, 200);
//     return () => clearTimeout(handler);
//   }, [searchQuery]);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedHistoryQuery(searchHistory.trim().toLowerCase());
//     }, 200);
//     return () => clearTimeout(handler);
//   }, [searchHistory]);

//   // ✅ Safe filtering with optional chaining and fallback strings
//   const filteredSuggestions = useMemo(() => {
//     if (!debouncedQuery) return suggestions;
//     return suggestions.filter((s) => {
//       const title = s.title?.toLowerCase() || "";
//       const desc = s.description?.toLowerCase() || "";
//       const name = s.student?.name?.toLowerCase() || "";
//       const urn = s.student?.urn?.toLowerCase() || "";
//       return (
//         title.includes(debouncedQuery) ||
//         desc.includes(debouncedQuery) ||
//         name.includes(debouncedQuery) ||
//         urn.includes(debouncedQuery)
//       );
//     });
//   }, [suggestions, debouncedQuery]);

//   const filteredHistory = useMemo(() => {
//     if (!debouncedHistoryQuery) return history;
//     return history.filter((s) => {
//       const title = s.title?.toLowerCase() || "";
//       const desc = s.description?.toLowerCase() || "";
//       const name = s.student?.name?.toLowerCase() || "";
//       const urn = s.student?.urn?.toLowerCase() || "";
//       return (
//         title.includes(debouncedHistoryQuery) ||
//         desc.includes(debouncedHistoryQuery) ||
//         name.includes(debouncedHistoryQuery) ||
//         urn.includes(debouncedHistoryQuery)
//       );
//     });
//   }, [history, debouncedHistoryQuery]);

//   useEffect(() => {
//     getSuggestions();
//     getHistory();
//   }, []);

//   return (
//     <div className="m-14 w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
//       <div className="w-full max-w-7xl">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <h1 className="text-gray-800 font-bold text-4xl mb-2 tracking-tight">
//             Student Suggestions Dashboard
//           </h1>
//           <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
//         </div>

//         {/* Two panels side-by-side */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* ===== Pending Suggestions ===== */}
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
//             <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50 border-b border-gray-200 gap-4">
//               <h2 className="text-gray-800 font-semibold text-lg md:text-xl">
//                 Pending Suggestions
//               </h2>
//               <input
//                 type="search"
//                 placeholder="Search..."
//                 className="block w-full md:w-60 pl-3 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>

//             <div className="p-6 max-h-[70vh] overflow-auto">
//               {loading ? (
//                 <div className="flex justify-center items-center h-40">
//                   <Loader />
//                 </div>
//               ) : filteredSuggestions.length === 0 ? (
//                 <p className="text-center text-gray-500 py-10">
//                   No pending suggestions found.
//                 </p>
//               ) : (
//                 <ul className="space-y-4">
//                   {filteredSuggestions.map((s) => (
//                     <li
//                       key={s._id}
//                       className="p-5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition duration-200 shadow-sm hover:shadow-md"
//                     >
//                       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                         <div className="flex-1 min-w-0">
//                           <p className="text-lg font-semibold text-gray-900">
//                             {s.title}
//                           </p>
//                           <p className="text-sm text-gray-600 mt-1">
//                             {s.description}
//                           </p>
//                           {s.student && (
//                             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 bg-white p-3 border border-gray-100 rounded-lg text-sm">
//                               <p>
//                                 <strong>Name:</strong> {s.student.name}
//                               </p>
//                               <p>
//                                 <strong>URN:</strong> {s.student.urn}
//                               </p>
//                               <p>
//                                 <strong>Room:</strong> {s.student.room_no}
//                               </p>
//                               <p>
//                                 <strong>Branch:</strong> {s.student.dept}
//                               </p>
//                             </div>
//                           )}
//                         </div>

//                         <button
//                           onClick={() => updateSuggestion(s._id)}
//                           className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition duration-150 shadow-sm"
//                         >
//                           {loader ? (
//                             <Loader />
//                           ) : (
//                             <>
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 strokeWidth={1.5}
//                                 stroke="currentColor"
//                                 className="w-5 h-5 mr-1"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="M5 13l4 4L19 7"
//                                 />
//                               </svg>
//                               Approve
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>

//           {/* ===== History Section ===== */}
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
//             <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50 border-b border-gray-200 gap-4">
//               <h2 className="text-gray-800 font-semibold text-lg md:text-xl">
//                 Last 1 Month History
//               </h2>
//               <input
//                 type="search"
//                 placeholder="Search..."
//                 className="block w-full md:w-60 pl-3 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={searchHistory}
//                 onChange={(e) => setSearchHistory(e.target.value)}
//               />
//             </div>

//             <div className="p-6 max-h-[70vh] overflow-auto">
//               {loading ? (
//                 <div className="flex justify-center items-center h-40">
//                   <Loader />
//                 </div>
//               ) : filteredHistory.length === 0 ? (
//                 <p className="text-center text-gray-500 py-10">
//                   No history found.
//                 </p>
//               ) : (
//                 <ul className="space-y-4">
//                   {filteredHistory.map((s) => (
//                     <li
//                       key={s._id}
//                       className="p-5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition duration-200 shadow-sm hover:shadow-md"
//                     >
//                       <div className="flex flex-col gap-2">
//                         <p className="text-lg font-semibold text-gray-900">
//                           {s.title}
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           {s.description}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           Status:{" "}
//                           <span
//                             className={`font-medium ${
//                               s.status === "approved"
//                                 ? "text-green-600"
//                                 : "text-yellow-600"
//                             }`}
//                           >
//                             {s.status}
//                           </span>
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           Date:{" "}
//                           {s.date
//                             ? new Date(s.date).toLocaleDateString()
//                             : "N/A"}
//                         </p>
//                         {s.student && (
//                           <p className="text-sm text-gray-700">
//                             By: {s.student.name} ({s.student.urn})
//                           </p>
//                         )}
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end items-center px-6 mt-6">
//           <button
//             onClick={() => {
//               getSuggestions();
//               getHistory();
//             }}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-sm transition-colors duration-150"
//           >
//             Refresh All
//           </button>
//         </div>
//       </div>

//       {showModal && <Modal closeModal={toggleModal} suggestion={modalData} />}
//       <ToastContainer position="top-right" autoClose={3000} theme="light" />
//     </div>
//   );
// }

// export default Suggestions;

import { useEffect, useState, useMemo } from "react";
import { Modal } from "./Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../Dashboards/Common/Loader";

function Suggestions() {
  const mainUri = import.meta.env.VITE_MAIN_URI;

  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState("");

  // Fetch all pending suggestions by hostel
  const getSuggestions = async () => {
    try {
      setLoading(true);
      const hostels = JSON.parse(localStorage.getItem("admin"));
      const response = await fetch(`${mainUri}/api/suggestion/hostel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hostel: hostels?.hostel }),
      });

      const data = await response.json();
      if (data.success) {
        const pending = data.suggestions.filter((s) => s.status === "pending");
        setSuggestions(pending);
      } else {
        toast.error("Failed to fetch suggestions");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching suggestions");
    } finally {
      setLoading(false);
    }
  };

  // Fetch 1-month suggestion history
  const getHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${mainUri}/api/suggestion/admin/history`);
      const data = await response.json();
      if (data.success) setHistory(data.suggestions);
      else toast.error("Failed to fetch history");
    } catch (error) {
      console.error(error);
      toast.error("Error loading history");
    } finally {
      setLoading(false);
    }
  };

  // Approve suggestion
  const updateSuggestion = async (id) => {
    setLoader(true);
    try {
      const response = await fetch(`${mainUri}/api/suggestion/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "approved" }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Suggestion Approved");
        getSuggestions();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error approving suggestion");
    } finally {
      setLoader(false);
    }
  };

  const toggleModal = (suggestion = null) => {
    setModalData(suggestion);
    setShowModal((prev) => !prev);
  };

  // ✅ Debounced search inputs
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [debouncedHistoryQuery, setDebouncedHistoryQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim().toLowerCase());
    }, 200);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedHistoryQuery(searchHistory.trim().toLowerCase());
    }, 200);
    return () => clearTimeout(handler);
  }, [searchHistory]);

  // ✅ Safe filtering with String() fallback to prevent crashes
  const filteredSuggestions = useMemo(() => {
    if (!debouncedQuery) return suggestions;
    return suggestions.filter((s) => {
      const title = String(s.title || "").toLowerCase();
      const desc = String(s.description || "").toLowerCase();
      const name = String(s.student?.name || "").toLowerCase();
      const urn = String(s.student?.urn || "").toLowerCase();
      return (
        title.includes(debouncedQuery) ||
        desc.includes(debouncedQuery) ||
        name.includes(debouncedQuery) ||
        urn.includes(debouncedQuery)
      );
    });
  }, [suggestions, debouncedQuery]);

  const filteredHistory = useMemo(() => {
    if (!debouncedHistoryQuery) return history;
    return history.filter((s) => {
      const title = String(s.title || "").toLowerCase();
      const desc = String(s.description || "").toLowerCase();
      const name = String(s.student?.name || "").toLowerCase();
      const urn = String(s.student?.urn || "").toLowerCase();
      return (
        title.includes(debouncedHistoryQuery) ||
        desc.includes(debouncedHistoryQuery) ||
        name.includes(debouncedHistoryQuery) ||
        urn.includes(debouncedHistoryQuery)
      );
    });
  }, [history, debouncedHistoryQuery]);

  useEffect(() => {
    getSuggestions();
    getHistory();
  }, []);

  return (
    <div className="m-14 w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-gray-800 font-bold text-4xl mb-2 tracking-tight">
            Student Suggestions Dashboard
          </h1>
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Two panels side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ===== Pending Suggestions ===== */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50 border-b border-gray-200 gap-4">
              <h2 className="text-gray-800 font-semibold text-lg md:text-xl">
                Pending Suggestions
              </h2>
              <input
                type="search"
                placeholder="Search..."
                className="block w-full md:w-60 pl-3 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="p-6 max-h-[70vh] overflow-auto">
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader />
                </div>
              ) : filteredSuggestions.length === 0 ? (
                <p className="text-center text-gray-500 py-10">
                  No pending suggestions found.
                </p>
              ) : (
                <ul className="space-y-4">
                  {filteredSuggestions.map((s) => (
                    <li
                      key={s._id}
                      className="p-5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition duration-200 shadow-sm hover:shadow-md"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-lg font-semibold text-gray-900">
                            {s.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {s.description}
                          </p>
                          {s.student && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 bg-white p-3 border border-gray-100 rounded-lg text-sm">
                              <p>
                                <strong>Name:</strong> {s.student.name}
                              </p>
                              <p>
                                <strong>URN:</strong> {s.student.urn}
                              </p>
                              <p>
                                <strong>Room:</strong> {s.student.room_no}
                              </p>
                              <p>
                                <strong>Branch:</strong> {s.student.dept}
                              </p>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => updateSuggestion(s._id)}
                          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition duration-150 shadow-sm"
                        >
                          {loader ? (
                            <Loader />
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 mr-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              Approve
                            </>
                          )}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* ===== History Section ===== */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50 border-b border-gray-200 gap-4">
              <h2 className="text-gray-800 font-semibold text-lg md:text-xl">
                Last 1 Month History
              </h2>
              <input
                type="search"
                placeholder="Search..."
                className="block w-full md:w-60 pl-3 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchHistory}
                onChange={(e) => setSearchHistory(e.target.value)}
              />
            </div>

            <div className="p-6 max-h-[70vh] overflow-auto">
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader />
                </div>
              ) : filteredHistory.length === 0 ? (
                <p className="text-center text-gray-500 py-10">
                  No history found.
                </p>
              ) : (
                <ul className="space-y-4">
                  {filteredHistory.map((s) => (
                    <li
                      key={s._id}
                      className="p-5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition duration-200 shadow-sm hover:shadow-md"
                    >
                      <div className="flex flex-col gap-2">
                        <p className="text-lg font-semibold text-gray-900">
                          {s.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {s.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          Status:{" "}
                          <span
                            className={`font-medium ${
                              s.status === "approved"
                                ? "text-green-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {s.status}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Date:{" "}
                          {s.date
                            ? new Date(s.date).toLocaleDateString()
                            : "N/A"}
                        </p>
                        {s.student && (
                          <p className="text-sm text-gray-700">
                            By: {s.student.name} ({s.student.urn})
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>


        {/* Footer */}
        <div className="flex justify-end items-center px-6 mt-6">
          <button
            onClick={() => {
              getSuggestions();
              getHistory();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-sm transition-colors duration-150"
          >
            Refresh All
          </button>
        </div>
      </div>

      {showModal && <Modal closeModal={toggleModal} suggestion={modalData} />}
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </div>
  );
}

export default Suggestions;
