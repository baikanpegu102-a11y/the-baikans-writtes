import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVRFj-Vv3XPDB8o8wxY3PIH8rf5ifGFDo",
  authDomain: "the-baikan-s-writtes.firebaseapp.com",
  projectId: "the-baikan-s-writtes",
  storageBucket: "the-baikan-s-writtes.firebasestorage.app",
  messagingSenderId: "390810355492",
  appId: "1:390810355492:web:0dc8ddbe8221bd5284d5b1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
