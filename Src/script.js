function formatDate() {
  let now = new Date();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  return `${day}, ${date} ${month}, ${year} <br> ${hours}:${minutes}`;
}

function updateLocation(event) {
  event.preventDefault();
  let locationInput = document.querySelector("#location-input");
  searchLocation(locationInput.value);
}

function searchLocation(response) {
  let apiKey = "ad7d1124d3ea1fdc032f2be9660dcda0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${response}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showLocation);
}

function showLocation(response) {
  let inputLocation = response.data.name;
  let inputCountry = response.data.sys.country;
  let currentLocation = document.querySelector("#current-location");
  currentLocation.innerHTML = `${inputLocation}, ${inputCountry}`;
  showWeather(response);
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let condition = response.data.weather[0].description;
  let windSpeed = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let temperatureElement = document.querySelector("#main-temperature");
  temperatureElement.innerHTML = temperature;
  let weatherElement = document.querySelector("#condition");
  weatherElement.innerHTML = condition;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `Wind: ${windSpeed} mph`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity} %`;
}

function convertTemperatureUnit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temperature");
  let unitElement = document.querySelector("#main-unit");
  let convertUnitElement = document.querySelector("#convert-link");
  let temperature = temperatureElement.innerHTML;
  let mainUnit = unitElement.innerHTML;
  if (mainUnit === "°C") {
    temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
    unitElement.innerHTML = "°F";
    convertUnitElement.innerHTML = "°C";
  } else {
    temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
    unitElement.innerHTML = "°C";
    convertUnitElement.innerHTML = "°F";
  }
}

let currentDate = document.querySelector("#date-and-time");
currentDate.innerHTML = formatDate();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", updateLocation);

let convertTemperatureLink = document.querySelector("#convert-link");
convertTemperatureLink.addEventListener("click", convertTemperatureUnit);
