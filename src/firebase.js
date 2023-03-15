// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGoRavWVxxyTP6P8HgAlD7g8uXBGIZjkE",
  authDomain: "react-web-app-94f81.firebaseapp.com",
  projectId: "react-web-app-94f81",
  storageBucket: "react-web-app-94f81.appspot.com",
  messagingSenderId: "994691441187",
  appId: "1:994691441187:web:fce6b5ebbf8bf5a1f20796"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;