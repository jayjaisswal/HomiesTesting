import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion"; // You'll need to install this package

export default function RequestAcc() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const [inputData, setInputData] = useState({
    urn: '',
    isLoading: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setInputData(prev => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch(`${mainUri}/api/request/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ urn: inputData.urn })
      });

      if (response.status === 200) {
        toast.success("Request sent successfully! The hostel manager will review your request.", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        setInputData(prev => ({ ...prev, urn: '' }));
      } else {
        const data = await response.json();
        toast.error(data.errors[0].msg, {
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

    setInputData(prev => ({ ...prev, isLoading: false }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center lg:mt-44  px-4 py-12">
      <div className="w-full max-w-md relative">
        {/* Background decorative elements */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#4f46e5] rounded-full opacity-10"></div>
        <div className="absolute -bottom-12 -left-8 w-36 h-36 bg-indigo-600 rounded-full opacity-10"></div>
        <div className="absolute top-1/3 left-0 w-16 h-16 bg-purple-500 rounded-full opacity-10 transform -translate-x-1/2"></div>
        
        {/* Main card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-sm bg-white/90 border border-indigo-100 shadow-xl rounded-3xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#4f46e5] p-6 text-center">
            <h1 className="text-3xl font-extrabold text-white">Request Access</h1>
            <p className="text-indigo-100 mt-2">Submit your URN to get started</p>
          </div>
          
          {/* Form */}
          <div className="p-8">
            <div className="mb-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-[#4f46e5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-[#4f46e5">
                    Enter your University Registration Number (URN) below. The hostel manager will review your request and approve your account.
                  </p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">University Registration Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="number"
                    name="urn"
                    required
                    value={inputData.urn}
                    onChange={handleInputChange}
                    placeholder="000000"
                    className="pl-10 w-full pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500 ml-1">Enter your 6-digit university ID number</p>
              </div>

              <button
                type="submit"
                disabled={inputData.isLoading}
                className="w-full flex justify-center items-center bg-[#4f46e5] text-white py-3 px-4 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70"
              >
                {inputData.isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </button>
            </form>
          </div>
          
          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/auth" className="font-semibold text-[#4f46e5] hover:text-[#4f46e5] transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>
        
        {/* Decorative illustration */}
        <div className="absolute -bottom-4 right-6 transform translate-y-1/2">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-[#4f46e5]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Toast notifications container */}
      <ToastContainer />
    </div>
  );
}