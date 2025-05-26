import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate=useNavigate()
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("/api/v1/users/current-user");
        const { city, state, username, email, fullName, gender, role } = res.data.data;
        setCity(city);
        setState(state);
        setUsername(username);
        setEmail(email);
        setFullName(fullName);
        setGender(gender);
        setRole(role);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user Profile:", err);
        setError("Failed to load user profile. Please try again.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-lg text-gray-700">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700 text-lg">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            User Profile
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Details about your account
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-center mb-6">
            {/* You could add an avatar here if you have an avatar URL */}
            <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-full w-24 h-24 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {fullName ? fullName.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-4">
            <ProfileItem label="Full Name" value={fullName} />
            <ProfileItem label="Username" value={username} />
            <ProfileItem label="Email" value={email} />
            <ProfileItem label="Gender" value={gender} />
            <ProfileItem label="Role" value={role} />
            {city && <ProfileItem label="City" value={city} />}
            {state && <ProfileItem label="State" value={state} />}
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
            onClick={() => navigate('/update-profile')}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

// A reusable component for displaying a profile item
const ProfileItem = ({ label, value }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
    </div>
  );
};

export default ProfilePage;