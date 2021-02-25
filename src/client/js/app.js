import fetch from "node-fetch";
import { getCityInfo, getWetherInfo, getCityImg } from "./requests";

export function getDuration(date1, date2) {
  const diffTime = Math.abs(new Date(date2) - new Date(date1));
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export const handleSearch = async () => {
  // Get user values
  const destinationCity = document.getElementById("destination").value;
  const departingTime = document.getElementById("departing-time").value;
  const returningTime = document.getElementById("returning-time").value;
  // Calculate The Duration
  const duration = getDuration(departingTime, returningTime);
  // Get Information for target city
  getCityInfo(destinationCity)
    .then((cityData) => {
      const { lng, lat } = cityData.geonames[0];
      //Call getWetherInfo Function to get Data of Weather
      return getWetherInfo(lat, lng);
    })
    .then((weatherData) => {
      const { city_name, country_code } = weatherData;
      const { temp } = weatherData.data[0];
      const { description } = weatherData.data[0].weather;
      //Call postData Function to Post Data to local server
      const userData = postData("http://localhost:5000/trip", {
        departingTime,
        returningTime,
        city_name,
        country_code,
        temp,
        description,
        duration,
      });
      return userData;
    })
    .then((userData) => {
      //Call updateUI Function to Display User Trip
      updateUI(userData);
    });
};

// Function postData to POST data to our local server
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      departingTime: data.departingTime,
      returningTime: data.returningTime,
      city_name: data.city_name,
      country_code: data.country_code,
      temp: data.temp,
      description: data.description,
      duration: data.duration,
    }),
  });
  try {
    return await response.json();
  } catch (error) {
    console.log(error, "error");
  }
};

// Function update UI that reveals the results page with updated trip information including fetched image of the destination
const updateUI = async (userData) => {
  const {
    departingTime,
    returningTime,
    city_name,
    temp,
    country_code,
    description,
    duration,
  } = userData;
  const img = await getCityImg(city_name);
  const { largeImageURL } = img.hits[0];
  document.querySelector(".section-result").style.display = "block";
  document.getElementById("city_image").setAttribute("src", `${largeImageURL}`);
  document.getElementById(
    "city_name"
  ).innerHTML = ` You are going to:${city_name}`;
  document.getElementById("country_code").innerHTML = `${country_code}`;
  document.getElementById(
    "departingTime"
  ).innerHTML = `Departing on :${departingTime}`;
  document.getElementById(
    "returning-time"
  ).innerHTML = `Returning on :${returningTime}`;
  document.getElementById("temp").innerHTML = `Expect weather to be :${temp}`;
  document.getElementById("description").innerHTML = `${description}`;
  document.getElementById(
    "durationTime"
  ).innerHTML = `This is ${duration} days`;
};

document.addEventListener("DOMContentLoaded", function () {
  //Event listener to add function to existing HTML DOM element
  document.querySelector(".search-btn").addEventListener("click", (e) => {
    e.preventDefault();
    handleSearch();
  });
});
