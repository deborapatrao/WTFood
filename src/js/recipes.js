// Get recipes function
async function getRecipes(url) {
  console.log(url);
  if (url.includes("query")) {
    console.log("recipe name");
    const responseRecipe = await fetch(url);
    const recipesRecipe = await responseRecipe.json();

    console.log(recipesRecipe);
    outputCards(recipesRecipe.results);
  } else if (url.includes("ingredients")) {
    console.log("ingredients");
    const responseIngredients = await fetch(url);
    const recipesIngredients = await responseIngredients.json();

    console.log(recipesIngredients);
    outputCards(recipesIngredients);
  } else {
    console.log("default");
    const responseDefaultRecipes = await fetch(url);
    const defaultRecipes = await responseDefaultRecipes.json();

    console.log(defaultRecipes);
    outputCards(defaultRecipes.results);
  }
}

export default async function init() {
  console.log("recipes works");
  const apiKey = "458fa3b63d9e4e0b8c6b85edb81edd4b";
  let requestRecipe = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;
  let requestIng = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}`;
  const filterBtn = document.querySelectorAll(".filterBtn");
  let offset = 0;
  console.log(filterBtn);

  if (window.location.search.includes("query")) {
    const inputRecipe = window.location.search.substring(1);

    requestRecipe += `&${inputRecipe}`;

    // Search by recipe
    await getRecipes(requestRecipe + `&offset=${offset}`);
    filterBtn.forEach((btn) => {
      btn.addEventListener("click", async () => await applyFilters(requestRecipe + `&offset=${offset}`));
    });
  } else if (window.location.search.includes("ing1")) {
    const inputIngredients = window.location.search.substring(1).split("&");

    inputIngredients.forEach((ing, index) => {
      const ingredient = ing.substring(ing.indexOf("=") + 1);

      if (index === 0) {
        requestRecipe += `&includeIngredients=${ingredient}`;
      } else {
        requestRecipe += `,${ingredient}`;
      }
    });

    await getRecipes(requestRecipe);
    filterBtn.forEach((btn) => {
      btn.addEventListener("click", async () => await applyFilters(requestRecipe));
    });
  } else {
    await getRecipes(requestRecipe);
    filterBtn.forEach((btn) => {
      btn.addEventListener("click", async () => await applyFilters(requestRecipe));
    });
  }

  // FILTERS section ================================================ //
  filtersShow();
}

//CREATE CARDS AND OUTPUT
function outputCards(recipes) {
  let resultArea = document.getElementById("resultTest");

  for (let i = 0; i < recipes.length; i++) {
    let cardLink = document.createElement("a");

    cardLink.href = `?id=${recipes[i].id}#oneRecipe`;

    cardLink.classList.add("card-link");
    cardLink.classList.add("recipe-card");

    const card = document.createElement("div");
    card.classList.add("card");

    const cardImgContainer = document.createElement("div");
    cardImgContainer.classList.add("recipe-card__img");

    const cardButton = document.createElement("button");
    renderHeartIcon(cardButton);

    const cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardStars = document.createElement("div");
    cardStars.classList.add("rating-stars");

    const cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");

    const cardTitleText = document.createTextNode(`${recipes[i].title}`);
    cardTitle.appendChild(cardTitleText);

    cardImage.src = `${recipes[i].image}`;

    cardImgContainer.appendChild(cardButton);
    cardImgContainer.appendChild(cardImage);
    cardBody.appendChild(cardStars);
    cardBody.appendChild(cardTitle);

    card.appendChild(cardImgContainer);
    card.appendChild(cardBody);
    cardLink.appendChild(card);

    resultArea.appendChild(cardLink);
  }
}

