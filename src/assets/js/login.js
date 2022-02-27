import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "../../../firebase.js";

let signUp = document.getElementById("signUp");
let signIn = document.getElementById("signIn");
let signOut = document.getElementById("signOut");

//--------------------------Sign Up--------------------------//
signUp.addEventListener('click', () => {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    console.log(email + " " + password);
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            alert('User created!');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage);
        });
});

//--------------------------Sign In--------------------------//

signIn.addEventListener('click', () => {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            alert('User Sign in');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage);
        });
});

//--------------------------Sign Out--------------------------//


signOut .addEventListener('click', () => {


});
