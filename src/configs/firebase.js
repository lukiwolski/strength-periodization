import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyB6-fx0w6JgBXftDCZm61Th0THD3tK--qo',
  authDomain: 'strength-periodization.firebaseapp.com',
  databaseURL: 'https://strength-periodization.firebaseio.com',
  projectId: 'strength-periodization',
  storageBucket: 'strength-periodization.appspot.com',
  messagingSenderId: '873515561529',
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export const firestore = firebase
  .firestore()
  .enablePersistence()
  .then(() => firebase.firestore())
  .catch(error => firebase.firestore());

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
