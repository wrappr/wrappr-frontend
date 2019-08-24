import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/performance";

const firebaseConfig = {
    apiKey: "AIzaSyAjhJ5N8ztxaJDjjM_EHf2GGlwES_QLrTg",
    authDomain: "gimmecock-d7199.firebaseapp.com",
    databaseURL: "https://gimmecock-d7199.firebaseio.com",
    projectId: "gimmecock-d7199",
    storageBucket: "",
    messagingSenderId: "158757001617",
    appId: "1:158757001617:web:68c0fa723257bdb3"
};
firebase.initializeApp(firebaseConfig);
export const Performance = firebase.performance();

export default firebase;