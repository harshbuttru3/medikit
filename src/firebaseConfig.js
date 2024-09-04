// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3VxLhdKTGp9v_G4BlqWkVWOtoaXPqGW4",
  authDomain: "medikit-sih.firebaseapp.com",
  projectId: "medikit-sih",
  storageBucket: "medikit-sih.appspot.com",
  messagingSenderId: "900025291605",
  appId: "1:900025291605:web:4361f263eb6cd312ddd5dc",
  measurementId: "G-F2SLC7YQM6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);




export {auth };