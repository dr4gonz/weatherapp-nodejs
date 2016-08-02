var Weather = require('./../js/weather.js').weatherModule;

$(document).ready(function(){
  $("#weatherLocation").click(function(){
    var currentWeatherObject = new Weather();
    var city = $("#location").val();
    currentWeatherObject.getWeather(city);
    currentWeatherObject.getForecast(city);
  });
});
