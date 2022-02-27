"use strict";

class Page {
  constructor(name, htmlName, jsName) {
    this.name = name;
    this.htmlName = htmlName;
    this.jsName = jsName ? jsName : htmlName.substring(0, htmlName.lastIndexOf(".")) + ".js";
  }
}

class Router {
  static init(mainAreaId, pages) {
    Router.pages = pages;
    Router.rootElem = document.getElementById(mainAreaId);
    // Magic happens
    window.addEventListener("hashchange", () => {
      Router.handleHashChange();
    });
    Router.handleHashChange();
  }

  static handleHashChange() {
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
      const response = await fetch(page.htmlName);
      const txt = await response.text();
      const jsSRC = page.jsName;
 

      Router.rootElem.innerHTML = txt;
      //append JS part to run.
      const script = document.createElement("script");
      script.setAttribute("src", jsSRC.replace('view','assets/js'));
      script.setAttribute("type", "module");
      Router.rootElem.appendChild(script);
  
      //append API JS part to run.
      const scriptAPI = document.createElement("script");
      scriptAPI.setAttribute("src", "src/assets/js/api.js");
      scriptAPI.setAttribute("type", "text/javascript");
      Router.rootElem.appendChild(scriptAPI);
      
    } catch (error) {
      console.error(error);
    }
  }
}
