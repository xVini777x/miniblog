import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDDe33aJjvg1kuq66YJ6ccSBXp-SElWqIk",
  authDomain: "miniblog-edf06.firebaseapp.com",
  projectId: "miniblog-edf06",
  storageBucket: "miniblog-edf06.appspot.com",
  messagingSenderId: "1034757669400",
  appId: "1:1034757669400:web:746c7d2928e1a80470396d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
