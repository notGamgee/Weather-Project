function displayTemperature(response) {
  console.log(response.data);
  let currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let condition = document.querySelector(".condition");
  condition.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let adjusted = document.querySelector("#adjusted-temp");
  adjusted.innerHTML = Math.round(response.data.main.feels_like);

  temperatureFahrenheit = response.data.main.temp;

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
  let apiKey = "7059cb165caa3316bff682d263a01b1e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios
    .get(apiUrl)
    .then(displayTemperature)
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
