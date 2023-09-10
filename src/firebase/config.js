import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcwYFMbewok_htHKOXaoXaLKH5nTnDKvQ",
  authDomain: "my-app-b24da.firebaseapp.com",
  projectId: "my-app-b24da",
  storageBucket: "my-app-b24da.appspot.com",
  messagingSenderId: "370896047589",
  appId: "1:370896047589:web:5ff9c8f5ba3ceec4eeb30c"
};


// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { firebaseApp, db };
