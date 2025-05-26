// src/hooks/useWeather.js
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config/config.js"

export default function useWeather({ state, city }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!city || !state) return; // wait until we have a city

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = config.weatherAPIkey;  // store your key in .env
        
        const q = encodeURIComponent(`${city},${state},IN`);
        console.log(q)
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${apiKey}`;

        const res = await axios.get(url);
        setWeather(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [state, city]);

  return { weather, loading, error };
}
