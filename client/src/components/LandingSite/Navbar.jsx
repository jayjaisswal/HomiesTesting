import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/src/assets/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="flex justify-between items-center p-5 md:px-10 bg-white text-black fixed w-full top-0 left-0 z-50 shadow-md lg:mb-10">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={Logo} height="200px" width="200px" alt="HMS Logo"/>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-10 font-semibold text-sm lg:text-base">
        <Link to="/about" className="hover:text-[#3b82f5] transition">About</Link>
        <Link to="/contact" className="hover:text-[#3b82f5] transition">Contact</Link>
        <Link to="/auth/request" className="hover:text-[#3b82f5] transition">Request</Link>
        <Link to="/rules" className="hover:text-[#3b82f5] transition">Rules & Guidelines</Link>
        <Link to="/notices" className="hover:text-[#3b82f5] transition">NoticeBoard</Link>
        <Link
          to="/auth/login"
          className="bg-[#4f46e5] text-white px-6 py-2 rounded-md font-bold hover:scale-95 transition-all duration-200"
        >
          Login
        </Link>
      </div>

      {/* Hamburger Button */}
      <div className="md:hidden z-50" onClick={() => setMenuOpen(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7 sm:w-8 sm:h-8 text-black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full bg-white w-[70%] flex flex-col p-6 pt-14 space-y-6 text-sm sm:text-base font-bold text-black shadow-lg transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="absolute top-5 right-5" onClick={() => setMenuOpen(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 sm:w-8 sm:h-8 text-black cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <div className="flex flex-col space-y-4">
          <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-[#3b82f5] py-1">About</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-[#3b82f5] py-1">Contact</Link>
          <Link to="/auth/request" onClick={() => setMenuOpen(false)} className="hover:text-[#3b82f5] py-1">Request</Link>
          <Link to="/rules" onClick={() => setMenuOpen(false)} className="hover:text-[#3b82f5] py-1">Rules & Guidelines</Link>
          <Link to="/notices" onClick={() => setMenuOpen(false)} className="hover:text-[#3b82f5] py-1">NoticeBoard</Link>
          <Link
            to="/auth/login"
            onClick={() => setMenuOpen(false)}
            className="bg-[#4f46e5] text-white px-4 sm:px-6 py-2 rounded-md font-bold inline-block w-fit mt-2"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };