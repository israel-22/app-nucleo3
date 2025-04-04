
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOwu_ae9nTS04o1UcwmQlcetOG3LNsz_o",
  authDomain: "app-education-dbc87.firebaseapp.com",
  databaseURL: "https://app-education-dbc87-default-rtdb.firebaseio.com",
  projectId: "app-education-dbc87",
  storageBucket: "app-education-dbc87.firebasestorage.app",
  messagingSenderId: "967878317891",
  appId: "1:967878317891:web:939863357c1a7cce0f81f6",
  measurementId: "G-9E0DZJCVZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
