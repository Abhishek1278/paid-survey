// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Replace this config object with your own Firebase credentials
const firebaseConfig = {
    apiKey: "AIzaSyB7zJYyBDbUf0g7J7aiXb1kbIHokwnnPuI",
    authDomain: "prank-baf04.firebaseapp.com",
    projectId: "prank-baf04",
    storageBucket: "prank-baf04.appspot.com",
    messagingSenderId: "973383143632",
    appId: "1:973383143632:web:dc623fad22d56d2294ced5",
    measurementId: "G-ENWKC9W4FQ"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebaseApp);

export { db };
