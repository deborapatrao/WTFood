"use strict";

import { auth, onAuthStateChanged } from "../firebase.js";
import Swal from "sweetalert2";
// window.bootstrap = require("bootstrap/dist/js/bootstrap.bundle.js");
import { Modal } from "bootstrap";
export class Page {
  constructor(name, htmlName, jsName) {
    this.name = name;
    this.htmlName = htmlName;
    this.jsName = jsName ? jsName : htmlName.substring(htmlName.lastIndexOf("/") + 1, htmlName.lastIndexOf(".")) + ".js";
    // this.jsName = jsName
    //   ? jsName
    //   : "js" + htmlName.substring(htmlName.lastIndexOf("/"), htmlName.lastIndexOf(".")) + ".js";
  }
}

export class Router {
  static init(mainAreaId, pages) {
    Router.pages = pages;
    Router.rootElem = document.getElementById(mainAreaId);
    // Magic happens
    window.addEventListener("hashchange", function () {
      Router.handleHashChange();
    });
    Router.handleHashChange();
  }

  static handleHashChange() {
    // Magic
    const urlHash = window.location.hash;

    if (urlHash.length > 0) {
      // If there is a hash in URL
      for (let i = 0; i < Router.pages.length; i++) {
        // find which page matches the hash then navigate to it
        if (urlHash === Router.pages[i].name) {
          Router.goToPage(Router.pages[i]);
          break;
        }
      }
    } else {
      // If no hash in URL, load the first Page as the default page
      Router.goToPage(Router.pages[0]);
    }
  }

  static async goToPage(page) {
    try {
      // get the HTML pages content
      const response = await fetch(page.htmlName);
      const txt = await response.text();

      if (window.location.hash == "#profile")
        onAuthStateChanged(auth, async (user) => {
          const userCheck = user?.auth?.currentUser;
          if (userCheck) {
            Router.rootElem.innerHTML = txt;
            let init = await import(`../js/${page.jsName}`); // lazily loading the js files
            init.default();
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
              window.location.href = "#profile";
            });
          }
        });

      Router.rootElem.innerHTML = txt;

      if (window.location.hash !== "#profile") {
        let init = await import(`../js/${page.jsName}`); // lazily loading the js files
        init.default();
      }

      let initLogin = await import(`../js/login.js`); // lazily loading the js files
      initLogin.default();

      // if the page requires auth, load the header(auth-template) first and then hook the pages in the #mainArea
      // if (page.authRequired) {
      //   if (!document.getElementById('header')) {
      //     await Router.initAuthTemplatePage();
      //   }
      //   document.getElementById('mainArea').innerHTML = txt;
      //   Router.markActiveLink();
      // } else {
      //   Router.rootElem.innerHTML = txt;
      // }
      //testik

      // const cutName = page.jsName.substring(3);
    } catch (error) {
      console.error(error);
    }
  }

  // static async goToPage(page) {

  //   try {
  //     const response = await fetch(page.htmlName);
  //     const txt = await response.text();
  //     // const jsSRC = page.jsName;

  //     Router.rootElem.innerHTML = txt;
  //     // //append JS part to run.

  //     const script = document.createElement("script");
  //     script.setAttribute("src", `${page.jsName}?cachebuster=${new Date().getTime()}`);
  //     script.setAttribute("type", "text/javascript");
  //     script.setAttribute("id", 'myscript');

  //     Router.rootElem.appendChild(script);

  //     // const oldScript = document.getElementById('myscript');
  //     // if(oldScript) {
  //     //   const scriptNew = document.createElement('script');
  //     //   scriptNew.src= oldScript.src;
  //     //   Router.rootElem.appendChild(scriptNew);
  //     //   console.log('reloading done')
  //     // } else {
  //     //   const script = document.createElement("script");
  //     // script.setAttribute("src", `${page.jsName}?cachebuster=${new Date().getTime()}`);
  //     // script.setAttribute("type", "text/javascript");
  //     // script.setAttribute("id", 'myscript');

  //     // Router.rootElem.appendChild(script);
  //     // }

  //     // defer
  //     //append API JS part to run.
  //     // const scriptAPI = document.createElement("script");
  //     // scriptAPI.setAttribute("src", "js/api.js");
  //     // scriptAPI.setAttribute("type", "text/javascript");
  //     // Router.rootElem.appendChild(scriptAPI);

  //     //append API JS part to run.
  //     const scriptLogin = document.createElement("script");
  //     scriptLogin.setAttribute("src", "js/login.js");
  //     scriptLogin.setAttribute("type", "text/javascript");
  //     Router.rootElem.appendChild(scriptLogin);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
}
