// // import { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { verifysession } from "../../../utils/";
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { motion } from "framer-motion"; // You'll need to install this package
// // import "./SignIn.css"; // Import your custom styles`
// // export default function SignIn() {
// //   const mainUri = import.meta.env.VITE_MAIN_URI;
// //   const navigate = useNavigate();
// //   const [formState, setFormState] = useState({
// //     email: "",
// //     password: "",
// //     rememberMe: false,
// //     isLoading: false
// //   });

// //   // Check for existing session
// //   if (localStorage.getItem("token")) {
// //     verifysession();
// //   }

// //   const handleInputChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormState(prev => ({
// //       ...prev,
// //       [name]: type === "checkbox" ? checked : value
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setFormState(prev => ({ ...prev, isLoading: true }));

// //     try {
// //       const response = await fetch(`${mainUri}/api/auth/login`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           email: formState.email,
// //           password: formState.password
// //         }),
// //       });

// //       const result = await response.json();

// //       if (result.success) {
// //         localStorage.setItem("token", result.data.token);

// //         const studentRes = await fetch(`${mainUri}/api/student/get-student`, {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({
// //             isAdmin: result.data.user.isAdmin,
// //             token: result.data.token,
// //           }),
// //         });

// //         const studentResult = await studentRes.json();

// //         if (studentResult.success) {
// //           console.log(studentResult.student);
// //           if(studentResult.isAdmin)
// //           {
// //             localStorage.setItem("admin", JSON.stringify(studentResult.student));
// //           }
// //           else
// //           {
// //             localStorage.setItem("student", JSON.stringify(studentResult.student));
// //           }

// //           // Show success animation before navigating
// //           toast.success("Login successful! Redirecting...", {
// //             position: "top-center",
// //             autoClose: 1500,
// //             hideProgressBar: false,
// //             closeOnClick: true,
// //             pauseOnHover: true,
// //             draggable: true,
// //             theme: "colored",
// //             onClose: () => navigate("/student-dashboard")
// //           });
// //         }
// //       } else {
// //         toast.error(result.errors[0].msg, {
// //           position: "top-center",
// //           autoClose: 3000,
// //           hideProgressBar: false,
// //           closeOnClick: true,
// //           pauseOnHover: true,
// //           draggable: true,
// //           theme: "colored",
// //         });
// //       }
// //     } catch (error) {
// //       toast.error("Connection error. Please try again.", {
// //         position: "top-center",
// //         theme: "colored",
// //       });
// //       console.error(error);
// //     }

// //     setFormState(prev => ({ ...prev, isLoading: false }));
// //   };

// //   return (
// //     <div className="min-h-screen w-11/12 mx-auto flex items-center justify-center lg:mt-60   px-4 py-12">
// //       <div className="w-full max-w-md relative">
// //         {/* Background decorative elements */}
// //         <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#4f46e5] rounded-full opacity-10"></div>
// //         <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white-600 rounded-full opacity-10"></div>
// //         <div className="absolute top-1/4 right-0 w-16 h-16 bg-purple-500 rounded-full opacity-10 transform translate-x-1/2"></div>

// //         {/* Main card */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.5 }}
// //           className="backdrop-blur-sm bg-white/90 border border-indigo-100 shadow-xl rounded-3xl overflow-hidden"
// //         >
// //           {/* Header */}
// //           <div className="bg-[#4f46e5] p-6 text-center">
// //             <h1 className="text-3xl font-extrabold text-white">Welcome Back</h1>
// //             <p className="text-blue-100 mt-2">Sign in to continue your journey</p>
// //           </div>

// //           {/* Form */}
// //           <div className="p-8">
// //             <form onSubmit={handleSubmit} className="space-y-6">
// //               <div className="space-y-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email Address</label>
// //                   <div className="relative">
// //                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                       <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
// //                         <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
// //                         <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
// //                       </svg>
// //                     </div>
// //                     <input
// //                       type="email"
// //                       name="email"
// //                       required
// //                       value={formState.email}
// //                       onChange={handleInputChange}
// //                       placeholder="your.email@example.com"
// //                       className="pl-10 w-full pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
// //                     />
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <div className="flex justify-between">
// //                     <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
// //                     <a href="#" className="text-xs text-blue-600 hover:text-blue-800 font-medium">Forgot password?</a>
// //                   </div>
// //                   <div className="relative">
// //                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                       <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
// //                         <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
// //                       </svg>
// //                     </div>
// //                     <input
// //                       type="password"
// //                       name="password"
// //                       required
// //                       value={formState.password}
// //                       onChange={handleInputChange}
// //                       placeholder="••••••••"
// //                       className="pl-10 w-full pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="flex items-center">
// //                 <input
// //                   id="rememberMe"
// //                   name="rememberMe"
// //                   type="checkbox"
// //                   checked={formState.rememberMe}
// //                   onChange={handleInputChange}
// //                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
// //                 />
// //                 <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
// //                   Remember me
// //                 </label>
// //               </div>

