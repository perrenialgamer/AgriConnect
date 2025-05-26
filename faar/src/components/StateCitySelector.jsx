import  { useState, useEffect } from "react";
import statesAndCitiesRaw from '../storage/statesandcities.json' // Adjust path as needed

// Convert the object to an array format for easy iteration
const statesAndCities = Object.entries(statesAndCitiesRaw).map(([state, cities]) => ({
  state,
  cities,
}));

const StateCitySelector = ({ onChange }) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cityOptions, setCityOptions] = useState([]);

  // ...existing code...
    useEffect(() => {
      const stateData = statesAndCities.find(item => item.state === selectedState);
      // Sort city names alphabetically
      setCityOptions(stateData ? [...stateData.cities].sort((a, b) => a.localeCompare(b)) : []);
      setSelectedCity("");
      onChange({ state: selectedState, city: "" });
    }, [selectedState]);
  // ...existing code...

  useEffect(() => {
    onChange({ state: selectedState, city: selectedCity });
  }, [selectedCity]);

  return (
    <div className="grid gap-4">
      <div>
        <label className="block mb-1 text-m font-mediumt text-black ">Select Location</label>
        <select
          className="w-full border rounded px-3 py-2 text-center"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">-- Select State --</option>
          {statesAndCities.map(({ state }) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium"></label>
        <select
          className="w-full border rounded px-3 py-2 text-center"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
        >
          <option value="">-- Select City --</option>
          {cityOptions.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StateCitySelector;
