// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
import { getMessaging,getToken } from "firebase/messaging";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBvAPX15kRggwgPtfOg9JE4iHRaAWTnEC8",
    authDomain: "cactus-afc8a.firebaseapp.com",
    projectId: "cactus-afc8a",
    storageBucket: "cactus-afc8a.appspot.com",
    messagingSenderId: "735758088618",
    appId: "1:735758088618:web:9249799fa79de9e6c913d3",
    measurementId: "G-SWCY3QQCXN"
  };
// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const colRef = collection(db,"Orders")
export const colRefPots = collection(db,"Pots")
export const colRefLang = collection(db,"Lang")
export const colRefCactus = collection(db,"Cactus")
