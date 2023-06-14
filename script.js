const inputSearch = document.getElementById("search");
const latText = document.getElementById("lat");
const lonText = document.getElementById("lon");
const form = document.getElementById("form");
const iconSearch = document.getElementById("iconSearch");
const search = document.getElementById("search");
const active = document.querySelector(".active");
const mainContent = document.querySelector(".main-content");
const Api_key = "afcadc1c10c3d62cc2d1c7ec7ef9931e";

let lat;
let long;
let villesFav = [];

//Condition de la class active
if (active) {
  active.classList.remove("active");
}
localisation.classList.add("active");

//Function pour changer la couleur du background celon la météo
function setBackgroundColor(weatherType) {
  if (weatherType === "Clear") {
    return "skyblue";
  } else if (weatherType === "Clouds") {
    return "#888899";
  } else if (weatherType === "Rain") {
    return "#808080";
  } else if (weatherType === "Snow") {
    return "#EFEFEF";
  } else if (weatherType === "Thunderstorm") {
    return "#363636";
  } else if (weatherType === "Mist") {
    return "#C8C8C8";
  } else if (weatherType === "Drizzle") {
    return "#b9C9C9";
  } else {
    return "white";
  }
}

//Localisation de l'utilisateur
async function success(pos) {
  const crd = pos.coords;

  lat = crd.latitude;
  long = crd.longitude;

  await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&lang=fr&appid=${Api_key}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
   

      //Affichage de la météo
      ville.innerHTML = data.city.name;
      dateHeure.innerHTML =
        data.list[0].dt_txt.slice(8, 10) +
        "/" +
        data.list[0].dt_txt.slice(5, 7) +
        "/" +
        data.list[0].dt_txt.slice(0, 4) +
        " - " +
        data.list[0].dt_txt.slice(11, 13) +
        " h";

      temps.innerHTML =
        data.list[0].weather[0].description.charAt(0).toUpperCase() +
        data.list[0].weather[0].description.slice(1);

      temperature.innerHTML = data.list[0].main.temp.toFixed(0) + " °C";
      ressenti.innerHTML =
        "Ressenti " + data.list[0].main.feels_like.toFixed(0) + " °C";

      tempMin.innerHTML =
        "Min " + data.list[0].main.temp_min.toFixed(0) + " °C";
      tempMin.style.color = "blue";

      tempMax.innerHTML =
        "Max " + data.list[0].main.temp_max.toFixed(0) + " °C";
      tempMax.style.color = "#EC6E4C";

      vent.innerHTML = "Vent " + data.list[0].wind.speed + " km/h";
      humidite.innerHTML = "Humidite " + data.list[0].main.humidity + " %";
      pression.innerHTML = "Pression " + data.list[0].main.pressure + " hPa";

      icon.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`;

      //Background celon la meteo
      const weatherType = data.list[0].weather[0].main;
      document.body.style.backgroundColor = setBackgroundColor(weatherType);

      let count = 0;

      data.list.forEach((forecast) => {
        if (count < 5) {
          const forecastElement = document.createElement("a");
          forecastElement.setAttribute("href", "#");

          forecastElement.classList.add("main");

          if (count === 0) {
            forecastElement.classList.add("focus");
          }

          //Au click affichage de la meteo celon sur l'heure selectionné
          forecastElement.addEventListener("click", () => {

            const focus = document.querySelector(".focus");
            if (focus) {
              focus.classList.remove("focus");
            }
            forecastElement.classList.add("focus");

            ville.innerHTML = data.city.name;
            dateHeure.innerHTML =
              forecast.dt_txt.slice(8, 10) +
              "/" +
              forecast.dt_txt.slice(5, 7) +
              "/" +
              forecast.dt_txt.slice(0, 4) +
              " - " +
              forecast.dt_txt.slice(11, 13) +
              " h";

            temps.innerHTML =
              forecast.weather[0].description.charAt(0).toUpperCase() +
              forecast.weather[0].description.slice(1);

            temperature.innerHTML = forecast.main.temp.toFixed(0) + " °C";
            ressenti.innerHTML =
              "Ressenti " + forecast.main.feels_like.toFixed(0) + " °C";

            tempMin.innerHTML =
              "Min " + forecast.main.temp_min.toFixed(0) + " °C";
            tempMin.style.color = "blue";

            tempMax.innerHTML =
              "Max " + forecast.main.temp_max.toFixed(0) + " °C";
            tempMax.style.color = "#EC6E4C";

            vent.innerHTML = "Vent " + forecast.wind.speed + " km/h";
            humidite.innerHTML = "Humidite " + forecast.main.humidity + " %";
            pression.innerHTML = "Pression " + forecast.main.pressure + " hPa";

            const newIcon = forecast.weather[0].icon;
            const iconElement = document.querySelector("#icon");
            iconElement.src = `https://openweathermap.org/img/wn/${newIcon}.png`;

            //Background celon la meteo
            const weatherType = forecast.weather[0].main;
            document.body.style.backgroundColor =
              setBackgroundColor(weatherType);
          });

          const heureElement = document.createElement("p");
          heureElement.id = "heure";
          heureElement.textContent = forecast.dt_txt.slice(11, 16);

          const date = document.createElement("p");
          date.id = "date";
          date.textContent =
            forecast.dt_txt.slice(8, 10) + "/" + forecast.dt_txt.slice(5, 7);

          const iconElement = document.createElement("img");
          iconElement.id = "icon";
          iconElement.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
          iconElement.height = "60px";
          iconElement.alt = "";

          const temperatureElement = document.createElement("p");
          temperatureElement.id = "temperatureHeure";
          temperatureElement.textContent =
            forecast.main.temp.toFixed(0) + " °C";

          forecastElement.appendChild(heureElement);
          forecastElement.appendChild(iconElement);
          forecastElement.appendChild(temperatureElement);
          forecastElement.appendChild(date);

          mainContent.appendChild(forecastElement);

          count++;
        }
      });
    });
}

//Permet de recuperer la position de l'utilisateur
navigator.geolocation.getCurrentPosition(success);

//Event Listener

localisation.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(success);
  mainContent.innerHTML = "";
  inputSearch.value = "";


  localisation.classList.add("active");
  nextDays.classList.remove("active");
  favorite.classList.remove("active");
});

nextDays.addEventListener("click", () => {
  nextDays.classList.add("active");
  localisation.classList.remove("active");
  favorite.classList.remove("active");

  nextDaysWeather();

});

favorite.addEventListener("click", () => {
  favorite.classList.add("active");
  nextDays.classList.remove("active");
  localisation.classList.remove("active");


  if (
    localStorage.getItem("villesFav") === null ||
    localStorage.getItem("villesFav") === "[]"
  ) {
    mainContent.innerHTML = `<div><h3>Vos villes favorites</h3>
    <p>Vous n'avez pas de villes favorites</p></div>`;
  }

  // Affichage des villes favorites du localStorage
  if (localStorage.getItem("villesFav")) {
    villesFav = JSON.parse(localStorage.getItem("villesFav")).join(" - ");
    mainContent.innerHTML = ` <div><h3>Vos villes favorites</h3>
    <p>${villesFav}</p></div>`;
  }

  //etoile jaune si la ville est dans les favoris
  const villesFavFromStorage = JSON.parse(localStorage.getItem("villesFav"));
  if (villesFavFromStorage && villesFavFromStorage.includes(ville.innerHTML)) {
    stars.style.color = "yellow";
  } else {
    stars.style.color = "black";
  }
});


