import firebase from 'firebase/app';
import 'firebase/firestore';
require("dotenv").config();

const collectionName = "db_pilot_test";

// ID-Validierung und Extraktion
const getValidId = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('PROLIFIC_PID') || 
         params.get('participantID') || 
         `user_${Date.now()}`;
};

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

// Firestore Dokument erstellen
const createFirebaseDocument = async () => {
  try {
    const id = getValidId();
    
    if (!id) {
      throw new Error("Keine gültige ID gefunden");
    }

    console.log('Verwende ID:', id);

    const docRef = db.collection(collectionName).doc(id);
    await docRef.set({
      id: id,
      studyId: new URLSearchParams(window.location.search).get('studyID') || 'unknown',
      sessionId: new URLSearchParams(window.location.search).get('SESSION_ID') || 'unknown',
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      source: id.startsWith('user_') ? 'generated' : 'url'
    });

    console.log('Dokument erstellt:', id);
    return id;
  } catch (error) {
    console.error('Fehler beim Erstellen:', error);
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
  const docId = params.get('PROLIFIC_PID') || params.get('participantID');
  
  if (!docId) {
    console.warn('Keine ID in URL gefunden');
    return null;
  }
  
  return {
    id: docId,
    studyId: params.get('STUDY_ID') || params.get('studyID') || 'unknown',
    sessionId: params.get('SESSION_ID') || 'unknown',
    source: params.get('PROLIFIC_PID') ? 'prolific' : 'url'
  };
};

// Function to save these specific parameters
const saveUrlParameters = async () => {
  try {
    const params = getUrlParameters();
    
    if (!params || !params.id) {
      throw new Error('Keine gültige ID gefunden');
    }

    await db.collection(collectionName).doc(params.id).set({
      ...params,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      created: new Date().toISOString()
    });

    console.log('Daten gespeichert für ID:', params.id);
    return params.id;
  } catch (error) {
    console.error('Fehler beim Speichern:', error);
    throw error;
  }
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
