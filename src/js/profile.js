import {
    auth,
    getAuth,
    storage,
    ref,
    db,
    onAuthStateChanged,
    updateProfile,
    updateEmail,
    uploadBytes,
    getDownloadURL,
    doc,
    setDoc,
    addDoc,
    collection
} from "../database.js";


function init() {

    onAuthStateChanged(auth, (user) => {
        const userName = document.getElementById("userName");
        const userEmail = document.getElementById("userEmail");
        const userPhoto = document.getElementById("userPhoto");
        const fnamePlaceholder = document.getElementById("updateFName");
        const snamePlaceholder = document.getElementById("updateSName");
        const emailPlaceholder = document.getElementById("updateEmail");

        if (user) {
            const uid = user.uid;
            //-------------get User picture--------\\
            // getDownloadURL(ref(storage, `users/${uid}/profile/photo`))
            //     .then((url) => {
            //         const userPhoto = document.getElementById("userPhoto");
            //
            //     })
            //     .catch((error) => {
            //         // Handle any errors
            //     });

            //-----------------Check Sign In user------------\\

            const displayName = user.displayName;
            const displayEmail = user.email;
            const displayPhoto = user.photoURL;
            const displayPassword = user.photoURL;
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const [firstName, lastName] = displayName.split(' ');

            userName.innerHTML = displayName;
            userEmail.innerHTML = displayEmail;
            userPhoto.setAttribute('src', displayPhoto);
            fnamePlaceholder.value = firstName;
            snamePlaceholder.value = lastName;

            emailPlaceholder.value = displayEmail;

        }
    });


}


updateButton.addEventListener("click", () => {
    const file = document.getElementById("photoFile").files.length;
    console.log(file);
    if (file > 0) {
        userUpdatePhoto();
        updateUserEmail();
    } else {
        userUpdate();
        updateUserEmail();
    }

    // window.top.location.reload(true);
});

//-----------------------Upload Photo-----------------------\\

function userUpdatePhoto() {
    const photo = document.getElementById("photoFile").files[0];
    const user = auth.currentUser;
    const uid = user.uid;
    const profilePhoto = ref(storage, `users/${uid}/profile/photo`);

    if (user) {

        uploadBytes(profilePhoto, photo)
            .then((snapshot) => {
                console.log("Uploaded a blob or file!");
                getDownloadURL(ref(storage, `users/${uid}/profile/photo`))
                    .then((url) => {

                        userUpdate(url);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log('URL photo:' + errorCode + errorMessage);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage);
            });
    }

}

//----------------------Update User info-------------------\\
function userUpdate(photoStorage) {
    const fname = document.getElementById("updateFName").value;
    const sname = document.getElementById("updateSName").value;

    const name = `${fname} ${sname}`;


    onAuthStateChanged(auth, (user) => {
        if (user) {

            updateProfile(user, {
                displayName: name,
                photoURL: photoStorage,
            })
                .then(() => {
                    console.log('user updated');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode + errorMessage);
                });

        }

    });
}

function updateUserEmail() {
    const email = document.getElementById("updateEmail").value;
    console.log('uhu' + email);
    onAuthStateChanged(auth, (user) => {
        if (user) {

            updateEmail(user, 'test').then(() => {
                console.log('email update!')
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Code: ' + errorCode + '<br>Msg: ' + errorMessage);
            });
        }

    });

}

//----------------------Camera Photo----------------------\\
//
// let camera_button = document.querySelector("#start-camera");
// let video = document.querySelector("#video");
// let click_button = document.querySelector("#click-photo");
// let canvas = document.querySelector("#canvas");
//
// camera_button.addEventListener("click", async function () {
//   let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
//   video.srcObject = stream;
// });
//
// click_button.addEventListener("click", function () {
//   canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
//   let file = null;
//   let blob = document.querySelector("#canvas").toBlob(function (blob) {
//     file = new File([blob], "test.png", { type: "image/png" });
//   }, "image/png");
//
//   // data url of the image
//   console.log(blob);
// });


async function recipeCreate() {

    const UID = auth.currentUser.uid;
    const name = document.getElementById('recipe_name').value;
    const time = document.getElementById('cooking_time').value;
    const prep_time = document.getElementById('prep_time').value;
    const serving = document.getElementById('serving').value;
    const ingredient_1 = document.getElementById('ingredient_1').value;
    const ingredient_2 = document.getElementById('ingredient_2').value;
    const ingredient_3 = document.getElementById('ingredient_3').value;
    const instructions = document.getElementById('instruction').value;
    try {
        await addDoc(collection(db, `recipes/${UID}/${name}`), {
            name: name,
            time: time,
            prep_time: prep_time,
            serving: serving,
            ingredient_1: ingredient_1,
            ingredient_2: ingredient_2,
            ingredient_3: ingredient_3,
            instructions: instructions,
        });
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
    }

}


const el = document.getElementById('publish');

el.addEventListener('click', () => {
    try {
        recipeCreate()
        alert('Recipe Created');
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
    }
});


function navigateMenu() {
    const allPages = document.querySelectorAll("div.profileMenu");
    allPages[0].style.display = 'flex';
    const pageId = location.hash ? location.hash : '#myProfile';
    console.log(pageId);
    for (let page of allPages) {
        if (pageId === '#' + page.id) {
            page.style.display = 'flex';
        } else {
            page.style.display = 'none';
        }
    }

}

window.addEventListener('hashchange', navigateMenu);
init();