// //               <button
// //                 type="submit"
// //                 disabled={formState.isLoading}
// //                 className="w-full flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-xl font-medium shadow-md hover:scale-95  transform hover:-translate-y-0.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
// //               >
// //                 {formState.isLoading ? (
// //                   <>
// //                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                     </svg>
// //                     Signing in...
// //                   </>
// //                 ) : (
// //                   "Sign in"
// //                 )}
// //               </button>
// //             </form>

// //             {/* Social login options */}
// //             <div className="mt-6">
// //               <div className="relative">
// //                 <div className="absolute inset-0 flex items-center">
// //                   <div className="w-full border-t border-gray-300"></div>
// //                 </div>
// //                 <div className="relative flex justify-center text-sm">
// //                   <span className="px-2 bg-white text-gray-500">Or continue with</span>
// //                 </div>
// //               </div>

// //               <div className="mt-6 grid grid-cols-3 gap-3">
// //                 <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
// //                   <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
// //                     <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
// //                   </svg>
// //                 </button>

// //                 <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
// //                   <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
// //                     <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path>
// //                   </svg>
// //                 </button>

// //                 <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
// //                   <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
// //                     <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path>
// //                   </svg>
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Footer */}
// //           <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 text-center">
// //             <p className="text-sm text-gray-600">
// //               Don't have an account?{" "}
// //               <Link to="/auth/request" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
// //                 Request access
// //               </Link>
// //             </p>
// //           </div>
// //         </motion.div>
// //       </div>

// //       {/* Toast notifications container */}
// //       <ToastContainer />
// //     </div>
// //   );
// // }
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { verifysession } from "../../../utils/";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { motion } from "framer-motion";
// import "./SignIn.css";

// export default function SignIn() {
//   const mainUri = import.meta.env.VITE_MAIN_URI;
//   const navigate = useNavigate();
//   const [formState, setFormState] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//     isLoading: false
//   });

