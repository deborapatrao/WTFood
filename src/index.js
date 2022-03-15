// CSS
import "bootstrap";
import "./styles/index.scss";

// HTML
import homeHTML from "./pages/home.html";
import communityHTML from "./pages/community.html";
import loginHTML from "./pages/login.html";
import recipesHTML from "./pages/recipes.html";
import profileInfoHTML from "./pages/profile_info.html";
import profileRecipeHTML from "./pages/profile_recipe.html";
import profileHTML from "./pages/profile.html";
import oneRecipeHTML from "./pages/oneRecipe.html";

// JS
// import router from "./route/routing.js";
// import firebase from "firebase";
// import { db } from "./database";
import script from "./route/script.js";
// import api from "./js/api";
// import home from "./js/home";
// import login from "./js/login";
// import profile from "./js/profile";

// Images
import imgLogo from "./images/logo.png";
import imgFaviconSmall from "./images/icon-192x192.png";
import imgFaviconBig from "./images/icon-512x512.png";
import imgLogoWhite from "./images/logo_white.svg";


// PWA
import manifest from "./app.webmanifest";
import api from "./sw.js";

//Hamburguer menu
const mainNav = document.getElementById("mainNav");
const navToggle = document.querySelector(".navigation__toggle");

navToggle.addEventListener("click", () => {
  const visibility = mainNav.getAttribute("data-visible");
  const body = document.body;

  body.classList.toggle('black-overlay');
  
  if (visibility === "false") {
    mainNav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else if (visibility === "true") {
    mainNav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});

document.body.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    mainNav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});




