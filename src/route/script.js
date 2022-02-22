"use strict";

// console.log(window.location.hash);

//setting up the Router with pages
Router.init("mainArea", [
  new Page("#home", "src/view/home.html"),
  new Page("#community", "src/view/community.html"), // 1st Page is default if no URL match
  new Page("#profile", "src/view/profile.html"),
  // add new pages here
]);
