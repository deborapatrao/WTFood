"use strict";

import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  collection,
  addDoc,
  updateProfile,
  db,
} from "../firebase.js";

import Swal from "sweetalert2";

let check = true;

export default function init() {
  const inputCleans = document.querySelectorAll(".popup__container--form input");
  const signUp = document.getElementById("signUp");
  const signUp_link = document.getElementById("signUp-link");
  const signIn = document.getElementById("signIn");
  const signInFbs = document.querySelectorAll(".signInFb");
  const back_btn = document.querySelector("#signInLink");
  const signUpContainer = document.querySelector(".sign-up");
  const signInContainer = document.querySelector(".sign-in");

  //--------------------------Sign Up--------------------------//
  check &&
    signUp_link.addEventListener("click", () => {
      openCloseFun(signInContainer, signUpContainer);
    });

  check && back_btn.addEventListener("click", () => openCloseFun(signUpContainer, signInContainer));

  check &&
    signUp.addEventListener("click", () => {
      const email = document.getElementById("email2").value;
      const password = document.getElementById("password2").value;
      const fullName = document.getElementById("fullname").value;
      const spinnerContainer = document.querySelector("#spinner-container");
      const termsCheckbox = document.querySelector("#terms");
      const termsLabel = document.querySelector("#termsLabel");
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
      if (termsCheckbox.checked) {
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

                  //await is REALLY important ...
                  await updateProfile(user, {
                    displayName: fullName,
                    photoURL:
                      'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg',
                  });

                  try {
                    await addDoc(collection(db, 'users'), {
                      name: user.displayName,
                      email: email,
                      photoURL: user.photoURL,
                    });

                    Swal.fire({
                      title: 'Success',
                      text: 'User Created',
                      icon: 'success',
                      confirmButtonColor: '#fd8722',
                      iconColor: '#ffbc3a',
                      color: '#28231e',
                      customClass: {
                        htmlContainer: 'toast-body',
                      },
                    }).then((result) => {
                      inputCleans.forEach((input) => (input.value = ''));
                      document.querySelector('.btn-close').click();
                      window.location.href = '#profile';
                    });
                  } catch (e) {
                    console.error('Error adding document: ', e);
                  }
                })
                .catch((error) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Please enter valid email or password!',
                    confirmButtonColor: '#fd8722',
                    iconColor: '#fd5722',
                    color: '#28231e',
                    customClass: {
                      htmlContainer: 'toast-body',
                    },
                  });
                });
            } else {
              document.querySelector('.sign-up .popup__container--form-email').innerHTML +=
                '<div style="color:red;">This email is invalid</div>';
            }
          });
      } else {
        termsLabel.style.color = "red;";
        termsCheckbox.style = "border: 2px solid red;";
      }
    });

  //--------------------------Sign In--------------------------//

  check &&
    signIn.addEventListener("click", () => {
      const email = document.getElementById("email1").value;
      const password = document.getElementById("password1").value;
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // const user = userCredential.user;
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
              inputCleans.forEach((input) => (input.value = ""));
              document.querySelector(".btn-close").click();
              window.location.href = "#profile";
            })
            .catch((e) => {
              console.log(e.message);
            });
        })
        .catch((error) => {
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

  check &&
    signInFbs.forEach((signInFb) => {
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
    });

  //--------------------------Sign Out--------------------------//

  function openCloseFun(close, open) {
    close.classList.remove("profile-open");
    close.classList.add("profile-close");

    open.classList.add("profile-open");
    open.classList.remove("profile-close");
  }

  check = false;
}
