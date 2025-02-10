import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
require('dotenv').config();

const collectionName = "db_pilot_test";

// Firebase Konfiguration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId || "no-firebase",
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const createFirebaseDocument = async (uniqueId) => {
  try {
    const docRef = doc(db, collectionName, uniqueId);
    await setDoc(docRef, {
      uniqueId,
      dateCreated: serverTimestamp(),
    });
    return { success: true, id: uniqueId };
  } catch (error) {
    console.error('Fehler:', error);
    throw error;
  }
};

const createFirebaseDocumentRandom = async () => {
  try {
    await addDoc(collection(db, collectionName), {
      dateCreated: new Date(),
    });
  } catch (error) {
    console.error('Fehler:', error);
    throw error;
  }
};

const addToFirebase = async (data) => {
  const uniqueId = data.uniqueId;
  try {
    const docRef = doc(db, collectionName, uniqueId ?? "undefined", "data", `trial_${data.trial_index}`);
    await setDoc(docRef, data);
  } catch (error) {
    console.error('Fehler:', error);
    throw error;
  }
};

export {
  db,
  createFirebaseDocument,
  addToFirebase,
  createFirebaseDocumentRandom,
  collectionName,
};