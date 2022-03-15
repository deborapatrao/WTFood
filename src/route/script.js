"use strict";

import { Router, Page } from "./routing";
// console.log(window.location.hash);

//setting up the Router with pages
Router.init("mainArea", [
  new Page("#home", "pages/home.html"), // 1st Page is default if no URL match
  new Page("#community", "pages/community.html"),
  new Page("#profile", "pages/profile.html"),
  new Page("#oneRecipe", "pages/oneRecipe.html"),
  new Page("#recipes", "pages/recipes.html"),
  // new Page("#login", "pages/login.html"),
  // add new pages here
]);
