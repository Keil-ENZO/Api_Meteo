const inputSearch = document.getElementById("search");
const latText = document.getElementById("lat");
const lonText = document.getElementById("lon");
const btn = document.getElementById("btn");

const Api_key = "afcadc1c10c3d62cc2d1c7ec7ef9931e";

//Trouver c'est coordonnee gps

//http://api.openweathermap.org/geo/1.0/direct?q=London&appid={API key}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${inputSearch.value}&appid=${Api_key}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
});

// //Geocalisation de l'utilisateur
function getLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    latText.innerText = lat.toFixed(2);
    lonText.innerText = long.toFixed(2);
  });
}

getLocation();

fetch(
  `https://api.openweathermap.org/data/2.5/weather?lat=${"43.65"}&lon=${"6.92"}&appid=${Api_key}`
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
