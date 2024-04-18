import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyCwY9892TEgRk7GOtx8MeEVnnX43POQ2rI",
  authDomain: "photo-management-app-d288e.firebaseapp.com",
  projectId: "photo-management-app-d288e",
  storageBucket: "photo-management-app-d288e.appspot.com",
  messagingSenderId: "53287879801",
  appId: "1:53287879801:web:2415fcbf0f7a630a1440a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);

export const storage=getStorage(app);