// import { useEffect, useState } from "react";
// import { Input } from "../../LandingSite/AuthPage/Input";
// import { Doughnut } from "react-chartjs-2";
// import "chart.js/auto";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Mess() {
//   const mainUri = import.meta.env.VITE_MAIN_URI;

//   const [leaveDate, setLeaveDate] = useState("");
//   const [returnDate, setReturnDate] = useState("");
//   const [requests, setRequests] = useState(0);
//   const [Messoff, setMessOff] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [requestsList, setRequestsList] = useState([]);

//   const daysofmonthtilltoday = new Date().getDate();

//   useEffect(() => {
//     const student = JSON.parse(localStorage.getItem("student"));
//     if (student) {
//       setLoading(true);
//       fetch(`${mainUri}/api/Messoff/count`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ student: student._id }),
//       })
//         .then((res) => res.json())
//         .then((result) => {
//           if (result.success) {
//             setMessOff(result.approved);
//             setRequests(result.list.length);
//             setRequestsList(result.list);
//           } else {
//             alert(result.errors[0].msg);
//           }
//         })
//         .finally(() => setLoading(false));
//     }
//   }, [requests]);

//   const handleleaveChange = (e) => setLeaveDate(e.target.value);
//   const handlereturnChange = (e) => setReturnDate(e.target.value);

//   const leavingDate = {
//     name: "leaving date",
//     placeholder: "",
//     req: true,
//     type: "date",
//     value: leaveDate,
//     onChange: handleleaveChange,
//   };
//   const returningDate = {
//     name: "return date",
//     placeholder: "",
//     req: true,
//     type: "date",
//     value: returnDate,
//     onChange: handlereturnChange,
//   };

//   const requestMessOff = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     const student = JSON.parse(localStorage.getItem("student"));
//     const data = {
//       student: student._id,
//       leaving_date: leaveDate,
//       return_date: returnDate,
//     };

//     const response = await fetch(`${mainUri}/api/Messoff/request`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     const result = await response.json();
//     if (result.success) {
//       setRequests((prev) => prev + 1);
//       setLeaveDate("");
//       setReturnDate("");
//       toast.success("Mess Off Requested Successfully!", { theme: "dark" });
//     } else {
//       toast.error(result.message, { theme: "dark" });
//     }

//     setLoading(false);
//   };

//   const labels = ["Mess Off", "Requested Mess Off", "Mess Attended"];
//   const loader = (
//     <svg
//       aria-hidden="true"
//       className="inline w-4 h-4 mr-2 animate-spin text-white fill-blue-600"
//       viewBox="0 0 100 101"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//         fill="currentColor"
//       />
//       <path
//         d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//         fill="currentFill"
//       />
//     </svg>
//   );

//   return (
//     <div className="w-full min-h-screen bg-[#f3e8ff] flex flex-col items-center justify-start pt-24 px-4 sm:px-6 md:px-10 lg:px-20 overflow-y-auto">
      
//       <h1 className="text-[#4f46e] font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 text-center">Mess Off</h1>

//       <ul className="flex flex-col sm:flex-row gap-3 text-[#4f46e] text-base sm:text-lg md:text-xl text-center mb-6 w-full justify-center">
//         <li>Total Mess: {daysofmonthtilltoday - Messoff}</li>
//         <li>Mess Off: {loading ? loader : Messoff}</li>
//         <li>Requests Sent: {loading ? loader : requests}</li>
//       </ul>

