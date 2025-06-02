import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Skeleton component for loading state
const VendorCardSkeleton = () => (
    <div className="border border-gray-200 rounded-2xl shadow-lg p-6 bg-white animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
    </div>
);

function Vendors() {
    const [mycity, setCity] = useState("");
    const [mystate, setState] = useState("");
    const [cityVendors, setcityVendors] = useState([]);
    const [loading, setLoading] = useState(true); // Set initial loading to true
    const [error, setError] = useState(null); // State for error handling

    // Fetch user location on component mount
    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                const res = await axios.get("/api/v1/users/current-user");
                const { city: userCity, state: userState } = res.data.data;

                setCity(userCity || "");
                setState(userState || "");
            } catch (err) {
                console.error("Error fetching user location:", err);
                setError("Failed to fetch your location. Please try again.");
                setLoading(false); // Stop loading if user location fetch fails
            }
        };

        fetchUserLocation();
    }, []);

    // Fetch vendors based on user's city and state
    useEffect(() => {
        const getVendor = async () => {
            if (!mystate || !mycity) {
                // If location is not yet set, don't fetch vendors
                setLoading(true); // Keep loading true until location is determined
                return;
            }

            setLoading(true); // Start loading when fetching vendors
            setError(null); // Clear previous errors
            try {
                const res = await axios.get('/api/v1/crop/vendors');
                const filteredData = res.data.data.filter(user => user.state === mystate && user.city === mycity);

                setcityVendors(filteredData);
            } catch (error) {
                console.error("Error fetching vendors:", error);
                setError("Failed to load vendors. Please try again later.");
            } finally {
                setLoading(false); // Stop loading after fetch attempt
            }
        };

        getVendor();
    }, [mystate, mycity]); // Re-run when city or state changes

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-inter select-none">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden p-8 border border-gray-200 text-center"
            >
                <h2 className="text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
                    Vendors in {mycity || 'Your City'}, {mystate || 'Your State'}
                </h2>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-red-100 text-red-700 p-4 rounded-lg font-semibold mb-6 border border-red-200"
                    >
                        {error}
                    </motion.div>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Display multiple skeleton cards while loading */}
                        {[...Array(6)].map((_, index) => (
                            <VendorCardSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <>
                        {cityVendors.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-center text-gray-600 text-xl py-12"
                            >
                                No vendors found in your city.
                            </motion.div>
                        ) : (
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {cityVendors.map((vendor) => (
                                    <motion.div
                                        key={vendor._id}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                                        transition={{ duration: 0.2 }}
                                        className="border border-gray-100 rounded-2xl shadow-lg p-6 bg-white cursor-pointer"
                                    >
                                        <Link
                                            to={`/crops-prices/${vendor.username}`}
                                            className="block text-left" // Ensure link block takes full width
                                        >
                                            <h3 className="text-2xl font-bold text-blue-700 hover:text-blue-800 mb-1">
                                                {vendor.fullName}
                                            </h3>
                                            <p className="text-md text-gray-600 mb-2">@{vendor.username}</p>
                                            <p className="text-sm text-gray-500">
                                                {vendor.city}, {vendor.state}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-2">
                                                Joined on {new Date(vendor.createdAt).toLocaleDateString()}
                                            </p>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </>
                )}
            </motion.div>
        </div>
    );
}

export default Vendors;