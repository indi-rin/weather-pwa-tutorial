import React, { useState } from "react";

import { fetchWeather } from "./api/fetchWeather";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState(""); // user input for what city
  const [weather, setWeather] = useState({});

  const search = async (event) => {
    if (event.key === "Enter") {
      const data = await fetchWeather(query);
      setWeather(data); // update weather in state to hold info from API call
      setQuery(""); // reset query upon submission
    }
  };

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyPress={search}
      />
    </div>
  );
};

export default App;
