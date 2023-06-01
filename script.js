const inputSearch = document.getElementById("search");
const latText = document.getElementById("lat");
const lonText = document.getElementById("lon");
const form = document.getElementById("form");

const Api_key = "afcadc1c10c3d62cc2d1c7ec7ef9931e";
let lat;
let long;

//Trouver la meteo d'une ville
function searchCity(e) {
  e.preventDefault();
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${inputSearch.value}&lang=fr&appid=${Api_key}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

//Localisation de l'utilisateur
function success(pos) {
  const crd = pos.coords;

  lat = crd.latitude;
  long = crd.longitude;

  latText.innerHTML = lat;
  lonText.innerHTML = long;

  // Appel à fetch une fois que les coordonnées sont définies
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&lang=fr&appid=${Api_key}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

navigator.geolocation.getCurrentPosition(success);

//Event Listener
form.addEventListener("submit", searchCity);