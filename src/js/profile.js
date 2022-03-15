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
    getDoc,
    getDocs,
    collection
} from "../firebase.js";


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
            const displayPhoto = user.photoURL
                ? user.photoURL
                : "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
            // const displayPassword = user.photoURL;
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const [firstName, lastName] = displayName.split(' ');

            userName.innerHTML = displayName;
            userEmail.innerHTML = displayEmail;
            userPhoto.setAttribute('src', displayPhoto);
            fnamePlaceholder.value = firstName;
            snamePlaceholder.value = lastName;

            emailPlaceholder.value = displayEmail;
            myRecipes()
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

    window.top.location.reload(true);
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


//----------------------Create Recipe----------------------\\
async function recipeCreate() {

    const UID = auth.currentUser.uid;
    const name = document.getElementById('recipeTitle').value;
    const time = document.getElementById('cookingTime').value;
    const prep_time = document.getElementById('prepTime').value;
    const serving = document.getElementById('serving').value;
    const typeRecipe = document.getElementById('typeRecipe').value;
    const dietaryPref = document.getElementById('dietaryPref').value;
    const instructions = document.getElementById('instruction').value;
    const ingredient_1 = document.getElementById('ingredient_1').value;
    const ingredient_2 = document.getElementById('ingredient_2').value;
    const ingredient_3 = document.getElementById('ingredient_3').value;
    const ingredient_4 = document.getElementById('ingredient_4').value;
    const ingredient_5 = document.getElementById('ingredient_5').value;

    console.log(name);
    const docData = {
        name: name.toUpperCase(),
        time: time,
        photo: 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg',
        prep_time: prep_time,
        serving: serving,
        type_recipe: typeRecipe,
        dietary_pref: dietaryPref,
        instructions: instructions,
        ingredient_1: ingredient_1,
        ingredient_2: ingredient_2,
        ingredient_3: ingredient_3,
        ingredient_4: ingredient_4,
        ingredient_5: ingredient_5,
    }

    try {

        // doc(db, `users/${UID}/recipe`)
        await setDoc(doc(db, `users/${UID}/recipes`, name), docData);
        const resetInput = document.querySelectorAll('input');
        resetInput.forEach(item => {
            item.innerHTML = '';
        });
        document.getElementById('instruction').innerHTML = '';

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
    }
}

const el = document.getElementById('publish');

el.addEventListener('click', () => {
    try {
        recipeCreate();
        alert('recipe Created');
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
    }
});
//----------------------Load Recipes----------------------\\
async function myRecipes(){
    const UID = auth.currentUser.uid;
    const userRecipes = document.getElementById('userRecipes');
    // await collection(`users/${UID}/recipes`).get()
    const snapshot = collection(db, `users/${UID}/recipes`);

    const allRecipes = await getDocs(snapshot);

    allRecipes.forEach((recipe)=>{
        const cardLink = document.createElement("a");
        // cardLink.href = `#oneRecipe?${recipes[i].id}`;
        cardLink.classList.add("card-link");

        const card = document.createElement("div");
        card.classList.add("card");

        const cardImage = document.createElement("img");
        cardImage.classList.add("card-img-top");

        const cardTitle = document.createElement("h3");
        cardTitle.classList.add("card-title");

        const cardTitleText = document.createTextNode(`${recipe.data().name.toUpperCase()}`);
        cardTitle.appendChild(cardTitleText);

        cardImage.src = `${recipe.data().photo}`;

        card.appendChild(cardImage);
        card.appendChild(cardTitle);
        cardLink.appendChild(card);

        userRecipes.appendChild(cardLink);
    })
}


//----------------------Add/Remove Ingrediente Input----------------------\\
let i = 0;
/*addBtn.addEventListener('click', () => {

    const inputAppend = document.getElementById('input-ingredient');
    const inputIngredient = document.createElement('input');
    const labelIngredient = document.createElement('label');
    const inputAmount = document.createElement('input');
    const labelAmount = document.createElement('label');

    /!*Ingredients*!/
    labelIngredient.innerHTML = 'Ingredient Name'
    labelIngredient.setAttribute('for', `ingredient_${i}`);
    labelIngredient.setAttribute('id', `ingredientLabel_${i}`);
    labelIngredient.setAttribute('class', `ingredientLabel`);
    inputIngredient.setAttribute('type', 'text');
    inputIngredient.setAttribute('id', `ingredient_${i}`);
    inputIngredient.setAttribute('class', `ingredient`);

    /!*Amounts*!/
    labelAmount.innerHTML = 'Amount'
    labelAmount.setAttribute('for', `amount_${i}`);
    labelAmount.setAttribute('for', `amountLabel_${i}`);
    inputAmount.setAttribute('type', 'number');
    inputAmount.setAttribute('id', `amount_${i}`);


    inputAppend.appendChild(labelIngredient);
    inputAppend.appendChild(inputIngredient);
    inputAppend.appendChild(labelAmount);
    inputAppend.appendChild(inputAmount);
    i++;
    console.log('addbtn:' + i);
});*/


/*removeBtn.addEventListener('click', () => {
    console.log('removebtn:' + i);
    const inputsRemove = document.getElementById('input-ingredient');
    const ingredientInputRemove = document.getElementById(`ingredient_${i}`);
    const ingredientLabelRemove = document.getElementById(`ingredientLabel_${i}`);
    const amountInputRemove = document.getElementById(`amount_${i}`);
    const amountLabelRemove = document.getElementById(`amountLabel_${i}`);

    inputsRemove.remove(ingredientInputRemove);
    inputsRemove.remove(ingredientLabelRemove);
    inputsRemove.remove(amountInputRemove);
    inputsRemove.remove(amountLabelRemove);
    i--;
});*/


//----------------------Navigate Menu Pages Profile----------------------\\

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

//---------------------Initialization of the JS----------------------\\

init();