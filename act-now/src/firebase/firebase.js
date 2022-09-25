import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBsl80W-uRQcvl9Xwen11wIRHpEuWFeVG0",
  authDomain: "actnow-18afb.firebaseapp.com",
  projectId: "actnow-18afb",
  storageBucket: "actnow-18afb.appspot.com",
  messagingSenderId: "266508502989",
  appId: "1:266508502989:web:5cfda95f39316da14de684",
  measurementId: "G-38Y0D75G0G"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {
  db,
  auth,
  storage
};