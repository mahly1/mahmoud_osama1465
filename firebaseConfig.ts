// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2R8aqMApu_tvGO-1wQlR2GISCRzkCVCI",
  authDomain: "mahmoud-osama1465.firebaseapp.com",
  projectId: "mahmoud-osama1465",
  storageBucket: "mahmoud-osama1465.firebasestorage.app",
  messagingSenderId: "592345676512",
  appId: "1:592345676512:web:93a00d9392874cc67e2e85",
  measurementId: "G-E0X8Q3RKXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize and Export Services
export const db = getFirestore(app);
export const auth = getAuth(app);