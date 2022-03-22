async function init() {
  const recipeID = window.location.search.substring(4);

  console.log(recipeID);

  const apiKey = "458fa3b63d9e4e0b8c6b85edb81edd4b";
  const urlRecipeInfo = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${apiKey}`;
  const urlIngredients = `https://api.spoonacular.com/recipes/${recipeID}/nutritionWidget.json?apiKey=${apiKey}`;
  //   https://api.spoonacular.com/recipes/638086/nutritionWidget.json?apiKey=458fa3b63d9e4e0b8c6b85edb81edd4b
  const imageContainer = document.querySelector("#recipe-image-wrapper");
  const recipeTitle = document.querySelector("#recipe-title");
  const recipeSummary = document.querySelector("#about-recipe");
  const prepTime = document.querySelector("#prep-time");
  const cookTime = document.querySelector("#cooking-time");
  const serving = document.querySelector("#serving");
  const nutritionContainer = document.querySelector(".nutrition-wrapper");
  const ingredientsContainer = document.querySelector(".ingredients-wrapper");
  const instructionsContainer = document.querySelector(".instructions-wrapper");

  const responseRecipe = await fetch(urlRecipeInfo);
  const recipe = await responseRecipe.json();
  const responseIngredients = await fetch(urlIngredients);
  const ingredients = await responseIngredients.json();
  console.log(recipe);
  console.log(ingredients);

  // title
  recipeTitle.textContent = recipe.title;
  //   image
  const img = document.createElement("img");
  img.src = recipe.image;
  imageContainer.appendChild(img);
  //   summary
  recipeSummary.innerHTML = recipe.summary;
  //   prep time + cooking time + serving
  prepTime.innerHTML = `${recipe.readyInMinutes - recipe.readyInMinutes * 0.75} min`;
  cookTime.innerHTML = `${recipe.readyInMinutes} min`;
  serving.innerHTML = `${recipe.servings}`;
  //   Nutrition
  nutritionContainer.innerHTML = `
        <p>Calories: <span>${ingredients.calories}</span></p>
        <p>Carbs: <span>${ingredients.carbs}</span></p>
        <p>Fat: <span>${ingredients.fat}</span></p>
        <p>Protein: <span>${ingredients.protein}</span></p>
    `;
  // Ingredients
  //   ingredientsContainer.innerHTML = recipe.extendedIngredients;
  recipe.extendedIngredients.forEach((ing) => {
    const checkboxContainer = document.createElement("div");
    checkboxContainer.className = "form-check";

    const checkboxInput = document.createElement("input");
    checkboxInput.className = "form-check-input";
    checkboxInput.type = "checkbox";
    checkboxInput.id = ing.id;

    const checkboxLabel = document.createElement("label");
    checkboxLabel.className = "form-check-label";
    checkboxLabel.htmlFor = ing.id;

    checkboxLabel.textContent = ing.original;
    checkboxContainer.appendChild(checkboxInput);
    checkboxContainer.appendChild(checkboxLabel);
    ingredientsContainer.appendChild(checkboxContainer);
  });
  // Instructions
  recipe.analyzedInstructions[0].steps.forEach((step) => {
    const p = document.createElement("p");
    p.textContent = `${step.number}. ${step.step}`;
    instructionsContainer.appendChild(p);
  });
  //   instructionsContainer.innerHTML = recipe.instructions;
}

init();
