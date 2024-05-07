// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAR1Jv2Q1gznL1vLM4W58rLrNp_3E7bONM",
  authDomain: "otp-project-2d886.firebaseapp.com",
  projectId: "otp-project-2d886",
  storageBucket: "otp-project-2d886.appspot.com",
  messagingSenderId: "1041933322366",
  appId: "1:1041933322366:web:11ac60ceed67be5e7ab02f",
  measurementId: "G-Z156SBPJHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