// Create heart svg for cards
function renderHeartIcon(node) {
  const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");

  iconSvg.setAttribute("viewBox", "0 0 22 20.13");

  iconPath.setAttribute(
    "d",
    "M19.41,2.61c-1.02-1.02-2.41-1.6-3.85-1.6s-2.83,.57-3.85,1.6c-.26,.26-.49,.54-.69,.84-.42-.64-.97-1.18-1.61-1.59-.64-.41-1.36-.68-2.12-.8-.75-.12-1.53-.07-2.26,.13s-1.42,.56-2.01,1.04c-.59,.48-1.07,1.09-1.42,1.77-.34,.68-.54,1.43-.58,2.19-.04,.76,.09,1.52,.36,2.24,.28,.71,.7,1.36,1.24,1.9l8.4,8.4,8.4-8.4c1.02-1.02,1.6-2.41,1.6-3.85s-.57-2.83-1.6-3.85h0Z"
  );
  iconPath.classList.add("heart");

  iconSvg.appendChild(iconPath);

  return node.appendChild(iconSvg);
}

function filtersShow() {
  // Filters arrays:
  const cuisines = ["American", "Chinese", "European", "Italian", "Japanese", "Korean", "Mexican", "Mediterranean", "Vietnamese"];
  const diets = ["Gluten Free", "Vegetarian", "Vegan", "Keto", "Pescatarian"];
  const types = ["main course", "dessert", "appetizer", "breakfast", "drink", "soup"];

  // Cuisine
  const accordionCuisine = document.querySelectorAll(".accordion-cuisine");
  cuisines.forEach((country, i) => {
    accordionCuisine.forEach((accordion) => {
      accordion.innerHTML += `
      <div class="form-check">
        <input class="form-check-input" type="checkbox"  id="filter${i}" data-cuisine="${country}" />
        <label class="form-check-label" for="filter${i}">${country}</label>
      </div>
      `;
    });
  });

  // Diet
  const accordionDiet = document.querySelectorAll(".accordion-diet");
  diets.forEach((diet, i) => {
    accordionDiet.forEach((accordion) => {
      accordion.innerHTML += `
      <div class="form-check">
        <input class="form-check-input" type="checkbox"  id="filter${i}" data-diet="${diet}" />
        <label class="form-check-label" for="filter${i}">${diet}</label>
      </div>
      `;
    });
  });

  // Type
  const accordionType = document.querySelectorAll(".accordion-type");
  types.forEach((type, i) => {
    accordionType.forEach((accordion) => {
      accordion.innerHTML += `
      <div class="form-check">
        <input class="form-check-input" type="checkbox"  id="filter${i}" data-type="${type}" />
        <label class="form-check-label" for="filter${i}">${type}</label>
      </div>
      `;
    });
  });
}

async function applyFilters(baseURL) {
  const resultArea = document.getElementById("resultTest");

  const inputsCuisine = document.querySelectorAll(".accordion-cuisine .form-check-input");
  let cuisineQuery = "&cuisine=";
  inputsCuisine.forEach((input) => {
    if (input.checked) {
      cuisineQuery += `${input.dataset.cuisine.toLowerCase()},`;
    }
  });

  const inputsDiet = document.querySelectorAll(".accordion-diet .form-check-input");
  let dietQuery = "&diet=";
  inputsDiet.forEach((input) => {
    if (input.checked) {
      dietQuery += `${input.dataset.diet.toLowerCase()},`;
    }
  });

  const inputsType = document.querySelectorAll(".accordion-type .form-check-input");
  let typeQuery = "&type=";
  inputsType.forEach((input) => {
    if (input.checked) {
      typeQuery += `${input.dataset.type.toLowerCase()},`;
    }
  });

  const cq = cuisineQuery.substring(cuisineQuery.indexOf("=") + 1) ? cuisineQuery : "";
  const dq = dietQuery.substring(dietQuery.indexOf("=") + 1) ? dietQuery : "";
  const tq = typeQuery.substring(typeQuery.indexOf("=") + 1) ? typeQuery : "";

  const url = baseURL + cq + dq + tq;
  console.log(url);
  // const responseDefaultRecipes = await fetch(url);
  // const defaultRecipes = await responseDefaultRecipes.json();

  // console.log(defaultRecipes);
  resultArea.innerHTML = "";
  // outputCards(defaultRecipes);
  await getRecipes(url);
}
