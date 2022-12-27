//add final css
//clean up code
function conversionCelsius(event) {
  event.preventDefault();
  convertFahrenheit.classList.remove("active");
  convertCelsius.classList.add("active");
  let temperatureElement = document.querySelector(".degrees");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function conversionFahrenheit(event) {
  event.preventDefault();
  convertFahrenheit.classList.add("active");
  convertCelsius.classList.remove("active");
  let fahrenheitTemperature = celsiusTemperature * (9 / 5) + 32;
  let temperatureElement = document.querySelector(".degrees");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayResults(response) {
  celsiusTemperature = response.data.temperature.current;
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.city}, ${response.data.country}`;
  document.querySelector(".degrees").innerHTML = Math.round(celsiusTemperature);
  document.querySelector(".weather-icon").innerHTML =
    response.data.condition.icon;
  document.querySelector(".weather-description").innerHTML =
    response.data.condition.description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.temperature.humidity} %`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  document
    .querySelector(".weather-icon")
    .setAttribute(
      "src",
      response.data.condition.icon_url,
      "alt",
      response.data.condition.icon
    );
  document.querySelector("#time").innerHTML = formatTime(response.data.time);
  document.querySelector("#date").innerHTML = formatDate(response.data.time);
  getForecast(response.data.coordinates);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index) {
      forecastHTML =
        forecastHTML +
        `<div class="col" id="forecast">
           <span class="forecast-day">${formatForecast(
             forecastDay.time
           )}</span><br />
            <img src="${
              forecastDay.condition.icon_url
            }" alt="" id="icon-forecast" />
            <br /> 
            <span class="max-temp-forecast">${Math.round(
              forecastDay.temperature.maximum
            )} °</span>
            <span class="min-temp-forecast">${Math.round(
              forecastDay.temperature.minimum
            )} °</span>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatDate(daystamp) {
  let today = new Date(daystamp * 1000);
  let year = today.getFullYear();
  let day = today.getDate();
  let weekday = days[today.getDay()];
  let months = [
    "Jan",
    "Feb",
    "March",
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
  let month = months[today.getMonth()];

  return `${weekday}, ${month}. ${day}, ${year}`;
}
function formatForecast(daystamp) {
  let forecastDay = new Date(daystamp * 1000);
  return `${days[forecastDay.getDay()]}`;
}
function formatTime(timestamp) {
  let now = new Date(timestamp * 1000);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
function getForecast(coordinates) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function search(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayResults);
}
function showPosition(position) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&unit=${unit}`;
  axios.get(apiUrl).then(displayResults);
}
let convertCelsius = document.querySelector(".celsius");
convertCelsius.addEventListener("click", conversionCelsius);

let convertFahrenheit = document.querySelector(".fahrenheit");
convertFahrenheit.addEventListener("click", conversionFahrenheit);

let locationButton = document.querySelector(".current-location");
locationButton.addEventListener("click", getCurrentLocation);

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", handleSubmit);

let apiKey = "242e181ca0a34d6a4t3befc66o8e43fa";
let celsiusTemperature = null;
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let unit = "metric";

search("North Pole");