//       <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 flex-wrap mb-10">
//         <div className="flex flex-col items-center gap-4 w-full sm:w-[20rem]">
//           <div className="w-full h-[250px] sm:h-[280px] md:h-[300px]">
//             <Doughnut
//               datasetIdKey="id"
//               data={{
//                 labels,
//                 datasets: [
//                   {
//                     label: "Mess",
//                     data: [Messoff, requests, daysofmonthtilltoday - Messoff],
//                     backgroundColor: ["#F26916", "#EAB308", "#1D4ED8"],
//                     hoverOffset: 10,
//                   },
//                 ],
//               }}
//               options={{
//                 plugins: {
//                   legend: { display: false },
//                 },
//                 maintainAspectRatio: false,
//               }}
//             />
//           </div>
//           <ul className="text-[#4f46e] text-sm sm:text-base">
//             <li className="flex items-center gap-2">
//               <span className="w-6 h-4 bg-orange-500 block rounded-sm"></span> Mess Off
//             </li>
//             <li className="flex items-center gap-2">
//               <span className="w-6 h-4 bg-yellow-500 block rounded-sm"></span> Requested Mess
//             </li>
//             <li className="flex items-center gap-2">
//               <span className="w-6 h-4 bg-blue-500 block rounded-sm"></span> Mess Attended
//             </li>
//           </ul>
//         </div>

//         <div className="w-full sm:w-[22rem] md:w-[26rem] max-h-[300px] p-4 border rounded-lg shadow bg-white border-neutral-900 overflow-y-auto">
//           <div className="flex items-center justify-between mb-4">
//             <h5 className="text-xl font-bold text-[#4f46e]">All Requests</h5>
//           </div>
//           <div className="flow-root">
//             <ul className="divide-y divide-gray-300 text-[#4f46e]">
//               {requestsList.length === 0 ? (
//                 <li className="text-center text-sm">No requests Sent</li>
//               ) : (
//                 requestsList.map((req) => (
//                   <li className="py-3" key={req._id}>
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-sm font-medium">{req.status.toUpperCase()}</p>
//                         <p className="text-sm text-gray-500">
//                           {new Date(req.leaving_date).toDateString().slice(4, 10)} to{" "}
//                           {new Date(req.return_date).toDateString().slice(4, 10)}
//                         </p>
//                       </div>
//                       <p className="text-sm font-semibold text-gray-600">
//                         {new Date(req.request_date).toDateString().slice(4, 10)}
//                       </p>
//                     </div>
//                   </li>
//                 ))
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <form
//         method="POST"
//         onSubmit={requestMessOff}
//         className="bg-white w-full max-w-xl p-6 rounded-lg shadow-xl mb-10"
//       >
//         <div className="flex flex-col sm:flex-row gap-4">
//           <Input field={leavingDate} />
//           <Input field={returningDate} />
//         </div>
//         <button
//           type="submit"
//           className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 text-lg sm:text-xl rounded-lg px-5 py-2.5 mt-5"
//         >
//           {loading ? (
//             <div className="flex items-center gap-2 justify-center">
//               {loader} Sending Request...
//             </div>
//           ) : (
//             "Request Mess Off"
//           )}
//         </button>
//         <ToastContainer theme="dark" />
//       </form>
//     </div>
//   );
// }

// export default Mess;

// import { useEffect, useState } from "react";
// import { Input } from "../../LandingSite/AuthPage/Input";
// import { Doughnut } from "react-chartjs-2";
// import "chart.js/auto";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Mess() {
//   const mainUri = import.meta.env.VITE_MAIN_URI;

//   const [leaveDate, setLeaveDate] = useState("");
//   const [returnDate, setReturnDate] = useState("");
//   const [requests, setRequests] = useState(0);
//   const [Messoff, setMessOff] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [requestsList, setRequestsList] = useState([]);
//   const [historyList, setHistoryList] = useState([]); // ✅ New state

//   const daysofmonthtilltoday = new Date().getDate();

//   useEffect(() => {
//     const student = JSON.parse(localStorage.getItem("student"));
//     if (student) {
//       setLoading(true);
//       // Fetch mess count and requests
//       fetch(`${mainUri}/api/Messoff/count`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ student: student._id }),
//       })
//         .then((res) => res.json())
//         .then((result) => {
//           if (result.success) {
//             setMessOff(result.approved);
//             setRequests(result.list.length);
//             setRequestsList(result.list);
//           } else {
//             alert(result.errors?.[0]?.msg || "Error fetching data");
//           }
//         })
//         .finally(() => setLoading(false));

