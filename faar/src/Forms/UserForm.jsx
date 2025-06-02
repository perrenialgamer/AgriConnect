import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import StateCitySelector from '../components/StateCitySelector';

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    gender: '',
    state: '',
    city: '',
    role: '',
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLocationChange = ({ state, city }) => {
    setFormData((prev) => ({
      ...prev,
      state,
      city,
    }));
    setStatus('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const response = await axios.post('/api/v1/users/register', formData);

      console.log(response);
      setStatus('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setStatus(`Registration failed: ${err.response.data.message}`);
      } else {
        setStatus('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Framer Motion variants for animations
  const cardVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98 },
  };

  const statusVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white gray-100 p-4">
      <motion.div
        className="max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden p-8 border border-gray-200"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-10">
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Create Your Account
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Join Agri-Connect today and streamline your agricultural endeavors!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <motion.div variants={inputVariants} initial="hidden" animate="visible">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-green-500 focus:border-green-500 transition duration-200 text-lg placeholder-gray-500"
              disabled={loading}
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-green-500 focus:border-green-500 transition duration-200 text-lg placeholder-gray-500"
              disabled={loading}
            />
          </motion.div>

          {/* Full Name */}
          <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
            <label htmlFor="fullName" className="sr-only">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Full Name"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-green-500 focus:border-green-500 transition duration-200 text-lg placeholder-gray-500"
              disabled={loading}
            />
          </motion.div>

          {/* Password */}
          <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-green-500 focus:border-green-500 transition duration-200 text-lg placeholder-gray-500"
              disabled={loading}
            />
          </motion.div>

          {/* Gender Select */}
          <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
            <label htmlFor="gender" className="sr-only">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-green-500 focus:border-green-500 transition duration-200 text-lg appearance-none bg-white pr-8 text-gray-700"
              disabled={loading}
              required // Made gender required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </motion.div>

          {/* Role Select */}
          <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
            <label htmlFor="role" className="sr-only">
              Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-green-500 focus:border-green-500 transition duration-200 text-lg appearance-none bg-white pr-8 text-gray-700"
              disabled={loading}
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Farmer">Farmer</option>
              <option value="Vendor">Vendor</option>
            </select>
          </motion.div>

          {/* StateCitySelector component */}
          <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
            <StateCitySelector
              value={{ state: formData.state, city: formData.city }}
              onChange={handleLocationChange}
              disabled={loading}
              inputClassName="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-green-500 focus:border-green-500 transition duration-200 text-lg text-gray-700"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className={`w-full py-4 px-6 rounded-xl text-white font-bold text-xl shadow-lg focus:outline-none focus:ring-3 focus:ring-offset-2 transition duration-300 ease-in-out transform
              ${
                loading
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 focus:ring-green-500 active:scale-95'
              }`}
            disabled={loading}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Registering...
              </span>
            ) : (
              'Register Account'
            )}
          </motion.button>
        </form>

        {/* Status Message */}
        {status && (
          <motion.p
            className={`mt-6 text-center text-lg font-semibold ${
              status.includes('successful') ? 'text-green-700' : 'text-red-700'
            }`}
            variants={statusVariants}
            initial="hidden"
            animate="visible"
          >
            {status}
          </motion.p>
        )}

        {/* Login link */}
        <p className="mt-8 text-center text-gray-600 text-base">
          Already have an account?{' '}
          <a
            href="/login"
            className="font-bold text-indigo-600 hover:text-indigo-700 transition duration-200"
          >
            Login here
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default UserForm;