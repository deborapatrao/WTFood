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
  updateProfile,
  db,
} from "../firebase.js";

import Swal from "sweetalert2";

export default function init() {
  const signUp = document.getElementById("signUp");
  const signUp_link = document.getElementById("signUp-link");
  const signIn = document.getElementById("signIn");
  const signInFb = document.getElementById("signInFb");
  const signOutBtn = document.getElementById("signOut");
  // const loginNav = document.getElementById("login-nav");
  const back_btn = document.querySelector("#signInLink");
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
    const email = document.getElementById("email2").value;
    const password = document.getElementById("password2").value;
    const fullName = document.getElementById("fullname").value;
    const spinnerContainer = document.querySelector("#spinner-container");
    function loadingHandler(check) {
      if (check) {
        spinnerContainer.innerHTML = `
          <div class="spinner-border" role="status">
            <span class="sr-only"></span>
          </div>
        `;
      } else {
        spinnerContainer.innerHTML = "";
      }
    }

    loadingHandler(true);

    fetch(`https://app.verify-email.org/api/v1/jKzZK7CN4m0ReG7Ru5lILYbYIuZMKML5KtSk1VKvxgWEzmzyPY/verify/${email}`)
      .then((response) => response.json())
      .then((result) => {
        loadingHandler(false);

        if (result.status == 1) {
          createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
              // Signed up
              const user = userCredential.user;
              console.log(user.uid);

              //await is REALLY important ...
              await updateProfile(user, {
                displayName: fullName,
                photoURL:
                  "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg",
              });
              console.log(user.displayName);
              console.log(user.photoURL);
              try {
                await addDoc(collection(db, "users"), {
                  name: user.displayName,
                  email: email,
                  photoURL: user.photoURL,
                });

                Swal.fire({
                  title: "Success",
                  text: "User Created",
                  icon: "success",
                  confirmButtonColor: "#fd8722",
                  iconColor: "#ffbc3a",
                  color: "#28231e",
                  customClass: {
                  htmlContainer: "toast-body"
                  }
                }).then((result) => {
                  closeOneModal("exampleModal");
                  window.location.href = "#profile";
                });
              } catch (e) {
                console.error("Error adding document: ", e);
              }
            })
            .catch((error) => {
              // const errorCode = error.code;
              // const errorMessage = error.message;
              // console.log("HERE: ", errorMessage);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Please enter valid email or password!",
                confirmButtonColor: "#fd8722",
                iconColor: "#fd5722",
                color: "#28231e",
                customClass: {
                  htmlContainer: "toast-body",
                },
              });
            });
        } else {
          console.log("nope");
          document.querySelector(".sign-up .popup__container--form-email").innerHTML += '<div style="color:red;">This email is invalid</div>';
        }
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
        Swal.fire({
          title: "Success",
          text: "Welcome!",
          icon: "success",
          confirmButtonColor: "#fd8722",
          iconColor: "#ffbc3a",
          color: "#28231e",
          customClass: {
            htmlContainer: "toast-body",
          },
        })
          .then((result) => {
            closeOneModal("exampleModal");
          })
          .catch((e) => {
            console.log(e.message);
          });
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log(errorCode + errorMessage);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please enter valid email or password!",
          confirmButtonColor: "#fd8722",
          iconColor: "#fd5722",
          color: "#28231e",
          customClass: {
            htmlContainer: "toast-body",
          },
        });
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
        Swal.fire({
          title: "Success",
          text: "We will be waiting your return!",
          icon: "success",
          confirmButtonColor: "#fd8722",
          iconColor: "#ffbc3a",
          color: "#28231e",
          customClass: {
            htmlContainer: "toast-body",
          },
        }).then((result) => {
          closeOneModal("exampleModal");
        });
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        // console.log(error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Cannot finish the session...",
        });
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
    document.querySelector("body").classList.remove("modal-open");
    setTimeout(ariahidden, 300);
    function ariahidden() {
      console.log("here");
      modal.setAttribute("aria-hidden", "true");
    }

    document.querySelector("body").removeAttribute("style");

    modal.removeAttribute("aria-modal");

    modal.setAttribute("style", "display: none");

    // get modal backdrop
    const modalBackdrops = document.getElementsByClassName("modal-backdrop");

    // remove opened modal backdrop
    document.body.removeChild(modalBackdrops[0]);
  }
}
