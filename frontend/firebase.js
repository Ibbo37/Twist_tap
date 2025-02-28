import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "twistntape.firebaseapp.com",
  projectId: "twistntape",
  storageBucket: "twistntape.firebasestorage.app",
  messagingSenderId: "752497795615",
  appId: "1:752497795615:web:b5d4207728d5147ddc2b2a",
  measurementId: "G-Q8N6QF69T1"
};


export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);