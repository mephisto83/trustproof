import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC4wMBIXUmcbV1Z3e4xqk75m-BGOfnUknA",
  authDomain: "trustproof-saas.firebaseapp.com",
  projectId: "trustproof-saas",
  storageBucket: "trustproof-saas.firebasestorage.app",
  messagingSenderId: "181314117188",
  appId: "1:181314117188:web:e85bb40d075e7d667c2611"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;
