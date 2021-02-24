import fetch from "node-fetch";
import { getCityInfo, getWetherInfo, getCityImg } from "./requests";

export const handleSearch = async (e) => {
    e.preventDefault()
    const destinationCity = document.getElementById("destination").value;
    const departingTime = document.getElementById("departing-time").value;
    const returingTime = document.getElementById("returing").value;
    const current_time = new Date().getTime()
    const dept_time = new Date(departingTime).getTime()
    const return_time = new Date(returingTime).getTime()
    const daysLeft = Math.ceil((dept_time - current_time) / (1000 * 60 * 60 * 24));
    const duration = Math.ceil((return_time - dept_time) / (1000 * 60 * 60 * 24));

    //Call getCityIngo Function to get Data of City 
    getCityInfo(destinationCity)
        .then((cityData) => {
            const { lng, lat } = cityData.geonames[0]
            //Call getWetherInfo Function to get Data of Weather  
            const weatherData = getWetherInfo(lat, lng);
            return weatherData
        }).then((weatherData) => {
            const { city_name, country_code } = weatherData
            const { temp } = weatherData.data[0]
            const { description } = weatherData.data[0].weather
            //Call postData Function to Post Data to local server  
            const userData = postData('http://localhost:5000/trip', {
                departingTime,
                returingTime,
                city_name,
                country_code,
                temp,
                description,
                duration
            });
            return userData;
        }).then((userData) => {
            //Call updateUI Function to Display User Trip   
            updateUI(userData)
        })
}

// Function postData to POST data to our local server
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            departingTime: data.departingTime,
            returingTime: data.returingTime,
            city_name: data.city_name,
            country_code: data.country_code,
            temp: data.temp,
            description: data.description,
            duration: data.duration

        })
    });
    try {
        const newData = await response.json();
        return newData;

    } catch (error) {
        console.log(error, "error")
    }
}

// Function update UI that reveals the results page with updated trip information including fetched image of the destination
const updateUI = async (userData) => {
    const { departingTime, returingTime, city_name, temp, country_code, description, duration } = userData[0]
    const img = await getCityImg(city_name)
    console.log(img, "image")
    const { largeImageURL } = img.hits[0];
    document.querySelector(".section-result").style.display = "block"
    document.getElementById("city_image").setAttribute("src", `${largeImageURL}`);
    document.getElementById("city_name").innerHTML = ` You are going to:${city_name}`;
    document.getElementById("country_code").innerHTML = `${country_code}`;
    document.getElementById("departingTime").innerHTML = `Departing on :${departingTime}`;
    document.getElementById("returingTime").innerHTML = `Returing on :${returingTime}`;
    document.getElementById("temp").innerHTML = `Expect weather to be :${temp}`;
    document.getElementById("description").innerHTML = `${description}`;
    document.getElementById("durationTime").innerHTML = `Tis is ${duration} days`;
}

//Event listener to add function to exisiting HTML DOM element
document.querySelector(".search-btn").addEventListener("click", handleSearch)

