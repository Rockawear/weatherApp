/*jslint browser:true */
'use strict';

var weatherConditions = new XMLHttpRequest();
var weatherForecast = new XMLHttpRequest();
var cObj;
var fObj;
var conditionPath;
var forecastPath;
var zip;

function loadWeeather(){
    zip = document.getElementById('zip').value;
    if(zip === ''){
        zip = "02451";
    }
   conditionPath = "http://api.wunderground.com/api/a1d8ff37d069e0fe/conditions/q/" + zip + ".json";
    forecastPath = "http://api.wunderground.com/api/a1d8ff37d069e0fe/forecast/q/" + zip + ".json";
    // GET THE CONDITIONS
weatherConditions.open('GET', conditionPath, true);
weatherConditions.responseType = 'text';
weatherConditions.send(null);
    
    // GET THE FORECARST
weatherForecast.open('GET', forecastPath, true);
weatherForecast.responseType = 'text'; 
weatherForecast.send();

}



weatherConditions.onload = function() {
    if (weatherConditions.status === 200){
        cObj = JSON.parse(weatherConditions.responseText); 
        console.log(cObj);
        document.getElementById('location').innerHTML = cObj.current_observation.display_location.full;
        document.getElementById('weather').innerHTML = cObj.current_observation.weather;
        document.getElementById('temperature').innerHTML = cObj.current_observation.temp_f;
        
        

    } //end if
}; //end function




// Forecast
weatherForecast.onload = function() {
if (weatherForecast.status === 200){
	fObj = JSON.parse(weatherForecast.responseText);
	console.log(fObj);
    
    document.getElementById('desc').innerHTML = fObj.forecast.txt_forecast.forecastday["0"].fcttext;
    
    //day 1
    document.getElementById('r1c1').innerHTML = fObj.forecast.simpleforecast.forecastday[1].date.weekday;
    document.getElementById('r1c3').innerHTML = fObj.forecast.simpleforecast.forecastday[1].high.fahrenheit;
    document.getElementById('r1c4').innerHTML = fObj.forecast.simpleforecast.forecastday[1].low.fahrenheit;
    document.getElementById('r1c2').src = fObj.forecast.simpleforecast.forecastday[1].icon_url;
    
	//day 2
    document.getElementById('r2c1').innerHTML = fObj.forecast.simpleforecast.forecastday[2].date.weekday;
    document.getElementById('r2c3').innerHTML = fObj.forecast.simpleforecast.forecastday[2].high.fahrenheit;
    document.getElementById('r2c4').innerHTML = fObj.forecast.simpleforecast.forecastday[2].low.fahrenheit;
    document.getElementById('r2c2').src = fObj.forecast.simpleforecast.forecastday[2].icon_url;
    
    //day 3
    document.getElementById('r3c1').innerHTML = fObj.forecast.simpleforecast.forecastday[3].date.weekday;
    document.getElementById('r3c3').innerHTML = fObj.forecast.simpleforecast.forecastday[3].high.fahrenheit;
    document.getElementById('r3c4').innerHTML = fObj.forecast.simpleforecast.forecastday[3].low.fahrenheit;
    document.getElementById('r3c2').src = fObj.forecast.simpleforecast.forecastday[3].icon_url;
    
//    //Use this code if you need forecast for more than 3 days
//    document.getElementById('r4c1').innerHTML = fObj.forecast.simpleforecast.forecastday[4].date.weekday;
//    document.getElementById('r4c3').innerHTML = fObj.forecast.simpleforecast.forecastday[4].high.fahrenheit;
//    document.getElementById('r4c4').innerHTML = fObj.forecast.simpleforecast.forecastday[4].low.fahrenheit;
//    document.getElementById('r4c2').src = fObj.forecast.simpleforecast.forecastday[4].icon_url;
} //end if
}; //end function

loadWeeather();


