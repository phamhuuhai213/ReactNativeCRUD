// 1. Phải import getFirestore từ thư viện firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Cấu hình của bạn giữ nguyên (rất tốt)
const firebaseConfig = {
  apiKey: "AIzaSyBwakgXA1rf9her-9LlsTb7W8jl5O5zdiM",
  authDomain: "reactnativecrud-712d1.firebaseapp.com",
  projectId: "reactnativecrud-712d1",
  storageBucket: "reactnativecrud-712d1.firebasestorage.app",
  messagingSenderId: "704458126056",
  appId: "1:704458126056:web:a4b30ce1ee848f69554f5d",
  measurementId: "G-10XQ82ZQQV",
};

// 2. Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// 3. Khởi tạo và EXPORT database để dùng ở file khác
// Lưu ý: Bỏ cái analytics đi cho đỡ rắc rối lúc mới học
export const db = getFirestore(app);
