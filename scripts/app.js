//Importing the API key from enviroment.js, so we can have enviroment.js (and the API key as a result) ignored by git.
import { APIKEY } from './enviroment.js';

//Call variables for data implementation (Current Day)
const city = document.getElementById("city");
const searchButton = document.getElementById("searchButton");
const userInputCity = document.getElementById("userInputCity");
const currentTemperature = document.getElementById("currentTemperature");
const currentWeather = document.getElementById("currentWeather");
const currentHigh = document.getElementById("currentHigh");
const currentLow = document.getElementById("currentLow");
const currentIcon = document.getElementById("currentIcon");

//Call variables for data implementation (Forecast)

const forecastNum1 = document.getElementById("forecastNum1");
const forecastNum2 = document.getElementById("forecastNum2");
const forecastNum3 = document.getElementById("forecastNum3");
const forecastNum4 = document.getElementById("forecastNum4");
const forecastNum5 = document.getElementById("forecastNum5");

const forecastIcon1 = document.getElementById("forecastIcon1");
const forecastIcon2 = document.getElementById("forecastIcon2");
const forecastIcon3 = document.getElementById("forecastIcon3");
const forecastIcon4 = document.getElementById("forecastIcon4");
const forecastIcon5 = document.getElementById("forecastIcon5");


//Variables 
let locationData = [];
let currentData = [];
let forecastData = [];
let searchedCity = "";
let lat = 0;
let lon = 0;

//getLocation will populate data for a specific location when the user searches for it
async function getLocation()
{
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&limit=1&appid=${APIKEY}`);
    const data = await response.json();
    return data;
}

//getCurrentDay will populate data of the current day based on the latitude and longitude recieved from getLocation
async function getCurrentDay(){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`)
    const data = await response.json();
    return data;
}

//get5Day will populate data of the forecast based on the latitude and longitude recieved from getLocation
async function get5Day(){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`)
    const data = await response.json();
    return data;
}

function getCurrentWeatherIcon()
{
    const iconID = currentData.weather[0].icon;
    console.log(currentData.weather[0].icon);
    currentIcon.innerHTML = `<img src="./images/currentImages/${iconID}.png">`
}


//getWeather will get data from getLocation after the user searches, so that we can find the weather data.
async function getWeather(){
    console.log("get location data");
    locationData = await getLocation();
    console.log(locationData);
    city.innerText = locationData[0].name
    lat = locationData[0].lat;
    lon = locationData[0].lon;

    console.log("get currrent day data");
    currentData = await getCurrentDay();
    console.log(currentData);
    currentWeather.innerText = currentData.weather[0].main
    currentTemperature.innerText = `${Math.ceil(currentData.main.temp)}°`;
    currentHigh.innerText = `${Math.ceil(currentData.main.temp_max)}°`;
    currentLow.innerText = `${Math.ceil(currentData.main.temp_min)}°`;

    console.log("get five day forecast data");
    forecastData = await get5Day();
    console.log(forecastData);
    forecastNum1.innerText = `${Math.ceil(forecastData.list[0].main.temp)}`
    forecastNum2.innerText = `${Math.ceil(forecastData.list[1].main.temp)}`
    forecastNum3.innerText = `${Math.ceil(forecastData.list[2].main.temp)}`
    forecastNum4.innerText = `${Math.ceil(forecastData.list[3].main.temp)}`
    forecastNum5.innerText = `${Math.ceil(forecastData.list[4].main.temp)}`

    getCurrentWeatherIcon()
}



searchButton.addEventListener('click', function()
{
    searchedCity = userInputCity.value;
    console.log(`NEW DATA FOR: ${searchedCity}`)
    getWeather();
})

