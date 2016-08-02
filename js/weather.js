var apiKey = require('./../.env').apiKey;
var gmapKey = require('./../.env').gmapsApiKey;

function Weather(){
  this.lat = 0;
  this.long = 0;
}

Weather.prototype.getWeather = function (location) {
  var that = this;
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=' + apiKey ).then(function(response) {
    console.log(response);
    $(".showWeather").html(
      "<p>Current temperature: " + that.fahrenheitConvert(response.main.temp) + " degrees</p>" +
      "<p>" + response.main.humidity + "% humidity</p>"
    );
  }).fail(function(error) {
    $('.showWeather').text(error.responseJSON.message);
  });
};

Weather.prototype.getForecast = function (location) {
  var that = this;
  $.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + location + '&appid=' + apiKey + "&cnt=6").then(function(response) {
    console.log(response);
    $(".map").html('<iframe width="600" height="450" frameborder="0" src="https://www.google.com/maps/embed/v1/place?key='+ gmapKey +
    '&q='+location+ '"></iframe>');
    $(".showForecast").empty();
    for(i = 0; i < 5 ; i++) {
      $(".showForecast").append(
        "<li>" + that.unixDateConvert(response.list[i].dt).format("MMM D YYYY") + " High: " + that.fahrenheitConvert(response.list[i].temp.max) + " Low: " + that.fahrenheitConvert(response.list[i].temp.min) + "</li>"
      );
    }
  }).fail(function(error) {
    $('.showForecast').text(error.responseJSON.message);
  });
};


Weather.prototype.fahrenheitConvert = function(temp){
  return Math.floor(temp * (9/5) - 459.67);
};

Weather.prototype.unixDateConvert = function (date){
  var converted = new moment(date*1000);
  return converted;
};

exports.weatherModule = Weather;
