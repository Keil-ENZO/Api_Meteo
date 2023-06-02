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
    `https://api.openweathermap.org/data/2.5/forecast?q=${inputSearch.value}&lang=fr&appid=${Api_key}&units=metric`
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

  // Appel à fetch une fois que les coordonnées sont définies
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&lang=fr&appid=${Api_key}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

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
      tempMax.style.color = "orange";

      vent.innerHTML = "Vent " + data.list[0].wind.speed + " km/h";
      humidite.innerHTML = "Humidite " + data.list[0].main.humidity + " %";
      pression.innerHTML = "Presssion " + data.list[0].main.pressure + " hPa";

      icon.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`;

      // heure.innerHTML = data.list[0].dt_txt.slice(11, 13) + " h";
      // temperatureHeure.innerHTML = data.list[0].main.temp.toFixed(0) + " °C";

      //Affichage de la list entiere avec ce code
      const mainContent = document.querySelector(".main-content");

      let count = 0;

      data.list.forEach((forecast) => {
        if (count < 5) {
          const forecastElement = document.createElement("a");
          forecastElement.setAttribute("href", "#");
          forecastElement.classList.add("main");

          //Au click sur un element de la liste
          forecastElement.addEventListener("click", () => {
            console.log(forecast);
            //affichage de la meteo celon la ou on a cliqué
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
            tempMax.style.color = "orange";

            vent.innerHTML = "Vent " + forecast.wind.speed + " km/h";
            humidite.innerHTML = "Humidite " + forecast.main.humidity + " %";
            pression.innerHTML = "Presssion " + forecast.main.pressure + " hPa";

            icon.src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`; //icon de change pas
          });

          const heureElement = document.createElement("p");
          heureElement.id = "heure";
          heureElement.textContent = forecast.dt_txt.slice(11, 16);

          const date = document.createElement("p");
          date.id = "date";
          date.textContent =
            forecast.dt_txt.slice(8, 10) +
            "/" +
            forecast.dt_txt.slice(5, 7) +
            "/" +
            forecast.dt_txt.slice(0, 4);

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

          count++; // Incrémente le compteur après chaque élément ajouté
        }
      });
    });
}

navigator.geolocation.getCurrentPosition(success);

//Event Listener
form.addEventListener("submit", searchCity);