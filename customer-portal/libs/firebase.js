// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
require("firebase/auth");
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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
	appId: "1:512539774616:web:1c96db07aa4d7b8750caed",
	measurementId: "G-D773V5RK91",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
