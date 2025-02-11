function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
}

let textFormElement = document.querySelector("#text-form");
textFormElement.addEventListener("submit", search);
