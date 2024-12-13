//Importing the API key from enviroment.js, so we can have enviroment.js (and the API key as a result) ignored by git.
import { APIKEY } from './enviroment.js';
import { getFromFavorites, saveToFavorites, removeFromFavorites } from './localstorage.js';

//Call variables for data implementation (Current Day)
const city = document.getElementById("city");
const searchButton = document.getElementById("searchButton");
const userInputCity = document.getElementById("userInputCity");
const currentTemperature = document.getElementById("currentTemperature");
const currentWeather = document.getElementById("currentWeather");
const currentHigh = document.getElementById("currentHigh");
const currentLow = document.getElementById("currentLow");
const currentIcon = document.getElementById("currentIcon");
const favoritesList = document.getElementById("favoritesList");
const historyList = document.getElementById("historyList");
const daybg = document.getElementById("daybg");
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

const day1 = document.getElementById("day1");
const day2 = document.getElementById("day2");
const day3 = document.getElementById("day3");
const day4 = document.getElementById("day4");
const day5 = document.getElementById("day5");
const forecastIcons = [forecastIcon1, forecastIcon2, forecastIcon3, forecastIcon4, forecastIcon5];



//Variables 
let locationData = [];
let currentData = [];
let forecastData = [];
let history = [];
let searchedCity = "";
let lat = 0;
let lon = 0;

showFavoritesList();

//Time of Day innerText
let currentDate = new Date();
day1.innerText = new Date(currentDate.getTime() + 86400000 * 1).toLocaleDateString('en-US', { weekday: 'short' });
day2.innerText = new Date(currentDate.getTime() + 86400000 * 2).toLocaleDateString('en-US', { weekday: 'short' });
day3.innerText = new Date(currentDate.getTime() + 86400000 * 3).toLocaleDateString('en-US', { weekday: 'short' });
day4.innerText = new Date(currentDate.getTime() + 86400000 * 4).toLocaleDateString('en-US', { weekday: 'short' });
day5.innerText = new Date(currentDate.getTime() + 86400000 * 5).toLocaleDateString('en-US', { weekday: 'short' });

// For testing purposes; this will clear your localstorage if enabled
// localStorage.clear();

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

//Gets the current icon for the current weather of the day. Changes the background of the image depending on the time of day 
function getCurrentWeatherIcon()
{
    const iconID = currentData.weather[0].icon;
    currentIcon.innerHTML = `<img src="./images/currentImages/${iconID}.png" style="width: 40%">`

    if (currentData.weather[0].icon.includes("n"))
    {
        daybg.classList.remove("bg-day")
        daybg.classList.add("bg-night")
    } else {
        daybg.classList.remove("bg-night")
        daybg.classList.add("bg-day")
    }
}

// This gets each icon for the forecast days
function getForecastWeatherIcons()
{
    for (let i = 0; i < 5; i++)
    {
        const iconID = forecastData.list[i].weather[0].icon;
        forecastIcons[i].innerHTML = `<img src="./images/forecastImages/${iconID}.png" style="width: 80%">`
    }
}


//getWeather will get data from getLocation after the user searches, so that we can find the weather data.
async function getWeather(){
    console.log("Get location data");
    locationData = await getLocation();
    console.log(locationData);
    city.innerText = locationData[0].name
    lat = locationData[0].lat;
    lon = locationData[0].lon;

    console.log("Get currrent day data");
    currentData = await getCurrentDay();
    console.log(currentData);
    currentWeather.innerText = currentData.weather[0].main
    currentTemperature.innerText = `${Math.ceil(currentData.main.temp)}°`;
    currentHigh.innerText = `${Math.ceil(currentData.main.temp_max)}°`;
    currentLow.innerText = `${Math.ceil(currentData.main.temp_min)}°`;

    console.log("Get five day forecast data");
    forecastData = await get5Day();
    console.log(forecastData);

    forecastNum1.innerText = `${Math.ceil(forecastData.list[0].main.temp)}`
    forecastNum2.innerText = `${Math.ceil(forecastData.list[1].main.temp)}`
    forecastNum3.innerText = `${Math.ceil(forecastData.list[2].main.temp)}`
    forecastNum4.innerText = `${Math.ceil(forecastData.list[3].main.temp)}`
    forecastNum5.innerText = `${Math.ceil(forecastData.list[4].main.temp)}`


    getCurrentWeatherIcon();
    getForecastWeatherIcons();
    console.log(`DATA GET FOR "${searchedCity}" IS COMPLETE!`)
}


//When the search button is pressed, it will get the weather for that city and add your search to the history list
searchButton.addEventListener('click', function()
{
    searchedCity = userInputCity.value;
    console.log(`NEW DATA FOR: ${searchedCity}`)
    getWeather();
    addToHistoryList();
})

//Checks if the searched item is a repeat. If it's not a repeat, it will add the item into the search list. You can click on the favorite button of the search list item to add it to your favorites, as well as a clicking the text of the city to display its information again. History does not save in-between sessions.
async function addToHistoryList()
{
    for (let i = 0; i < history.length; i++)
    {
        if (history[i] == searchedCity)
        {
            return null;
        }
    }
    historyList.innerHTML = "";
    history.push(searchedCity);

    history.map(historyItems => {
        console.log(`HISTORY: ${historyItems}`);

        let h2 = document.createElement ('h2');
        h2.type = 'button';
        h2.className = "btn col-9 text-center"
        h2.style = "font-size: 30px;"
        h2.innerText = historyItems;
        
        let favorite = document.createElement('button');
        favorite.type = 'button';
        favorite.className = "btn col-3"
        favorite.innerHTML = `<img src="./images/FavoriteInactive.png">`;
        
        h2.addEventListener('click', function()
        {
            searchedCity = h2.innerText;
            console.log(`GETTING DATA FOR: ${searchedCity}`)
            getWeather();   
        })

        favorite.addEventListener('click', function()
        {
            console.log("Adding favorites")
            addToFavorites();
        })
        historyList.appendChild(h2);
        historyList.appendChild(favorite);
    })
}

//Updates the favorites list when a new item is added to it, either from the history list or from the main weather tab. Has a button to remove it from the list, as well as a clickable icon to display its information again. Favorites bar saves in-between sessions.
async function showFavoritesList()
{
    let cityList = await getFromFavorites();
    favoritesList.innerHTML = "";

    cityList.map(cities => {
        console.log(`CITIES ITEM: ${cities}`);

        let h2 = document.createElement ('h2');
        h2.type = 'button';
        h2.className = "btn col-9 text-center"
        h2.style = "font-size: 30px;"
        h2.innerText = cities;
        
        let unfavorite = document.createElement('button');
        unfavorite.type = 'button';
        unfavorite.className = "btn col-3"
        unfavorite.innerHTML = `<img src="./images/FavoriteActive.png">`;
        
        h2.addEventListener('click', function()
        {
            searchedCity = h2.innerText;
            console.log(`GETTING DATA FOR: ${searchedCity}`)
            getWeather();   
        })

        unfavorite.addEventListener('click', function()
        {
            console.log("Removing from favorites")
            removeFromFavorites(cities);
            h2.remove();
            unfavorite.remove();
        })

        favoritesList.appendChild(h2);
        favoritesList.appendChild(unfavorite);
    })
}

//These two add an item to the favorites list as long as it's not a repeat
function addToFavorites()
{
    console.log(`SAVING ${searchedCity} FOR FAVORITES!`)
    if (searchedCity == "")
    {
        return null;
    }
    saveToFavorites(searchedCity);
    console.log(searchedCity);
    showFavoritesList();
}

favoritesButton.addEventListener('click', function()
{
    addToFavorites();
})