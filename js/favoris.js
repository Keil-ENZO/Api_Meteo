stars.addEventListener("click", () => {
  console.log("click");

  if (stars.style.color === "yellow") {
    stars.style.color = "black";

    // Suppression de la ville des favoris dans le tableau
    const index = villesFav.indexOf(ville.innerHTML);
    if (index !== -1) {
      villesFav.splice(index, 1);
    }

    // Mise à jour du localStorage
    localStorage.setItem("villesFav", JSON.stringify(villesFav));
  } else {
    stars.style.color = "yellow";
    villesFav.push(ville.innerHTML);

    // Mise à jour du localStorage
    localStorage.setItem("villesFav", JSON.stringify(villesFav));
  }
});

const villesFavFromStorage = JSON.parse(localStorage.getItem("villesFav"));

if (villesFavFromStorage && villesFavFromStorage.includes(ville.innerHTML)) {
  stars.style.color = "yellow";
} else {
  stars.style.color = "black";
}
