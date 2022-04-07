"use strict";

import { Router, Page } from './routing';

//setting up the Router with pages
Router.init('mainArea', [
  new Page('#home', 'pages/home.html'), // 1st Page is default if no URL match
  new Page('#profile', 'pages/profile.html'),
  new Page('#oneRecipe', 'pages/oneRecipe.html'),
  new Page('#recipes', 'pages/recipes.html'),
  // add new pages here
]);
