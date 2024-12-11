//Importing the API key from enviroment.js, so we can have enviroment.js (and the API key as a result) ignored by git.
import { APIKEY } from './enviroment.js';

//Call variables for data implementation
const city = document.getElementById("city");
const searchButton = document.getElementById("searchButton");
const userInputCity = document.getElementById("userInputCity");
const currentTemperature = document.getElementById("currentTemperature");


//Obtain Weather data from API

//Test Data 
let currentDay = [];
let fiveDay = [];
let searchedCity = "";
let lat = 0;
let lon = 0;


//getLocation will populate data for a specific location when the user searches for it
function getLocation()
{
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&limit=1&appid=${APIKEY}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data);
            lat = (data[0].lat);
            lon = (data[0].lon);
        })
}

function getCurrentDay(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`)
    .then((response) => {
        return response.json()
    })
    .then((currentDay) => {
        console.log(currentDay);
        return currentDay;
    });
}

function get5Day(){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`)
    .then((response) => {
        return response.json()
    })
    .then((fiveDay) => {
        console.log(fiveDay);
    });
}


//getWeather will get data from getLocation after the user searches, so that we can find the weather data.
function getWeather(){
    getLocation()
    getCurrentDay();
    city.innerText = [0].name;
    currentTemperature.innerText = currentDay.main.temp;
    


}



searchButton.addEventListener('click', function()
{
    searchedCity = userInputCity.value.toLowerCase();
    getWeather();
})

