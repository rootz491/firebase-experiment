// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
require("firebase/auth");
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCb5VYAkPGP9Rd4WwPo-vaQ7znjw7nKIOo",
	authDomain: "test-0491.firebaseapp.com",
	projectId: "test-0491",
	storageBucket: "test-0491.appspot.com",
	messagingSenderId: "512539774616",
	appId: "1:512539774616:web:55da1b45a49b10c550caed",
	measurementId: "G-5LSHJJSXGS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
