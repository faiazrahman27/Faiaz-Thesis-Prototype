import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBuIjj6NFbTVp9rucZ68VOo0RjfVrb5VRw",
  authDomain: "bijoy-pay.firebaseapp.com",
  projectId: "bijoy-pay",
  storageBucket: "bijoy-pay.appspot.com", // Corrected storageBucket URL
  messagingSenderId: "628738491960",
  appId: "1:628738491960:web:1003a3e174821e3b2688cd",
  measurementId: "G-RGLXTEE41P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
