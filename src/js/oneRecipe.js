import {auth, db, addDoc, collection, doc, getDoc, onAuthStateChanged} from "../firebase.js";

export default async function init() {


    if (window.location.search.includes("recipeid")) {
        onAuthStateChanged(auth, async (user) => {
            const recipeID = window.location.search.substring(10);
            const imageContainer = document.querySelector("#recipe-image-wrapper");
            const recipeName = document.querySelector("#recipe-title");
            const recipePrepTime = document.querySelector("#prep-time");
            const recipeCookTime = document.querySelector("#cooking-time");
            const recipeServing = document.querySelector("#serving");
            const recipeIngredients = document.querySelector(".ingredients-wrapper");
            const recipeInstruction = document.querySelector(".instructions-wrapper");

            console.log(`if: ${recipeID}`);
            if (user) {
                const UID = auth.currentUser.uid
                const docRef = doc(db, `users/${UID}/recipes`, recipeID);
                const recipe = await getDoc(docRef);
                const photo = recipe.data().photo;
                const name = recipe.data().name;
                const dietary = recipe.data().dietary_pref;
                const prep_time = recipe.data().prep_time;
                const serving = recipe.data().serving;
                const time = recipe.data().time;
                const type_recipe = recipe.data().type_recipe;
                const instructions = recipe.data().instructions;

                const img = document.createElement("img");
                const divInstruction = document.createElement("div");
                const ingredientList = document.createElement('ol');

                let list = 1;
                // for (let field in recipe.data()) {
                //
                //     console.log(field);
                //     if (ingredientN === field) {
                //
                //         list++;
                //         console.log(ingredient)
                //         console.log(ingredientN)
                //     }
                // }
                for (list; list < 20; list++){
                    let ingredientN = `ingredient_${list}`;
                    let ingredient = recipe.data()[ingredientN];
                    if (ingredient){
                        ingredientList.innerHTML += `<li>${ingredient}</li>`;
                    }
                }


                img.src = photo;

                recipeName.innerHTML = name;
                recipePrepTime.innerHTML = `${prep_time} Min`;
                recipeCookTime.innerHTML = `${time} Min`;
                recipeServing.innerHTML = `${serving} Serving`;
                recipeIngredients.appendChild(ingredientList);


                divInstruction.textContent = instructions;
                recipeInstruction.appendChild(divInstruction);
                imageContainer.appendChild(img);
            }

        });

    } else {
        const recipeID = window.location.search.substring(4);
        console.log(`else: ${recipeID}`);
        const apiKey = "da72a5b346e844e38a84019d6cd0cbf5";
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
        const addIngsBtnContainer = document.createElement("div");
        const addIngsBtn = document.createElement("button");
        addIngsBtn.textContent = "Add to Shopping List";
        addIngsBtn.classList.add("btn-orange");
        addIngsBtnContainer.appendChild(addIngsBtn);
        ingredientsContainer.appendChild(addIngsBtnContainer);

        addIngsBtn.addEventListener("click", () => {
            const labels = document.querySelectorAll(".form-check-label");
            labels.forEach(async (label) => {
                const input = document.getElementById(`${label.getAttribute("for")}`);
                if (input.checked) {
                    console.log(label.textContent);
                    const docData = {
                        ingredient: label.textContent,
                    };

                    const UID = auth.currentUser.uid;
                    try {
                        await addDoc(collection(db, `users/${UID}/shoppinglist`), docData);
                        alert(`ingredients added, ${auth?.currentUser ? auth?.currentUser?.displayName : "Bro"}!`);
                    } catch (error) {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode + errorMessage);
                    }
                }
            });
        });

        // Instructions
        recipe.analyzedInstructions[0].steps.forEach((step) => {
            const p = document.createElement("p");
            p.textContent = `${step.number}. ${step.step}`;
            instructionsContainer.appendChild(p);
        });
        //   instructionsContainer.innerHTML = recipe.instructions;


        //make links open on a new tab
        const recipeOutsideLinks = document.querySelectorAll('#about-recipe a');
        recipeOutsideLinks.forEach((link) => {
            link.setAttribute('target', '_blank');
        });

    }
}
