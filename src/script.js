let now = new Date();
let year = now.getFullYear();
let day = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let weekday = days[now.getDay()];

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
let month = months[now.getMonth()];

let date = document.querySelector("#date");
date.innerHTML = `${weekday}, ${month}. ${day}, ${year}`;

let time = document.querySelector("#time");
time.innerHTML = `${hours}:${minutes}`;

function searchResult(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".currentDegrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".maxTemp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(".minTemp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;

  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let currentCityPrecipitation = document.querySelector(".precipitation");
  currentCityPrecipitation.innerHTML = `${response.data.main.rain} %`;
}
function search(city) {
  let unit = "metric";
  let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(searchResult);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchEngine = document.querySelector("#search-city");
searchEngine.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let unit = "metric";
  let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${unit}&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(searchResult);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector(".current-location");
locationButton.addEventListener("click", getCurrentLocation);

search("Berlin");
