import { useState, useEffect } from "react";
import useWeather from "../utility/GetWeather.js";
import axios from "axios";

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
      }
    };
    getLocation();
  }, []);

  const { weather, loading, error } = useWeather(location);

  return (
    // Added 'select-none' to the main container
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden p-8 border border-gray-200 text-center">
        <div className="mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Current Weather
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Weather conditions for your registered location
          </p>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
            <p className="mt-4 text-xl font-medium text-gray-700">Fetching weather data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg font-semibold animate-fade-in-down">
            <p className="text-lg">Oops! Something went wrong.</p>
            <p className="text-sm mt-1">{error}</p>
            {(!location.city || !location.state) && (
                <p className="text-sm mt-2">Please ensure your city and state are set in your <a href="/profile/update" className="text-red-800 underline hover:text-red-900">profile settings</a>.</p>
            )}
          </div>
        )}

        {weather && (
          <div className="mt-4 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg border border-purple-200 transform hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-3xl font-bold text-gray-900 mb-3 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.727A8 8 0 016.343 7.273L17.657 16.727zm0 0l-1.55-1.55a.5.5 0 01-.137-.32l.09-.597c.01-.067.002-.134-.015-.201l-2.073-2.073a.5.5 0 01-.09-.137c-.067-.01-.134-.002-.201.015l-.597.09c-.067.01-.134-.002-.201-.015l-2.073-2.073a.5.5 0 01-.09-.137c-.067-.01-.134-.002-.201.015l-.597.09c-.067.01-.134-.002-.201-.015l-2.073-2.073a.5.5 0 01-.137-.09c-.01-.067-.002-.134.015-.201l.09-.597c.01-.067.002-.134-.015-.201L6.343 7.273A8 8 0 0117.657 16.727z" />
              </svg>
              {weather.name}, {location.state}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4 text-left">
              <WeatherDetail label="Temperature" value={`${weather.main.temp}°C`} icon="🌡️" />
              <WeatherDetail label="Conditions" value={weather.weather[0].description} icon="☁️" />
              <WeatherDetail label="Humidity" value={`${weather.main.humidity}%`} icon="💧" />
              <WeatherDetail label="Wind Speed" value={`${weather.wind.speed} M/S`} icon="🌬️" />
              {weather.main.feels_like && <WeatherDetail label="Feels like" value={`${weather.main.feels_like}°C`} icon="👤" />}
              {weather.main.pressure && <WeatherDetail label="Pressure" value={`${weather.main.pressure} hPa`} icon="⬇️" />}
            </div>
            {/* {weather.weather[0].icon && (
                <div className="mt-4 flex justify-center">
                    <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                        className="w-24 h-24"
                    />
                </div>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
}

const WeatherDetail = ({ label, value, icon }) => {
  return (
    <div className="flex items-center bg-white py-4 px-3 rounded-md shadow-sm border border-gray-100">
      <span className="text-xl mr-3 flex-shrink-0 w-8 text-center">{icon}</span>
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-500">{label}:</p>
        <p className="mt-1 text-lg font-semibold text-gray-900 capitalize break-words">
            {value}
        </p>
      </div>
    </div>
  );
};