import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { fetchLocationSuggestions } from "../../api/searchApi";
import { useNavigate } from "react-router-dom";

const SearchBox = ({ onSelectLocation }) => {
const navigation = useNavigate()
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setQuery(text);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (text.length > 2) {
      debounceTimeout.current = setTimeout(() => fetchSuggestions(text), 300);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (text) => {
    setIsLoading(true);
    setError(null);
    try {
      const suggestions = await fetchLocationSuggestions(text);

      if (suggestions?.error) {
        setError(suggestions?.message);
      } else if (suggestions?.features?.length === 0 || null) {
        setError(`No city is presnt for you ${suggestions?.query?.text}`);
      } else {
        setSuggestions(suggestions?.features);
      }
      //   setSuggestions(suggestions);
    } catch (err) {
      setError("Failed to fetch suggestions");
      navigation('/error')
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLocation = (location) => {
    setQuery(location.properties.formatted);
    setSuggestions([]);
    onSelectLocation({
      name: location.properties.formatted,
      lat: location.properties.lat,
      lon: location.properties.lon,
    });
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Check weather for your near by location..."
          className="w-full p-2 pr-10 border bg-transparent shadow-md focus:bg-slate-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 "
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      {isLoading && (
        <p className="mt-2 text-sm text-gray-500 bg-white border rounded-md shadow-lg px-4 py-2">
          Loading...
        </p>
       )}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.properties.place_id}
              onClick={() => handleSelectLocation(suggestion)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {suggestion.properties.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
