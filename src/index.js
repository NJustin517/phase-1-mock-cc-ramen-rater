const createForm = document.querySelector("#new-ramen");
const updateForm = document.querySelector("#edit-ramen");
const ramenMenu = document.querySelector("#ramen-menu");
const ramenDetail = document.querySelector("#ramen-detail");
const ramenImage = document.querySelector("#ramen-detail .detail-image");
const ramenName = document.querySelector("#ramen-detail .name");
const restaurant = document.querySelector("#ramen-detail .restaurant");
const ramenRating = document.querySelector("#rating-display");
const ramenComment = document.querySelector("#comment-display");
const deleteButton = document.querySelector("#delete");
let currentDisplayedRamen;

fetch("http://localhost:3000/ramens")
  .then((resp) => resp.json())
  .then((json) => loadStoredRamens(json));

function loadStoredRamens(listOfRamens) {
  displayFirstRamen(listOfRamens[0]);

  listOfRamens.forEach((ramen) => {
    renderRamen(ramen);
  });
}
// Form Submissions
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newRamen = makeNewRamen(e.target);
  renderRamen(newRamen);
  console.log(newRamen);
  createForm.reset();
});

updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const rating = e.target["new-rating"].value;
  const comment = e.target["new-comment"].value;
  currentDisplayedRamen.rating = rating;
  currentDisplayedRamen.comment = comment;
  ramenRating.textContent = rating;
  ramenComment.textContent = comment;
  updateForm.reset();
});

// Render a single ramen
function renderRamen(ramen) {
  const image = document.createElement("img");
  image.src = ramen.image;
  image.addEventListener("click", (e) => {
    ramenImage.src = ramen.image;
    ramenName.textContent = ramen.name;
    restaurant.textContent = ramen.restaurant;
    ramenRating.textContent = ramen.rating;
    ramenComment.textContent = ramen.comment;
    currentDisplayedRamen = ramen;
  });
  ramenMenu.appendChild(image);
}

// Display the First Ramen from the Database
function displayFirstRamen(firstRamen) {
  ramenImage.src = firstRamen.image;
  ramenName.textContent = firstRamen.name;
  restaurant.textContent = firstRamen.restaurant;
  ramenRating.textContent = firstRamen.rating;
  ramenComment.textContent = firstRamen.comment;
  currentDisplayedRamen = firstRamen;
}

// Create a new ramen entry
function makeNewRamen(target) {
  return {
    name: target["new-name"].value,
    restaurant: target["new-restaurant"].value,
    image: target["new-image"].value,
    rating: target["new-rating"].value,
    comment: target["new-comment"].value,
  };
}

// Delete Current Ramen
deleteButton.addEventListener("click", (e) => {
  const currentMenu = ramenMenu.querySelectorAll("img");
  currentMenu.forEach((image) => {
    if (image.src.includes(currentDisplayedRamen.image)) {
      console.log(image);
    }
  });
});
