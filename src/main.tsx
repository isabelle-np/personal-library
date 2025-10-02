/**
 * @fileoverview Main entry point of the application.
 * This file initializes Firebase and renders the React application.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, get } from 'firebase/database';

/**
 * Firebase configuration object containing keys and identifiers for the app.
 * These values are loaded from environment variables.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/**
 * Initializes the Firebase application with the provided configuration.
 */
const app = initializeApp(firebaseConfig);

/**
 * Initializes Firebase Analytics for the application.
 */
const analytics = getAnalytics(app);

// Test Firebase connection by fetching data from the database
const testFirebaseConnection = async () => {
  try {
    const db = getDatabase(app);
    const testRef = ref(db, '/libraries'); // Replace 'test' with a valid path in your database
    const librariesRef = await get(testRef);

    if (librariesRef.exists()) {
      console.log('Firebase connection successful. Data:', librariesRef.val());
    } else {
      console.log('Firebase connection successful, but no data found at the specified path.');
    }
  } catch (error) {
    console.error('Error testing Firebase connection:', error);
  }
};

// Call the test function
void testFirebaseConnection();

/**
 * Renders the React application into the root DOM element.
 */
createRoot(document.getElementById('root')!).render(<App />);
