// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ1NJYcIA6t1bqKQuCoZbZwdNClhTXIcY",
  authDomain: "maglo-62c90.firebaseapp.com",
  projectId: "maglo-62c90",
  storageBucket: "maglo-62c90.appspot.com",
  messagingSenderId: "844314651391",
  appId: "1:844314651391:web:469fd33c7a6dccb0593aca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);