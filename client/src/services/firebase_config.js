import firebaseConfigSecret from "./firebase_config_secret";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: firebaseConfigSecret.apiKey, //process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: firebaseConfigSecret.authDomain, //process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: firebaseConfigSecret.projectId, //process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: firebaseConfigSecret.storageBucket, //process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: firebaseConfigSecret.messagingSenderId, //process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: firebaseConfigSecret.appId, //process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: firebaseConfigSecret.measurementId, //process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export default firebaseConfig;
