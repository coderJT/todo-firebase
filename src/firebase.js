// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaYD16OQXabbWBBLgurwYiVSgJ9IM4-SM",
  authDomain: "todo-75f72.firebaseapp.com",
  projectId: "todo-75f72",
  storageBucket: "todo-75f72.firebasestorage.app",
  messagingSenderId: "790071492802",
  appId: "1:790071492802:web:827db1da6d4a884f3abb5b",
  measurementId: "G-CNBLL54X6K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.log('The current browser doesn\'t support persistence.');
    }
  });

export { db };

