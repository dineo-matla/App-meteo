function updateWeatherdata(response) {
  console.log(response.data.temperature.current);
}

function searchCity(city) {
  let apiKey = "98cf17tbce8o72b5edd6a39d2d044324";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherdata);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let textFormElement = document.querySelector("#text-form");
textFormElement.addEventListener("submit", search);
