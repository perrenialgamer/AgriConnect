import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setError("");

    try {
      const res = await axios.post("/api/v1/users/change-password", { oldPassword, newPassword });
      setSuccessMsg(res.data.message || "Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setTimeout(() => {
        setSuccessMsg("");
        navigate('/profile'); // Navigate back to profile page after success
      }, 1500); // Increased timeout slightly for better user experience
    } catch (err) {
      console.error("Error changing password:", err);
      // More robust error handling for backend messages
      const backendError = err.response?.data?.message || err.response?.data?.error || err.response?.data?.user?.error || "Failed to change password. Please check your old password.";
      setError(backendError);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 select-none">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden p-8 border border-gray-200"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Change Password
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Secure your account by updating your password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <motion.input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your current password"
              whileFocus={{ scale: 1.02, borderColor: '#6366f1', boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.25)' }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <motion.input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your new password"
              whileFocus={{ scale: 1.02, borderColor: '#6366f1', boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.25)' }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
          </div>
          <motion.button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Change Password
          </motion.button>

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} // Exit requires AnimatePresence to work on unmount
              className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center font-semibold"
            >
              {successMsg}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} // Exit requires AnimatePresence to work on unmount
              className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-center font-semibold"
            >
              {error}
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
}

export default ChangePassword;