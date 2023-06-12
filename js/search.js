//Fonction pour l'animation de la barre de recherche
function searchHandler() {
  iconSearch.replaceWith(search);
  search.style.width = "100%";
  search.style.opacity = "1";
  search.focus();
}

//Trouver la meteo d'une ville
async function searchCity() {
  await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${inputSearch.value}&lang=fr&appid=${Api_key}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      stars.style.color = "black";

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

      const newIcon = data.list[0].weather[0].icon;
      const iconElement = document.querySelector("#icon");
      iconElement.src = `https://openweathermap.org/img/wn/${newIcon}.png`;

      //Background celon la meteo
      if (data.list[0].weather[0].main === "Clear") {
        document.body.style.backgroundColor = "skyblue";
      } else if (data.list[0].weather[0].main === "Clouds") {
        document.body.style.backgroundColor = "rgb(118, 118, 118) ";
      } else if (data.list[0].weather[0].main === "Rain") {
        document.body.style.backgroundColor = "rgb(118, 118, 130) ";
      } else if (data.list[0].weather[0].main === "Snow") {
        document.body.style.backgroundColor = "rgb(195, 181, 181)";
      } else if (data.list[0].weather[0].main === "Thunderstorm") {
        document.body.style.backgroundColor = "rgb(84, 84, 84)";
      } else if (data.list[0].weather[0].main === "Drizzle") {
        document.body.style.backgroundColor = "rgb(188, 181, 181)";
      } else if (data.list[0].weather[0].main === "Mist") {
        document.body.style.backgroundColor = "rgb(188, 181, 181)";
      }

      //Affichage de la list entiere avec ce code
      mainContent.innerHTML = "";
      let count = 0;

      data.list.forEach((forecast) => {
        if (count < 5) {
          const forecastElement = document.createElement("a");
          forecastElement.setAttribute("href", "#");

          forecastElement.classList.add("main");
          if (count === 0) {
            forecastElement.classList.add("focus");
          }

          //Au click affichage de la meteo celon la ou on a cliqué
          forecastElement.addEventListener("click", () => {
            console.log(forecast);

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
            if (forecast.weather[0].main === "Clear") {
              document.body.style.backgroundColor = "skyblue";
            } else if (forecast.weather[0].main === "Clouds") {
              document.body.style.backgroundColor = "rgb(118, 118, 118) ";
            } else if (forecast.weather[0].main === "Rain") {
              document.body.style.backgroundColor = "rgb(120, 120, 118) ";
            } else if (forecast.weather[0].main === "Snow") {
              document.body.style.backgroundColor = "rgb(188, 181, 181)";
            } else if (forecast.weather[0].main === "Thunderstorm") {
              document.body.style.backgroundColor = "rgb(84, 84, 84)";
            } else if (forecast.weather[0].main === "Drizzle") {
              document.body.style.backgroundColor = "rgb(188, 181, 181)";
            } else if (forecast.weather[0].main === "Mist") {
              document.body.style.backgroundColor = "rgb(188, 181, 181)";
            }
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
        } else {
          return;
        }
      });
    })
    .catch(() => {
      alert("Cette ville n'existe pas");
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchCity();

  if (inputSearch.value === "") {
    alert("Veuillez entrer une ville");
  }
});
