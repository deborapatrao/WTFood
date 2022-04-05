"use strict";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, getDocs,Timestamp, deleteDoc } from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  signOut,
  signInWithPopup,
  FacebookAuthProvider,
  getRedirectResult,
} from "firebase/auth";

// import firebase from "firebase/compat";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBLR77YqsfcQjR5__v8Jy3g9gc3rBuUMNY",
  authDomain: "wtfood-3d70f.firebaseapp.com",
  projectId: "wtfood-3d70f",
  storageBucket: "wtfood-3d70f.appspot.com",
  messagingSenderId: "1004008311332",
  appId: "1:1004008311332:web:0d1ffc3046cbcde0c6e6b1",
  measurementId: "G-JQRS52NPHD",
});

const auth = getAuth(firebaseApp);
const db = getFirestore();
const storage = getStorage(firebaseApp);

export {
  auth,
  db,
  storage,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  Timestamp,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  updateEmail,
  ref,
  listAll,
  uploadBytes,
  getDownloadURL,
  getRedirectResult,
  signInWithPopup,
  FacebookAuthProvider,
};
