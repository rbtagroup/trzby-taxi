import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged as onState, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID'
};
initializeApp(firebaseConfig);
const auth = getAuth();

export function onAuthStateChanged(callback) {
  callback(undefined);
  return onState(auth, user => callback(user));
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}