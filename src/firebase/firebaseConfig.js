// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBp14IwAv9hRl3QPYT_aTZAZMQzLZ_ldfk',
  authDomain: 'social-site-992bb.firebaseapp.com',
  projectId: 'social-site-992bb',
  storageBucket: 'social-site-992bb.appspot.com',
  messagingSenderId: '449389309649',
  databaseURL: 'https://social-site-992bb-default-rtdb.firebaseio.com',
  appId: '1:449389309649:web:9fd8ddc10fd99853ec1ff0',
  measurementId: 'G-8NW0SZKFZJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
