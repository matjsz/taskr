import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const config = {
  apiKey: "AIzaSyDF2DrBIUz0TargZELkeZJg81uPQbnFPoQ",
  authDomain: "taskr-dev2.firebaseapp.com",
  projectId: "taskr-dev2",
  storageBucket: "taskr-dev2.appspot.com",
  messagingSenderId: "1041625988253",
  appId: "1:1041625988253:web:d8b7639f324e4a85452874",
  measurementId: "G-4SK9BVSGVP"
}

const app = initializeApp(config);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage();

export { db, auth, storage } 