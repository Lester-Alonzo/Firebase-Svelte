import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyCWt9DHLIRRtMD8B8uh-N8uJktQgx9_Ark",
    authDomain: "svelte-fire-91124.firebaseapp.com",
    projectId: "svelte-fire-91124",
    storageBucket: "svelte-fire-91124.appspot.com",
    messagingSenderId: "325746034806",
    appId: "1:325746034806:web:47bcf7841825d5746f3757"
  };

  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore()
  export const auth = firebase.auth()
  export const storage = firebase.storage().ref()