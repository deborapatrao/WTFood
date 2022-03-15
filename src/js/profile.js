import {
  auth,
  getAuth,
  storage,
  ref,
  db,
  onAuthStateChanged,
  updateProfile,
  uploadBytes,
  getDownloadURL,
  doc,
  setDoc,
  addDoc,
  collection,
} from "../firebase.js";

function init() {
  onAuthStateChanged(auth, (user) => {
    let userName = document.getElementById("userName");
    let userEmail = document.getElementById("userEmail");
    let userPhoto = document.getElementById("userPhoto");

    if (user) {
      const uid = user.uid;
      console.log(user.displayName);
      //-------------get User picture--------\\
      getDownloadURL(ref(storage, `${uid}/profile/photo`))
        .then((url) => {
          const userPhoto = document.getElementById("userPhoto");
          userPhoto.setAttribute("src", url);
        })
        .catch((error) => {
          // Handle any errors
        });

      //-----------------Check Sign In user------------\\

      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log(displayName);
      userName.innerHTML = displayName;
      userEmail.innerHTML = email;
    }
  });
}

update.addEventListener("click", () => {
  userUpdate();
  window.top.location.reload(true);
});

//-----------------------Upload Photo-----------------------\\

function photoUpload() {
  let photo = document.getElementById("photoFile").files[0];
  let photoCamera = image_data_url;

  onAuthStateChanged(auth, (user) => {
    const uid = user.uid;
    const profilePhoto = ref(storage, `${uid}/profile/photo`);
    uploadBytes(profilePhoto, photo)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
      });
  });
}

//----------------------Update User info-------------------\\
function userUpdate() {
  let photo = document.getElementById("photoFile").files[0];
  let name = document.getElementById("displayName").value;

  onAuthStateChanged(auth, (user) => {
    updateProfile(user, {
      displayName: name,
      photoURL: photo.name,
    })
      .then(() => {
        photoUpload();
        alert("user updated");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
      });
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
  // messageRef := client.Collection("rooms").Doc("roomA").
  // Collection("messages").Doc("message1")
  const UID = auth.currentUser.uid;
  const name = document.getElementById("recipe_name").value;
  const time = document.getElementById("cooking_time").value;
  const prep_time = document.getElementById("prep_time").value;
  const serving = document.getElementById("serving").value;
  const ingredient_1 = document.getElementById("ingredient_1").value;
  const ingredient_2 = document.getElementById("ingredient_2").value;
  const ingredient_3 = document.getElementById("ingredient_3").value;
  const instructions = document.getElementById("instruction").value;
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

const el = document.getElementById("publish");

el.addEventListener("click", () => {
  try {
    recipeCreate();
    alert("Recipe Created");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + errorMessage);
  }
});

function navigateMenu() {
  const allPages = document.querySelectorAll("div.profile_body");
  allPages[0].style.display = "flex";
  const pageId = location.hash ? location.hash : "#myProfile";
  console.log(pageId);
  for (let page of allPages) {
    if (pageId === "#" + page.id) {
      page.style.display = "flex";
    } else {
      page.style.display = "none";
    }
  }
}

window.addEventListener("hashchange", navigateMenu);
init();
