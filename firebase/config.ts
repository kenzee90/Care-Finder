// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCiBw5virmebuiXksL4jvEJYzWLA3AV8AU",
  authDomain: "care-finder-2c42f.firebaseapp.com",
  projectId: "care-finder-2c42f",
  storageBucket: "care-finder-2c42f.appspot.com",
  messagingSenderId: "177723541297",
  appId: "1:177723541297:web:269d96e2fe527838f31210",
  measurementId: "G-3YQRBEVFHQ",
};

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;

