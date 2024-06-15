// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA81smMtisKGbh5szcP-xYj4MWZplFx7j8",
  authDomain: "clone-853e9.firebaseapp.com",
  projectId: "clone-853e9",
  storageBucket: "clone-853e9.appspot.com",
  messagingSenderId: "997486803582",
  appId: "1:997486803582:web:aa563f908ea84c81ef362f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app)  ;
export const database = getFirestore(app)