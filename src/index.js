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
import userRecipeHTML from "./pages/userRecipe.html";

// JS
// import 'sweetalert2';
// import router from "./route/routing.js";
// import firebase from "firebase";
// import { db } from "./database";
import script from "./route/script.js";
import { auth, onAuthStateChanged } from "./firebase.js";

// import api from "./js/api";
// import home from "./js/home";
// import login from "./js/login";
// import profile from "./js/profile";

// Images
import imgLogo from "./images/logo.png";
import imgFaviconSmall from "./images/icon-192x192.png";
import imgFaviconBig from "./images/icon-512x512.png";
import imgLogoWhite from "./images/logo_white.svg";
// import donuts from "./images/placeholder-donuts.png";

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

navToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  console.log(JSON.parse(navToggle.getAttribute("aria-expanded")));
  JSON.parse(navToggle.getAttribute("aria-expanded")) ? hideMenu() : showMenu();
});

const handleMenuClosure = (event) => !mainNav.contains(event.target) && hideMenu();

window.addEventListener("click", handleMenuClosure);
window.addEventListener("focusin", handleMenuClosure);

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

    if (window.location.search) {
      window.location.search = "";
    }
    // window.location.search = "";
    // location.href = `#${hash}`;
    // console.log(`${window.location.origin}${hash}`)
  });
});

const loginNav = document.getElementById("login-nav");

onAuthStateChanged(auth, (user) => {
  if (user) {
    // alert('SIGNED in')
    const cardImage = document.createElement("img");
    cardImage.classList.add("login-avatar");
    cardImage.src = `${
      user.photoURL
        ? user.photoURL
        : "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
    }`;
    loginNav.textContent = "";
    loginNav.appendChild(cardImage);
    // loginNav.removeAttribute("data-bs-toggle");
    // loginNav.removeAttribute("data-bs-target");
    // loginNav.setAttribute("href", "#profile");
    // loginNav.innerHTML = "YOU ARE SIGNED IN";

    // const uid = user.uid;
    // ...
  } else {
    loginNav.innerHTML = "login";
    // loginNav.setAttribute("data-bs-toggle", "modal");
    // loginNav.setAttribute("data-bs-target", "#exampleModal");
    // loginNav.removeAttribute("href");
    // if (window.location.hash == "profile") {
    //   alert("user is NOT signed in");
    //   window.location.href = "#home";
    // }
  }
});
