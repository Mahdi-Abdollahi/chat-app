// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCq48PUx1DkCW5DjHUIjM6yshwdKyHc_Xo",
  authDomain: "mock-telegram.firebaseapp.com",
  projectId: "mock-telegram",
  storageBucket: "mock-telegram.appspot.com",
  messagingSenderId: "35587954087",
  appId: "1:35587954087:web:a76e721328174d95609282",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  db,
  firebaseApp,
};
