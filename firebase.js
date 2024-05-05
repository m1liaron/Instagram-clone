import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDvNG4R-p_w-iJOBCLUfGu_5IVgq1tQtIg",
    authDomain: "rn-instagram-clone-8f3f0.firebaseapp.com",
    projectId: "rn-instagram-clone-8f3f0",
    storageBucket: "rn-instagram-clone-8f3f0.appspot.com",
    messagingSenderId: "241677636929",
    appId: "1:241677636929:web:128bb317f8fe78c8d2fdc0",
    measurementId: "G-C4FN1XSBJL"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore()

export {app, db}