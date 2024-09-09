// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJPlUgFYpfrBa9044kbscSrWAKkOtF6sc",
  authDomain: "autorepliertwitterbot-7368d.firebaseapp.com",
  projectId: "autorepliertwitterbot-7368d",
  storageBucket: "autorepliertwitterbot-7368d.appspot.com",
  messagingSenderId: "508513754438",
  appId: "1:508513754438:web:25e5020a16beb8af7f1947",
  measurementId: "G-DEWR6CBKTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { app }