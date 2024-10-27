// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, query, QuerySnapshot, deleteDoc, onSnapshot } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5ZteYyUH4q9NXVIwm59KKfUz2cIJ48vg",
  authDomain: "shoppinglist-66189.firebaseapp.com",
  projectId: "shoppinglist-66189",
  storageBucket: "shoppinglist-66189.appspot.com",
  messagingSenderId: "89631423159",
  appId: "1:89631423159:web:d6d6e1f459624128152b32"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const firestore = getFirestore()

const SHOPPINGLIST = 'shoppinglist'

export {
    firestore,
    collection,
    doc,
    addDoc,
    query,
    deleteDoc,
    QuerySnapshot,
    onSnapshot,
    SHOPPINGLIST
};