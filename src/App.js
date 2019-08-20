import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./css/weather-icons.min.css";
import axios from "axios";
import { usePosition } from "./components/geolocation";

function App() {
  const [weatherApiResponse, setWeatherApiResponse] = useState({
    name: "...loading"
  });
  const [firstTime, setFirstTime] = useState(true);
  const appId = "8f1e29cb0f7a12f19c6d87da31359214";
  let { latitude, longitude, error } = usePosition();

  /**
   * Notice that there is a single useEffect hook which can replace both componentDidMount and
   * componentDidUpdate. To run the hook only once we can use the second argument to useEffect
   * — an array of values that the effect depends on. By default, the effect will run when any
   * of the props or state changes. If we pass an empty array, the effect will only run on
   * first render.
   */
  useEffect(() => {
    if (firstTime && latitude && longitude) {
      setFirstTime(false);
      const path =
        "http://api.openweathermap.org/data/2.5/weather?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        appId;
      axios.get(path).then(({ data }) => {
        setWeatherApiResponse(data);
      });
    }
  }, [latitude, longitude]);

  return (
    <div className="App">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <div id="weatherBox">
        <h1>The weather in {weatherApiResponse.name}</h1>
        <p>The weather will be good :)</p>
        <i id="weatherIcon" class="wi wi-na" />
      </div>
    </div>
  );
}

export default App;
