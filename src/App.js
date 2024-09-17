import React from 'react';
import SearchBar from './SearchBar';
import countries from './data';

const App = () => {
  return (
    <div className="App">
      <h1>Country Search</h1>
      <SearchBar countries={countries} />
    </div>
  );
};

export default App;
