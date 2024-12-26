import firebase from 'firebase/app';
import 'firebase/firestore';
require('dotenv').config();

const collectionName = "db_pilot_test";

// Firebase Konfiguration
const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId || "no-firebase",
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// Firebase Initialisierung mit Error Handling
let db;
try {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  db = firebase.firestore();
  console.log('Firebase initialisiert');
} catch (error) {
  console.error('Firebase Fehler:', error);
  throw error;
}

const createFirebaseDocument = async (uniqueId) => {
  try {
    await db.collection(collectionName).doc(uniqueId).set({
      uniqueId,
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return { success: true, id: uniqueId };
  } catch (error) {
    console.error('Fehler:', error);
    throw error;
  }
};

// create a document in the collection with a random id
const createFirebaseDocumentRandom = () => {
  db.collection(collectionName).add({
    dateCreated: new Date(),
  });
};

const addToFirebase = (data) => {
  const uniqueId = data.uniqueId;

  db.collection(collectionName)
    .doc(uniqueId ?? "undefined")
    .collection("data")
    .doc(`trial_${data.trial_index}`)
    .set(data)
};

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore;
export {
  db,
  TimeStamp,
  GeoPoint,
  createFirebaseDocument,
  addToFirebase,
  createFirebaseDocumentRandom,
  collectionName,
};

export default firebase;