// import {auth, db, setDoc, collection, doc, onAuthStateChanged, getDoc} from "../firebase.js";
//
// export default async function init() {
//     onAuthStateChanged(auth, async (user) => {
//         const recipeID = window.location.search.substring(1);
//         const imageContainer = document.querySelector("#recipe-image-wrapper");
//         const recipeName = document.querySelector("#recipe-title");
//         const recipePrepTime = document.querySelector("#prep-time");
//         const recipeCookTime = document.querySelector("#cooking-time");
//         const recipeServing = document.querySelector("#serving");
//         const recipeIngredients = document.querySelector(".ingredients-wrapper");
//         const recipeInstruction = document.querySelector(".instructions-wrapper");
//
//
//         if (user) {
//             const UID = user.uid
//             const docRef = doc(db, `users/${UID}/recipes`, recipeID);
//             const recipe = await getDoc(docRef);
//             const photo = recipe.data().photo;
//             const name = recipe.data().name;
//             const dietary = recipe.data().dietary_pref;
//             const prep_time = recipe.data().prep_time;
//             const serving = recipe.data().serving;
//             const time = recipe.data().time;
//             const type_recipe = recipe.data().type_recipe;
//             const instructions = recipe.data().instructions;
//             const ingredient_1 = recipe.data().ingredient_1;
//             const ingredient_2 = recipe.data().ingredient_2;
//             const ingredient_3 = recipe.data().ingredient_3;
//             const ingredient_4 = recipe.data().ingredient_4;
//             const ingredient_5 = recipe.data().ingredient_5;
//
//             console.log(recipe.data().ingredient_2);
//
//             const img = document.createElement("img");
//             const divInstruction = document.createElement("div");
//             const ingredientList = document.createElement('ol');
//
//             img.src = photo;
//
//             recipeName.innerHTML = name;
//             recipePrepTime.innerHTML = `${prep_time} Min`;
//             recipeCookTime.innerHTML = `${time} Min`;
//             recipeServing.innerHTML = `${serving} Serving`;
//             recipeIngredients.appendChild(ingredientList);
//             ingredientList.innerHTML = `<li>${ingredient_1}</li>
// <li>${ingredient_2}</li><li>${ingredient_3}</li><li>${ingredient_4}</li><li>${ingredient_5}</li>`
//
//
//
//
//             divInstruction.textContent = instructions;
//             recipeInstruction.appendChild(divInstruction);
//             imageContainer.appendChild(img);
//
//         }
//
//     });
// }
//
//
