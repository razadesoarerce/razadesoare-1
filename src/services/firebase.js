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
  apiKey: "AIzaSyCV0LR77s20XldprHJSwhItHiSQ4D4lTW8",
  authDomain: "scoala-raza-de-soare.firebaseapp.com",
  projectId: "scoala-raza-de-soare",
  storageBucket: "scoala-raza-de-soare.firebasestorage.app",
  messagingSenderId: "644677271758",
  appId: "1:644677271758:web:6ecbd78c0596bc65b5509f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);