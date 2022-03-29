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
    let email = document.getElementById("email1").value;
    let password = document.getElementById("password1").value;

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
    let email = document.getElementById("email1").value;
    let password = document.getElementById("password1").value;
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
        alert("user is signed out");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // alert('SIGNED in')
      let cardImage = document.createElement("img");
      cardImage.classList.add("login-avatar");
      cardImage.src = `${
        user.photoURL
          ? user.photoURL
          : "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
      }`;
      loginNav.textContent = "";
      loginNav.appendChild(cardImage);

      // loginNav.innerHTML = "YOU ARE SIGNED IN";

      // const uid = user.uid;
      // ...
    } else {
      loginNav.innerHTML = "login";
    }
  });
}
