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

export function getSimulationFromDb(buildingId: string) {
  var docRef = db
    .collection("users")
    .doc("ericv")
    .collection("simulations")
    .doc(buildingId);

  return docRef.get();
}

export function writeSimulationToDb(buildingId: string, inventoryChanges: any) {
  db.collection("users")
    .doc("ericv")
    .collection("simulations")
    .doc(buildingId)
    .set(inventoryChanges, { merge: true })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}
