//Function pour afficher la météo des 5 prochains jours
async function nextDaysWeather() {
  await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${ville.innerHTML}&lang=fr&appid=${Api_key}&units=metric`
  ).then((response) => {
    response.json().then((data) => {
      mainContent.innerHTML = "";
      let count = 0;
      let date = data.list[0].dt_txt;

      data.list.forEach((forecast) => {
        if (forecast.dt_txt.slice(11, 16) === "12:00") {
          if (forecast.dt_txt.slice(0, 10) !== date.slice(0, 10)) {
            date = forecast.dt_txt;
            if (count < 5) {
              const forecastElement = document.createElement("a");
              forecastElement.setAttribute("href", "#");

              forecastElement.classList.add("main");

              if (count === 0) {
                forecastElement.classList.add("focus");
              }

              //Au click affichage de la meteo celon l'heure selectionné
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
                humidite.innerHTML =
                  "Humidite " + forecast.main.humidity + " %";
                pression.innerHTML =
                  "Pression " + forecast.main.pressure + " hPa";

                const newIcon = forecast.weather[0].icon;
                const iconElement = document.querySelector("#icon");
                iconElement.src = `https://openweathermap.org/img/wn/${newIcon}.png`;

                //Background selon la météo
                const weatherType = data.list[0].weather[0].main;
                document.body.style.backgroundColor =
                  setBackgroundColor(weatherType);
              });

              const heureElement = document.createElement("p");
              heureElement.id = "heure";
              heureElement.textContent = forecast.dt_txt.slice(11, 16);

              const date = document.createElement("p");
              date.id = "date";
              date.textContent =
                forecast.dt_txt.slice(8, 10) +
                "/" +
                forecast.dt_txt.slice(5, 7);

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
          }
        }
      });
    });
  });
}
