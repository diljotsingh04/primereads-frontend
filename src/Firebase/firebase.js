// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "primereads-5a00f.firebaseapp.com",
    projectId: "primereads-5a00f",
    storageBucket: "primereads-5a00f.appspot.com",
    messagingSenderId: "1046554175541",
    appId: "1:1046554175541:web:7ca2b702f2f82236e3e97c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);