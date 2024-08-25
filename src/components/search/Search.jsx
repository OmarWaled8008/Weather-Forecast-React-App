import React, { useContext, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { UilMapMarkerAlt } from "@iconscout/react-unicons";
import { queryContextVar } from "../../context/queryContext";
import { toast } from "react-toastify";

const urlGeoDB = "https://wft-geo-db.p.rapidapi.com/v1/geo";
const geoApiOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "42ff8ad100mshc34e06715be5ff0p1d49dajsn212b14043e0e",
    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
  },
};

export default function Search() {
  const [search, setSearch] = useState(null);
  const { setQuery, setUnits } = useContext(queryContextVar);

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${urlGeoDB}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const responseData = await response.json();
      return {
        options: responseData.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (error) {
      console.error(error);
    }
  };
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    const trimmedLabel = searchData.label.split(",").slice(0, 1)[0].trim();
    setQuery({ q: trimmedLabel });
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "white", // Background color of the control
      borderColor: state.isFocused ? "#ec6e4c" : "gray", // Change border color when focused
      boxShadow: state.isFocused ? "0 0 0 1px #ec6e4c" : "none", // Optional: Add a blue outline when focused
      "&:hover": {
        borderColor: state.isFocused ? "#ec6e4c" : "gray", // Optional: Hover effect
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f0f0f0" : "white", // Background color of options
      color: state.isSelected ? "#ec6e4c" : "gray", // Text color of options
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "white", // Background color of the menu
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black", // Text color of the selected value
    }),
  };

  const getLatLon = () => {
    if (navigator.geolocation) {
      toast.info("Fetching your location");
      navigator.geolocation.getCurrentPosition(function (position) {
        toast.success("Location fetched successfully");
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setQuery({ lat: latitude, lon: longitude });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="flex flex-row justify-center items-center my-5">
      <div className="flex flex-row w-3/4 items-center justify-start space-x-4">
        <AsyncPaginate
          className="w-3/4"
          placeholder="Search for a city"
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
          styles={customStyles}
        />
        <button onClick={() => getLatLon()}>
          <UilMapMarkerAlt
            size="30"
            color="#ec6e4c"
            className="cursor-pointer transition ease-out hover:scale-125"
          />
        </button>
      </div>
      <div className="flex flex-row w-1/4 items-center justify-end space-x-2 text-2xl font-medium text-org">
        <button
          className="cursor-pointer transition ease-out hover:scale-125"
          name="metric"
          onClick={() => setUnits("metric")}
        >
          °C
        </button>
        <p>|</p>
        <button
          className="cursor-pointer transition ease-out hover:scale-125"
          name="imperial"
          onClick={() => setUnits("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
}
