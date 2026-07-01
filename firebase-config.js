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

// Add this to firebase-config.js or run in console
const trainingData = [
    {
        title: "Data Science Essential with Python",
        description: "Comprehensive training covering data analysis, visualization, machine learning fundamentals, and Python programming for data science applications.",
        icon: "fa-database",
        year: "2025",
        status: "Certificate"
    },
    {
        title: "Introduction to Natural Language Processing",
        description: "In-depth exploration of NLP techniques including tokenization, sentiment analysis, language modeling, and practical applications using modern libraries.",
        icon: "fa-robot",
        year: "2025",
        status: "Certificate"
    },
    {
        title: "Scrum Foundation Professional Certification",
        description: "Professional certification covering agile methodologies, Scrum framework, sprint planning, and effective team collaboration in software development.",
        icon: "fa-tasks",
        year: "2026",
        status: "Certified"
    }
];

// Run in browser console to add data
trainingData.forEach(async (training) => {
    await firebase.firestore().collection('trainings').add(training);
});

// Add your project
await firebase.firestore().collection('projects').add({
    title: "TheFolio - Personal Portfolio Builder",
    description: "A modern portfolio website builder designed for developers and creatives. This project showcases responsive design, smooth animations, and professional UI/UX principles.",
    icon: "fa-rocket",
    link: "http://thefolio-fayk.vercel.app/?authuser=0",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive"],
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
});
