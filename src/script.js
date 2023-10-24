function displayTemperature(response) {
  console.log(response.data);
  let currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let condition = document.querySelector(".condition");
  condition.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let adjusted = document.querySelector("#adjusted-temp");
  adjusted.innerHTML = Math.round(response.data.temperature.feels_like);

  temperatureFahrenheit = response.data.temperature.current;

  function displayIcon() {
    let condition = document.querySelector(".condition").innerHTML;
    let icon = document.querySelector(".main-icon i");

    if (condition.includes("clear sky")) {
      icon.className = "fa-solid fa-sun fa-4x";
    } else {
      if (condition.includes("clouds")) {
        icon.className = "fa-solid fa-cloud fa-4x";
      } else {
        if (condition.includes("rain")) {
          icon.className = "fa-solid fa-cloud-rain fa-4x";
        } else {
          if (condition.includes("thunderstorm")) {
            icon.className = "fa-solid fa-cloud-bolt fa-4x";
          } else {
            if (condition.includes("snow")) {
              icon.className = "fa-solid fa-snowflake fa-4x";
            } else {
              if (condition.includes("mist")) {
                icon.className = "fa-solid fa-smog fa-4x";
              }
            }
          }
        }
      }
    }
  }
  displayIcon();
}

function search(city) {
  let apiKey = "34383otfa759ac03fe5a4377c986dab7";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  let forecastApi = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  Promise.all([axios.get(apiUrl), axios.get(forecastApi)])
    .then(([currentWeatherResponse, forecastResponse]) => {
      displayTemperature(currentWeatherResponse);
      showForecastData(forecastResponse);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data. Please try again later.");
    });
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityInputElement.value;
  search(cityInputElement.value);
}

function showForecastData(response) {
  console.log(response.data);
  let forecastData = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecastData.forEach(function (forecastday) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
              <div class="weather-forecast-day">${forecastday.time}</div>
              <div class="weekday-icon">
                <i class="fa-solid fa-cloud fa-sm"></i>
              </div>
              <div class="forecast-temperature">
                <span class="forecast-high">${Math.round(
                  forecastday.temperature.maximum
                )}</span>°
                <span class="forecast-low">${Math.round(
                  forecastday.temperature.minimum
                )}</span>°
              </div>
            </div>
        
    `;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Thursday", "Friday", "Saturday"];
let month = [
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
let currentMonth = month[now.getMonth()];
let currentDay = days[now.getDay()];
let currentDate = now.getDate();
let currentTime = `${now.getHours()}:${now.getMinutes()}`;

let weekDay = document.querySelector("#day-of-week");
weekDay.innerHTML = `${currentDay},`;
let timeStamp = document.querySelector("#date-and-time");
timeStamp.innerHTML = `${currentMonth} ${currentDate} ${currentTime}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
let button = document.querySelector("#go-button");
button.addEventListener("click", handleSubmit);

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureCelsius = ((temperatureFahrenheit - 32) * 5) / 9;
  let currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = Math.round(temperatureCelsius);
}

function showFarenheitTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = Math.round(temperatureFahrenheit);
}

let celLink = document.querySelector("#celsius");
celLink.addEventListener("click", showCelsiusTemp);
let temperatureFahrenheit = null;

let farLink = document.querySelector("#fahrenheit");
farLink.addEventListener("click", showFarenheitTemp);
