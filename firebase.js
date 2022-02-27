// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-storage.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyBLR77YqsfcQjR5__v8Jy3g9gc3rBuUMNY",
  authDomain: "wtfood-3d70f.firebaseapp.com",
  projectId: "wtfood-3d70f",
  storageBucket: "wtfood-3d70f.appspot.com",
  messagingSenderId: "1004008311332",
  appId: "1:1004008311332:web:0d1ffc3046cbcde0c6e6b1",
  measurementId: "G-JQRS52NPHD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);


export {
  db,
  auth,
  storage,
  updateProfile,
  uploadBytes,
  getDownloadURL,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getStorage,
  ref
};
