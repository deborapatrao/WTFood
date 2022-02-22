// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLR77YqsfcQjR5__v8Jy3g9gc3rBuUMNY",
  authDomain: "wtfood-3d70f.firebaseapp.com",
  projectId: "wtfood-3d70f",
  storageBucket: "wtfood-3d70f.appspot.com",
  messagingSenderId: "1004008311332",
  appId: "1:1004008311332:web:0d1ffc3046cbcde0c6e6b1",
  measurementId: "G-JQRS52NPHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const auth = getAuth(app);

export default {db, auth};