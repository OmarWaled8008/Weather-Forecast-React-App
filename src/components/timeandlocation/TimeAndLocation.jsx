import React, { useContext } from "react";
import {
  UilTemperatureHalf,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilArrowUp,
  UilArrowDown,
  UilDashboard,
} from "@iconscout/react-unicons";
import { DateTime } from "luxon";
import { queryContextVar } from "../../context/queryContext";
export default function TimeAndLocation({ currentWeather }) {
  const { units } = useContext(queryContextVar);
  if (!currentWeather) {
    return (
      <div className="w-full h-full mt-10 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-org"></div>
      </div>
    );
  }
  // Create DateTime objects from the Unix timestamps
  const dateTime = DateTime.fromMillis(currentWeather.dt * 1000);
  const sunrise = DateTime.fromMillis(currentWeather.sys.sunrise * 1000);
  const sunset = DateTime.fromMillis(currentWeather.sys.sunset * 1000);

  // Format the DateTime objects to match the desired output
  const formattedDateTime = dateTime.toFormat(
    "cccc, dd LLL yyyy | 'Local time:' hh:mm a"
  );
  const formattedSunrise = sunrise.toFormat("hh:mm a");
  const formattedSunset = sunset.toFormat("hh:mm a");
  return (
    <div className="flex flex-col items-center justify-center my-5">
      <div className="text-gray-300 text-xl font-extralight my-3">
        {formattedDateTime}
      </div>
      <div className="text-white text-2xl font-bold my-3">
        {currentWeather.name}, {currentWeather.sys.country}
      </div>
      <div className="text-org text-xl my-3">
        {currentWeather.weather[0].main}
      </div>
      <div className="flex flex-row w-full justify-between items-center my-3">
        <img
          src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
          alt="icon-img"
          className="block w-36"
        />
        <p className="text-white text-7xl">
          {Math.round(currentWeather.main.temp)}
          <span className="text-org ml-2">
            {units === "metric" ? "°C" : "°F"}
          </span>
        </p>
        <div className="flex flex-col justify-center items-center space-y-4">
          <div className="text-white font-light text-md flex justify-center items-center space-x-4">
            <UilTemperatureHalf color="#ec6e4c" className="mr-2" />
            Feels like:
            <span className="font-bold">
              {Math.round(currentWeather.main.feels_like)}
              <span className="text-org ml-1">
                {units === "metric" ? "°C" : "°F"}
              </span>
            </span>
          </div>
          <div className="text-white font-light text-md flex justify-center items-center space-x-4">
            <UilTear color="#ec6e4c" className="mr-2" />
            Humidity:
            <span className="font-bold">
              {Math.round(currentWeather.main.humidity)}
              <span className="text-org ml-1">%</span>
            </span>
          </div>
          <div className="text-white font-light text-md flex justify-center items-center space-x-4">
            <UilWind color="#ec6e4c" className="mr-2" />
            Wind:
            <span className="font-bold">
              {Math.round(currentWeather.wind.speed)}
              <span className="text-org ml-1">km/h</span>
            </span>
          </div>
          <div className="text-white font-light text-md flex justify-center items-center space-x-4">
            <UilDashboard color="#ec6e4c" className="mr-2" />
            Pressure :
            <span className="font-bold">
              {Math.round(currentWeather.main.pressure)}
              <span className="text-org ml-1">hpa</span>
            </span>
          </div>
        </div>
      </div>
      <div className=" flex justify-center mt-5 items-start space-x-2 text-white text-sm">
        <UilSun color="#ec6e4c" />
        <p className="font-light">
          Rise:
          <span className="font-medium ml-1">{formattedSunrise}</span>
        </p>
        <p className="font-light">|</p>

        <UilSunset color="#ec6e4c" />
        <p className="font-light">
          Set:
          <span className="font-medium ml-1">{formattedSunset}</span>
        </p>
        <p className="font-light">|</p>

        <UilArrowUp color="#ec6e4c" />
        <p className="font-light">
          High:
          <span className="font-medium ml-1">
            {Math.round(currentWeather.main.temp_max)}
            <span className="text-org">{units === "metric" ? "°C" : "°F"}</span>
          </span>
        </p>
        <p className="font-light">|</p>

        <UilArrowDown color="#ec6e4c" />
        <p className="font-light">
          Low:
          <span className="font-medium ml-1">
            {Math.round(currentWeather.main.temp_min)}
            <span className="text-org">{units === "metric" ? "°C" : "°F"}</span>
          </span>
        </p>
      </div>
    </div>
  );
}
