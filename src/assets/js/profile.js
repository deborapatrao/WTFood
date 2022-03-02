import {
    auth,
    storage,
    ref,
    onAuthStateChanged,
    updateProfile,
    uploadBytes,
    getDownloadURL,

} from "../../../firebase.js";

const storageRef = ref(storage, 'some-child');

function init() {
    onAuthStateChanged(auth, (user) => {
        let userName = document.getElementById('userName');
        let userEmail = document.getElementById('userEmail');
        let userPhoto = document.getElementById('userPhoto');

        if (user) {
            const uid = user.uid
            console.log(user.displayName)
            //-------------get User picture--------\\
            getDownloadURL(ref(storage, `${uid}/profile/photo`))
                .then((url) => {

                    const userPhoto = document.getElementById('userPhoto');
                    userPhoto.setAttribute('src', url);
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

update.addEventListener('click', () => {

    updateUser();
    window.top.location.reload(true)

});


//-----------------------Upload Photo-----------------------\\

function uploadPhoto() {
    let photo = document.getElementById("photoFile").files[0];
    let photoCamera = image_data_url;

    onAuthStateChanged(auth, (user) => {
        const uid = user.uid;
        const profilePhoto = ref(storage, `${uid}/profile/photo`);
        uploadBytes(profilePhoto, photo).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage);
        })
    });

}

//----------------------Update User info-------------------\\
function updateUser() {
    let photo = document.getElementById("photoFile").files[0];
    let name = document.getElementById("displayName").value;

    onAuthStateChanged(auth, (user) => {
        updateProfile(user, {
            displayName: name, photoURL: photo.name
        }).then(() => {
            uploadPhoto();
            alert('user updated')
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage);
        })
    });

}


//----------------------Camera Photo----------------------\\

let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");

camera_button.addEventListener('click', async function () {
    let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
    video.srcObject = stream;
});

click_button.addEventListener('click', function () {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    let file = null;
    let blob = document.querySelector("#canvas").toBlob(function (blob) {
        file = new File([blob], 'test.png', {type: 'image/png'});
    }, 'image/png');

    // data url of the image
    console.log(blob);
});


//----------------------Iframe Load----------------------\\

document.querySelectorAll("button.profile-menu").forEach(elem => elem.addEventListener("click", function (){

    console.log('hello')
    // let frame = document.getElementById("frameLoad");
    //
    // document.getElementById("MyFrame").src=newSrc;
    //
    
    
}));

init();