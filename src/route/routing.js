"use strict";

export class Page {
  constructor(name, htmlName, jsName) {
    this.name = name;
    this.htmlName = htmlName;
    this.jsName = jsName
      ? jsName
      : "js" + htmlName.substring(htmlName.lastIndexOf("/"), htmlName.lastIndexOf(".")) + ".js";
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
    // const urlHash = window.location.hash.substring(
    //   0,
    //   window.location.hash.indexOf("?") !== -1
    //     ? window.location.hash.indexOf("?")
    //     : window.location.hash.length
    // );

    console.log(urlHash);
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
      // const jsSRC = page.jsName;

      Router.rootElem.innerHTML = txt;
      // //append JS part to run.
      
      const script = document.createElement("script");
      script.setAttribute("src", `${page.jsName}?cachebuster=${new Date().getTime()}`);
      script.setAttribute("type", "text/javascript");
      script.setAttribute("id", 'myscript');

      Router.rootElem.appendChild(script);

      // const oldScript = document.getElementById('myscript');
      // if(oldScript) {
      //   const scriptNew = document.createElement('script');
      //   scriptNew.src= oldScript.src;
      //   Router.rootElem.appendChild(scriptNew);
      //   console.log('reloading done')
      // } else {
      //   const script = document.createElement("script");
      // script.setAttribute("src", `${page.jsName}?cachebuster=${new Date().getTime()}`);
      // script.setAttribute("type", "text/javascript");
      // script.setAttribute("id", 'myscript');

      // Router.rootElem.appendChild(script);
      // }
      
      
      // defer
      //append API JS part to run.
      // const scriptAPI = document.createElement("script");
      // scriptAPI.setAttribute("src", "js/api.js");
      // scriptAPI.setAttribute("type", "text/javascript");
      // Router.rootElem.appendChild(scriptAPI);

      //append API JS part to run.
      // const scriptLogin = document.createElement("script");
      // scriptLogin.setAttribute("src", "js/login.js");
      // scriptLogin.setAttribute("type", "text/javascript");
      // Router.rootElem.appendChild(scriptLogin);
    } catch (error) {
      console.error(error);
    }
  }
}
