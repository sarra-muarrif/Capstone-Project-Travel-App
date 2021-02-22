
// import fetch from "node-fetch";
import { getCityInfo, getWetherInfo, getCityImg } from "./requests"


export const handleSearch = async (e) => {
    e.preventDefault()
    let currentCity = document.getElementById("current-location").value;
    let destinationCity = document.getElementById("destination").value;
    const departingTime = document.getElementById("departing-time").value;
    const returingTime = document.getElementById("returing").value;
    getCityInfo(destinationCity)
        .then((cityData) => {
            const { lng, lat } = cityData.geonames[0]
            const weatherData = getWetherInfo(lat, lng);
            console.log(weatherData, "weatherData")
            return weatherData
        }).then((weatherData) => {
            const { city_name, country_code } = weatherData
            const { temp } = weatherData.data[0]
            const { description } = weatherData.data[0].weather
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
            updateUI(userData)
            // const cityimg = getCityImg(destinationCity)
            // console.log(cityimg)

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
            description: data.description

        })
    });
    try {
        const newData = await response.json();
        console.log(newData, "User Data ")
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
    document.querySelector("#city_img").setAttribute("src", `${largeImageURL}`)
    document.querySelector("#city_name").innerHTML = `${city_name}`
    document.querySelector("#departingTime").innerHTML = `${departingTime}`
    document.querySelector("#returingTime").innerHTML = `${returingTime}`
    document.querySelector("#temp").innerHTML = `${temp}`
    document.querySelector("#description").innerHTML = `${description}`
    // document.querySelector("#country_code").innerHTML = `${country_code}`

}
//Event listener to add function to exisiting HTML DOM element
document.querySelector(".search-btn").addEventListener("click", handleSearch)

