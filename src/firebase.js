import firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/analytics';

var firebaseConfig = {
    apiKey: "AIzaSyDnBB4-XvElCdlkyYBtPxtV3ub_2_5mUpQ",
    authDomain: "timely-8a376.firebaseapp.com",
    projectId: "timely-8a376",
    storageBucket: "timely-8a376.appspot.com",
    messagingSenderId: "884272621916",
    appId: "1:884272621916:web:386410c6a978c218547999",
    measurementId: "G-WTS7SWXL55"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics()
export default firebase 