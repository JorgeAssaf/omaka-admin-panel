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
  appId: "1:358970131793:web:a3147789ac7b4488783f70",
  measurementId: "G-HKT710JYT6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export function obtenerMensajeErrorFirebaseAuth(codigoError) {
  switch (codigoError) {
    case "auth/user-not-found":
      return "No se encontró ningún usuario con esta dirección de correo electrónico.";
    case "auth/wrong-password":
      return "La contraseña es incorrecta.";
    case "auth/email-already-in-use":
      return "Ya existe una cuenta con esta dirección de correo electrónico.";
    case "auth/invalid-email":
      return "La dirección de correo electrónico no es válida.";
    case "auth/weak-password":
      return "La contraseña es demasiado débil. Debe tener al menos 6 caracteres.";
    case "auth/too-many-requests":
      return "Se han enviado demasiadas solicitudes en un corto período de tiempo. Por favor, inténtalo de nuevo más tarde.";
    default:
      return "Ha ocurrido un error. Por favor, inténtalo de nuevo.";
  }
}