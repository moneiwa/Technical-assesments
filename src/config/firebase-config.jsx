import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDRHr5-XPMr1r9d15rFemHByFa9h2Zk07M",
    authDomain: "home-essential-51de9.firebaseapp.com",
    projectId: "home-essential-51de9",
    storageBucket: "home-essential-51de9.firebasestorage.app",
    messagingSenderId: "1011227330883",
    appId: "1:1011227330883:web:94d63380d42c3b2c9887f6",
    measurementId: "G-F3JK2S1L58"
  };
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


export { app, auth };
