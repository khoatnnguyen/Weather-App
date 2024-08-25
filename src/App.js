import React, { useState, useEffect } from "react";

const api = {
  key: "e1515df7bc5a2a700eaeb3fc3da1fa07",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false); //first Load
  const [errorMessage, setErrorMessage] = useState(""); //Manage Error

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      //Loading API data process
      setLoading(true); // Start
      //Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          /**
           *  this is for fetching INFO of ALL ELEMENTS
           *  setWeatherInfo(JSON.stringify(data));
           * stringify() is used for : Turning file JSON into a String - kinda ugly */

          // Below is for retrieving out data in detail
          setWeatherInfo(
            `${data.name}, ${data.sys.country}, ${data.weather[0].description}, ${data.main.temp}`
          );
          // Use console.log to see info of every elements inside.
          console.log(data);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false); //End
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };
  return (
    <>
      <h1>Fetch Data with User Effect</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button>Search</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <div>{weatherInfo}</div>
          )}
        </>
      )}
    </>
  );
}

export default App;
