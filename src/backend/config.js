import firebase from 'firebase'

// Optionally import the services that you want to use
// import "firebase/auth";
import 'firebase/database'
import 'firebase/firestore'
// import "firebase/functions";
import 'firebase/storage'
import 'firebase/database'

let config = {
  apiKey: 'AIzaSyDfIcpmwx3t_6wcX6OV_U6eB0BaYLWjNL4',
  authDomain: 'workhallacademy.firebaseapp.com',
  databaseURL: 'https://workhallacademy.firebaseio.com',
  projectId: 'workhallacademy',
  storageBucket: 'workhallacademy.appspot.com',
  messagingSenderId: '829039684922',
  appId: '1:829039684922:web:68c268a63c75ec2e9d7403',
  measurementId: 'G-7ZZ0V1D45S',
}

let fire = firebase.initializeApp(config)

let db = fire.database()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const database = firebase.database()
export default firebase
export { db }
