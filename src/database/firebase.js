import firebase from 'firebase'

import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyArGKk_GXNVMKW6h3jh-w3ExdoovjzclX4",
  authDomain: "app-pacientes-3c233.firebaseapp.com",
  databaseURL: "https://app-pacientes-3c233-default-rtdb.firebaseio.com",
  projectId: "app-pacientes-3c233",
  storageBucket: "app-pacientes-3c233.appspot.com",
  messagingSenderId: "947377784162",
  appId: "1:947377784162:web:ada0601a8c1d909bc2183b"
};

let fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref()