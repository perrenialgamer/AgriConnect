import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaHome,
  FaCloudSun,
  FaSeedling,
  FaMoneyBillWave,
  FaUser,
  FaEdit,
  FaKey,
} from 'react-icons/fa';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const hideSidebarRoutes = ['/', '/login', '/register'];
  const hideSidebar = hideSidebarRoutes.includes(location.pathname);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const navLinks = [
    { to: '/home', name: 'Home', icon: <FaHome size={20} className="text-blue-400 group-hover:text-white" /> },
    { to: '/weather', name: 'Weather', icon: <FaCloudSun size={20} className="text-yellow-400 group-hover:text-white" /> },
    { to: '/crops-suggestor', name: 'Crop Suggestor', icon: <FaSeedling size={20} className="text-green-400 group-hover:text-white" /> },
    { to: '/vendors', name: 'Crop Prices', icon: <FaMoneyBillWave size={20} className="text-purple-400 group-hover:text-white" /> },
    { to: '/profile', name: 'Profile', icon: <FaUser size={20} className="text-red-400 group-hover:text-white" /> },
    { to: '/update-profile', name: 'Update Profile', icon: <FaEdit size={20} className="text-teal-400 group-hover:text-white" /> },
    { to: '/change-password', name: 'Change Password', icon: <FaKey size={20} className="text-orange-400 group-hover:text-white" /> },
  ];

  const activeLinkClasses = "bg-indigo-700 text-white shadow-lg";
  const defaultLinkClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";

  // Framer Motion Variants
  const sidebarVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: '0%', opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } },
    exit: { x: '-100%', opacity: 0, transition: { ease: 'easeOut', duration: 0.3 } },
  };

  const navLinkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const hamburgerButtonVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.5, type: 'spring', stiffness: 200 } },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  const closeButtonVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.2, type: 'spring', stiffness: 200 } },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  const handleLogout = async () => {
    try {
      // Assuming you have an axios instance set up or a direct logout endpoint
      await axios.post('/api/v1/users/logout');
      navigate('/');
      closeSidebar();
    } catch (error) {
      console.error("Logout failed:", error);
      navigate('/'); // Still navigate to home on error for state reset
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hamburger Icon */}
      <AnimatePresence>
        {!hideSidebar && !isSidebarOpen && (
          <motion.button
            key="hamburger-button"
            className="fixed top-4 left-4 z-50 p-3 rounded-full bg-indigo-600 text-white shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={toggleSidebar}
            aria-label="Open navigation"
            variants={hamburgerButtonVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover="hover"
            whileTap="tap"
          >
            <FaBars size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {!hideSidebar && isSidebarOpen && (
          <motion.aside
            key="sidebar"
            className="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white z-50 flex flex-col"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.button
              className="absolute top-4 right-4 p-3 rounded-full bg-indigo-600 text-white shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={toggleSidebar}
              aria-label="Close navigation"
              variants={closeButtonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              <FaTimes size={24} />
            </motion.button>

            <div className="pt-20 pb-6 text-center text-3xl font-extrabold text-white border-b border-gray-700">
              Agri-Connect
            </div>

            <nav className="mt-8 flex-grow **overflow-y-auto** no-scrollbar"> {/* Keep this for internal sidebar scrolling if needed */}
              <ul className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.to}
                    variants={navLinkVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <NavLink
                      to={link.to}
                      onClick={closeSidebar}
                      className={({ isActive }) =>
                        `group flex items-center px-6 py-3 rounded-lg mx-4 transition-colors duration-200 ease-in-out font-medium text-lg
                          ${isActive ? activeLinkClasses : defaultLinkClasses}`
                      }
                    >
                      {link.icon}
                      <span className="ml-4">{link.name}</span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t border-gray-700 mt-auto">
              <motion.button
                onClick={handleLogout}
                className="flex items-center w-full px-6 py-3 text-left text-red-400 hover:bg-red-700 hover:text-white rounded-lg transition-colors duration-200 ease-in-out font-semibold text-lg shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaSignOutAlt size={20} className="mr-3" />
                <span>Logout</span>
              </motion.button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main
        className={`flex-1 min-h-screen **overflow-hidden** p-6 flex flex-col items-center justify-center transition-all duration-300 ease-in-out
          ${!hideSidebar && isSidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;