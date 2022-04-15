import { initializeApp } from "firebase/app"
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

// firebase api config
const firebaseConfig = {
    apiKey: "AIzaSyDRixhkWOwQuPuTUZABXevdvfujJOTfgWs",
    authDomain: "bulk-up-development.firebaseapp.com",
    projectId: "bulk-up-development",
    storageBucket: "bulk-up-development.appspot.com",
    messagingSenderId: "279084677677",
    appId: "1:279084677677:web:8ef2a8c6e679f2bb52d6a4"
  };

  initializeApp(firebaseConfig);

  //database and authentication refs
  const db = getFirestore();
  const auth = getAuth();

  export { db, auth };