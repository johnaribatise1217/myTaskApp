// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMrWUkFT_2-E00bV7huZXJD-Y-or57d4k",
  authDomain: "my-task-c5a96.firebaseapp.com",
  projectId: "my-task-c5a96",
  storageBucket: "my-task-c5a96.appspot.com",
  messagingSenderId: "986152917834",
  appId: "1:986152917834:web:5a8862fc779e6e28bb3fb3",
  measurementId: "G-8YDJTTTBDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);