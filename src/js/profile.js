import {
    auth,
    signOut,
    getAuth,
    storage,
    ref,
    db,
    deleteDoc,
    onAuthStateChanged,
    updateProfile,
    updateEmail,
    uploadBytes,
    getDownloadURL,
    Timestamp,
    doc,
    setDoc,
    listAll,
    addDoc,
    getDoc,
    getDocs,
    collection,
} from "../firebase.js";
import Swal from "sweetalert2";
import {Modal} from "bootstrap";

let i = 0;
let timerInterval
const profile = sessionStorage.getItem("profile");
const shoppinglistPage = sessionStorage.getItem("shoppingList");
export default function init() {
    onAuthStateChanged(auth, async (user) => {
        const userName = document.getElementById("userName");
        const userEmail = document.getElementById("userEmail");
        const userPhoto = document.getElementById("userPhoto");

        const fnamePlaceholder = document.getElementById("updateFName");
        const snamePlaceholder = document.getElementById("updateSName");
        const emailPlaceholder = document.getElementById("updateEmail");

        if (user) {
            const uid = user.uid;

            //-----------------Check Sign In user------------\\

            const displayName = user.displayName;
            const displayEmail = user.email;
            const displayPassword = user.password;
            const displayPhoto = user.photoURL
                ? user.photoURL
                : "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg";
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            if (displayName !== null) {
                const [firstName, lastName] = displayName.split(" ");
                fnamePlaceholder.value = firstName;
                snamePlaceholder.value = lastName;
            }

            userName.innerHTML = displayName;
            userEmail.innerHTML = displayEmail;
            userPhoto.src = displayPhoto;
            emailPlaceholder.value = displayEmail;
            //----------------------Update User----------------------\\

            updateButton.addEventListener("click", () => {
                userUpdate();
            });
            //----------------------Functions----------------------\\
            camera();
            recipes();
            shoppingList();
            //----------------------Modal----------------------\\
            const cameraModal = new Modal(document.getElementById("cameraModal"), {});
            const modal = document.querySelector('#cameraModal')
            const closeModal = document.querySelectorAll('.close');
            cameraBtn.addEventListener('click', () => {
                cameraModal.show();

            });

            closeModal.forEach(btnClick => {
                btnClick.addEventListener('click', () => {
                    cameraModal.hide();
                });
            });

            //----------------------Update Photo----------------------\\
            const photo = document.getElementById("photoFile");

            photo.onchange = evt => {

                Swal.fire({
                    title: 'Saving Picture',
                    html: 'Saving...',
                    timer: 3000,
                    timerProgressBar: true,
                    customClass: {
                        htmlContainer: "toast-body",
                        loader: "loader",
                    },
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {

                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {

                    }
                })
                const [file] = photo.files
                if (file) {
                    userUpdatePhoto();
                }
            }
            //----------------------Preview Recipe Photo----------------------\\
            const recipePhoto = document.getElementById('recipePhoto');
            let loadFile = function (event) {
                console.log('changing')
                let output = document.getElementById('previewRecipePhoto');
                output.src = URL.createObjectURL(event.target.files[0]);
                output.onload = function () {
                    URL.revokeObjectURL(output.src) // free memory
                }
            };
            recipePhoto.addEventListener('change', loadFile)
            //----------------------Count recipes----------------------\\
            const recipeCount = document.querySelector('#recipeCount');

            const recipeRef = collection(db, `users/${uid}/recipes`);
            const queryRecipe = await getDocs(recipeRef);
            recipeCount.innerHTML = queryRecipe.size;

        }
    });

    updateButton.addEventListener("click", () => {
    });

    //---------------------- Change Desktop Layout ------------------\\
    let screenWidth = window.innerWidth;
    let myProfile = document.getElementById("myProfile");
    displayUpdate();

    window.addEventListener("resize", () => {
        screenWidth = window.innerWidth;

        displayUpdate();
    });

    function displayUpdate() {
        if (screenWidth > 992) {
            profileNavigation.classList.remove("profile-open");
            let myProfile = document.getElementById("myProfile");

            myProfile.classList.remove("profile-close");
            myProfile.classList.add("profile-open");
        } else {
            profileNavigation.classList.add("profile-open");

            myProfile.classList.remove("profile-open");
            myProfile.classList.add("profile-close");
        }
    }

    document.querySelector(".signOut-btn").addEventListener("click", async () => {
        signOut(auth)
            .then(() => {
                Swal.fire({
                    title: "Success",
                    text: "User Sign Out",
                    icon: "success",
                    confirmButtonColor: "#fd8722",
                    iconColor: "#ffbc3a",
                    color: "#28231e",
                    customClass: {
                        htmlContainer: "toast-body"
                    }
                }).then((result) => {
                    closeOneModal("exampleModal");
                });
                window.location.href = "#home";
                // Sign-out successful.
            })
            .catch((error) => {

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Cannot finish the session...",
                    confirmButtonColor: "#fd8722",
                    iconColor: "#fd5722",
                    color: "#28231e",
                    customClass: {
                        htmlContainer: "toast-body"
                    }
                });
            });
    });
    if (profile) {
        sessionStorage.removeItem("profile");
        profileOpenClose(myRecipes);
        transformBtnNav(profileRecipeBtn);
    }
    if (shoppinglistPage) {
        sessionStorage.removeItem("shoppingList");
        profileOpenClose(shoppingListContainer);
        transformBtnNav(profileShoppingBtn);
    }
}


