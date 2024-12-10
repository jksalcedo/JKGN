import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';
import {
    getAuth, GoogleAuthProvider, FacebookAuthProvider,
    signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect, signOut
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyCIpnqe8ButjkaYwYVvNNIWdrp6DoG7g-g",
    authDomain: "resume-builder-2024-2025.firebaseapp.com",
    databaseURL: "https://resume-builder-2024-2025-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "resume-builder-2024-2025",
    storageBucket: "resume-builder-2024-2025.firebasestorage.app",
    messagingSenderId: "909281259225",
    appId: "1:909281259225:web:359651e042a30cd3de18c8",
    measurementId: "G-PM07P6HXLK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect, signOut }; 
