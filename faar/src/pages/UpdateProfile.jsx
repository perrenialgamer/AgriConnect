import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StateCitySelector from '../components/StateCitySelector'; // Assuming this component exists
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion from framer-motion

function UpdateProfile() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [prevFullName, setPrevFullName] = useState("");
  const [prevEmail, setPrevEmail] = useState("");
  const [prevState, setPrevState] = useState("");
  const [prevCity, setPrevCity] = useState("");
  const [nothingToUpdate, setNothingToUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("/api/v1/users/current-user");
        const { city, state, email, fullName } = res.data.data;
        setCity(city || "");
        setState(state || "");
        setEmail(email || "");
        setFullName(fullName || "");
        setPrevCity(city || "");
        setPrevState(state || "");
        setPrevEmail(email || "");
        setPrevFullName(fullName || "");
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user Profile:", err);
        setError("Failed to load user profile for editing. Please try again.");
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleLocationChange = ({ state: newState, city: newCity }) => {
    if (newState !== state) {
      setState(newState);
      setCity(""); // Reset city if state changes
    } else {
      setCity(newCity);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg("");
    setNothingToUpdate(false);

    // Validation: If state is selected, city must also be selected
    if (state && !city) {
      setError("Please select a city after choosing a state.");
      return;
    }

    // Check if any field has changed
    if (
      fullName === prevFullName &&
      email === prevEmail &&
      state === prevState &&
      city === prevCity
    ) {
      setNothingToUpdate(true);
      setTimeout(() => setNothingToUpdate(false), 2000); // Message disappears after 2 seconds
      return;
    }

    try {
      await axios.patch("/api/v1/users/updatedetails", {
        fullName,
        email,
        state,
        city,
      });
      setSuccessMsg("Profile updated successfully!");
      // Update previous values to reflect the successful update
      setPrevFullName(fullName);
      setPrevEmail(email);
      setPrevState(state);
      setPrevCity(city);
      setTimeout(() => {
        setSuccessMsg("");
        navigate('/profile'); // Navigate back to profile page after success
      }, 1500);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen bg-gray-100 select-none">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-lg text-gray-700">Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden p-8 border border-gray-200"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Update Profile
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Modify your personal details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <motion.input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Your full name"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              whileFocus={{ scale: 1.02, borderColor: '#6366f1', boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.25)' }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <motion.input
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              whileFocus={{ scale: 1.02, borderColor: '#6366f1', boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.25)' }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
          </div>

          <StateCitySelector
            onChange={handleLocationChange}
            value={{ state, city }} // Pass current values to initialize the selector
            className="w-full" // Add a class for styling if needed within the component
          />

          <motion.button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Save Changes
          </motion.button>

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center font-semibold"
            >
              {successMsg}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-center font-semibold"
            >
              {error}
            </motion.div>
          )}
          {nothingToUpdate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-3 bg-yellow-100 text-yellow-700 rounded-md text-center font-semibold"
            >
              Nothing to update.
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
}

export default UpdateProfile;