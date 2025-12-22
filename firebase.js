//Eventos/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlJYIBiaTHu7Pkl9RZg8ia1mUVZ-5N4Sc",
  authDomain: "catering-2026.firebaseapp.com",
  projectId: "catering-2026",
  storageBucket: "catering-2026.firebasestorage.app",
  messagingSenderId: "412063513316",
  appId: "1:412063513316:web:1288220d612eacd8c64af1",
  measurementId: "G-8QHEZQWF3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);