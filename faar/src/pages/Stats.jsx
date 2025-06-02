import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import motion
import crop_prices from '../storage/crop_prices.json'; // Ensure this path is correct relative to your project
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

function Stats() {
    const { cropName } = useParams();
    const navigate = useNavigate();
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        const fetchPrices = async () => {
            setLoading(true); // Set loading to true before fetching
            setError(null); // Clear any previous errors
            try {
                const response = await axios.get(`/api/v1/crop/stats/${cropName}`);

                const updatedPrices = response.data.data
                    .map(item => ({
                        username: item.username,
                        price: item.price === 0 ? crop_prices[cropName] : item.price
                    }))
                    // Sort the array by price in descending order to show highest prices first
                    .sort((a, b) => b.price - a.price);

                // Limit data to a maximum of 5 records
                const limitedPrices = updatedPrices.slice(0, 5);

                setPrices(limitedPrices);
                console.log('Updated prices data:', limitedPrices);
            } catch (error) {
                console.error('Error fetching prices:', error); // More descriptive error message
                setError("Failed to fetch crop prices. Please try again later.");
            } finally {
                setLoading(false); // Set loading to false after fetching (success or error)
            }
        };
        fetchPrices();
    }, [cropName]);

    // Framer Motion variants for animations
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
            transition: {
                duration: 0.3
            }
        },
        tap: {
            scale: 0.98
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4 font-sans antialiased">
            <motion.div
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col border border-gray-200"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex justify-between items-center mb-8">
                    <motion.h1
                        className="text-4xl font-extrabold text-gray-900 text-center flex-grow leading-tight"
                        variants={textVariants}
                    >
                        Price per Quintal for <span className="text-emerald-600">{cropName}</span>
                    </motion.h1>
                    <motion.button
                        onClick={() => navigate('/vendors')}
                        className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-7 rounded-full transition-colors duration-300 ease-in-out shadow-lg"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Back to Vendors
                    </motion.button>
                </div>

                {loading ? (
                    <div className="flex-grow flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-indigo-500 rounded-full"
                        ></motion.div>
                        <p className="ml-4 text-lg text-gray-600">Loading prices...</p>
                    </div>
                ) : error ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex-grow flex items-center justify-center text-red-600 text-xl font-medium"
                    >
                        {error}
                    </motion.div>
                ) : prices.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex-grow flex items-center justify-center text-gray-600 text-xl font-medium"
                    >
                        No price data available for {cropName}.
                    </motion.div>
                ) : (
                    <motion.div
                        className="flex-grow"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={prices}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                <XAxis
                                    dataKey="username"
                                    angle={-45}
                                    textAnchor="end"
                                    height={100}
                                    tick={{ fill: '#4a5568', fontSize: 14, fontWeight: 'bold' }}
                                    axisLine={{ stroke: '#cbd5e0' }}
                                    tickLine={{ stroke: '#cbd5e0' }}
                                />
                                <YAxis
                                    label={{
                                        value: 'Price per Quintal (₹)',
                                        angle: -90,
                                        position: 'insideLeft',
                                        dy: 70,
                                        dx: -5,
                                        fill: '#4a5568',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                    }}
                                    tick={{ fill: '#4a5568', fontSize: 14 }}
                                    axisLine={{ stroke: '#cbd5e0' }}
                                    tickLine={{ stroke: '#cbd5e0' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.98)',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '12px',
                                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                                        padding: '12px',
                                    }}
                                    labelStyle={{ color: '#2d3748', fontWeight: 'bold', fontSize: 17, marginBottom: '4px' }}
                                    itemStyle={{ color: '#4a5568', fontSize: 15 }}
                                    formatter={(value) => [`₹ ${value}`, 'Price']}
                                />
                                <Legend
                                    wrapperStyle={{ paddingTop: '20px', fontSize: 15, fontWeight: '600' }}
                                    iconType="circle"
                                    payload={[{ value: 'Current Price', type: 'rect', color: '#3b82f6' }]} // Changed payload value
                                />
                                <Bar
                                    dataKey="price"
                                    fill="#3b82f6" // A nice vibrant blue
                                    name="Current Price"
                                    radius={[8, 8, 0, 0]} // Slightly smaller radius
                                    barSize={50} // Slightly smaller bar size
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}

export default Stats;