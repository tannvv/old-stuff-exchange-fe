import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCVv1usMQZV4GhLBGVFoNad5Nezqpqebck',
    authDomain: 'old-stuff-exchange-3d9f0.firebaseapp.com',
    projectId: 'old-stuff-exchange-3d9f0',
    storageBucket: 'old-stuff-exchange-3d9f0.appspot.com',
    messagingSenderId: '540537203378',
    appId: '1:540537203378:web:b56c2e802c44401636f7ab',
    measurementId: 'G-4DLFT3SHEW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
