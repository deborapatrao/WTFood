//Debora's API key - 458fa3b63d9e4e0b8c6b85edb81edd4b

// `https://api.spoonacular.com/recipes/complexSearch?apiKey=1da81bb3780f42a6a0ceb11f31a38886&query=pasta`

//DECLARATIONS
const apiKey = '458fa3b63d9e4e0b8c6b85edb81edd4b';
let requestIng = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}`;
let requestRecipe = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;

let inputIng1 = "";
let inputIng2 = "";
let inputIng3 = "";
let inputRecipe = "";

let recipesArray = [];

//FUNCTIONS
//Get recipes by ingredients
async function getRecipesI(url) {
    const response = await fetch(url);
    const recipes = await response.json();
    console.log(recipes);

    recipesArray = recipes;

    outputCards(recipesArray);
}

//get recipes by recipe
async function getRecipesR(url) {
    const response = await fetch(url);
    const recipes = await response.json();
    console.log(recipes.results);

    recipesArray = recipes.results;

    outputCards(recipesArray);
}

//CREATE CARDS AND OUTPUT
function outputCards(recipes) {
    let resultArea = document.getElementById('resultTest');

    for (let i = 0; i < recipes.length; i++) {

        let cardLink = document.createElement('a');
        cardLink.classList.add('card-link');

        let card = document.createElement('div');
        card.classList.add('card');

        let cardImage = document.createElement('img');
        cardImage.classList.add('card-img-top');

        let cardTitle = document.createElement('h3');
        cardTitle.classList.add('card-title');

        let cardTitleText = document.createTextNode(`${recipes[i].title}`);
        cardTitle.appendChild(cardTitleText);

        cardImage.src = `${recipes[i].image}`;

        card.appendChild(cardImage);
        card.appendChild(cardTitle);
        cardLink.appendChild(card);

        resultArea.appendChild(cardLink);
    }
}

async function init() {
    //INGREDIENTS SEARCH event listener
    ingSearch.addEventListener('click', () => {

        inputIng1 = ing1.value;
        inputIng2 = ing2.value;
        inputIng3 = ing3.value;

        requestIng += `&ingredients=${inputIng1},${inputIng2},${inputIng3}`;

        window.location.href = '#results'

        getRecipesI(requestIng);

    });

    //RECIPES SEARCH  event listener
    recipeSearch.addEventListener('click', () => {

        inputRecipe = recipeQuery.value;

        requestRecipe += `&query=${inputRecipe}`;

        window.location.href = '#results';

        getRecipesR(requestRecipe);

    });

}

init();