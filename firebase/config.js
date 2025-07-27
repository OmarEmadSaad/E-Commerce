import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAPFSf1GJ_LyV79eLJG6zBOI2eSKeHdZ98",
  authDomain: "e-commerce-db-4c37a.firebaseapp.com",
  databaseURL: "https://e-commerce-db-4c37a-default-rtdb.firebaseio.com",
  projectId: "e-commerce-db-4c37a",
  storageBucket: "e-commerce-db-4c37a.appspot.com",
  messagingSenderId: "291619752496",
  appId: "1:291619752496:web:f9952401a02b0c3fdc7bf5",
  measurementId: "G-WZMHNSWFPV",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getDatabase(app);
