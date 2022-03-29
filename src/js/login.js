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
} from "../firebase.js";
import Swal from "sweetalert2";

export default function init() {
  const signUp = document.getElementById("signUp");
  const signIn = document.getElementById("signIn");
  const signInFb = document.getElementById("signInFb");
  const signOutBtn = document.getElementById("signOut");
  const loginNav = document.getElementById("login-nav");

  //--------------------------Sign Up--------------------------//
  signUp.addEventListener("click", () => {
    const email = document.getElementById("email1").value;
    const password = document.getElementById("password1").value;

    console.log(email + " " + password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        Swal.fire(
            'Success',
            'User Created',
            'success',
        ).then((result) => {
          // Reload the Page
          // location.reload();
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

        Swal.fire(
            'Success',
            'User Sign in',
            'success',
        )


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
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  });
}
