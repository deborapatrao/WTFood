"use strict";

import { auth, onAuthStateChanged } from "../firebase.js";
import Swal from "sweetalert2";

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
      const hashPage = window.location.hash;
      // Links active
      const navLinks = document.querySelectorAll(".nav__link");
      const activeLinks = document.querySelectorAll(`.nav__item a[href="${hashPage}"]`);

      navLinks.forEach((link) => {
        if (link.classList.contains("nav-active")) {
          link.classList.remove("nav-active");
        }
      });

      activeLinks.forEach((link) => {
        link.classList.add("nav-active");
      });

      // get the HTML pages content
      const response = await fetch(page.htmlName);
      const txt = await response.text();

      if (hashPage == "#profile")
        onAuthStateChanged(auth, async (user) => {
          const userCheck = user?.auth?.currentUser;
          if (userCheck) {
            Router.rootElem.innerHTML = txt;
            let init = await import(`../js/${page.jsName}`); // lazily loading the js files
            init.default();
          } else {
            Swal.fire({
              title: 'Warning',
              text: 'Please sign in to use your profile!',
              icon: 'warning',
              confirmButtonColor: '#fd8722',
              iconColor: '#ffbc3a',
              color: '#28231e',
              customClass: {
                htmlContainer: 'toast-body',
              },
            }).then((result) => {
              // const modalSign = document.getElementById('exampleModal');
              let myModal = new Modal(document.getElementById('exampleModal'), {});
              myModal.toggle();
              window.location.href = '#home';
            });
          }
        });

      Router.rootElem.innerHTML = txt;

      if (hashPage !== "#profile" && hashPage !== "#community" && hashPage !== "#contact") {
        let init = await import(`../js/${page.jsName}`); // lazily loading the js files
        init.default();
      }

      let initLogin = await import(`../js/login.js`); // lazily loading the js files
      initLogin.default();
    } catch (error) {
      console.error(error);
    }
  }
}
