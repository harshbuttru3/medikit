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
  apiKey: "AIzaSyDo1KJFMFOeOnaU0gmar-wwfTu9m_ov5G8",
  authDomain: "medikit-64ce3.firebaseapp.com",
  projectId: "medikit-64ce3",
  storageBucket: "medikit-64ce3.appspot.com",
  messagingSenderId: "588550100790",
  appId: "1:588550100790:web:c9923aba1d485f66114597",
  measurementId: "G-LG5X6G12TC"
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
