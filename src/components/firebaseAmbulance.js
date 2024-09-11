// src/firebaseAmbulanceConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";

// Secondary Firebase configuration (Ambulance app)
const FirebaseAmbulance = {
  apiKey: "AIzaSyDo1KJFMFOeOnaU0gmar-wwfTu9m_ov5G8",
  authDomain: "medikit-64ce3.firebaseapp.com",
  projectId: "medikit-64ce3",
  storageBucket: "medikit-64ce3.appspot.com",
  messagingSenderId: "588550100790",
  appId: "1:588550100790:web:c9923aba1d485f66114597",
  measurementId: "G-LG5X6G12TC"
};

// Initialize secondary Firebase app with a unique name
const ambulanceApp = initializeApp(FirebaseAmbulance, "ambulanceApp");

// Initialize Firebase Authentication and Firestore for the ambulance app
const ambulanceAuth = getAuth(ambulanceApp);
const ambulanceDb = getFirestore(ambulanceApp);

export { ambulanceAuth, RecaptchaVerifier, signInWithPhoneNumber, ambulanceDb, doc, setDoc, onSnapshot };
