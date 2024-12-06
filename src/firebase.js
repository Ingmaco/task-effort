import firebase from "firebase";
require("dotenv").config();
console.log(process.env)

const collectionName = "db_pilot_test";
const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId:  process.env.REACT_APP_projectId || "no-firebase",
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// Get a Firestore instance
const db = firebase.initializeApp(config).firestore();

// Add data to db
const createFirebaseDocument = (uniqueId) => {
  db.collection(collectionName).doc(uniqueId).set({
    uniqueId,
    dateCreated: new Date(),
  }); 
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

// Add this function to your firebase.js
const getUrlParameters = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    participantID: params.get('participantID'),
    studyID: params.get('studyID'),
    SESSION_ID: params.get('SESSION_ID')
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
  saveUrlParameters
};

export default firebase;
