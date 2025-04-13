import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryDetails from "../components/CountryDetails";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regionFilter, setRegionFilter] = useState("");

  const handleSearch = async () => {
    const query = searchTerm.trim();
    if (!query) return;

    setLoading(true);
    try {
      const res = await axios.get(`https://restcountries.com/v2/name/${query}`);
      const filtered = regionFilter
        ? res.data.find((c) => c.region === regionFilter)
        : res.data[0];

      if (filtered) {
        setCountryData(filtered);
        setError("");
      } else {
        setCountryData(null);
        setError("Country not found in selected region.");
      }
    } catch (err) {
      setError("Country not found.");
      setCountryData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-500 ease-in-out p-6">
      <div className="flex justify-between items-center mb-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">Country Finder</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 border rounded hover:bg-blue-500 dark:hover:bg-blue-700 transition-all duration-300"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search for a country..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 
                     bg-white dark:bg-gray-800 text-black dark:text-white"
        />
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white transition-all duration-300"
        >
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 active:scale-95 transition-transform duration-200"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {countryData && (
        <div className="max-w-3xl mx-auto animate-fade-in">
          <CountryDetails country={countryData} />
        </div>
      )}
    </div>
  );
}

export default Home;
