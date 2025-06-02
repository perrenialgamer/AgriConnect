import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion

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

    const navigate = useNavigate();

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

    // Define animation variants for staggered appearance
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08, // Slightly faster stagger for more items
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        },
    };

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                <p className="ml-4 text-lg text-gray-700">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center min-h-screen bg-red-100 text-red-700 text-lg p-4 rounded-lg shadow-md"
            >
                <p>{error}</p>
            </motion.div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                // Increased max-width and adjusted padding for PC
                className="w-full max-w-4xl bg-white rounded-2xl shadow-3xl overflow-hidden p-10 border border-gray-200"
            >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-10">
                    {/* Avatar Section */}
                    <motion.div
                        className="flex-shrink-0"
                        variants={itemVariants}
                    >
                        <motion.div
                            className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-full w-32 h-32 flex items-center justify-center text-white text-5xl font-bold shadow-xl ring-4 ring-indigo-300 ring-opacity-50"
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            {fullName ? fullName.charAt(0).toUpperCase() : 'U'}
                        </motion.div>
                    </motion.div>

                    {/* Profile Header Text */}
                    <div className="text-center md:text-left flex-grow">
                        <motion.h2
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-5xl font-extrabold text-gray-900 leading-tight mb-2"
                        >
                            {fullName || "User Profile"}
                        </motion.h2>
                        <motion.p
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-xl text-gray-600 font-medium"
                        >
                            Your Account Overview
                        </motion.p>
                        <motion.p
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="mt-4 text-gray-500 text-md italic"
                        >
                                {/* Only display if location exists */}
                            {city && state ? `${city}, ${state}` : 'Location Not Set'}
                        </motion.p>
                    </div>
                </div>

                {/* Profile Details Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8" // Two columns on medium screens and up
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <ProfileItem label="Username" value={username} variants={itemVariants} />
                    <ProfileItem label="Email" value={email} variants={itemVariants} />
                    <ProfileItem label="Gender" value={gender || "Not specified"} variants={itemVariants} />
                    <ProfileItem label="Role" value={role} variants={itemVariants} />
                    {/* City and State will display if they exist */}
                    {city && <ProfileItem label="City" value={city} variants={itemVariants} />}
                    {state && <ProfileItem label="State" value={state} variants={itemVariants} />}
                </motion.div>

                {/* Action Buttons */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.button
                        className="w-full py-4 px-8 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out text-lg"
                        onClick={() => navigate('/update-profile')}
                        whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(99, 102, 241, 0.4)" }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <i className="fas fa-edit mr-3"></i> Edit Profile
                    </motion.button>
                    <motion.button
                        className="w-full py-4 px-8 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300 ease-in-out text-lg"
                        onClick={() => navigate('/change-password')} // Assuming you have this route
                        whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(168, 85, 247, 0.4)" }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <i className="fas fa-key mr-3"></i> Change Password
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}

// A reusable component for displaying a profile item
const ProfileItem = ({ label, value, variants }) => { // Accept variants prop
    return (
        <motion.div
            className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            variants={variants} // Apply variants to each item
            whileHover={{ scale: 1.02, backgroundColor: '#f0f4f8' }} // Subtle hover for items
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
            <p className="text-xl font-semibold text-gray-900">{value}</p>
        </motion.div>
    );
};

export default ProfilePage;