import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDNGZGHVAvyEwEsL4JhFDGYHeazaFBnEP8",
  authDomain: "todo-app-ac28f.firebaseapp.com",
  projectId: "todo-app-ac28f",
  storageBucket: "todo-app-ac28f.appspot.com",
  messagingSenderId: "906273370803",
  appId: "1:906273370803:web:f6603d8d0d1efe79cd76c6",
  measurementId: "G-ND5WX9TPKG"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebaseApp.auth()
export const storage = firebaseApp.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();