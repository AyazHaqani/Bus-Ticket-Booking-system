import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration (without Analytics for free tier)
const firebaseConfig = {
    apiKey: "AIzaSyABdFnsG08Hp2cov6S60SZ2WdSBM6jRc_A",
    authDomain: "bus-ticket-booking-syst.firebaseapp.com",
    projectId: "bus-ticket-booking-syst",
    storageBucket: "bus-ticket-booking-syst.firebasestorage.app",
    messagingSenderId: "327921401511",
    appId: "1:327921401511:web:2ce3cb302d2e78f204a582"
    // Note: Removed measurementId to disable Analytics and stay in free tier
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app; 