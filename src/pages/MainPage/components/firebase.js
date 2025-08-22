// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCvxzl6SEhfxEeMw_-jy3K2J0SYXA6Wr_0",
    authDomain: "iteci-c8bd4.firebaseapp.com",
    projectId: "iteci-c8bd4",
    storageBucket: "iteci-c8bd4.firebasestorage.app",
    messagingSenderId: "1095159323845",
    appId: "1:1095159323845:web:8c85b81296d72c806de4ac",
    measurementId: "G-3YRJKZ7G17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);