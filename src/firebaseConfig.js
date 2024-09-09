// Import the necessary functions from Firebase v9 SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB3VxLhdKTGp9v_G4BlqWkVWOtoaXPqGW4",
//   authDomain: "medikit-sih.firebaseapp.com",
//   projectId: "medikit-sih",
//   storageBucket: "medikit-sih.appspot.com",
//   messagingSenderId: "900025291605",
//   appId: "1:900025291605:web:4361f263eb6cd312ddd5dc",
//   measurementId: "G-F2SLC7YQM6"
// };
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

// Optionally enable analytics (only in browser environment)
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// Initialize Firebase Authentication and export it
const auth = getAuth(app);

//Initialize firestore database
const db = getFirestore(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber, db };
