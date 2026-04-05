import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwakgXA1rf9her-9LlsTb7W8jl5O5zdiM",
  authDomain: "reactnativecrud-712d1.firebaseapp.com",
  projectId: "reactnativecrud-712d1",
  storageBucket: "reactnativecrud-712d1.firebasestorage.app", // Chỗ này quan trọng để up ảnh
  messagingSenderId: "704458126056",
  appId: "1:704458126056:web:a4b30ce1ee848f69554f5d",
  measurementId: "G-10XQ82ZQQV",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
