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

function displayResults(response) {
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.city}, ${response.data.country}`;
  document.querySelector(".degrees").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.temperature.humidity} %`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
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

//search("Berlin");
