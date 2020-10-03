//default location

function searchDefaultLocation(response) {
  let apiKey = "ad7d1124d3ea1fdc032f2be9660dcda0";
  let units = "metric";
  let city = "Edinburgh";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showDefaultLocation);
}

function showDefaultLocation(response) {
  console.log(response);
  let location = response.data.name;
  let country = response.data.sys.country;
  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  let currentLocation = document.querySelector("#current-location");
  currentLocation.innerHTML = `${location}, ${country}`;
  showWeather(response);

  let apiKey = "ad7d1124d3ea1fdc032f2be9660dcda0";
  let units = "metric";
  let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiForecastUrl).then(showForecast);
}

//display weather

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let condition = response.data.weather[0].description;
  let windSpeed = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let icon = response.data.weather[0].icon;
  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  let temperatureElement = document.querySelector("#main-temperature");
  temperatureElement.innerHTML = temperature;
  let weatherElement = document.querySelector("#condition");
  weatherElement.innerHTML = condition;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `Wind: ${windSpeed} mph`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity} %`;
  showDate(response.data.dt * 1000);
}

//display date and time

function showDate(timestamp) {
  let now = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let months = [
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
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDate = document.querySelector("#date-and-time");
  currentDate.innerHTML = `Last updated: <br> ${day}, ${date} ${month}, ${year} <br> ${hours}:${minutes}`;
}

//search new location

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
  let inputLatitude = response.data.coord.lat;
  let inputLongitude = response.data.coord.lon;
  let currentLocation = document.querySelector("#current-location");
  currentLocation.innerHTML = `${inputLocation}, ${inputCountry}`;
  showWeather(response);

  let apiKey = "ad7d1124d3ea1fdc032f2be9660dcda0";
  let units = "metric";
  let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${inputLatitude}&lon=${inputLongitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiForecastUrl).then(showForecast);
}

//geolocation

function getUserLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchUserLocation);
}

function searchUserLocation(position) {
  let apiKey = "ad7d1124d3ea1fdc032f2be9660dcda0";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showLocation);

  let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiForecastUrl).then(showForecast);
}

//display forecast

function showForecast(response) {
  console.log(response);
  let forecastElement = document.querySelector("#forecast-row");
  forecastElement.innerHTML = `<div class="col">
  <h5>${new Date(response.data.daily[1].dt * 1000).toString().slice(0, 4)}</h5>
  <img class="small-icons" src="http://openweathermap.org/img/wn/${
    response.data.daily[1].weather[0].icon
  }@2x.png" alt="small-icon"/>
  <p>${response.data.daily[1].weather[0].main}</p>
  <p>${Math.round(response.data.daily[1].temp.max)}-${Math.round(
    response.data.daily[1].temp.min
  )}°C</p>
  </div>
  <div class="col">
  <h5>${new Date(response.data.daily[2].dt * 1000).toString().slice(0, 4)}</h5>
  <img class="small-icons" src="http://openweathermap.org/img/wn/${
    response.data.daily[2].weather[0].icon
  }@2x.png" alt="small-icon"/>
  <p>${response.data.daily[2].weather[0].main}</p>
  <p>${Math.round(response.data.daily[2].temp.max)}-${Math.round(
    response.data.daily[2].temp.min
  )}°C</p>
  </div>
  <div class="col">
  <h5>${new Date(response.data.daily[3].dt * 1000).toString().slice(0, 4)}</h5>
  <img class="small-icons" src="http://openweathermap.org/img/wn/${
    response.data.daily[3].weather[0].icon
  }@2x.png" alt="small-icon"/>
  <p>${response.data.daily[3].weather[0].main}</p>
  <p>${Math.round(response.data.daily[3].temp.max)}-${Math.round(
    response.data.daily[3].temp.min
  )}°C</p>
  </div>
  <div class="col">
  <h5>${new Date(response.data.daily[4].dt * 1000).toString().slice(0, 4)}</h5>
  <img class="small-icons" src="http://openweathermap.org/img/wn/${
    response.data.daily[4].weather[0].icon
  }@2x.png" alt="small-icon"/>
  <p>${response.data.daily[4].weather[0].main}</p>
  <p>${Math.round(response.data.daily[4].temp.max)}-${Math.round(
    response.data.daily[4].temp.min
  )}°C</p>
  </div>
  <div class="col">
  <h5>${new Date(response.data.daily[5].dt * 1000).toString().slice(0, 4)}</h5>
  <img class="small-icons" src="http://openweathermap.org/img/wn/${
    response.data.daily[5].weather[0].icon
  }@2x.png" alt="small-icon"/>
  <p>${response.data.daily[5].weather[0].main}</p>
  <p>${Math.round(response.data.daily[5].temp.max)}-${Math.round(
    response.data.daily[5].temp.min
  )}°C</p>
  </div>`;
}

//convert temperature

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

let defaultLocation = document.querySelector("#current-location");
defaultLocation.innerHTML = searchDefaultLocation();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", updateLocation);

let userLocationButton = document.querySelector("#user-location-button");
userLocationButton.addEventListener("click", getUserLocation);

let convertTemperatureLink = document.querySelector("#convert-link");
convertTemperatureLink.addEventListener("click", convertTemperatureUnit);
