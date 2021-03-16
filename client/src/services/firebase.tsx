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
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const db = firebase.firestore();

export function authenticateAnonymously() {
  return firebase.auth().signInAnonymously();
}

export function signInWithEmailPassword(email: string, password: string) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}

export function getSimulatedDataFromDb(buildingId: string) {
  let username = "anonymous";
  const user = firebase.auth().currentUser;
  if (user) {
    // User is signed in.
    if (user.email !== null) username = user.email;
  }

  var docRef = db
    .collection("users")
    .doc(username)
    .collection("simulatedData")
    .doc(buildingId);

  return docRef.get();
}

export function writeSimulatedDataToDb(buildingId: string, simulatedData: any) {
  let username = "anonymous";
  const user = firebase.auth().currentUser;
  if (user) {
    // User is signed in.
    if (user.email !== null) username = user.email;
  }
  
  db.collection("users")
    .doc(username)
    .collection("simulatedData")
    .doc(buildingId)
    .set(simulatedData)
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}
