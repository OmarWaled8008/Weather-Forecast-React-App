import React, { useContext, useEffect, useState } from "react";
import Search from "../search/Search";
import TimeAndLocation from "../timeandlocation/TimeAndLocation";
import TopButtons from "../topbuttons/TopButtons";
import { queryContextVar } from "../../context/queryContext";
import fetchWeatherData from "../weatherServiceApi";
import Forecast from "../forecast/Forecast";
import { toast } from "react-toastify";

export default function ParentComp() {
  let [currentWeather, setCurrentWeather] = useState(null);
  let [forecast, setForecast] = useState(null);
  const { query, units } = useContext(queryContextVar);
  async function fetchCurrentWeather(query, units) {
    try {
      toast.info(`Fetching weather data for ${query.q}`);
      // Fetch current weather data
      const weatherResponse = await fetchWeatherData("weather", {
        ...query,
        units,
      });
      // Set the current weather state
      setCurrentWeather({ ...weatherResponse });

      // Fetch forecast data
      const forecastResponse = await fetchWeatherData("forecast", {
        ...query,
        units,
      });
      // Set the forecast state
      setForecast({ ...forecastResponse });
      toast.success(`Weather data fetched successfully for ${query.q}`);
    } catch (error) {
      // Handle any errors that occur during fetch
      console.error("Error fetching weather data:", error);
      toast.error("Error fetching weather data");
    }
  }
  useEffect(() => {
    fetchCurrentWeather(query, units);
  }, [query, units]);

  function formatBackground() {
    if (currentWeather) {
      const temp = currentWeather.main.temp;
      if (temp < 30) {
        return "bg-gradient-to-br from-cyan-900 to-blue-600";
      } else if (temp > 30 && temp < 50) {
        return "bg-gradient-to-br from-green-900 to-green-600";
      } else if (temp > 50 && temp < 70) {
        return "bg-gradient-to-br from-violet-900 to-violet-600";
      } else {
        return "bg-gradient-to-br from-red-900 to-red-700";
      }
    }
    return "bg-gradient-to-br from-cyan-700 to-blue-600";
  }
  // currentWeather=null
  // forecast=null
  return (
    <div
      className={`parent mx-auto max-w-screen-lg my-5 py-8 px-24 rounded-lg bg-gradient-to-br ${formatBackground()}`}
    >
      <TopButtons />
      <Search />
      <TimeAndLocation currentWeather={currentWeather} />
      <Forecast forecast={forecast} />
    </div>
  );
}
