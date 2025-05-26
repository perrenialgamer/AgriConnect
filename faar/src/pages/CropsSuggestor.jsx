import React, { useState, useEffect } from "react";
import axios from "axios"; // Keeping axios for the initial user location fetch, if it's a separate API.

export default function CropSuggester() {
  // State for user input and API response
  const [city, setCity] = useState("");
  const [stateInput, setStateInput] = useState(""); // Renamed to avoid conflict with React's useState
  const [dateInput, setDateInput] = useState(""); // Renamed for consistency
  const [recommendedCrops, setRecommendedCrops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Effect to fetch user location on component mount
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        // Assuming /api/v1/users/current-user returns { data: { data: { city: "...", state: "..." } } }
        const res = await axios.get("/api/v1/users/current-user");
        const { city: userCity, state: userState } = res.data.data;
        setCity(userCity || ""); // Set city if available, otherwise empty
        setStateInput(userState || ""); // Set state if available, otherwise empty
        setDateInput(new Date().toISOString().split("T")[0]); // Set today's date
      } catch (err) {
        console.error("Error fetching user location:", err);
        // Optionally set a default state/city or inform the user
        setError("Could not fetch user location automatically. Please enter it manually.");
        setDateInput(new Date().toISOString().split("T")[0]); // Still set current date
      }
    };

    fetchUserLocation();
  }, []); // Run only once on mount

  // Effect to automatically call the backend for crop recommendations
  useEffect(() => {
    const getRecommendations = async () => {
      // Only proceed if city, state, and date are available
      if (!city.trim() || !stateInput.trim()) {
        setRecommendedCrops([]); // Clear recommendations if inputs become invalid
        setError(null); // Clear errors if inputs are incomplete
        return;
      }

      setIsLoading(true);
      setError(null); // Clear previous errors
      setRecommendedCrops([]); // Clear previous recommendations

      try {
        const response = await fetch("/api/v1/gpt/ask", { // Your backend endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            city: city.trim(),
            state: stateInput.trim(),
            date: dateInput,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch recommendations from server.");
        }

        const data = await response.json();
        if (data.success && data.crops) {
          setRecommendedCrops(data.crops);
        } else {
          setError("Received an unexpected response format from the server.");
        }
      } catch (err) {
        console.error("Error fetching crop recommendations:", err);
        setError(err.message || "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    // Call the function to get recommendations
    getRecommendations();

  }, [city, stateInput, dateInput]); // Re-run this effect whenever city, stateInput, or dateInput changes

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl border border-gray-200">
        <h1 className="text-4xl font-extrabold text-center text-green-800 mb-6 tracking-tight">
          Crop Suggester
        </h1>


        

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center justify-center py-4 text-green-700 font-semibold text-lg">
            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Getting Recommendations...
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Display Recommended Crops */}
        {!isLoading && recommendedCrops.length > 0 && (
          <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200 shadow-inner">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Recommended Crops:</h2>
            <div className="space-y-4">
              {recommendedCrops.map((crop, index) => (
                <div key={index} className="bg-white p-5 rounded-lg shadow-sm border border-green-100">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">{crop.cropName}</h3>
                  <p className="text-gray-700 leading-relaxed">{crop.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message if no recommendations found and not loading/error */}
        {!isLoading && recommendedCrops.length === 0 && !error && (city.trim() || stateInput.trim() || dateInput.trim()) && (
          <p className="mt-6 text-center text-gray-600">
            No recommendations found for the selected criteria, or waiting for input.
          </p>
        )}

        
      </div>
    </div>
  );
}
