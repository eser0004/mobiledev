import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOhP4vynGTGoEYCB2NhReyZ4c9XWKHmbg",
  authDomain: "notes-app-5d730.firebaseapp.com",
  projectId: "notes-app-5d730",
  storageBucket: "notes-app-5d730.firebasestorage.app",
  messagingSenderId: "546210161344",
  appId: "1:546210161344:web:f9bda99aa88afe5e32c325"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };