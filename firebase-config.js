// ========================================
// Firebase Configuration
// Replace with YOUR Firebase config
// ========================================

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Collections
const messagesCollection = db.collection('messages');
const trainingsCollection = db.collection('trainings');
const projectsCollection = db.collection('projects');

console.log('✅ Firebase initialized successfully!');
