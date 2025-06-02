import React, { useState, useEffect } from "react";
import crop_prices from "../storage/crop_prices.json";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

const CropPrices = () => {
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");
  const [state, setState] = useState("");
  const [updatePrice, setUpdatePrice] = useState({});
  const [editablePrices, setEditablePrices] = useState({});
  const [initialLoadLoading, setInitialLoadLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [noUpdateMsg, setNoUpdateMsg] = useState(false);
  const [initialLoadError, setInitialLoadError] = useState(false);
  const [myUsername, setmyUsername] = useState("");
  const { username } = useParams();

  const handlePriceChange = (cropName, newPrice) => {
    const parsedPrice = Number(newPrice);
    setEditablePrices((prev) => ({
      ...prev,
      [cropName]: isNaN(parsedPrice) ? 0 : parsedPrice,
    }));
  };

  const handleSaveClick = async () => {
    setIsSaving(true);
    setNoUpdateMsg(false);
    setSuccessMsg("");
    setErrorMsg("");

    const updates = Object.entries(editablePrices)
      .filter(([cropName, price]) => updatePrice[cropName] !== price)
      .map(([cropName, price]) => ({
        cropName,
        price,
      }));

    if (updates.length === 0) {
      setNoUpdateMsg(true);
      setTimeout(() => setNoUpdateMsg(false), 2000);
      setIsSaving(false);
      setIsEditing(false);
      return;
    }

    try {
      for (const update of updates) {
        await axios.patch("/api/v1/crop/priceupdate", update);
      }
      setUpdatePrice({ ...editablePrices });
      setSuccessMsg("Prices updated successfully!");
      setTimeout(() => setSuccessMsg(""), 2000);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving updated prices:", error);
      setErrorMsg("Failed to save prices. Please try again.");
      setTimeout(() => setErrorMsg(""), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
    setEditablePrices({ ...updatePrice });
    setSuccessMsg("");
    setErrorMsg("");
    setNoUpdateMsg(false);
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const res = await axios.get("/api/v1/users/current-user");
        const {
          city: userCity,
          state: userState,
          role: userRole,
          username: userUsername,
        } = res.data.data;
        setCity(userCity || "");
        setState(userState || "");
        setRole(userRole || "");
        setmyUsername(userUsername || "");
      } catch (err) {
        console.error("Error fetching user location for role check:", err);
        setErrorMsg(
          "Could not fetch user role. Update functionality may be limited."
        );
      }
    };
    fetchUserLocation();
  }, []);

  useEffect(() => {
    const fetchUpdatedPrice = async () => {
      setInitialLoadLoading(true);
      try {
        const res = await axios.get(`/api/v1/crop/prices/${username}`);
        const fetchedData = res.data.data;
        let initialPrices = { ...crop_prices };
        fetchedData.forEach((item) => {
          if (initialPrices[item.cropName] !== undefined) {
            initialPrices[item.cropName] = item.price;
          }
        });
        setUpdatePrice({ ...initialPrices });
        setInitialLoadError(false);
      } catch (err) {
        console.error("Error fetching updated prices:", err);
        setInitialLoadError(true);
        setErrorMsg("Failed to load crop prices. Please try again later.");
      } finally {
        setInitialLoadLoading(false);
      }
    };
    fetchUpdatedPrice();
  }, [username]);

  const currentPricesToDisplay = isEditing ? editablePrices : updatePrice;

  const filteredAndSortedEntries = Object.entries(currentPricesToDisplay)
    .filter(([cropName]) =>
      cropName.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )
    .sort(([cropNameA], [cropNameB]) => cropNameA.localeCompare(cropNameB));

  // --- Framer Motion Variants (UI Logic) ---
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const searchBarVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 150, damping: 20, delay: 0.3 } },
  };

  const cropItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.5 } },
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } },
    tap: { scale: 0.95 },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return initialLoadLoading ? (
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-blue-500 border-r-blue-500 border-b-blue-500 border-l-transparent"></div>
    </div>
  ) : (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-2xl bg-white relative rounded-xl shadow-2xl overflow-hidden p-8 border border-gray-200 text-center" // Wider for PC, more padding
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Link
          to="/vendors"
          className="absolute top-6 left-6 p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200 ease-in-out flex items-center justify-center z-10"
          aria-label="Go back to vendors"
          as={motion.a}
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>

        <motion.div variants={headerVariants} className="mb-10"> {/* Increased margin-bottom */}
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight"> {/* Larger text */}
            Crop Market Prices
          </h2>
          <p className="mt-3 text-xl text-gray-600"> {/* Larger text */}
            View and update crop prices in {city || "your city"},{" "}
            {state || "your state"}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {initialLoadError ? (
            <motion.div
              key="initialError"
              className="bg-red-100 text-red-700 p-4 rounded-lg font-semibold mb-6" // Increased margin-bottom
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {errorMsg}
            </motion.div>
          ) : (
            <>
              <motion.div variants={searchBarVariants} className="mb-8 flex justify-center"> {/* Increased margin-bottom */}
                <input
                  type="text"
                  placeholder="Search by crop name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full max-w-lg px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-lg" // Larger input, wider max-width
                />
              </motion.div>

              <div className="grid gap-5 max-h-96 overflow-y-auto pr-2 custom-scrollbar"> {/* Increased gap, added max-height for scroll, custom-scrollbar */}
                {filteredAndSortedEntries.length === 0 ? (
                  <motion.div
                    key="noCrops"
                    className="text-center text-gray-500 text-xl py-12" // Larger text, more padding
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    No crops found matching your search.
                  </motion.div>
                ) : (
                  <AnimatePresence>
                    {filteredAndSortedEntries.map(([cropName, price]) => (
                      <motion.div
                        key={cropName}
                        className="flex justify-between items-center p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-200 ease-in-out" // More padding
                        variants={cropItemVariants}
                        whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }} // Enhanced hover
                      >
                        {!isEditing ? (
                          <Link
                            to={`/stats/${cropName}`}
                            className="font-semibold text-2xl text-gray-800 capitalize hover:text-indigo-700 transition duration-200" // Larger text, hover effect
                            as={motion.a}
                            whileHover={{ x: 5 }} // Slight movement on hover
                          >
                            {cropName}
                          </Link>
                        ) : (
                          <span className="font-semibold text-2xl text-gray-800 capitalize">
                            {cropName}
                          </span>
                        )}
                        {isEditing ? (
                          <input
                            type="number"
                            min={0}
                            value={editablePrices[cropName] || 0}
                            onChange={(e) =>
                              handlePriceChange(cropName, e.target.value)
                            }
                            className="w-40 px-4 py-3 border border-gray-300 rounded-md text-right text-xl font-medium focus:ring-indigo-500 focus:border-indigo-500 transition duration-200" // Wider input, larger text, more padding
                            disabled={isSaving}
                          />
                        ) : (
                          <span className="text-indigo-600 font-bold text-3xl"> {/* Larger text */}
                            ₹ {price}
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {role === "Vendor" && myUsername === username && (
                <div className="mt-10 text-center"> {/* Increased margin-top */}
                  {!isEditing ? (
                    <motion.button
                      onClick={handleUpdateClick}
                      className="py-4 px-12 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out text-lg" // Larger button, more padding, larger text
                      disabled={isSaving}
                      variants={buttonVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Update Prices
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleSaveClick}
                      className={`py-4 px-12 text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 ease-in-out text-lg ${
                        isSaving
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                      }`}
                      disabled={isSaving}
                      variants={buttonVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {isSaving ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </span>
                      ) : (
                        "Save Changes"
                      )}
                    </motion.button>
                  )}

                  <AnimatePresence>
                    {successMsg && (
                      <motion.div
                        key="success"
                        className="mt-6 p-4 bg-green-100 text-green-700 rounded-md text-center font-semibold"
                        variants={messageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {successMsg}
                      </motion.div>
                    )}
                    {errorMsg && (
                      <motion.div
                        key="error"
                        className="mt-6 p-4 bg-red-100 text-red-700 rounded-md text-center font-semibold"
                        variants={messageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {errorMsg}
                      </motion.div>
                    )}
                    {noUpdateMsg && (
                      <motion.div
                        key="noUpdate"
                        className="mt-6 p-4 bg-yellow-100 text-yellow-700 rounded-md text-center font-semibold"
                        variants={messageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        No price was updated.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CropPrices;