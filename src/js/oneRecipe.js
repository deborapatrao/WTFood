import { auth, db, addDoc, collection, doc, getDoc, onAuthStateChanged } from "../firebase.js";

import Swal from "sweetalert2";

import { Modal } from "bootstrap";

export default async function init() {
  if (window.location.search.includes("recipeid")) {
      const user = auth?.currentUser;
      const recipeID = window.location.search.substring(10);
      const imageContainer = document.querySelector("#recipe-image-wrapper");
      const recipeName = document.querySelector("#recipe-title");
      const recipePrepTime = document.querySelector("#prep-time");
      const recipeCookTime = document.querySelector("#cooking-time");
      const recipeServing = document.querySelector("#serving");
      const recipeInstruction = document.querySelector(".instructions-wrapper");

      if (user) {
        const UID = user.uid;
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
        const ingredient1 = recipe.data().ingredient;
        const img = document.createElement("img");
        const divInstruction = document.createElement("div");
        const ingredientsContainer = document.querySelector(".ingredients-wrapper");
        const selectAllBtn = document.createElement("button");
        selectAllBtn.textContent = "Select all";
        selectAllBtn.classList.add("btn-noborder");
        ingredientsContainer.appendChild(selectAllBtn);
        const checkboxContainer = document.createElement("div");
        const checkboxContainer1 = document.createElement("div");
        checkboxContainer1.className = "form-check";
        checkboxContainer.className = "form-check";

        const checkboxInput = document.createElement("input");
        const checkboxInput1 = document.createElement("input");
        checkboxInput1.className = "form-check-input";
        checkboxInput.className = "form-check-input";
        checkboxInput1.type = "checkbox";
        checkboxInput.type = "checkbox";

        const checkboxLabel = document.createElement("label");
        const checkboxLabel1 = document.createElement("label");
        checkboxLabel.className = "form-check-label";
        checkboxLabel1.className = "form-check-label";

        checkboxInput1.id = `ingredient_0`;
        checkboxLabel1.htmlFor = "ingredient_0";
        checkboxLabel1.innerHTML = ingredient1;
        checkboxContainer1.appendChild(checkboxInput1);
        checkboxContainer1.appendChild(checkboxLabel1);
        ingredientsContainer.appendChild(checkboxContainer1);

        let list = 1;
        for (list; list < 30; list++) {
          let ingredientN = `ingredient_${list}`;
          let ingredient = recipe.data()[ingredientN];
          if (ingredient) {
            checkboxInput.id = ingredientN;
            checkboxLabel.htmlFor = ingredientN;
            checkboxLabel.innerHTML = ingredient;

            checkboxContainer.appendChild(checkboxInput);
            checkboxContainer.appendChild(checkboxLabel);
            ingredientsContainer.appendChild(checkboxContainer);
          }
        }
        //---------------
        const addIngsBtnContainer = document.createElement("div");
        addIngsBtnContainer.classList.add("ingredients-btn-container");
        const addIngsBtn = document.createElement("button");
        const clearIngsBtn = document.createElement("button");
        addIngsBtn.textContent = "Add to Shopping List";
        addIngsBtn.classList.add("btn-orange");
        clearIngsBtn.textContent = "clear";
        clearIngsBtn.classList.add("btn-white");
        addIngsBtnContainer.appendChild(addIngsBtn);
        addIngsBtnContainer.appendChild(clearIngsBtn);
        ingredientsContainer.appendChild(addIngsBtnContainer);

        addIngsBtn.addEventListener("click", () => {
          const labels = document.querySelectorAll(".form-check-label");
          labels.forEach(async (label) => {
            const input = document.getElementById(`${label.getAttribute("for")}`);
            if (input.checked) {
              const docData = {
                ingredient: label.textContent,
              };

              const UID = auth.currentUser.uid;
              try {
                await addDoc(collection(db, `users/${UID}/shoppinglist`), docData);
                // alert(`ingredients added, ${auth?.currentUser ? auth?.currentUser?.displayName : "Bro"}!`);
              } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage);
              }
            }
          });
          Swal.fire({
            title: "Ingredients have been added",
            text: "Check your account to see recently added ingredients. ",
            iconHtml:
              '<svg width="41" height="50" viewBox="0 0 41 50" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1 7.66663H35.6667" stroke="#FFBC3A" stroke-width="2" stroke-miterlimit="10"/> <path d="M1 41H0V42H1V41ZM1 7.66667L0.292893 6.95956L0 7.25245V7.66667H1ZM7.66667 1V0H7.25245L6.95956 0.292893L7.66667 1ZM29 1L29.7071 0.292893L29.4142 0H29V1ZM35.6667 7.66667H36.6667V7.25245L36.3738 6.95956L35.6667 7.66667ZM20.3333 42C20.8856 42 21.3333 41.5523 21.3333 41C21.3333 40.4477 20.8856 40 20.3333 40V42ZM34.6667 30.3333C34.6667 30.8856 35.1144 31.3333 35.6667 31.3333C36.219 31.3333 36.6667 30.8856 36.6667 30.3333H34.6667ZM2 41V7.66667H0V41H2ZM1.70711 8.37378L8.37377 1.70711L6.95956 0.292893L0.292893 6.95956L1.70711 8.37378ZM7.66667 2H29V0H7.66667V2ZM28.2929 1.70711L34.9596 8.37378L36.3738 6.95956L29.7071 0.292893L28.2929 1.70711ZM20.3333 40H1V42H20.3333V40ZM34.6667 7.66667V30.3333H36.6667V7.66667H34.6667Z" fill="#FFBC3A"/> <path d="M28.6667 15.6667C28.6667 15.1145 28.219 14.6667 27.6667 14.6667C27.1144 14.6667 26.6667 15.1145 26.6667 15.6667H28.6667ZM10 15.6667C10 15.1145 9.55228 14.6667 9 14.6667C8.44772 14.6667 8 15.1145 8 15.6667H10ZM26.6667 15.6667C26.6667 20.2478 22.9144 24.0001 18.3333 24.0001V26.0001C24.019 26.0001 28.6667 21.3524 28.6667 15.6667H26.6667ZM18.3333 24.0001C13.7523 24.0001 10 20.2478 10 15.6667H8C8 21.3524 12.6477 26.0001 18.3333 26.0001V24.0001Z" fill="#FFBC3A"/> <path d="M31.667 49C36.0853 49 39.667 45.4183 39.667 41C39.667 36.5817 36.0853 33 31.667 33C27.2487 33 23.667 36.5817 23.667 41C23.667 45.4183 27.2487 49 31.667 49Z" stroke="#FFBC3A" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"/> <path d="M28.334 41.0002L29.3041 42.0585C30.0968 42.9232 31.4601 42.9232 32.2527 42.0585L35.6673 38.3335" stroke="#FFBC3A" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/> </svg>',
            confirmButtonColor: "#fd8722",
            iconColor: "#ffbc3a",
            color: "#28231e",
            showDenyButton: true,
            denyButtonText: `Shopping List`,
            denyButtonColor: "#ffbc3a",

            customClass: {
              htmlContainer: "toast-body",
              icon: "swal-noborder",
            },
          }).then((result) => {
            const labels = document.querySelectorAll(".form-check-label");
            labels.forEach(async (label) => {
              const input = document.getElementById(`${label.getAttribute("for")}`);
              if (input.checked) {
                input.checked = false;
              }
              if (result.isDenied) {
                sessionStorage.setItem("shoppingList", "true");
                location.hash = "profile";
              }
            });
          });
        });

        //Select all ingredients
        selectAllBtn.addEventListener("click", () => {
          const ingCheckbox = document.querySelectorAll(".form-check-input");

          ingCheckbox.forEach((ingredient) => {
            ingredient.checked = true;
          });
        });

        //Clear all ingredients
        clearIngsBtn.addEventListener("click", () => {
          const ingCheckbox = document.querySelectorAll(".form-check-input");

          ingCheckbox.forEach((ingredient) => {
            ingredient.checked = false;
          });
        });

        //------------
        img.src = photo;

        recipeName.innerHTML = name;
        recipePrepTime.innerHTML = `${prep_time} Min`;
        recipeCookTime.innerHTML = `${time} Min`;
        recipeServing.innerHTML = `${serving} Serving`;
        // recipeIngredients.appendChild(ingredientList);

        divInstruction.textContent = instructions;
        recipeInstruction.appendChild(divInstruction);
        imageContainer.appendChild(img);

        document.getElementById("nutrition").style.display = "none";
      }

  } else {
    const recipeID = window.location.search.substring(4);
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
    const selectAllBtn = document.createElement("button");
    selectAllBtn.textContent = "Select all";
    selectAllBtn.classList.add("btn-noborder");
    ingredientsContainer.appendChild(selectAllBtn);

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
    addIngsBtnContainer.classList.add("ingredients-btn-container");
    const addIngsBtn = document.createElement("button");
    const clearIngsBtn = document.createElement("button");
    addIngsBtn.textContent = "Add to Shopping List";
    addIngsBtn.classList.add("btn-orange");
    clearIngsBtn.textContent = "clear";
    clearIngsBtn.classList.add("btn-white");
    addIngsBtnContainer.appendChild(addIngsBtn);
    addIngsBtnContainer.appendChild(clearIngsBtn);
    ingredientsContainer.appendChild(addIngsBtnContainer);

    addIngsBtn.addEventListener("click", () => {
      const labels = document.querySelectorAll(".form-check-label");
      labels.forEach(async (label) => {
        const input = document.getElementById(`${label.getAttribute("for")}`);
        if (input.checked) {
          const docData = {
            ingredient: label.textContent,
          };
          onAuthStateChanged(auth, async (user) => {
            if (user) {
              const UID = auth.currentUser.uid;
              try {
                await addDoc(collection(db, `users/${UID}/shoppinglist`), docData).then(() => {
                  Swal.fire({
                    title: "Ingredients have been added",
                    text: "Check your account to see recently added ingredients. ",
                    iconHtml:
                      '<svg width="41" height="50" viewBox="0 0 41 50" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1 7.66663H35.6667" stroke="#FFBC3A" stroke-width="2" stroke-miterlimit="10"/> <path d="M1 41H0V42H1V41ZM1 7.66667L0.292893 6.95956L0 7.25245V7.66667H1ZM7.66667 1V0H7.25245L6.95956 0.292893L7.66667 1ZM29 1L29.7071 0.292893L29.4142 0H29V1ZM35.6667 7.66667H36.6667V7.25245L36.3738 6.95956L35.6667 7.66667ZM20.3333 42C20.8856 42 21.3333 41.5523 21.3333 41C21.3333 40.4477 20.8856 40 20.3333 40V42ZM34.6667 30.3333C34.6667 30.8856 35.1144 31.3333 35.6667 31.3333C36.219 31.3333 36.6667 30.8856 36.6667 30.3333H34.6667ZM2 41V7.66667H0V41H2ZM1.70711 8.37378L8.37377 1.70711L6.95956 0.292893L0.292893 6.95956L1.70711 8.37378ZM7.66667 2H29V0H7.66667V2ZM28.2929 1.70711L34.9596 8.37378L36.3738 6.95956L29.7071 0.292893L28.2929 1.70711ZM20.3333 40H1V42H20.3333V40ZM34.6667 7.66667V30.3333H36.6667V7.66667H34.6667Z" fill="#FFBC3A"/> <path d="M28.6667 15.6667C28.6667 15.1145 28.219 14.6667 27.6667 14.6667C27.1144 14.6667 26.6667 15.1145 26.6667 15.6667H28.6667ZM10 15.6667C10 15.1145 9.55228 14.6667 9 14.6667C8.44772 14.6667 8 15.1145 8 15.6667H10ZM26.6667 15.6667C26.6667 20.2478 22.9144 24.0001 18.3333 24.0001V26.0001C24.019 26.0001 28.6667 21.3524 28.6667 15.6667H26.6667ZM18.3333 24.0001C13.7523 24.0001 10 20.2478 10 15.6667H8C8 21.3524 12.6477 26.0001 18.3333 26.0001V24.0001Z" fill="#FFBC3A"/> <path d="M31.667 49C36.0853 49 39.667 45.4183 39.667 41C39.667 36.5817 36.0853 33 31.667 33C27.2487 33 23.667 36.5817 23.667 41C23.667 45.4183 27.2487 49 31.667 49Z" stroke="#FFBC3A" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"/> <path d="M28.334 41.0002L29.3041 42.0585C30.0968 42.9232 31.4601 42.9232 32.2527 42.0585L35.6673 38.3335" stroke="#FFBC3A" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/> </svg>',
                    confirmButtonColor: "#fd8722",
                    iconColor: "#ffbc3a",
                    color: "#28231e",
                    showDenyButton: true,
                    denyButtonColor: "#ffbc3a",
                    denyButtonText: `Shopping List`,
                    customClass: {
                      htmlContainer: "toast-body",
                      icon: "swal-noborder",
                    },
                  }).then((result) => {
                    const labels = document.querySelectorAll(".form-check-label");
                    labels.forEach(async (label) => {
                      const input = document.getElementById(`${label.getAttribute("for")}`);
                      if (input.checked) {
                        input.checked = false;
                      }
                      if (result.isDenied) {
                        sessionStorage.setItem("shoppingList", "true");

                        location.hash = "profile";
                      }
                    });
                    document.querySelector('.btn-close').click()
                  });
                });
                // alert(`ingredients added, ${auth?.currentUser ? auth?.currentUser?.displayName : "Bro"}!`);
              } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage);
              }
            } else {
              Swal.fire({
                title: "Warning",
                text: "Please sing in to use your profile!",
                icon: "warning",
                confirmButtonColor: "#fd8722",
                iconColor: "#ffbc3a",
                color: "#28231e",
                customClass: {
                  htmlContainer: "toast-body",
                },
              }).then((result) => {
                // const modalSign = document.getElementById('exampleModal');
                let myModal = new Modal(document.getElementById("exampleModal"), {});
                myModal.toggle();
                // window.location.href = "#home";
              });
            }
          });
        }
      });
    });

    //Select all ingredients
    selectAllBtn.addEventListener("click", () => {
      const ingCheckbox = document.querySelectorAll(".form-check-input");

      ingCheckbox.forEach((ingredient) => {
        ingredient.checked = true;
      });
    });

    //Clear all ingredients
    clearIngsBtn.addEventListener("click", () => {
      const ingCheckbox = document.querySelectorAll(".form-check-input");

      ingCheckbox.forEach((ingredient) => {
        ingredient.checked = false;
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
    const recipeOutsideLinks = document.querySelectorAll("#about-recipe a");
    recipeOutsideLinks.forEach((link) => {
      link.setAttribute("target", "_blank");
    });
  }
}
