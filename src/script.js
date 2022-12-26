//to do min max temp current day

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

function formatDate(daystamp) {
  let today = new Date(daystamp * 1000);
  let year = today.getFullYear();
  let day = today.getDate();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
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
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col" id="day-1">
              ${day}
              <img src="" alt="" id="icon-day-1" />
              <span class="min-temp-day-1"></span>
              <span class="max-temp-day-1"></span>
            </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let unit = "metric";
  let apiKey = "242e181ca0a34d6a4t3befc66o8e43fa";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayResults);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let unit = "metric";
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "242e181ca0a34d6a4t3befc66o8e43fa";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&unit=${unit}`;
  axios.get(apiUrl).then(displayResults);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector(".current-location");
locationButton.addEventListener("click", getCurrentLocation);

function conversionFahrenheit(event) {
  event.preventDefault();
  convertFahrenheit.classList.add("active");
  convertCelsius.classList.remove("active");
  let fahrenheitTemperature = (celsiusTemperature + 9) / 5 + 32;
  let temperatureElement = document.querySelector(".degrees");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function conversionCelsius(event) {
  event.preventDefault();
  convertFahrenheit.classList.remove("active");
  convertCelsius.classList.add("active");
  let temperatureElement = document.querySelector(".degrees");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let convertFahrenheit = document.querySelector(".fahrenheit");
convertFahrenheit.addEventListener("click", conversionFahrenheit);

let convertCelsius = document.querySelector(".celsius");
convertCelsius.addEventListener("click", conversionCelsius);
let celsiusTemperature = null;

search("Berlin");
displayForecast();
