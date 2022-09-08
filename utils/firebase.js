import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const config = {
    apiKey: "AIzaSyD7UpQWTk_1pf-pPRRX8v8RGOdwDtnOh4U",
    authDomain: "taskr-8e593.firebaseapp.com",
    projectId: "taskr-8e593",
    storageBucket: "taskr-8e593.appspot.com",
    messagingSenderId: "745634752665",
    appId: "1:745634752665:web:48c704505f434f34cf3008",
    measurementId: "G-ZP0RVDLD76"
}

const app = initializeApp(config);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage();

export { db, auth, storage } 