// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByafH7V9NNqnyvoq4UW4daXAJ4GiW6I4g",
  authDomain: "medikit-d5e89.firebaseapp.com",
  projectId: "medikit-d5e89",
  storageBucket: "medikit-d5e89.appspot.com",
  messagingSenderId: "770935291198",
  appId: "1:770935291198:web:dc60d93e0d64d566df806f",
  measurementId: "G-KW98BVQJNG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber, db, doc, setDoc, onSnapshot };
