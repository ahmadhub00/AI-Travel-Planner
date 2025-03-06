// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClmLGnTbzK2YTzicaS6s9lGsxxiBvGNLY",
  authDomain: "ai-travel-planner-bbd4f.firebaseapp.com",
  projectId: "ai-travel-planner-bbd4f",
  storageBucket: "ai-travel-planner-bbd4f.firebasestorage.app",
  messagingSenderId: "891133839631",
  appId: "1:891133839631:web:0d8377382d33dabd84d67a",
  measurementId: "G-TSCB69EYE8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

