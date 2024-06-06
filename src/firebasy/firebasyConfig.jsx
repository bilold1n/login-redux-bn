// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnGQkSO_c1_HDcQHW8AYFI2J5QswQ2CTY",
  authDomain: "myproject-7036d.firebaseapp.com",
  projectId: "myproject-7036d",
  storageBucket: "myproject-7036d.appspot.com",
  messagingSenderId: "361999099812",
  appId: "1:361999099812:web:7fadef90127ee8df88c331",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
