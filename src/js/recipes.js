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
    const cardLink = document.createElement("a");
    cardLink.href = `#oneRecipe?${recipes[i].id}`;
    cardLink.classList.add("card-link");
    cardLink.classList.add("recipe-card");

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

    resultArea.appendChild(cardLink);
  }
}

init();
