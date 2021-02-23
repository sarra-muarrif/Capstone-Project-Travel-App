import fetch from "node-fetch";
import { getCityInfo, getWetherInfo, getCityImg } from "./requests";

export const handleSearch = async (e) => {
    e.preventDefault()
    let destinationCity = document.getElementById("destination").value;
    if (Client.isInputString(destinationCity)) {
        const departingTime = document.getElementById("departing-time").value;
        const returingTime = document.getElementById("returing").value;
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
                const userData = postData('http://localhost:8081/trip', {
                    departingTime,
                    returingTime,
                    city_name,
                    country_code,
                    temp,
                    description
                });
                return userData;
            }).then((userData) => {
                //Call updateUI Function to Display User Trip   
                updateUI(userData)
            })


    } else {
        alert("The Name of City Is Wrong")
    }
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
            description: data.description

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
    const { departingTime, returingTime, city_name, temp, country_code, description } = userData[0]
    const city_img = await getCityImg(city_name)
    const { largeImageURL } = city_img.hits[0]
    document.querySelector("#city_img").setAttributs("src", `${largeImageURL}`)
    document.querySelector("#country_code").innerHTML = `${country_code}`
    document.querySelector("#city_name").innerHTML = ` You are going to:${city_name}`
    document.querySelector("#departingTime").innerHTML = `Departing on :${departingTime}`
    document.querySelector("#returingTime").innerHTML = `Returing on :${returingTime}`
    document.querySelector("#temp").innerHTML = `Expect weather to be :${temp}`
    document.querySelector("#description").innerHTML = `${description}`
    document.querySelector(".section-result").style.display = "block"
}

//Event listener to add function to exisiting HTML DOM element
document.querySelector(".search-btn").addEventListener("click", handleSearch)

