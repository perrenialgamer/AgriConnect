import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setStatus(''); // Clear status message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading true
    setStatus(''); // Clear previous status
    try {
      const res = await axios.post('/api/v1/users/login', formData); // 🔄 Your backend login route
      console.log('Login successful:', res.data);

      setStatus('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/home'); // 🔁 Redirect to dashboard or homepage
      }, 1000);
    } catch (err) {
      console.error('Login failed:', err);
      // More specific error messages
      if (err.response && err.response.data && err.response.data.message) {
        setStatus(err.response.data.message);
      } else {
        setStatus('Login failed. Please try again.');
      }
    } finally {
      setLoading(false); // Set loading false
    }
  };

  return (
    // Outer container for the form card
    // Using max-w-md for typical card width, mx-auto to center,
    // bg-white for card background, shadow-2xl for prominent shadow,
    // rounded-xl for large rounded corners, p-8 for internal padding.
    // border and border-gray-200 for a subtle border.
    <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden p-12 border border-gray-200 mt-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
          Welcome Back!
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Sign in to your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6"> {/* Added space-y-6 for vertical spacing */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 sr-only">Username</label> {/* sr-only for accessibility, visually hidden */}
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-lg"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 sr-only">Password</label> {/* sr-only for accessibility */}
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-lg"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-6 rounded-lg text-white font-semibold text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 ease-in-out
            ${loading
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
            }`}
          disabled={loading}
        >
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>

      {status && (
        <p className={`mt-6 text-center text-md font-medium animate-fade-in-down ${
          status.includes('successful') ? 'text-green-700' : 'text-red-700'
        }`}>
          {status}
        </p>
      )}

      <p className="mt-6 text-center text-gray-600 text-sm">
        Don't have an account? <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">Register here</a>
      </p>
    </div>
  );
};

export default LoginForm;