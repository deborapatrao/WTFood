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
import sw from "./sw.js";
import firebase from "./firebase.js";

//Hamburguer menu
const mainNav = document.getElementById("mainNav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelectorAll(".nav__link");
const body = document.body;

const showMenu = () => {
  navToggle.setAttribute("aria-expanded", true);
  mainNav.setAttribute("data-visible", true);
  mainNav.setAttribute("aria-hidden", false);
  body.classList.add("black-overlay");
};

const hideMenu = () => {
  navToggle.setAttribute("aria-expanded", false);
  mainNav.setAttribute("data-visible", false);
  mainNav.setAttribute("aria-hidden", true);
  
  body.classList.remove("black-overlay");
};

navToggle.addEventListener('click', event =>{
event.stopPropagation()
console.log(JSON.parse(navToggle.getAttribute('aria-expanded')));
JSON.parse(navToggle.getAttribute('aria-expanded'))? hideMenu() : showMenu();
});


const handleMenuClosure = event => !mainNav.contains(event.target) && hideMenu();


window.addEventListener('click', handleMenuClosure);
window.addEventListener('focusin', handleMenuClosure);




// on clicking the link
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", (e) => {
    // console.log("works");
    const body = document.body;
    body.classList.toggle("black-overlay");
    mainNav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);

    // location.assign(location.pathname)
    // hash from <a> tag
    const hash = navLink.textContent.toLowerCase();
    // console.log(hash);

    // Clear search query
    e.preventDefault();
    window.location.hash = hash;
  
    if(window.location.search) {

      window.location.search = "";
     
    }
    // window.location.search = "";
    // location.href = `#${hash}`;
    // console.log(`${window.location.origin}${hash}`)
  });
});

// navLinks[0].addEventListener("click", (e) => {
//   console.log("works");
//   const hash = navLinks[0].textContent.toLowerCase();

//   window.location.search = "";
//   location.href = `#${hash}`;
// });


// navToggle.addEventListener("click", () => {
//   const visibility = mainNav.getAttribute("data-visible");
//   const body = document.body;

//   body.classList.toggle("black-overlay");

//   if (visibility === "false") {
//     mainNav.setAttribute("data-visible", true);
//     navToggle.setAttribute("aria-expanded", true);
//   } else if (visibility === "true") {
//     mainNav.setAttribute("data-visible", false);
//     navToggle.setAttribute("aria-expanded", false);

//     document.body.addEventListener("keydown", (e) => {
//       if (e.key == "Escape") {
//         body.classList.remove("black-overlay");
//         mainNav.setAttribute("data-visible", false);
//         navToggle.setAttribute("aria-expanded", false);
//       }
//     });
//   }
// });