import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updatePassword as firebaseUpdatePassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';


export const loginUser = (email: string, pass: string) => {
  return signInWithEmailAndPassword(auth, email, pass);
};


export const registerUser = (email: string, pass: string) => {
  return createUserWithEmailAndPassword(auth, email, pass);
};


export const changeUserPassword = (user: User, newPassword: string) => {
  return firebaseUpdatePassword(user, newPassword);
};

export const logoutUser = () => {
  return firebaseSignOut(auth);
};

/** Lắng nghe thay đổi trạng thái user (Đăng nhập/Đăng xuất) */
export const subscribeAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};


export const getCurrentUser = () => {
  return auth.currentUser;
};
