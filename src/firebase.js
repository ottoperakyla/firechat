import firebase from "firebase/app";
import config from "./firebaseconfig";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

window.firebase = firebase;
