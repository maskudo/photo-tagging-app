// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6i8tCs_gv3J8pOBQy-MRNll8hzXebyuw",
  authDomain: "photo-tagging-game-29e4c.firebaseapp.com",
  projectId: "photo-tagging-game-29e4c",
  storageBucket: "photo-tagging-game-29e4c.appspot.com",
  messagingSenderId: "517683011094",
  appId: "1:517683011094:web:e60294cc74dd00bcd81f37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Firestore
export  const db = getFirestore(app)