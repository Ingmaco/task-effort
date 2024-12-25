import firebase from 'firebase/app';
import 'firebase/firestore';
import { getProlificId } from "./lib/utils";
require("dotenv").config();

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

// Firebase initialisieren
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// Firestore initialisieren
const db = firebase.firestore();

// Add data to db
const createFirebaseDocument = async () => {
  try {
    const params = getUrlParameters();
    if (!params?.prolificId) {
      throw new Error("Keine Prolific ID gefunden");
    }

    const docRef = db.collection(collectionName).doc(params.prolificId);
    await docRef.set({
      ...params,
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
      platform: 'prolific'
    });

    console.log("Dokument erstellt:", params.prolificId);
    return params.prolificId;
  } catch (error) {
    console.error("Fehler:", error);
    throw error;
  }
};

// create a document in the collection with a random id
const createFirebaseDocumentRandom = () => {
  db.collection(collectionName).add({
    dateCreated: new Date(),
  });
};

const addToFirebase = async (data) => {
  try {
    const prolificId = getProlificId();
    const docRef = db.collection(collectionName).doc(prolificId);
    const trialRef = docRef.collection("data").doc(`trial_${data.trial_index}`);
    
    await trialRef.set({
      ...data,
      prolificId,
      timestamp: new Date()
    });
    
    console.log("Daten gespeichert für Trial:", data.trial_index);
  } catch (error) {
    console.error("Fehler beim Speichern:", error);
    throw error;
  }
};

// Add this function to your firebase.js
const getUrlParameters = () => {
  const params = new URLSearchParams(window.location.search);
  const prolificId = params.get('PROLIFIC_PID');
  
  if (!prolificId) {
    console.warn('Keine PROLIFIC_PID in URL gefunden');
    return null;
  }
  
  return {
    prolificId,
    studyId: params.get('STUDY_ID') || 'unknown',
    sessionId: params.get('SESSION_ID') || 'unknown'
  };
};

// Function to save these specific parameters
const saveUrlParameters = () => {
  const params = getUrlParameters();
  return db.collection(collectionName).doc(params.participantID || 'unknown').set({
    ...params,
    timestamp: new Date()
  });
};

const testFirestoreAccess = async () => {
  try {
    const testRef = db.collection(collectionName).doc('test');
    await testRef.set({
      test: true,
      timestamp: new Date()
    });
    console.log("Firestore Zugriff OK");
    return true;
  } catch (error) {
    console.error("Firestore Zugriff fehlgeschlagen:", error);
    return false;
  }
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
  getUrlParameters,
  saveUrlParameters,
  testFirestoreAccess
};

export default firebase;
