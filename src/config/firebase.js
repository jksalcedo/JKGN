import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import admin from 'firebase-admin';
import serviceAccount from '../../service_account.json' assert { type: "json" };

import dotenv from 'dotenv';
dotenv.config();

// Firebase Client-side Configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase Client App
const app = initializeApp(firebaseConfig);

// Firebase Authentication Providers
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Firebase Admin Initialization
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://resume-builder-2024-2025-default-rtdb.asia-southeast1.firebasedatabase.app"

});

export {
  app,
  auth,
  admin,
  googleProvider,
  facebookProvider
};
// import admin from 'firebase-admin';
// import serviceAccount from '../../service_account.json' assert { type: "json" };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://resume-builder-2024-2025-default-rtdb.asia-southeast1.firebasedatabase.app"
// });

// const auth = admin.auth();

// export { auth };
