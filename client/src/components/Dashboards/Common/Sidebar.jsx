import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

Sidebar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      for: PropTypes.string,
      svg: PropTypes.element.isRequired,
    })
  ).isRequired,
};

function Sidebar({ links }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const sidebarRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    if (!isOpen && windowWidth >= 768) {
      clearTimeout(hoverTimeoutRef.current);
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isOpen && windowWidth >= 768) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered(false);
      }, 300);
    }
  };

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current && 
      !sidebarRef.current.contains(event.target) && 
      windowWidth < 768 && 
      isOpen
    ) {
      setIsOpen(false);
    }
  };

  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth < 768) {
      setIsOpen(false);
      setIsHovered(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", setWindowDimensions);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("resize", setWindowDimensions);
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(hoverTimeoutRef.current);
    };
  }, [isOpen, windowWidth]);

  // Determine dashboard type from first link
  const dashboardType = links[0]?.for || "user";

  // Animation variants
  const sidebarVariants = {
    open: { 
      width: "16rem",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    closed: { 
      width: windowWidth >= 768 ? "4rem" : "0rem",
      boxShadow: windowWidth >= 768 ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30
      }
    },
    hovered: {
      width: "16rem",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  const textVariants = {
    open: { 
      opacity: 1,
      x: 0,
      display: "block",
      transition: { 
        delay: 0.1 
      }
    },
    closed: { 
      opacity: 0,
      x: -10,
      transitionEnd: { 
        display: "none" 
      }
    },
    hovered: { 
      opacity: 1,
      x: 0,
      display: "block",
      transition: { 
        delay: 0.1 
      }
    }
  };

  const toggleIconVariants = {
    open: { rotate: 0 },
    closed: { rotate: 180 },
  };

  const overlayVariants = {
    open: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    closed: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  // Determine current sidebar state for animations
  const sidebarState = isOpen ? "open" : (isHovered ? "hovered" : "closed");

  return (
    <>
      {/* Animated Sidebar */}
      <motion.div
        ref={sidebarRef}
        className="fixed top-0 left-0 h-full bg-white border-r border-gray-200 overflow-hidden z-40"
        initial={windowWidth >= 768 ? "open" : "closed"}
        animate={sidebarState}
        variants={sidebarVariants}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Toggle Icon in Sidebar */}
        <div className="absolute top-4 right-4 z-50 hidden md:block">
          <motion.button
            onClick={toggleMenu}
            className="bg-blue-100 p-1 rounded-full text-blue-600 hover:bg-blue-200 transition-colors"
            whileTap={{ scale: 0.9 }}
            animate={isOpen ? "open" : "closed"}
            variants={toggleIconVariants}
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Toggle Button */}
        <motion.button
          className="fixed md:hidden z-50 top-4 right-4 bg-white p-2 rounded-full shadow-lg text-blue-600 hover:bg-blue-50"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </motion.button>

        {/* Header with Animation */}
        <Link
          to={`/${dashboardType}-dashboard`}
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all"
        >
          <motion.div 
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
              />
            </svg>
          </motion.div>
          <motion.span 
            className="text-lg font-semibold text-white whitespace-nowrap"
            variants={textVariants}
            initial={windowWidth >= 768 ? "open" : "closed"}
            animate={sidebarState}
          >
            Dashboard
          </motion.span>
        </Link>

        {/* Navigation Links with Animation */}
        <div className="flex flex-col h-[calc(100%-136px)] overflow-y-auto py-4">
          {links.map((link) => (
            <Link
              to={link.url}
              key={link.text}
              className={`flex items-center gap-3 px-4 py-3 transition-colors relative overflow-hidden
                ${location.pathname === link.url
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`}
            >
              {/* Active indicator */}
              {location.pathname === link.url && (
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <motion.div 
                className="text-current flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {link.svg}
              </motion.div>
              
              <motion.span 
                className="text-sm font-medium whitespace-nowrap"
                variants={textVariants}
                initial={windowWidth >= 768 ? "open" : "closed"}
                animate={sidebarState}
              >
                {link.text}
              </motion.span>
              
              {/* Tooltip for collapsed state */}
              {!isOpen && !isHovered && windowWidth >= 768 && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-200 z-50">
                  {link.text}
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Logout Button with Animation */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200 bg-gray-50">
          <motion.button
            onClick={logout}
            type="button"
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            <motion.span 
              variants={textVariants}
              initial={windowWidth >= 768 ? "open" : "closed"}
              animate={sidebarState}
              className="whitespace-nowrap"
            >
              Log Out
            </motion.span>
          </motion.button>
        </div>
      </motion.div>

      {/* Animated Overlay for mobile */}
      <AnimatePresence>
        {isOpen && windowWidth < 768 && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={toggleMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}

export { Sidebar };