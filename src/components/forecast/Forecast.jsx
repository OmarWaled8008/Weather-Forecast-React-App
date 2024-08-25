import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import {
  UilTemperatureHalf,
  UilTear,
  UilWind,
  UilDashboard,
  UilArrowUp,
  UilArrowDown,
  UilWater,
  UilCloud,
} from "@iconscout/react-unicons";
import { DateTime } from "luxon";
import { queryContextVar } from "../../context/queryContext";
export default function Forecast({ forecast }) {
  console.log(forecast);
  const { units } = useContext(queryContextVar);
  const [forecastList, setForecastList] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  useEffect(() => {
    if (forecast) {
      setForecastList(forecast.list.slice(0, perPage * page));
    }
  }, [page, forecast]);

  console.log("forecastList", forecastList);
  
  if (!forecastList) {
    return (
      <div className="w-full h-full mt-10 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-org"></div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-10">
        <h2 className="text-org text-2xl font-medium mb-3">Daily</h2>
        <Accordion allowZeroExpanded>
          {forecastList.map((day, index) => {
            const dateTime = DateTime.fromMillis(day.dt * 1000);
            const formattedDateTime = dateTime.toFormat("cccc | hh:mm a");
            return (
              <AccordionItem key={index}>
                <AccordionItemHeading>
                  <AccordionItemButton className="bg-white rounded-xl my-3 p-1">
                    <div className="flex justify-between items-center">
                      <div className="w-2/4 font-medium text-lg flex justify-start items-center space-x-2">
                        <img
                          className="w-14 block"
                          src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                          alt=""
                        />
                        <p className="text-black">{formattedDateTime}</p>
                      </div>
                      <div className="w-1/4 flex justify-around items-center">
                        <p className="text-org font-medium">
                          {day.weather[0].main}
                        </p>
                        <div className="flex justify-center items-center ml-1 text-gray-500">
                          <UilArrowUp color="#ec6e4c" />
                          {Math.round(day.main.temp_max)}
                          <span className="text-org">
                            {units === "metric" ? "°C" : "°F"}
                          </span>
                          <p className="mx-2">|</p>
                          <UilArrowDown color="#ec6e4c" />
                          {Math.round(day.main.temp_min)}
                          <span className="text-org">
                            {units === "metric" ? "°C" : "°F"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="text-white p-5 flex justify-around items-center">
                    <div className="flex flex-col justify-center items-center space-y-4">
                      <div className="text-white font-light text-md flex justify-center items-center space-x-4">
                        <UilTemperatureHalf color="#ec6e4c" className="mr-2" />
                        Feels like:
                        <span className="font-bold">
                          {Math.round(day.main.feels_like)}
                          <span className="text-org ml-1">
                            {units === "metric" ? "°C" : "°F"}
                          </span>
                        </span>
                      </div>
                      <div className="text-white font-light text-md flex justify-center items-center space-x-4">
                        <UilTear color="#ec6e4c" className="mr-2" />
                        Humidity:
                        <span className="font-bold">
                          {Math.round(day.main.humidity)}
                          <span className="text-org ml-1">%</span>
                        </span>
                      </div>
                      <div className="text-white font-light text-md flex justify-center items-center space-x-4">
                        <UilWind color="#ec6e4c" className="mr-2" />
                        Wind:
                        <span className="font-bold">
                          {Math.round(day.wind.speed)}
                          <span className="text-org ml-1">km/h</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-4">
                      <div className="text-white font-light text-md flex justify-center items-center space-x-4">
                        <UilDashboard color="#ec6e4c" className="mr-2" />
                        Pressure :
                        <span className="font-bold">
                          {Math.round(day.main.pressure)}
                          <span className="text-org ml-1">hpa</span>
                        </span>
                      </div>
                      <div className="text-white font-light text-md flex justify-center items-center space-x-4">
                        <UilCloud color="#ec6e4c" className="mr-2" />
                        Clouds:
                        <span className="font-bold">
                          {Math.round(day.main.humidity)}
                          <span className="text-org ml-1">%</span>
                        </span>
                      </div>
                      <div className="text-white font-light text-md flex justify-center items-center space-x-4">
                        <UilWater color="#ec6e4c" className="mr-2" />
                        Sea level:
                        <span className="font-bold">
                          {Math.round(day.wind.speed)}
                          <span className="text-org ml-1">m</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            );
          })}
          <div className="flex justify-between items-center">
            {page * perPage < forecast.list.length && (
              <button
                onClick={() => setPage(page + 1)}
                className="bg-org text-white px-3 py-2 rounded-xl"
              >
                Show More...
              </button>
            )}
            {page > 1 && (
              <button
                onClick={() => setPage(page - 1)}
                className="bg-org text-white px-3 py-2 rounded-xl"
              >
                Show Less...
              </button>
            )}
          </div>
        </Accordion>
      </div>
    </>
  );
}
