// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAbJhOOSGQJkDOoYHt3RwxiiIuV1y8ao8",
  authDomain: "ticketmatevehicle.firebaseapp.com",
  projectId: "ticketmatevehicle",
  storageBucket: "ticketmatevehicle.appspot.com",
  messagingSenderId: "735360797437",
  appId: "1:735360797437:web:9e1367a1191dd831cb4c94",
  measurementId: "G-YB0P7VE73B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const FirStorage = getStorage(app);