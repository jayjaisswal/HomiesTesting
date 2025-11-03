import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion"; // You'll need to install this package

export default function AdminSignIn() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    rememberMe: false,
    isLoading: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const getHostel = async (adminData) => {
    try {
      const res = await fetch(`${mainUri}/api/admin/get-hostel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: adminData._id })
      });

      const data = await res.json();
      localStorage.setItem("hostel", JSON.stringify(data.hostel));
    } catch (err) {
      console.error("Error fetching hostel data:", err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormState(prev => ({ ...prev, isLoading: true }));

    try {
      // Step 1: Authenticate user
      const response = await fetch(`${mainUri}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formState.email,
          password: formState.password
        })
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("token", result.data.token);
        
        // Step 2: Get admin details
        const adminResponse = await fetch(`${mainUri}/api/admin/get-admin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isAdmin: result.data.user.isAdmin,
            token: result.data.token
          })
        });

        const adminResult = await adminResponse.json();
        
        if (adminResult.success) {
          localStorage.setItem("admin", JSON.stringify(adminResult.admin));
          
          // Step 3: Get hostel data
          await getHostel(adminResult.admin);
          
          // Success notification and redirect
          toast.success("Login successful! Redirecting to dashboard...", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            onClose: () => navigate("/admin-dashboard")
          });
        } else {
          toast.error(adminResult.errors[0].msg, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        }
      } else {
        toast.error(result.errors[0].msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Connection error. Please try again later.", {
        position: "top-center",
        theme: "colored",
      });
      console.error(error);
    }

    setFormState(prev => ({ ...prev, isLoading: false }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4  py-12">
      <div className="w-full max-w-md relative">
        {/* Background decorative elements */}
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#4f46e5] rounded-full opacity-10"></div>
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-600 rounded-full opacity-10"></div>
        <div className="absolute top-1/3 right-0 w-16 h-16 bg-indigo-500 rounded-full opacity-10 transform translate-x-1/2"></div>
        
        {/* Badge at top */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#4f46e5] text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg z-10">
          Hostel Manager Portal
        </div>
        
        {/* Main card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-sm bg-white/90 border border-purple-100 shadow-xl rounded-3xl overflow-hidden mt-4"
        >
          {/* Header */}
          <div className="bg-[#4f46e5] p-6 text-center">
            <h1 className="text-3xl font-extrabold text-white">Manager Sign In</h1>
            <p className="text-purple-100 mt-2">Access your hostel management dashboard</p>
          </div>
          
          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="manager@hostel.com"
                      className="pl-10 w-full pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
                    <a href="#" className="text-xs text-purple-600 hover:text-purple-800 font-medium">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="password"
                      required
                      value={formState.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="pl-10 w-full pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formState.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#4f46e5] focus:ring-[#4f46e5] border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={formState.isLoading}
                className="w-full flex justify-center items-center bg-[#4f46e5] text-white py-3 px-4 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70"
              >
                {formState.isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  "Sign in as Manager"
                )}
              </button>
            </form>
            
            {/* Security note */}
            <div className="mt-6 bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-xs text-gray-600">
                    This is a secure login for hostel management staff only. Student access is available through the student portal.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Are you a student?{" "}
              <Link to="/auth/login" className="font-semibold text-[#4f46e5] hover:text-[#4f46e5] transition-colors">
                Sign in to student portal
              </Link>
            </p>
          </div>
        </motion.div>
        
        {/* Keys decorative element */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute -bottom-4 right-8 transform translate-y-1/2"
        >
          <div className="w-16 h-16 bg-[#4f46e5] rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
        </motion.div>
      </div>
      
      {/* Toast notifications container */}
      <ToastContainer />
    </div>
  );
}