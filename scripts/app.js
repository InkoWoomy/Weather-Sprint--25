import { APIKEY } from './scripts/environment.js'; 

//This is a built-in API function that allows us to get the current location of the user

//navigator returns the geolocation object
//getCurrentPosition() returns the current position of the user

navigator.geolocation.getCurrentPosition( success , errorFunc );

// (success , errorFunc)
// Think of this as an if/else statement. If the user asppects it is successful, if not it's an error.

//Example of a geolocation object
{
    coords: {
        latitude: 37.7749;
        longitude: -122.4194;
    }
}

function success(position)
{
    console.log(position);
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitude: " + position.coords.longitude);
}

success();

function errorFunc (error){ 
    console.log(error.message);
} 

function apiCall() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=37.9577&lon=-121.2908&appid=${APIKEY}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data);
    })
}

apiCall()