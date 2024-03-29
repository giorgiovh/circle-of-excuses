import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAjEduEa0XXMnpCGcbEvts3zquRJkN3j9s",
  authDomain: "circle-of-excuses-site.firebaseapp.com",
  projectId: "circle-of-excuses-site",
  storageBucket: "circle-of-excuses-site.appspot.com",
  messagingSenderId: "584891291324",
  appId: "1:584891291324:web:81a3dea3a4d35b70b2a2b9"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

// Google auth provider
const provider = new firebase.auth.GoogleAuthProvider();

export { projectFirestore, projectAuth, projectStorage, timestamp, provider }