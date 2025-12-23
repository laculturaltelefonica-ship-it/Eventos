//Eventos/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "TU_API_KEY_REAL",
  authDomain: "catering-2026.firebaseapp.com",
  projectId: "catering-2026",
  storageBucket: "catering-2026.appspot.com",
  messagingSenderId: "412063513316",
  appId: "TU_APP_ID_REAL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
