// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClmLGnTbzK2YTzicaS6s9lGsxxiBvGNLY",
  authDomain: "ai-travel-planner-bbd4f.firebaseapp.com",
  projectId: "ai-travel-planner-bbd4f",
  //storageBucket: "ai-travel-planner-bbd4f.firebasestorage.app",
  storageBucket: "ai-travel-planner-bbd4f.appspot.com", // ✅ Corrected
  messagingSenderId: "891133839631",
  appId: "1:891133839631:web:0d8377382d33dabd84d67a",
  measurementId: "G-TSCB69EYE8"
};

// Initialize Firebase
//export const app = initializeApp(firebaseConfig);
 const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// ✅ Initialize Firestore
export const db = getFirestore(app);

/* //✅ Initialize Firebase Auth with AsyncStorage
 export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});  */
// Ensure Firebase Auth is initialized with AsyncStorage persistence
export const auth = getApps().length
  ? getAuth(app)
  : initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
/* // Initialize Firebase Auth with AsyncStorage only if not already initialized
let auth;
if (!getAuth(app).app) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  auth = getAuth(app);
} */
//export const auth = getAuth(app);
//export const db  = getFirestore(app);
export {  app };
console.log('consoleapp', auth)

//const user = useAuthState();
//console.log(user); // Check if the user is logged in