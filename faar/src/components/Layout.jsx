import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide sidebar and hamburger on these routes
  const hideSidebarRoutes = ['/', '/login', '/register'];
  const hideSidebar = hideSidebarRoutes.includes(location.pathname);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const navLinks = [
    { to: '/home', name: 'Home' },
    { to: '/weather', name: 'Weather' },
    { to: '/crops-suggestor', name: 'Crop Suggestor' },
    { to: '/crops-prices', name: 'Crop Prices' },
    { to: '/profile', name: 'Profile' },
    { to: '/update-profile', name: 'Update Profile' },
    { to: '/change-password', name: 'Change Password' },
  ];

  const activeLinkClasses = "bg-indigo-700 text-white";
  const defaultLinkClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";

  const handleLogout = async () => {
    try {
      await axios.post('/api/v1/users/logout');
      navigate('/');
      closeSidebar();
    } catch (error) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hamburger Icon (show only when sidebar is closed and not on hidden routes) */}
      {!hideSidebar && !isSidebarOpen && (
        <button
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white shadow-lg"
          onClick={toggleSidebar}
          aria-label="Open navigation"
        >
          <FaBars size={24} />
        </button>
      )}

      {/* Sidebar (hide on hidden routes) */}
      {!hideSidebar && (
        <aside
          className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out z-50
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <button
            className="absolute top-2 right-2 p-2 rounded-md bg-indigo-600 text-white shadow-lg"
            onClick={toggleSidebar}
            aria-label="Close navigation"
          >
            <FaTimes size={24} />
          </button>
          <div className="pt-12 pb-6 text-center text-2xl font-bold text-white border-b border-gray-700">
            Agri-Connect
          </div>
          <nav className="mt-8 flex-grow">
            <ul>
              {navLinks.map((link) => (
                <li key={link.to} className="mb-2">
                  <NavLink
                    to={link.to}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-3 rounded-md mx-4 transition-colors duration-200 ease-in-out ${
                        isActive ? activeLinkClasses : defaultLinkClasses
                      }`
                    }
                  >
                    <span className="ml-3 text-lg">{link.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-6 py-3 text-left text-red-300 hover:bg-red-700 hover:text-white rounded-md transition-colors duration-200 ease-in-out"
            >
              <FaSignOutAlt size={20} />
              <span className="ml-3 text-lg font-semibold">Logout</span>
            </button>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <main
        className={`flex-1 min-h-screen overflow-y-auto p-4 flex flex-col items-center justify-center transition-all duration-300 ease-in-out
          ${!hideSidebar && isSidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;