//       // ✅ Fetch last month’s history
//       fetch(`${mainUri}/api/Messoff/history`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ student: student._id }),
//       })
//         .then((res) => res.json())
//         .then((result) => {
//           if (result.success) {
//             setHistoryList(result.history);
//           }
//         })
//         .catch((err) => console.error("History fetch error:", err));
//     }
//   }, [requests]);

//   const handleleaveChange = (e) => setLeaveDate(e.target.value);
//   const handlereturnChange = (e) => setReturnDate(e.target.value);

//   const requestMessOff = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     const student = JSON.parse(localStorage.getItem("student"));
//     const data = {
//       student: student._id,
//       leaving_date: leaveDate,
//       return_date: returnDate,
//     };

//     const response = await fetch(`${mainUri}/api/Messoff/request`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     const result = await response.json();
//     if (result.success) {
//       setRequests((prev) => prev + 1);
//       setLeaveDate("");
//       setReturnDate("");
//       toast.success("Mess Off Requested Successfully!", { theme: "dark" });
//     } else {
//       toast.error(result.message, { theme: "dark" });
//     }

//     setLoading(false);
//   };

//   const labels = ["Mess Off", "Requested Mess Off", "Mess Attended"];
//   const loader = (
//     <svg
//       aria-hidden="true"
//       className="inline w-4 h-4 mr-2 animate-spin text-white fill-blue-600"
//       viewBox="0 0 100 101"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M100 50.5908C100 78.2051 77.6142 100.591..."
//         fill="currentColor"
//       />
//     </svg>
//   );

//   return (
//     <div className="w-full min-h-screen bg-[#f3e8ff] flex flex-col items-center justify-start pt-24 px-4 sm:px-6 md:px-10 lg:px-20 overflow-y-auto">

//       {/* Header */}
//       <h1 className="text-[#4f46e] font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 text-center">
//         Mess Off
//       </h1>

//       {/* Summary Section */}
//       <ul className="flex flex-col sm:flex-row gap-3 text-[#4f46e] text-base sm:text-lg md:text-xl text-center mb-6 w-full justify-center">
//         <li>Total Mess: {daysofmonthtilltoday - Messoff}</li>
//         <li>Mess Off: {loading ? loader : Messoff}</li>
//         <li>Requests Sent: {loading ? loader : requests}</li>
//       </ul>

//       {/* Requests Section */}
//       <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 flex-wrap mb-10">
//         {/* ... existing chart + requests list here ... */}
//       </div>

//       {/* ✅ Mess Off History Section */}
//       <div className="w-full sm:w-[40rem] max-h-[300px] p-4 border rounded-lg shadow bg-white border-neutral-900 overflow-y-auto mb-10">
//         <div className="flex items-center justify-between mb-4">
//           <h5 className="text-xl font-bold text-[#4f46e]">Last Month Mess Off History</h5>
//         </div>
//         <div className="flow-root">
//           <ul className="divide-y divide-gray-300 text-[#4f46e]">
//             {historyList.length === 0 ? (
//               <li className="text-center text-sm">No Mess Off history in last month</li>
//             ) : (
//               historyList.map((h) => (
//                 <li className="py-3" key={h._id}>
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className="text-sm font-medium">{h.status.toUpperCase()}</p>
//                       <p className="text-sm text-gray-500">
//                         {new Date(h.leaving_date).toDateString().slice(4, 10)} to{" "}
//                         {new Date(h.return_date).toDateString().slice(4, 10)}
//                       </p>
//                     </div>
//                     <p className="text-sm font-semibold text-gray-600">
//                       {new Date(h.request_date).toDateString().slice(4, 10)}
//                     </p>
//                   </div>
//                 </li>
//               ))
//             )}
//           </ul>
//         </div>
//       </div>

