// ========================================
// Firebase Configuration
// Replace with YOUR Firebase config
// ========================================
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA_hykSdHPHwNQ8hyWARoVrKbkVj6HNaqM",
  authDomain: "personal-profile-8d284.firebaseapp.com",
  projectId: "personal-profile-8d284",
  storageBucket: "personal-profile-8d284.firebasestorage.app",
  messagingSenderId: "761930674862",
  appId: "1:761930674862:web:bc89c108f6ad194cdff33f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Collections
const messagesCollection = db.collection('messages');
const trainingsCollection = db.collection('trainings');
const projectsCollection = db.collection('projects');

console.log('✅ Firebase initialized successfully!');
