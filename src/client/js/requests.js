import fetch from "node-fetch";

/* Declare your API credentials */
const GEONAMES_URL = "http://api.geonames.org/searchJSON";
const GEONAMES_API_KEY = "sarra";
const WEATHERBIT_FORCAST_URL = "https://api.weatherbit.io/v2.0/forecast/daily";
const WEATHERBIT_API_KEY = "e77f3a905d2a4f55ae18d2168074848e";
const PIXALABAY_URL = "https://pixabay.com/api/";
const PIXALABAY_API_KEY = "20310833-4d8070e75a1507d44bb697092";

// Function getCityInfo to get city information from Geonames API (latitude, longitude)
const getCityInfo = async (destinationCity) => {
  // http://api.geonames.org/searchJSON?q={goingTOLocation}&username={GEONAMES_API_KEY}
  const cityInfoURL = `${GEONAMES_URL}?q=${destinationCity}&username=${GEONAMES_API_KEY}`;
  const response = await fetch(cityInfoURL);
  try {
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// Function getWeatherInfo to get weather information from WEATHERBIT API ( city_name,country_code,high_temp,low_temp,description)
const getWetherInfo = async (city_lattitude, city_longitude) => {
  // https://api.weatherbit.io/v2.0/forecast/daily?city=London&key=e77f3a905d2a4f55ae18d2168074848e&lat=51.50853&lon=-0.12574
  const weatherInfoURL = `${WEATHERBIT_FORCAST_URL}?lat=${city_lattitude}&lon=${city_longitude}&key=${WEATHERBIT_API_KEY}`;
  const response = await fetch(weatherInfoURL);
  try {
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// Function getCityImg to get  image of city from pixabay API
const getCityImg = async (city) => {
  // https://pixabay.com/api/?key={PIXALABAY_API_KEY}&q={contry_name}&image_type=photo
  const cityImgURL = `${PIXALABAY_URL}?key=${PIXALABAY_API_KEY}&q=${city}&image_type=photo`;
  const response = await fetch(cityImgURL);
  try {
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// Export All Function
export { getCityInfo, getWetherInfo, getCityImg };
