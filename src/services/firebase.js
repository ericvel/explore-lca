// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import firebaseConfig from "./firebase_config";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously();
};

// Add a second document with a generated ID.
db.collection("users")
  .add({
    first: "Alan",
    middle: "Mathison",
    last: "Turing",
    born: 1912,
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