//   if (localStorage.getItem("token")) {
//     verifysession();
//   }

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormState(prev => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormState(prev => ({ ...prev, isLoading: true }));

//     try {
//       const response = await fetch(`${mainUri}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: formState.email,
//           password: formState.password
//         }),
//       });

//       const result = await response.json();

//       if (result.success) {
//         localStorage.setItem("token", result.data.token);

//         const studentRes = await fetch(`${mainUri}/api/student/get-student`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             isAdmin: result.data.user.isAdmin,
//             token: result.data.token,
//           }),
//         });

//         const studentResult = await studentRes.json();

//         if (studentResult.success) {
//           if (studentResult.isAdmin) {
//             localStorage.setItem("admin", JSON.stringify(studentResult.student));
//           } else {
//             localStorage.setItem("student", JSON.stringify(studentResult.student));
//           }

//           toast.success("Login successful! Redirecting...", {
//             position: "top-center",
//             autoClose: 1500,
//             theme: "colored",
//             onClose: () => navigate("/student-dashboard")
//           });
//         }
//       } else {
//         toast.error(result.errors[0].msg, {
//           position: "top-center",
//           autoClose: 3000,
//           theme: "colored",
//         });
//       }
//     } catch (error) {
//       toast.error("Connection error. Please try again.", {
//         position: "top-center",
//         theme: "colored",
//       });
//       console.error(error);
//     }

//     setFormState(prev => ({ ...prev, isLoading: false }));
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-white px-4 py-10 sm:px-6 lg:px-8 ">
//       <div className="w-full max-w-md relative">
//         <div className="absolute -top-10 -left-10 w-20 h-20 bg-indigo-600 rounded-full opacity-10 hidden sm:block"></div>
//         <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-600 rounded-full opacity-10 hidden sm:block"></div>
//         <div className="absolute top-1/4 right-0 w-16 h-16 bg-purple-500 rounded-full opacity-10 transform translate-x-1/2 hidden sm:block"></div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white border border-indigo-100 shadow-xl rounded-3xl overflow-hidden"
//         >
//           {/* Header */}
//           <div className="bg-indigo-700 p-6 text-center">
//             <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Welcome Back</h1>
//             <p className="text-indigo-200 mt-1 sm:mt-2">Sign in to continue your journey</p>
//           </div>

//           {/* Form */}
//           <div className="p-6 sm:p-8">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email Address</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                         <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                       </svg>
//                     </div>
//                     <input
//                       type="email"
//                       name="email"
//                       required
//                       value={formState.email}
//                       onChange={handleInputChange}
//                       placeholder="your.email@example.com"
//                       className="pl-10 w-full pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <div className="flex justify-between">
//                     <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
//                     <a href="#" className="text-xs text-blue-600 hover:text-blue-800 font-medium">Forgot password?</a>
//                   </div>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <input
//                       type="password"
//                       name="password"
//                       required
//                       value={formState.password}
//                       onChange={handleInputChange}
//                       placeholder="••••••••"
//                       className="pl-10 w-full pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <input
//                   id="rememberMe"
//                   name="rememberMe"
//                   type="checkbox"
//                   checked={formState.rememberMe}
//                   onChange={handleInputChange}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">Remember me</label>
//               </div>

//               <button
//                 type="submit"
//                 disabled={formState.isLoading}
//                 className="w-full flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-xl font-medium shadow-md hover:scale-95 transform hover:-translate-y-0.5 transition-all duration-150 disabled:opacity-70"
//               >
//                 {formState.isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291..." />
//                     </svg>
//                     Signing in...
//                   </>
//                 ) : "Sign in"}
//               </button>
//             </form>

//             {/* Divider and social options */}
//             <div className="mt-6">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-gray-500">Or continue with</span>
//                 </div>
//               </div>
//               <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
//                 <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
//                   {/* Social icon */}
//                   Google
//                 </button>
//               </div>
//             </div>

//             {/* Footer */}
//             <p className="mt-6 text-sm text-center text-gray-600">
//               Don't have an account?{" "}
//               <Link to="/signup" className="text-blue-600 font-semibold hover:underline">Sign up</Link>
//             </p>
//           </div>
//         </motion.div>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verifysession } from "../../../utils/";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import "./SignIn.css";

export default function SignIn() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    rememberMe: false,
    isLoading: false,
  });

  if (localStorage.getItem("token")) {
    verifysession();
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch(`${mainUri}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formState.email,
          password: formState.password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("token", result.data.token);

        const studentRes = await fetch(`${mainUri}/api/student/get-student`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            isAdmin: result.data.user.isAdmin,
            token: result.data.token,
          }),
        });

        const studentResult = await studentRes.json();

        if (studentResult.success) {
          if (studentResult.isAdmin) {
            localStorage.setItem(
              "admin",
              JSON.stringify(studentResult.student)
            );
          } else {
            localStorage.setItem(
              "student",
              JSON.stringify(studentResult.student)
            );
          }

          toast.success("Login successful! Redirecting...", {
            position: "top-center",
            autoClose: 1500,
            theme: "colored",
            onClose: () => navigate("/student-dashboard"),
          });
        }
      } else {
        toast.error(result.errors[0].msg, {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Connection error. Please try again.", {
        position: "top-center",
        theme: "colored",
      });
      console.error(error);
    }

    setFormState((prev) => ({ ...prev, isLoading: false }));
  };

  return (
    <div className="min-h-screen w-full flex items-start justify-center mt-4 lg:mt-[22rem] backGroundColor ">
      <div className="w-full sm:max-w-md relative">
        {/* Background Circles */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-indigo-600 rounded-full opacity-10 hidden sm:block"></div>
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-600 rounded-full opacity-10 hidden sm:block"></div>
        <div className="absolute top-1/4 right-0 w-16 h-16 bg-purple-500 rounded-full opacity-10 transform translate-x-1/2 hidden sm:block"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-indigo-100 shadow-xl rounded-3xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-indigo-700 zero text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white bg-[#4438c9]">
              Welcome Back
            </h1>
            <p className="text-indigo-200 mt-1 sm:mt-2 bg-[#4438c9]">
              Sign in to continue your journey
            </p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="pl-3 w-full pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      required
                      value={formState.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="pl-3 w-full pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formState.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formState.isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-xl font-medium shadow-md hover:scale-95 transition-transform duration-150 disabled:opacity-70"
              >
                {formState.isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* Divider and Social */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Google
                </button>
              </div>
            </div>

            {/* Footer */}
            <p className="mt-6 text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      <ToastContainer />
    </div>
  );
}
