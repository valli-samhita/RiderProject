import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDm8cCV3hFdZ3YjyBO5RX24WSoVbm6HB7k",
    authDomain: "ecomob-20b80.firebaseapp.com",
    projectId: "ecomob-20b80",
    storageBucket: "ecomob-20b80.appspot.com",
    messagingSenderId: "610268131813",
    appId: "1:610268131813:web:943f6b7d3b5523597e7f0c",
    measurementId: "G-H7311DLGNP"
  };
  const app=initializeApp(firebaseConfig);
  export const auth=getAuth(app);