//-----------------------Upload Photo-----------------------\\

function userUpdatePhoto() {
    const photo = document.getElementById("photoFile").files[0];
    const user = auth.currentUser;
    const uid = user.uid;
    const userPhoto = document.getElementById("userPhoto");
    const menuPhoto = document.querySelector(".login-avatar");
    if (user) {
        const profilePhoto = ref(storage, `users/${uid}/profile/photo`);
        uploadBytes(profilePhoto, photo)
            .then((snapshot) => {

                getDownloadURL(profilePhoto)
                    .then((url) => {

                        updateProfile(user, {
                            photoURL: url,
                        });
                        userPhoto.src = url;
                        menuPhoto.src = url;
                        document.querySelector(".profile__avatar").innerHTML.reload
                        document.querySelector(".header__avatar-container").innerHTML.reload
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log("URL photo:" + errorCode + errorMessage);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`Code: ${errorCode}`);
                console.log(`MSG: ${errorMessage}`);
            });


    }
}

//----------------------Update User info-------------------\\
function userUpdate() {
    const fname = document.getElementById("updateFName").value;
    const sname = document.getElementById("updateSName").value;
    const user = auth.currentUser;
    const name = `${fname} ${sname}`;

    if (user) {
        updateProfile(user, {
            displayName: name,

        })
            .then(() => {
                Swal.fire({
                    title: "Success",
                    text: "User Updated!",
                    icon: "success",
                    confirmButtonColor: "#fd8722",
                    iconColor: "#ffbc3a",
                    color: "#28231e",
                    customClass: {
                        htmlContainer: "toast-body"
                    }
                }).then((result) => {
                    location.reload();
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage);
            });
    }
}

//----------------------Create Recipe----------------------\\
async function recipeCreate(photoURL) {
    let list = 0;
    const UID = auth.currentUser.uid;
    const name = document.getElementById("recipeTitle").value;
    const time = document.getElementById("cookingTime").value;
    const prep_time = document.getElementById("prepTime").value;
    const serving = document.getElementById("serving").value;
    const typeRecipe = document.getElementById("typeRecipe").value;
    const dietaryPref = document.getElementById("dietaryPref").value;
    const instructions = document.getElementById("instruction").value;
    const ingredient = document.getElementById("ingredient").value;
    const amount = document.getElementById("amount").value;
    const recipeData = {
        name: name,
        time: time,
        photo: photoURL,
        prep_time: prep_time,
        serving: serving,
        type_recipe: typeRecipe,
        dietary_pref: dietaryPref,
        instructions: instructions,
        createdAt: Timestamp.now(),
        ingredient: `${amount} ${ingredient}`
    };
    let ingredientData = [];
    for (list; list < i; list++) {

        let ingredient = window[`ingredient_${list}`];
        let amount = window[`amount_${list}`];
        ingredient = document.getElementById(`ingredient_${list}`).value;
        amount = document.getElementById(`amount_${list}`).value;

        ingredientData[`ingredient_${list + 1}`] = `${amount} ${ingredient}`;
    }

    const docData = {...recipeData, ...ingredientData};

    try {
        await addDoc(collection(db, `users/${UID}/recipes`), docData)
            .then(() => {
                sessionStorage.setItem("profile", "true");

                Swal.fire({
                    title: "Your reciped has been posted",
                    text: "Horray! Now you can review your recipe in your recipes collection.",
                    icon: "success",
                    confirmButtonColor: "#fd8722",
                    iconColor: "#ffbc3a",
                    color: "#28231e",
                    customClass: {
                        htmlContainer: "toast-body"
                    }
                }).then((result) => {
                    location.reload();

                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage);
            });
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
    }
}

const el = document.getElementById("publish");

el.addEventListener("click", () => {
    const name = document.getElementById("recipeTitle").value;
    const ingredient = document.getElementById("ingredient").value;
    const amount = document.getElementById("amount").value;
    const recipePhotoFile = document.getElementById("recipePhoto").files[0] === 0;
    const recipePhoto = ref(storage, `users/${auth.currentUser.uid}/recipes/${Date.now()}`);
console.log(recipePhotoFile)
    if (name === '' && ingredient === '' && amount === '') {

        Swal.fire({
            title: "Ops!",
            text: "Dont be shy, At least put a name and one ingredient! ",
            icon: "warning",
            confirmButtonColor: "#fd8722",
            iconColor: "#ffbc3a",
            color: "#28231e",
            customClass: {
                htmlContainer: "toast-body"
            }
        })
    } else {
        try {

            uploadBytes(recipePhoto, recipePhotoFile)
                .then((snapshot) => {
                    getDownloadURL(recipePhoto)
                        .then((url) => {
                            recipeCreate(url);
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.log("URL photo:" + errorCode + errorMessage);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("URL photo:" + errorCode + errorMessage);
                });
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage);
        }
    }
});

//----------------------Load Recipes----------------------\\
async function recipes() {
    const UID = auth.currentUser.uid;
    const recipesCards = document.getElementById("recipesCards");
    const snapshot = collection(db, `users/${UID}/recipes`);
    const allRecipes = await getDocs(snapshot);


    allRecipes.forEach((recipe) => {
        const cardLink = document.createElement("a");
        cardLink.href = `?recipeid=${recipe.id}#oneRecipe`;
        cardLink.classList.add("card-link");
        cardLink.classList.add("recipe-card");

        const card = document.createElement("div");
        card.classList.add("card");

        const cardImgContainer = document.createElement("div");
        cardImgContainer.classList.add("recipe-card__img");

        const cardButton = document.createElement("button");
        cardButton.classList.add("more-options");

        const cardImage = document.createElement("img");
        cardImage.classList.add("card-img-top");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardStars = document.createElement("div");
        cardStars.classList.add("rating-stars");

        const cardTitle = document.createElement("h3");
        cardTitle.classList.add("card-title");

        const cardTitleText = document.createTextNode(`${recipe.data().name}`);
        cardTitle.appendChild(cardTitleText);

        cardImage.src = `${recipe.data().photo}`;

        cardImgContainer.appendChild(cardButton);
        cardImgContainer.appendChild(cardImage);
        cardBody.appendChild(cardStars);
        cardBody.appendChild(cardTitle);

        card.appendChild(cardImgContainer);
        card.appendChild(cardBody);
        cardLink.appendChild(card);

        recipesCards.appendChild(cardLink);
    });
}


//----------------------Photo Profile Camera----------------------\\
let photoURL = "";

function camera() {
    const controls = document.querySelector(".controls");
    const cameraPlay = document.querySelector("#cameraStart");
    const cameraSS = document.querySelector("#screenshot");
    const cameraOptions = document.querySelector(".video-options>select");
    const video = document.querySelector("video");
    const canvas = document.querySelector("canvas");
    const screenshotImage = document.querySelector(".screenshot-image");
    const buttons = [...controls.querySelectorAll("button")];

    let streamStarted = false;

    const [play, screenshot] = buttons;

    const constraints = {
        video: {
            width: {
                min: 1280,
                ideal: 1920,
                max: 2560,
            },
            height: {
                min: 720,
                ideal: 1080,
                max: 1440,
            },
        },
    };
    cameraOptions.onchange = () => {
        const updatedConstraints = {
            ...constraints,
            deviceId: {
                exact: cameraOptions.value,
            },
        };
        startStream(updatedConstraints);
    };

    cameraPlay.onclick = () => {

        if (streamStarted) {
            video.play();
            play.classList.add("d-none");

            return;
        }
        if ("mediaDevices" in navigator && navigator.mediaDevices.getUserMedia) {
            const updatedConstraints = {
                ...constraints,
                deviceId: {
                    exact: cameraOptions.value,
                },
            };

            startStream(updatedConstraints);
        }
    };

    const doScreenshot = () => {

        const user = auth.currentUser;
        const userPhoto = document.getElementById("userPhoto");
        const menuPhoto = document.querySelector(".login-avatar");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        screenshotImage.src = canvas.toDataURL("image/webp");
        screenshotImage.classList.remove("d-none");
        canvas.toBlob(function (blob) {
            cameraSS.style.visibility = "hidde";
            cameraPlay.removeAttribute("style");
            cameraPlay.style.visibility = "none";
            if (user) {
                const profilePhoto = ref(storage, `users/${auth.currentUser.uid}/recipes/${Date.now()}`);
                photoURL = Date.now();


                Swal.fire({
                    title: 'Saving Picture',
                    text: 'Saving...',
                    timer: 7000,
                    timerProgressBar: true,
                    customClass: {
                        htmlContainer: "toast-body",
                        loader: "loader",
                    },
                   
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {

                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {

                    }
                })

                uploadBytes(profilePhoto, blob)
                    .then((snapshot) => {

                        getDownloadURL(ref(storage, `users/${auth.currentUser.uid}/recipes/${photoURL}`))
                            .then((url) => {
                                updateProfile(user, {
                                    photoURL: url,
                                });
                                userPhoto.src = url;
                                menuPhoto.src = url;
                                document.querySelector(".profile__avatar").innerHTML.reload
                                document.querySelector(".header__avatar-container").innerHTML.reload

                            })
                            .catch((error) => {
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                console.log(errorCode + errorMessage);
                            });
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode + errorMessage);
                    });
            }
        });
    };
    cameraSS.onclick = doScreenshot;

    const startStream = async (constraints) => {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleStream(stream);
    };

    const handleStream = (stream) => {
        video.srcObject = stream;
        play.classList.add("d-none");
        screenshot.classList.remove("d-none");
    };

    const getCameraSelection = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        const options = videoDevices.map((videoDevice) => {
            return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
        });
        cameraOptions.innerHTML = options.join("");
    };

    getCameraSelection();
}

//----------------------Add/Remove Ingrediente Input----------------------\\
addBtn.addEventListener("click", () => {
    const divIngredient = document.createElement("div");
    const divAmount = document.createElement("div");
    const inputAppend = document.getElementById("input-ingredient");
    const inputIngredient = document.createElement("input");
    const labelIngredient = document.createElement("label");
    const inputAmount = document.createElement("input");
    const labelAmount = document.createElement("label");

    // Ingredients
    labelIngredient.innerHTML = "Ingredient Name";
    labelIngredient.setAttribute("for", `ingredient_${i}`);
    labelIngredient.setAttribute("id", `ingredientLabel_${i}`);
    labelIngredient.setAttribute("class", `ingredientLabel`);
    inputIngredient.setAttribute("type", "text");
    inputIngredient.setAttribute("id", `ingredient_${i}`);
    inputIngredient.setAttribute("class", `ingredient`);

    // Amounts
    labelAmount.innerHTML = "Amount";
    labelAmount.setAttribute("for", `amount_${i}`);
    inputAmount.setAttribute("type", "text");
    inputAmount.setAttribute("id", `amount_${i}`);

    divIngredient.classList.add("create-rec__field");
    divAmount.classList.add("create-rec__field");
    divIngredient.appendChild(labelIngredient);
    divIngredient.appendChild(inputIngredient);
    divAmount.appendChild(labelAmount);
    divAmount.appendChild(inputAmount);
    inputAppend.appendChild(divIngredient);
    inputAppend.appendChild(divAmount);
    i++;
});

removeBtn.addEventListener("click", () => {
    const inputsRemove = document.getElementById("input-ingredient");

    inputsRemove.removeChild(inputsRemove.lastChild);
    inputsRemove.removeChild(inputsRemove.lastChild);

});

//---------------------Shopping List----------------------\\
async function shoppingList() {
    const container = document.getElementById("shoppingListContainer");
    const user = auth.currentUser;
    const docsRef = collection(db, `users/${user.uid}/shoppinglist`);
    const querySnapshot = await getDocs(docsRef);

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const div = document.createElement("div");
        div.classList.add('shopping-list__item');
        div.innerHTML = `<p>${doc.data().ingredient}</p>`;
        const btnDeleteItem = document.createElement('button');
        btnDeleteItem.classList.add('remove-recipe');
        btnDeleteItem.setAttribute('id', doc.id)
        div.appendChild(btnDeleteItem);
        container.appendChild(div);
    });
    // <![CDATA[
    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    //----------------------Remove items from shopping list-----------------\\
    const removeItemBtn = document.querySelectorAll('.remove-recipe');

    removeItemBtn.forEach((button) => {
        const user = auth.currentUser;

        button.addEventListener('click', async function () {

            const parent = this.parentNode;
            parent.classList.add('removed');

            await deleteDoc(doc(db, `users/${user.uid}/shoppinglist`, button.id));

            function remove(item) {
                item.style.display = "none";
            }

            setTimeout(() => remove(parent), 700);
        });
    });

    const removeALl = document.getElementById('removeListAll');
    const itemList = document.querySelectorAll('.shopping-list__items')
    removeALl.addEventListener('click', async () => {
        const docsRef = collection(db, `users/${user.uid}/shoppinglist`);
        const collections = await getDocs(docsRef);

        collections.forEach(item => {
            deleteDoc(doc(db, `users/${user.uid}/shoppinglist`, item.id));
        })
        itemList.forEach((button) => {

            button.classList.add('removed');

            function remove(item) {

                item.style.display = "none";
            }

            setTimeout(() => remove(button), 700);


        });

    });


}

//----------------------Navigate Menu Pages Profile----------------------\\

function profileOpenClose(div) {
    const activeProfile = document.querySelector(".profile-open");

    activeProfile.classList.remove("profile-open");
    activeProfile.classList.add("profile-close");

    div.classList.add("profile-open");
    div.classList.remove("profile-close");
}

function transformBtnNav(btn) {
    const btnActive = document.querySelector(".profile-active");
    if (btnActive) {
        btnActive.classList.remove("profile-active");
    }

    btn.classList.add("profile-active");
}

const allPages = document.querySelectorAll("a.profile-menu");
const profilePrev = document.querySelectorAll(".profile-prev");
const profileNavigation = document.getElementById("profileNavigation");

const myRecipes = document.getElementById("myRecipes");
const shoppingListContainer = document.getElementById("shoppingListSection");
const writeRecipeBtn = document.getElementById("createRecipesBtn");
const writeRecipe = document.getElementById("createRecipes");

const profileInfoBtn = document.getElementById("profileInfo");
const profileRecipeBtn = document.getElementById("profileRecipe");
const profileShoppingBtn = document.getElementById("shoppingList");

allPages.forEach((menu) => {
    menu.addEventListener("click", () => {
        switch (menu.id) {
            case "profileInfo":
                profileOpenClose(myProfile);
                transformBtnNav(profileInfoBtn);
                break;
            case "profileRecipe":
                profileOpenClose(myRecipes);
                transformBtnNav(profileRecipeBtn);
                break;
            case "shoppingList":
                profileOpenClose(shoppingListContainer);
                transformBtnNav(profileShoppingBtn);
                break;
        }
    });
});

profilePrev.forEach((prev) => {
    prev.addEventListener("click", () => {
        profileOpenClose(profileNavigation);
    });
});

writeRecipeBtn.addEventListener("click", () => {
    profileOpenClose(writeRecipe);
});