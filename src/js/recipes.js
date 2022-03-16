async function init() {
  const apiKey = "458fa3b63d9e4e0b8c6b85edb81edd4b";
  let requestRecipe = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;

  const inputRecipe = window.location.hash.substring(
    window.location.hash.indexOf("?") + 1,
    window.location.hash.length
  );

  requestRecipe += `&query=${inputRecipe}&sort=time`;

  const response = await fetch(requestRecipe);
  const recipes = await response.json();
  recipesArray = recipes;

  console.log(recipes.results);
  outputCards(recipes.results);
  //   console.log(recipeName);
}

//CREATE CARDS AND OUTPUT
function outputCards(recipes) {
  let resultArea = document.getElementById("resultTest");

  for (let i = 0; i < recipes.length; i++) {
    let cardLink = document.createElement("a");
    cardLink.href = `#oneRecipe?${recipes[i].id}`;
    cardLink.classList.add("card-link");

    let card = document.createElement("div");
    card.classList.add("card");

    let cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top");

    let cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");

    let cardTitleText = document.createTextNode(`${recipes[i].title}`);
    cardTitle.appendChild(cardTitleText);

    cardImage.src = `${recipes[i].image}`;

    card.appendChild(cardImage);
    card.appendChild(cardTitle);
    cardLink.appendChild(card);

    resultArea.appendChild(cardLink);
  }
}

init();
