"use strict";


import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "../database.js";


function init()  {
const signUp = document.getElementById("signUp");
const signIn = document.getElementById("signIn");
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
      alert("User created!");
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

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      alert("User Sign in");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
    });
});

//--------------------------Sign Out--------------------------//

signOutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    alert('user is signed out')
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
    alert(error.message)
  });
});


onAuthStateChanged(auth, (user) => {
  if (user) {
    // alert('SIGNED in')
    let cardImage = document.createElement("img");
    cardImage.classList.add("login-avatar");
    cardImage.src = `${user.photoURL ? user.photoURL : 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg'}`;
    loginNav.textContent = '';
    loginNav.appendChild(cardImage);

    // loginNav.innerHTML = "YOU ARE SIGNED IN";
    
    // const uid = user.uid;
    // ...
  } else {
    loginNav.innerHTML = "login";
  }
})

}

init();