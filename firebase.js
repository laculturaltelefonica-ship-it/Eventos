//Eventos/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAlJYIBiaTHu7Pkl9RZg8ia1mUVZ-5N4Sc",
  authDomain: "catering-2026.firebaseapp.com",
  projectId: "catering-2026",
  storageBucket: "catering-2026.appspot.com",
  messagingSenderId: "412063513316",
  appId: "1:412063513316:web:1288220d612eacd8c64af1"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);
