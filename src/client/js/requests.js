import fetch from "node-fetch";

/* Declare your API credentials */
const GEONAMES_URL = "http://api.geonames.org/searchJSON";
const GEONAMES_API_KEY = "sarra";
const WEATHERBIT_FORCAST_URL = "https://api.weatherbit.io/v2.0/forecast/daily";
const WEATHERBIT_API_KEY = "e77f3a905d2a4f55ae18d2168074848e";
const PIXALABAY_URL = "https://pixabay.com/api/"
const PIXALABAY_API_KEY = "20310833-4d8070e75a1507d44bb697092"

//Function getCityInfo to get city information from Geonames API (latitude, longitude)
const getCityInfo = async (destinationCity) => {
    console.log(GEONAMES_API_KEY, "YOUR GEONAMES_API_KEY");
    // http://api.geonames.org/searchJSON?q={goingTOLocation}&username={GEONAMES_API_KEY}
    const CityInfo_URL = `${GEONAMES_URL}?q=${destinationCity}&username=${GEONAMES_API_KEY}`
    const response = await fetch(CityInfo_URL);
    try {
        const cityData = await response.json();
        return cityData;
    } catch (error) {
        console.log(error)
    }
}

// Function getWeatherInfo to get weather information from WEATHERBIT API ( city_name,country_code,high_temp,low_temp,description)
const getWetherInfo = async (city_lattitude, city_longitude) => {
    // https://api.weatherbit.io/v2.0/forecast/daily?city=London&key=e77f3a905d2a4f55ae18d2168074848e&lat=51.50853&lon=-0.12574
    const weatherInfo_URL = `${WEATHERBIT_FORCAST_URL}?lat=${city_lattitude}&lon=${city_longitude}&key=${WEATHERBIT_API_KEY}`;
    const response = await fetch(weatherInfo_URL);
    console.log(response, "weatherData")

    try {
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.log(error)
    }
};

// Function getCityImg to get  image of city from pixabay API
const getCityImg = async (city) => {
    // https://pixabay.com/api/?key={PIXALABAY_API_KEY}&q={contry_name}&image_type=photo
    const cityImg_URL = `${PIXALABAY_URL}?key=${PIXALABAY_API_KEY}&q=${city}&image_type=photo`;
    const response = await fetch(cityImg_URL);
    try {
        const cityImg = await response.json();
        return cityImg;
    } catch (error) {
        console.log(error)
    }
};

// Export All Function 
export { getCityInfo, getWetherInfo, getCityImg }