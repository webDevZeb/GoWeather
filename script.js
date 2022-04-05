"use strict";

// const request = fetch(
//   `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=150d8b7ea78986c49459a03f8b6e31f0`
// );
const submitBtn = document.querySelector(".submit-me");

submitBtn.addEventListener("click", function () {
  const cityName = document.querySelector("#cityname").value;

  const getWeatherData = function () {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=150d8b7ea78986c49459a03f8b6e31f0&units=imperial`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        renderWeather(data);
      });
  };
  getWeatherData();
});

const renderWeather = function (data) {
  console.log(data);
  const html = `<div class= weather_data>
  <h3 class="weather_description">Current conditions: ${
    data.weather[0].description
  }<h3>
  <img class="weather-img" src="http://openweathermap.org/img/wn/${
    data.weather[0].icon
  }.png"></img>
  <div class=temphigh-txt>High of ${Math.trunc(data.main.temp_max)}°</div>
  <div class=templow-txt>Low of ${Math.trunc(data.main.temp_min)}°</div>`;

  document.querySelector(".container").insertAdjacentHTML("beforeend", html);

  const sunriseTime = timeConverterSunrise(data.sys.sunrise);
  const sunsetTime = timeConverterSunset(data.sys.sunset);

  let labelSunrise = document.querySelector(".sunrise");
  let labelSunset = document.querySelector(".sunset");

  function timeConverterSunrise(sunrise) {
    // debugger;
    var a = new Date(sunrise * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = hour + ":" + min + " AM";
    return time;
  }
  function timeConverterSunset(sunset) {
    var a = new Date(sunset * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = ((a.getHours() + 11) % 12) + 1;
    var min = a.getMinutes();
    min = min < 10 ? "0" + min : min;

    // debugger;
    var sec = a.getSeconds();
    var time = hour + ":" + min + " PM";
    return time;
  }

  labelSunrise.textContent = `Sunrise: ${sunriseTime}`;

  labelSunset.textContent = `Sunset: ${sunsetTime}`;
};

///// Stop button from submitting city after one click
document.querySelector(".submit-me").addEventListener("click", function () {
  //disable
  this.disabled = true;
});
