import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'trustproof-saas.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'trustproof-saas',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'trustproof-saas.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_MESSAGING_SENDER_ID',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'YOUR_APP_ID',
};

// Validate Firebase configuration
const isConfigValid =
  firebaseConfig.apiKey !== 'YOUR_API_KEY' &&
  firebaseConfig.messagingSenderId !== 'YOUR_MESSAGING_SENDER_ID' &&
  firebaseConfig.appId !== 'YOUR_APP_ID';

let app: any;
let auth: any;

if (isConfigValid) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} else {
  console.warn('Firebase configuration is incomplete. Please set environment variables.');
}

export { auth, app };
