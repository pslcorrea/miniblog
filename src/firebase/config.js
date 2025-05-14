// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9woEBi3NQX-TwQnFSOC6zLw8ALYlFhQI",
  authDomain: "miniblog-f4652.firebaseapp.com",
  projectId: "miniblog-f4652",
  storageBucket: "miniblog-f4652.firebasestorage.app",
  messagingSenderId: "1053945571488",
  appId: "1:1053945571488:web:00b9e4fec9da34e20701c5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
