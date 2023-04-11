// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN78Qkpjsxfhs6d2EREsAJJ353eK-KUeE",
  authDomain: "omaka-app.firebaseapp.com",
  databaseURL: "https://omaka-app-default-rtdb.firebaseio.com",
  projectId: "omaka-app",
  storageBucket: "omaka-app.appspot.com",
  messagingSenderId: "358970131793",
  appId: "1:358970131793:web:a3147789ac7b4488783f70"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

