"use strict";

import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  FacebookAuthProvider,
  getRedirectResult,
  collection,
  addDoc,
} from "../firebase.js";

import Swal from "sweetalert2";

export default function init() {
  const signUp = document.getElementById("signUp");
  const signUp_link = document.getElementById("signUp-link");
  const signIn = document.getElementById("signIn");
  const signInFb = document.getElementById("signInFb");
  const signOutBtn = document.getElementById("signOut");
  // const loginNav = document.getElementById("login-nav");
  const back_btn = document.querySelector(".back-login");
  const signUpContainer = document.querySelector(".sign-up");
  const signInContainer = document.querySelector(".sign-in");

  //--------------------------Sign Up--------------------------//
  signUp_link.addEventListener("click", () => {
    openCloseFun(signInContainer, signUpContainer);
  });

  back_btn.addEventListener("click", () => {
    openCloseFun(signUpContainer, signInContainer);
  });

  signUp.addEventListener("click", () => {
    const email = document.getElementById("email1").value;
    const password = document.getElementById("password1").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        await addDoc(collection(db, "users"), {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });

        Swal.fire("Success", "User Created", "success").then((result) => {
          closeOneModal("exampleModal");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
      });
  });

  //--------------------------Sign In--------------------------//

  signIn.addEventListener("click", () => {
    const email = document.getElementById("email1").value;
    const password = document.getElementById("password1").value;
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;

        // ...
        Swal.fire("Success", "User Sign in", "success").then((result) => {
          console.log("wtf");
          closeOneModal("exampleModal");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
      });
  });

  //--------------------------Sign In Facebook--------------------------//
  const provider = new FacebookAuthProvider();

  signInFb.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log(user, credential);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  });

  //--------------------------Sign Out--------------------------//

  signOutBtn.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        console.log("user is signed out");
        Swal.fire("Success", "User Sign Out", "success").then((result) => {
          closeOneModal("exampleModal");
        });
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  });

  function openCloseFun(close, open) {
    close.classList.remove("profile-open");
    close.classList.add("profile-close");

    open.classList.add("profile-open");
    open.classList.remove("profile-close");
  }

  // Working badly for now
  function closeOneModal(modalId) {
    // get modal
    const modal = document.getElementById(modalId);
    // change state like in hidden modal
    modal.classList.remove("show");
    document.querySelector('body').classList.remove('modal-open');
    setTimeout(ariahidden, 300)
    function ariahidden(){
      console.log('here')
      modal.setAttribute("aria-hidden", "true");
    }

    document.querySelector('body').removeAttribute('style');

    modal.removeAttribute("aria-modal");


    modal.setAttribute("style", "display: none");

    // get modal backdrop
    const modalBackdrops = document.getElementsByClassName("modal-backdrop");

    // remove opened modal backdrop
    document.body.removeChild(modalBackdrops[0]);
  }
}
