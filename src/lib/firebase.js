import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDYGvbYbCO2L7cztUnePjn97HErseYap14",
  authDomain: "instagram-clone-6a942.firebaseapp.com",
  projectId: "instagram-clone-6a942",
  storageBucket: "instagram-clone-6a942.appspot.com",
  messagingSenderId: "746469973812",
  appId: "1:746469973812:web:a817cdf5113de52e06cf61",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
