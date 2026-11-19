
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase. If the settings are missing or invalid, the site still renders
// from its built-in data instead of crashing to a blank page.
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import type { FirebaseStorage } from 'firebase/storage';

let db_: Firestore | null = null;
let auth_: Auth | null = null;
let storage_: FirebaseStorage | null = null;

try {
  const app = initializeApp(firebaseConfig);
  db_ = getFirestore(app);
  auth_ = getAuth(app);
  storage_ = getStorage(app);
} catch (error) {
  console.warn('Firebase is not configured; using built-in data only.', error);
  db_ = null;
  auth_ = null;
  storage_ = null;
}

export const firebaseReady = db_ !== null && auth_ !== null;
export const db = db_ as Firestore;
export const auth = auth_ as Auth;
export const storage = storage_ as FirebaseStorage;
