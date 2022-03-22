//Debora's API key - 458fa3b63d9e4e0b8c6b85edb81edd4b

// `https://api.spoonacular.com/recipes/complexSearch?apiKey=1da81bb3780f42a6a0ceb11f31a38886&query=pasta`

<<<<<<< HEAD
//Get recipes by ingredients
// async function getRecipesI(url) {
//   const response = await fetch(url);
//   const recipes = await response.json();
//   // console.log(recipes);

//   recipesArray = recipes;

//   outputCards(recipesArray);
// }

//get recipes by recipe
async function getRecipesR(url) {
  const response = await fetch(url);
  const recipes = await response.json();
  // console.log(recipes.results);

  recipesArray = recipes.results;

  outputCards(recipesArray);
}

//CREATE CARDS AND OUTPUT
function outputCards(recipes) {
  let resultArea = document.getElementById("resultTest");

  for (let i = 0; i < recipes.length; i++) {
    const cardLink = document.createElement("a");
    cardLink.href = `#oneRecipe?${recipes[i].id}`;
    cardLink.classList.add("card-link");

    const card = document.createElement("div");
    card.classList.add("card");

    const cardImgContainer = document.createElement("div");
    cardImgContainer.classList.add("recipe-card__img");

    const cardButton = document.createElement("button");

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

        recipesCards.appendChild(cardLink);
  }
}

function init() {
  //DECLARATIONS
  let apiKey = "458fa3b63d9e4e0b8c6b85edb81edd4b";
  let requestIng = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}`;
  let requestRecipe = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;

  let inputIng1 = "";
  let inputIng2 = "";
  let inputIng3 = "";
  let inputRecipe = "";

  let recipesArray = [];

  let searchBtnIng = document.querySelector("#ingSearch");
  let searchBtnRecipe = document.querySelector("#recipeSearch");

  // Check first whether searchBtnIng element exists on the given page or not
  if (searchBtnIng) {
    //INGREDIENTS SEARCH event listener
    searchBtnIng.addEventListener("click", async () => {
      inputIng1 = ing1.value;
      inputIng2 = ing2.value;
      inputIng3 = ing3.value;

      requestIng += `&ingredients=${inputIng1},${inputIng2},${inputIng3}`;

      window.location.href = "#recipes";

      await getRecipesI(requestIng);
    });
  }

  // Check first whether searchBtnRecipe element exists on the given page or not
  if (searchBtnRecipe) {
    //RECIPES SEARCH  event listener

    searchBtnRecipe.addEventListener("click", async () => {
      inputRecipe = recipeQuery.value;

      // requestRecipe += `&query=${inputRecipe}`;

      window.location.href = `#recipes?${inputRecipe}`;

      // await getRecipesR(requestRecipe);
    });
  }
}

init();
=======
(function tryBro() {console.log('API')})();
>>>>>>> 80f1c3bb19a588ca1c6c0ba14e890185c9135a75
