import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import statesAndCitiesRaw from '../storage/statesandcities.json'; // Adjust path as needed

// Convert the object to an array format for easy iteration
const statesAndCities = Object.entries(statesAndCitiesRaw).map(([state, cities]) => ({
  state,
  cities,
}));

// Framer Motion variants for consistent input animation
const selectVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

const StateCitySelector = ({ onChange }) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cityOptions, setCityOptions] = useState([]);

  // Existing logic for state and city options based on selected state
  useEffect(() => {
    const stateData = statesAndCities.find(item => item.state === selectedState);
    setCityOptions(stateData ? [...stateData.cities].sort((a, b) => a.localeCompare(b)) : []);
    
    // IMPORTANT: Only reset city if the previous selected city is NOT valid for the new state,
    // or if no state is selected.
    // If we're simply selecting a state for the first time, or switching states,
    // the city should indeed be cleared to force a new selection.
    // The key here is to ensure `selectedCity` is truly empty if the state changes,
    // so the `-- Select City --` placeholder is shown.
    if (!stateData || (selectedCity && !stateData.cities.includes(selectedCity))) {
        setSelectedCity("");
        onChange({ state: selectedState, city: "" }); // Notify parent immediately
    } else {
        // If state selected and existing city is valid, or no city yet,
        // just update state and keep city as is (or empty)
        onChange({ state: selectedState, city: selectedCity });
    }

  }, [selectedState, selectedCity, onChange]); // Added selectedCity to dependencies to correctly re-evaluate

  // Existing logic to notify parent when city changes
  useEffect(() => {
    onChange({ state: selectedState, city: selectedCity });
  }, [selectedCity, selectedState, onChange]);

  // Define the common Tailwind CSS classes for the input boxes
  const commonInputClasses = "w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-green-500 focus:border-green-500 transition duration-200 text-lg appearance-none bg-white pr-8";

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* State Selector */}
      <motion.div
        className="flex-1"
        variants={selectVariants}
        initial="hidden"
        animate="visible"
      >
        <label htmlFor="state" className="sr-only">State</label>
        <select
          id="state"
          name="state"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className={`${commonInputClasses} ${selectedState === '' ? 'text-gray-500' : 'text-gray-700'}`}
          required
        >
          <option value="" disabled>Select State</option>
          {statesAndCities.map(({ state }) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </motion.div>

      {/* City Selector */}
      <motion.div
        className="flex-1"
        variants={selectVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        <label htmlFor="city" className="sr-only">City</label>
        <select
          id="city"
          name="city"
          value={selectedCity} // Ensure this is bound to selectedCity state
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
          className={`${commonInputClasses} ${selectedCity === '' ? 'text-gray-500' : 'text-gray-700'}`}
          required
        >
          <option value="" disabled>Select City</option>
          {cityOptions.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </motion.div>
    </div>
  );
};

export default StateCitySelector;