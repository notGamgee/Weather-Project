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
}
let apiKey = "7059cb165caa3316bff682d263a01b1e";
let city = document.querySelector("h1").innerHTML;

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);
