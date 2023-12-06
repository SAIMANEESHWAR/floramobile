import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDDYipGmzqBTyTXJrE383wwPBa0l6eSyOU",
    authDomain: "floramobileapp.firebaseapp.com",
    projectId: "floramobileapp",
    storageBucket: "floramobileapp.appspot.com",
    messagingSenderId: "238086629906",
    appId: "1:238086629906:web:23d80d80bca5bc8eea06cb",
    measurementId: "G-84875KFCEZ"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export {firebase};