// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6chF2AxzqkwaH-CDV6YpLMEGW_yNFjQw",
  authDomain: "nextjs-auth-project-3d943.firebaseapp.com",
  projectId: "nextjs-auth-project-3d943",
  storageBucket: "nextjs-auth-project-3d943.appspot.com",
  messagingSenderId: "746891276340",
  appId: "1:746891276340:web:203dbfb5775d9406a11a61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)