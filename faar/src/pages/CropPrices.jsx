import React, { useState, useEffect } from 'react';
import crop_prices from '../storage/crop_prices.json'; // Assuming this is a static JSON file
import axios from 'axios';

const CropPrices = () => {
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");
  const [state, setState] = useState("");
  const [updatePrice, setUpdatePrice] = useState({}); // Renamed for clarity: holds the fetched/current prices
  const [editablePrices, setEditablePrices] = useState({}); // Holds prices being edited
  const [loading, setLoading] = useState(false); // For API calls (save)
  const [isEditing, setIsEditing] = useState(false); // Controls edit mode
  const [successMsg, setSuccessMsg] = useState(""); // Changed to string for message content
  const [errorMsg, setErrorMsg] = useState(""); // Added for error messages
  const [searchTerm, setSearchTerm] = useState("");
  const [noUpdateMsg, setNoUpdateMsg] = useState(false);
  const [initialLoadError, setInitialLoadError] = useState(false); // For initial data fetch error

  // Handler for changing price in editable mode
  const handlePriceChange = (cropName, newPrice) => {
    // Ensure newPrice is a valid number, default to 0 if not
    const parsedPrice = Number(newPrice);
    setEditablePrices((prev) => ({
      ...prev,
      [cropName]: isNaN(parsedPrice) ? 0 : parsedPrice,
    }));
  };

  // Handler for saving changes
  const handleSaveClick = async () => {
    setLoading(true);
    setNoUpdateMsg(false);
    setSuccessMsg("");
    setErrorMsg("");

    // Only include crops whose price has actually changed from the last saved state
    const updates = Object.entries(editablePrices)
      .filter(([cropName, price]) => updatePrice[cropName] !== price)
      .map(([cropName, price]) => ({
        cropName,
        price,
      }));

    if (updates.length === 0) {
      setNoUpdateMsg(true);
      setTimeout(() => setNoUpdateMsg(false), 2000);
      setLoading(false);
      setIsEditing(false); // Exit editing mode if nothing changed
      return;
    }

    try {
      // Send updates in batches or individually based on API capability
      // Assuming individual patch calls are required per your original code
      for (const update of updates) {
        await axios.patch("/api/v1/crop/priceupdate", update);
      }
      setUpdatePrice({ ...editablePrices }); // Update the displayed prices with the new saved values
      setSuccessMsg("Prices updated successfully!");
      setTimeout(() => setSuccessMsg(""), 2000);
      setIsEditing(false); // Exit editing mode on success
    } catch (error) {
      console.error("Error saving updated prices:", error);
      setErrorMsg("Failed to save prices. Please try again.");
      setTimeout(() => setErrorMsg(""), 3000); // Clear error after 3 seconds
    } finally {
      setLoading(false);
    }
  };

  // Handler for entering edit mode
  const handleUpdateClick = () => {
    setIsEditing(true);
    setEditablePrices({ ...updatePrice }); // Initialize editablePrices with current prices
    setSuccessMsg(""); // Clear any previous success message
    setErrorMsg(""); // Clear any previous error message
    setNoUpdateMsg(false); // Clear no update message
  };

  // Fetch user location and role on component mount
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const res = await axios.get("/api/v1/users/current-user");
        const { city: userCity, state: userState, role: userRole } = res.data.data;
        setCity(userCity || "");
        setState(userState || "");
        setRole(userRole || "");
      } catch (err) {
        console.error("Error fetching user location for role check:", err);
        // If role cannot be fetched, assume non-vendor or handle appropriately
        setErrorMsg("Could not fetch user role. Update functionality may be limited.");
      }
    }
    fetchUserLocation();
  }, []);

  // Fetch initial crop prices on component mount
  useEffect(() => {
    const fetchUpdatedPrice = async () => {
      try {
        const res = await axios.get("/api/v1/crop/prices");
        const fetchedData = res.data.data;
        let initialPrices = { ...crop_prices }; // Start with default prices from JSON
        fetchedData.forEach(item => {
          if (initialPrices[item.cropName] !== undefined) {
            initialPrices[item.cropName] = item.price; // Override with fetched prices
          }
        });
        setUpdatePrice({ ...initialPrices });
        setInitialLoadError(false);
      } catch (err) {
        console.error("Error fetching updated prices:", err);
        setInitialLoadError(true);
        setErrorMsg("Failed to load crop prices. Please try again later.");
      }
    }
    fetchUpdatedPrice();
  }, []);

  // Determine which prices to display (editable or current) and filter by search term
  const currentPricesToDisplay = isEditing ? editablePrices : updatePrice;

  const filteredAndSortedEntries = Object.entries(currentPricesToDisplay)
    .filter(([cropName]) =>
      cropName.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )
    .sort(([cropNameA], [cropNameB]) =>
      cropNameA.localeCompare(cropNameB) // Alphabetical sort
    );

  return (
    // Added 'select-none' to make content non-selectable
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-2xl overflow-hidden p-8 border border-gray-200 text-center">
        <div className="mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Crop Market Prices
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            View and update crop prices in {city || 'your city'}, {state || 'your state'}
          </p>
        </div>

        {initialLoadError ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg font-semibold animate-fade-in-down mb-4">
            {errorMsg}
          </div>
        ) : (
          <>
            {/* Search Bar */}
            <div className="mb-6 flex justify-center">
              <input
                type="text"
                placeholder="Search by crop name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full max-w-md px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              />
            </div>

            <div className="grid gap-4">
              {filteredAndSortedEntries.length === 0 ? (
                <div className="text-center text-gray-500 text-lg py-8">
                  No crops found matching your search.
                </div>
              ) : (
                filteredAndSortedEntries.map(([cropName, price]) => (
                  <div
                    key={cropName}
                    className="flex flex-col sm:flex-row justify-between items-center p-5 bg-gray-50 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-200 ease-in-out"
                  >
                    <span className="font-semibold text-xl text-gray-800 mb-2 sm:mb-0 sm:mr-4 capitalize">
                      {cropName}
                    </span>
                    {isEditing ? (
                      <input
                        type="number"
                        min={0}
                        value={editablePrices[cropName] || 0} // Ensure value is controlled
                        onChange={(e) => handlePriceChange(cropName, e.target.value)}
                        className="w-full sm:w-32 px-3 py-2 border border-gray-300 rounded-md text-right text-lg font-medium focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                        disabled={loading}
                      />
                    ) : (
                      <span className="text-indigo-600 font-bold text-2xl">
                        ₹ {price}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>

            {role === "Vendor" && (
              <div className="mt-8 text-center">
                {!isEditing ? (
                  <button
                    onClick={handleUpdateClick}
                    className="w-full sm:w-auto py-3 px-8 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
                    disabled={loading}
                  >
                    Update Prices
                  </button>
                ) : (
                  <button
                    onClick={handleSaveClick}
                    className={`w-full sm:w-auto py-3 px-8 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 ease-in-out ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                )}

                {successMsg && (
                  <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center font-semibold animate-fade-in-down">
                    {successMsg}
                  </div>
                )}
                {errorMsg && (
                  <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-center font-semibold animate-fade-in-down">
                    {errorMsg}
                  </div>
                )}
                {noUpdateMsg && (
                  <div className="mt-4 p-3 bg-yellow-100 text-yellow-700 rounded-md text-center font-semibold animate-fade-in-down">
                    No price was updated.
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CropPrices;