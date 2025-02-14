function updateWeatherdata(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="weather-icon"
    />`;

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes} `;
}

function searchCity(city) {
  let apiKey = "98cf17tbce8o72b5edd6a39d2d044324";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherdata);
}

function getForecast(city) {
  let apiKey = "98cf17tbce8o72b5edd6a39d2d044324";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHtml = "";
  console.log(response.data);

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-icon">⛅</div>
            <div class="weather-forecast-temperatures">
              <div class="temp"><strong>15°</strong></div>
              <div class="temp">9°</div>
            </div>
          </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text-form-input");
  searchCity(searchInput.value);
}

let textFormElement = document.querySelector("#text-form");
textFormElement.addEventListener("submit", search);

searchCity("Pretoria");
//displayForecast();
