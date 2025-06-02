import { useState, useEffect } from "react";
import useWeather from "../utility/GetWeather.js"; // Assuming this hook exists and works
import axios from "axios";
import { motion } from "framer-motion"; // Import motion from framer-motion

export default function WeatherFetcher() {
  const [location, setLocation] = useState({ state: "", city: "" });

  useEffect(() => {
    const getLocation = async () => {
      try {
        const res = await axios.get("/api/v1/users/current-user");
        const { state, city } = res.data.data;
        setLocation({ state: state || "", city: city || "" });
      } catch (error) {
        console.error("Error fetching user location:", error);
        setLocation({ state: "", city: "" }); // Clear location on error
      }
    };
    getLocation();
  }, []);

  const { weather, loading, error } = useWeather(location);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 select-none"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden p-10 border border-gray-200 text-center min-h-[85vh] flex flex-col"
      >
        <div className="mb-8">
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Current Weather
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Weather conditions for your registered location
          </p>
        </div>

        {loading && (
          <motion.div
            key="loading" // Add a key for Framer Motion to differentiate components
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} // For exit animations, you'll need AnimatePresence around the conditional content
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-8 flex-grow"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-500"
            ></motion.div>
            <p className="mt-6 text-2xl font-medium text-gray-700">
              Fetching weather data...
            </p>
          </motion.div>
        )}

        {error && (
          <motion.div
            key="error" // Add a key for Framer Motion
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-red-100 text-red-700 p-6 rounded-lg font-semibold animate-fade-in-down flex-grow flex flex-col justify-center"
          >
            <p className="text-xl">Oops! Something went wrong.</p>
            <p className="text-base mt-2">{error}</p>
            {(!location.city || !location.state) && (
              <p className="text-base mt-3">
                Please ensure your city and state are set in your{" "}
                <a
                  href="/profile/update"
                  className="text-red-800 underline hover:text-red-900"
                >
                  profile settings
                </a>
                .
              </p>
            )}
          </motion.div>
        )}

        {weather && (
          <motion.div
            key="weather" // Add a key for Framer Motion
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-4 p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg border border-purple-200 transform hover:scale-105 transition duration-300 ease-in-out flex-grow flex flex-col justify-center overflow-y-auto"
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-6 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mr-3 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.727A8 8 0 016.343 7.273L17.657 16.727zm0 0l-1.55-1.55a.5.5 0 01-.137-.32l.09-.597c.01-.067.002-.134-.015-.201l-2.073-2.073a.5.5 0 01-.09-.137c-.067-.01-.134-.002-.201.015l-.597.09c-.067.01-.134-.002-.201-.015l-2.073-2.073a.5.5 0 01-.09-.137c-.067-.01-.134-.002-.201.015l-.597.09c-.067.01-.134-.002-.201-.015l-2.073-2.073a.5.5 0 01-.137-.09c-.01-.067-.002-.134.015-.201l.09-.597c.01-.067.002-.134-.015-.201L6.343 7.273A8 8 0 0117.657 16.727z"
                />
              </svg>
              {weather.name}, {location.state}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-6 text-left">
              <WeatherDetail label="Temperature" value={`${weather.main.temp}°C`} icon="🌡️" />
              <WeatherDetail label="Conditions" value={weather.weather[0].description} icon="☁️" />
              <WeatherDetail label="Humidity" value={`${weather.main.humidity}%`} icon="💧" />
              <WeatherDetail label="Wind Speed" value={`${weather.wind.speed} M/S`} icon="🌬️" />
              {weather.main.feels_like && <WeatherDetail label="Feels like" value={`${weather.main.feels_like}°C`} icon="👤" />}
              {weather.main.pressure && <WeatherDetail label="Pressure" value={`${weather.main.pressure} hPa`} icon="⬇️" />}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

const WeatherDetail = ({ label, value, icon }) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex items-center bg-white py-5 px-4 rounded-lg shadow-sm border border-gray-100"
    >
      <span className="text-2xl mr-4 flex-shrink-0 w-10 text-center">
        {icon}
      </span>
      <div className="flex-grow">
        <p className="text-base font-medium text-gray-500">{label}:</p>
        <p className="mt-1 text-xl font-semibold text-gray-900 capitalize break-words">
          {value}
        </p>
      </div>
    </motion.div>
  );
};