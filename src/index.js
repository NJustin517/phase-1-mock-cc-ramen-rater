const form = document.querySelector("#new-ramen");
const ramenMenu = document.querySelector("#ramen-menu");
const ramenDetail = document.querySelector("#ramen-detail");
const ramenImage = document.querySelector("#ramen-detail .detail-image");
const ramenName = document.querySelector("#ramen-detail .name");
const restaurant = document.querySelector("#ramen-detail .restaurant");
const ramenRating = document.querySelector("#rating-display");
const ramenComment = document.querySelector("#comment-display");

fetch("http://localhost:3000/ramens")
  .then((resp) => resp.json())
  .then((json) => loadStoredRamens(json));

function loadStoredRamens(listOfRamens) {
  listOfRamens.forEach((ramen) => {
    renderRamen(ramen);
  });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newRamen = makeNewRamen(e.target);
  renderRamen(newRamen);
  console.log(newRamen);
  form.reset();
});

function renderRamen(ramen) {
  const image = document.createElement("img");
  image.src = ramen.image;
  image.addEventListener("click", (e) => {
    ramenImage.src = ramen.image;
    ramenName.textContent = ramen.name;
    restaurant.textContent = ramen.restaurant;
    ramenRating.textContent = ramen.rating;
    ramenComment.textContent = ramen.comment;
  });
  ramenMenu.appendChild(image);
}

function makeNewRamen(target) {
  return {
    name: target["new-name"].value,
    restaurant: target["new-restaurant"].value,
    image: target["new-image"].value,
    rating: target["new-rating"].value,
    comment: target["new-comment"].value,
  };
}
