const BASE_URL_WEATHER = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "0c19f47e76a292bbc5b7bac45f873f01";

// Function to fetch weather data
const fetchWeatherData = async (infoType, searchParams) => {
  const MY_URL = new URL(`${BASE_URL_WEATHER}${infoType}`); // Create a new URL object
  MY_URL.search = new URLSearchParams({ ...searchParams, appid: API_KEY }); // Append search parameters
  try {
    const response = await fetch(MY_URL);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Re-throw the error after logging it, if you want it to propagate further
  }
};

export default fetchWeatherData;
