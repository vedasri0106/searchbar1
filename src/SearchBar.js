import React, { useState, useEffect } from 'react';
import './SearchBar.css'; // Import CSS for styling

const SearchBar = ({ countries }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  // Update suggestions based on user input
  useEffect(() => {
    if (query) {
      const filteredSuggestions = countries.filter(country =>
        country.country.toLowerCase().includes(query.toLowerCase()) ||
        country.capital.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query, countries]);

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    console.log(query)
  };

  // Handle suggestion click
  const handleSuggestionClick = (country) => {
    setQuery(`${country.name} - ${country.capital}`);
    setSuggestions([]);
  };

  // Handle outside click to close suggestions
  const handleClickOutside = (e) => {
    if (!e.target.closest('.search-container')) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a country or capital"
      />
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((country) => (
            <div
              key={country.name}
              onClick={() => handleSuggestionClick(country)}
              className="suggestion-item"
            >
              {country.name} - {country.capital}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default SearchBar;
