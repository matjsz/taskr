import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const config = {
  apiKey: "AIzaSyCNyxT3_YmcnTigCtqpSm3-ztGUfwMGxKA",
  authDomain: "taskr-dev-6ca60.firebaseapp.com",
  projectId: "taskr-dev-6ca60",
  storageBucket: "taskr-dev-6ca60.appspot.com",
  messagingSenderId: "778355376073",
  appId: "1:778355376073:web:2e2108b05f410aa7d0f218",
  measurementId: "G-0MW8ES399C"
}

const app = initializeApp(config);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage();

export { db, auth, storage } 