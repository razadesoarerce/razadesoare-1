import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 🔹 PUNE AICI CONFIG-UL TĂU DIN FIREBASE CONSOLE
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAClpjoowCtrGANfG9NdIonvhNOq-4c64o",
  authDomain: "razadesoare-edd51.firebaseapp.com",
  projectId: "razadesoare-edd51",
  storageBucket: "razadesoare-edd51.firebasestorage.app",
  messagingSenderId: "283097401369",
  appId: "1:283097401369:web:2277fdf94a872e61bf0288"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);