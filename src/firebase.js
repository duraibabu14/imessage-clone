import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcVlQv5r74ixTi67aDQbSADF9PSvkcD18",
  authDomain: "imessage-clone-2d4c9.firebaseapp.com",
  databaseURL: "https://imessage-clone-2d4c9.firebaseio.com",
  projectId: "imessage-clone-2d4c9",
  storageBucket: "imessage-clone-2d4c9.appspot.com",
  messagingSenderId: "362854245119",
  appId: "1:362854245119:web:782416677c249042ea22ca",
  measurementId: "G-FKL0H10Y30"
};

  const firebaseApp=firebase.initializeApp(firebaseConfig)

  const db =firebaseApp.firestore()

  const auth=firebase.auth()
  
  const provider=new firebase.auth.GoogleAuthProvider()

  export  {auth,provider}
  export default db