//       {/* Form Section */}
//       <form onSubmit={requestMessOff} className="bg-white w-full max-w-xl p-6 rounded-lg shadow-xl mb-10">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <Input
//             field={{
//               name: "leaving date",
//               type: "date",
//               value: leaveDate,
//               onChange: handleleaveChange,
//               req: true,
//             }}
//           />
//           <Input
//             field={{
//               name: "return date",
//               type: "date",
//               value: returnDate,
//               onChange: handlereturnChange,
//               req: true,
//             }}
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 text-lg sm:text-xl rounded-lg px-5 py-2.5 mt-5"
//         >
//           {loading ? (
//             <div className="flex items-center gap-2 justify-center">
//               {loader} Sending Request...
//             </div>
//           ) : (
//             "Request Mess Off"
//           )}
//         </button>
//         <ToastContainer theme="dark" />
//       </form>
//     </div>
//   );
// }

// export default Mess;



import { useEffect, useState } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Mess() {
  const mainUri = import.meta.env.VITE_MAIN_URI;

  const [leaveDate, setLeaveDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [requests, setRequests] = useState(0);
  const [Messoff, setMessOff] = useState(0);
  const [loading, setLoading] = useState(false);
  const [historyList, setHistoryList] = useState([]);

  const daysofmonthtilltoday = new Date().getDate();

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("student"));
    if (student) {
      setLoading(true);

      // Fetch mess count and requests
      fetch(`${mainUri}/api/Messoff/count`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student: student._id }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            setMessOff(result.approved);
            setRequests(result.list.length);
          } else {
            alert(result.errors?.[0]?.msg || "Error fetching data");
          }
        })
        .finally(() => setLoading(false));

      // Fetch last month’s history
      fetch(`${mainUri}/api/Messoff/history`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student: student._id }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            setHistoryList(result.history);
          }
        })
        .catch((err) => console.error("History fetch error:", err));
    }
  }, [requests]);

  const handleleaveChange = (e) => setLeaveDate(e.target.value);
  const handlereturnChange = (e) => setReturnDate(e.target.value);

  const requestMessOff = async (event) => {
    event.preventDefault();
    setLoading(true);
    const student = JSON.parse(localStorage.getItem("student"));
    const data = {
      student: student._id,
      leaving_date: leaveDate,
      return_date: returnDate,
    };

    const response = await fetch(`${mainUri}/api/Messoff/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success) {
      setRequests((prev) => prev + 1);
      setLeaveDate("");
      setReturnDate("");
      toast.success("Mess Off Requested Successfully!", { theme: "dark" });
    } else {
      toast.error(result.message, { theme: "dark" });
    }

    setLoading(false);
  };

  const labels = ["Mess Off", "Requested Mess Off", "Mess Attended"];
  const loader = (
    <svg
      aria-hidden="true"
      className="inline w-4 h-4 mr-2 animate-spin text-white fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 
        100.591C22.3858 100.591 0 78.2051 0 
        50.5908C0 22.9766 22.3858 0.59082 50 
        0.59082C77.6142 0.59082 100 22.9766 
        100 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 
        97.8624 35.9116 97.0079 
        33.5539C95.2932 28.8227 92.871 24.3692 
        89.8167 20.348C85.8452 15.1192 80.8826 
        10.7238 75.2124 7.41289C69.5422 
        4.10194 63.2754 1.94025 56.7698 
        1.05124C51.7666 0.367541 46.6976 
        0.446843 41.7345 1.27873C39.2613 
        1.69328 37.813 4.19778 38.4501 
        6.62326C39.0873 9.04874 41.5694 
        10.4717 44.0505 10.1071C47.8511 
        9.54855 51.7191 9.52689 55.5402 
        10.0491C60.8642 10.7766 65.9928 
        12.5457 70.6331 15.2552C75.2735 
        17.9648 79.3347 21.5619 82.5849 
        25.841C84.9175 28.9121 86.7997 
        32.2913 88.1811 35.8758C89.083 
        38.2158 91.5421 39.6781 93.9676 
        39.0409Z"
        fill="currentFill"
      />
    </svg>
  );

  return (
    <div className="w-full min-h-screen bg-[#f3e8ff] flex flex-col items-center justify-start pt-24 px-4 sm:px-6 md:px-10 lg:px-20 overflow-y-auto">
      {/* Header */}
      <h1 className="text-[#4f46e] font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 text-center">
        Mess Off
      </h1>

      {/* Summary Section */}
      <ul className="flex flex-col sm:flex-row gap-3 text-[#4f46e] text-base sm:text-lg md:text-xl text-center mb-6 w-full justify-center">
        <li>Total Mess: {daysofmonthtilltoday - Messoff}</li>
        <li>Mess Off: {loading ? loader : Messoff}</li>
        <li>Requests Sent: {loading ? loader : requests}</li>
      </ul>

      {/* ✅ Chart + History Section (Side-by-Side, Responsive) */}
      <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-8 flex-wrap mb-10">
        {/* Chart Section */}
        <div className="flex flex-col items-center gap-4 w-full sm:w-[20rem]">
          <div className="w-full h-[250px] sm:h-[280px] md:h-[300px]">
            <Doughnut
              datasetIdKey="id"
              data={{
                labels,
                datasets: [
                  {
                    label: "Mess",
                    data: [Messoff, requests, daysofmonthtilltoday - Messoff],
                    backgroundColor: ["#F26916", "#EAB308", "#1D4ED8"],
                    hoverOffset: 10,
                  },
                ],
              }}
              options={{
                plugins: { legend: { display: false } },
                maintainAspectRatio: false,
              }}
            />
          </div>
          <ul className="text-[#4f46e] text-sm sm:text-base">
            <li className="flex items-center gap-2">
              <span className="w-6 h-4 bg-orange-500 block rounded-sm"></span> Mess Off
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-4 bg-yellow-500 block rounded-sm"></span> Requested Mess
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-4 bg-blue-500 block rounded-sm"></span> Mess Attended
            </li>
          </ul>
        </div>

        {/* ✅ History Component */}
        <div className="w-full sm:w-[22rem] md:w-[26rem] max-h-[300px] p-4 border rounded-lg shadow bg-white border-neutral-900 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold text-[#4f46e]">
              Last Month Mess Off History
            </h5>
          </div>
          <div className="flow-root">
            <ul className="divide-y divide-gray-300 text-[#4f46e]">
              {historyList.length === 0 ? (
                <li className="text-center text-sm">No Mess Off history</li>
              ) : (
                historyList.map((h) => (
                  <li className="py-3" key={h._id}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{h.status.toUpperCase()}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(h.leaving_date).toDateString().slice(4, 10)} to{" "}
                          {new Date(h.return_date).toDateString().slice(4, 10)}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-600">
                        {new Date(h.request_date).toDateString().slice(4, 10)}
                      </p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* ✅ Form Section (Below Chart + History) */}
      <form
        onSubmit={requestMessOff}
        className="bg-white w-full lg:w-[40rem] p-6 rounded-lg shadow-xl"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            field={{
              name: "leaving date",
              type: "date",
              value: leaveDate,
              onChange: handleleaveChange,
              req: true,
            }}
          />
          <Input
            field={{
              name: "return date",
              type: "date",
              value: returnDate,
              onChange: handlereturnChange,
              req: true,
            }}
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 text-lg sm:text-xl rounded-lg px-5 py-2.5 mt-5"
        >
          {loading ? (
            <div className="flex items-center gap-2 justify-center">
              {loader} Sending Request...
            </div>
          ) : (
            "Request Mess Off"
          )}
        </button>
        <ToastContainer theme="dark" />
      </form>
    </div>
  );
}

export default Mess;
