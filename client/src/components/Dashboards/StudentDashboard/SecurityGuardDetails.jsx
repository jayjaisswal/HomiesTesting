// import { useState, useEffect } from "react";
// import axios from "axios";

// function SecurityGuardDetails() {
//   const [guardDetails, setGuardDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("https://hostellerhomesbackend.onrender.com/api/guard/guards");
//         console.log("API Response:", response.data);
//         setGuardDetails(response.data || []);
//       } catch (err) {
//         setError("Failed to fetch security guard details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen text-lg font-semibold text-white" style={{ backgroundColor: "#111828" }}>Loading...</div>;
//   }

//   if (error) {
//     return <div className="flex justify-center items-center h-screen text-red-400 text-lg" style={{ backgroundColor: "#111828" }}>{error}</div>;
//   }

//   return (
//     <div
//       className="flex flex-col items-center justify-center min-h-screen p-6 ml-44"
//       style={{ backgroundColor: "#111828" }}
//     >
//       <div className="rounded-2xl p-6 max-w-2xl w-full shadow-lg" style={{ backgroundColor: "#0a0a0a" }}>
//         <h2 className="text-2xl font-semibold text-white text-center mb-6">
//           Security Guard Details
//         </h2>

//         {guardDetails.map((guard, index) => (
//           <div key={index} className="border-b border-gray-600 pb-4 mb-4">
//             {guard.onDuty && (
//               <div>
//                 <p className="text-lg text-gray-200"><strong>Guard ID:</strong> {guard.guardId}</p>
//                 <p className="text-lg text-gray-200"><strong>Name:</strong> {guard.name}</p>
//                 <p className="text-lg text-gray-200"><strong>Shift:</strong> {guard.shift}</p>
//                 <p className="text-lg text-gray-200"><strong>Contact:</strong> {guard.contact}</p>
//                 <p className="text-lg text-gray-200"><strong>Post:</strong> {guard.post}</p>
//                 <p className="text-lg text-gray-200">
//                   <strong>On Duty:</strong>
//                   <span className={guard.onDuty ? "text-green-400 ml-1" : "text-red-400 ml-1"}>
//                     {guard.onDuty ? "Yes" : "No"}
//                   </span>
//                 </p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SecurityGuardDetails;

// student dahsboard security guard


import { useState, useEffect } from "react";
import axios from "axios";

function SecurityGuardDetails() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const [guardDetails, setGuardDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${mainUri}/api/guard`);
        setGuardDetails(response.data.guards || []);
      } catch (err) {
        setError("Failed to fetch security guard details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mainUri]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold bg-[#f3e8ff] text-[#4f46e5]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg bg-[#f3e8ff] text-[#e11d48]">
        {error}
      </div>
    );
  }

  // Filter for guards with status "Active"
  const activeGuards = guardDetails.filter(guard => guard.status === "Active");

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-white mt-16"
    >
      <div
        className="rounded-3xl p-4 sm:p-8 max-w-3xl w-full shadow-2xl bg-white"
      >
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-8 text-[#4f46e5]"
        >
          Security Guard Details
        </h2>

        {activeGuards.length > 0 ? (
          activeGuards.map((guard, index) => (
            <div
              key={index}
              className="mb-6 p-4 sm:p-6 rounded-2xl shadow-md bg-[#f9f9f9]"
            >
              <p className="text-base sm:text-lg font-semibold mb-2 text-black">
                <span className="text-[#4f46e5]">Guard ID:</span> {guard.guardId}
              </p>
              <p className="text-base sm:text-lg font-semibold mb-2 text-black">
                <span className="text-[#4f46e5]">Name:</span> {guard.name}
              </p>
              <p className="text-base sm:text-lg font-semibold mb-2 text-black">
                <span className="text-[#4f46e5]">Shift:</span> {guard.shift}
              </p>
              <p className="text-base sm:text-lg font-semibold mb-2 text-black">
                <span className="text-[#4f46e5]">Contact:</span> {guard.contact}
              </p>
              <p className="text-base sm:text-lg font-semibold mb-2 text-black">
                <span className="text-[#4f46e5]">Post:</span> {guard.post}
              </p>
              <p className="text-base sm:text-lg font-semibold text-black">
                <span className="text-[#4f46e5]">Status:</span>{" "}
                <span className="ml-1 text-[#22c55e]">
                  Active
                </span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-lg sm:text-xl font-medium text-black">
            No guards currently on duty.
          </p>
        )}
      </div>
    </div>
  );
}

export default SecurityGuardDetails;