// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "yosotrial.firebaseapp.com",
  projectId: "yosotrial",
  storageBucket: "yosotrial.appspot.com",
  messagingSenderId: "901461000876",
  appId: "1:901461000876:web:4a140c603a0d4043099509",
  measurementId: "G-KZPXSJHBEL"
};

// Initialize Firebase
const app=!getApps.length()?initializeApp(firebaseConfig) :getApp();
const db=getFirestore()
const storage=getStorage();
//const app = initializeApp(firebaseConfig);
const analytics = getAnalytics();
export {app,db,storage}