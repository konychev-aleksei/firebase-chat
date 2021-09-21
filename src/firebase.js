import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDrNJhenGWx4w57nKMecpyPPV4dIggz91g",
  authDomain: "first-app-c0fae.firebaseapp.com",
  databaseURL: "https://first-app-c0fae-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "first-app-c0fae",
  storageBucket: "first-app-c0fae.appspot.com",
  messagingSenderId: "238291386514",
  appId: "1:238291386514:web:9a2e29d56af696a5dca64b"
})

const db = firebaseApp.database()
const auth = firebase.auth()

export { db, auth }
