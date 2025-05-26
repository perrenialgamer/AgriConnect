import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StateCitySelector from '../components/StateCitySelector'; // Assuming this component exists and is functional

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
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const handleLocationChange = ({ state, city }) => {
    setFormData((prev) => ({
      ...prev,
      state,
      city,
    }));
    setStatus(''); // Clear status message on location change
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setStatus(''); // Clear status message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    setStatus(''); // Clear previous status
    try {
      const response = await axios.post('/api/v1/users/register', formData); // Your backend register route
      
      console.log(response)
      setStatus('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page
      }, 1500); // Give user a bit more time to read success message
    } catch (err) {
      // console.error(err);
      // More specific error messages
      if (err.response && err.response.data && err.response.data.message) {
        setStatus(`Registration failed: ${err.response.data.message}`);
      } else {
        setStatus('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    // Outer container for the form card
    // Using max-w-lg for a slightly wider card due to more fields, mx-auto to center.
    // bg-white for card background, shadow-2xl for prominent shadow,
    // rounded-xl for large rounded corners, p-8 for internal padding.
    // border and border-gray-200 for a subtle border.
    <div className=" max-w-lg w-full bg-white rounded-xl shadow-2xl overflow-hidden p-8 border border-gray-200 mt-30">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
          Create Your Account
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Join Agri-Connect today!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6"> {/* Added space-y-6 for vertical spacing */}
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 sr-only">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-lg"
            disabled={loading}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 sr-only">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-lg"
            disabled={loading}
          />
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 sr-only">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Full Name"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-lg"
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 sr-only">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-lg"
            disabled={loading}
          />
        </div>

        {/* Gender Select */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 sr-only">Gender</label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-lg appearance-none bg-white pr-8" /* Added appearance-none and pr-8 for custom arrow if desired */
            disabled={loading}
          >
            <option value="" disabled>Select Gender</option> {/* Added disabled to prevent selection */}
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>

        {/* Role Select */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 sr-only">Role</label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-lg appearance-none bg-white pr-8"
            disabled={loading}
          >
            <option value="" disabled>Select Role</option> {/* Added disabled to prevent selection */}
            <option value="Farmer">Farmer</option>
            <option value="Vendor">Vendor</option>
          </select>
        </div>

        {/* StateCitySelector component */}
        {/* Assuming StateCitySelector is already styled with similar input aesthetics */}
        <StateCitySelector
          value={{ state: formData.state, city: formData.city }}
          onChange={handleLocationChange}
          disabled={loading} // Pass disabled prop to child component
        />

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 px-6 rounded-lg text-white font-semibold text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 ease-in-out
            ${loading
              ? 'bg-green-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
            }`}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register Account'}
        </button>
      </form>

      {/* Status Message */}
      {status && (
        <p className={`mt-6 text-center text-md font-medium animate-fade-in-down ${
          status.includes('successful') ? 'text-green-700' : 'text-red-700'
        }`}>
          {status}
        </p>
      )}

      {/* Login link */}
      <p className="mt-6 text-center text-gray-600 text-sm">
        Already have an account? <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">Login here</a>
      </p>
    </div>
  );
};

export default UserForm;