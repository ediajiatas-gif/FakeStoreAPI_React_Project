// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiEUnGT6uvy5zWZm9K6c5saWrve3l9xws",
  authDomain: "e-commerce-app-fe917.firebaseapp.com",
  projectId: "e-commerce-app-fe917",
  storageBucket: "e-commerce-app-fe917.firebasestorage.app",
  messagingSenderId: "55516234018",
  appId: "1:55516234018:web:c7617bfa244d1489c8257b",
  measurementId: "G-JZ1V56HPMK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);