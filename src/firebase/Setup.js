import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA81smMtisKGbh5szcP-xYj4MWZplFx7j8",
  authDomain: "clone-853e9.firebaseapp.com",
  projectId: "clone-853e9",
  storageBucket: "clone-853e9.appspot.com",
  messagingSenderId: "997486803582",
  appId: "1:997486803582:web:aa563f908ea84c81ef362f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getFirestore(app);
