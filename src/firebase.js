import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/performance";

const firebaseConfig = {
    apiKey: "AIzaSyB9EBIlq6hiD3cIv1zCJKId3byp4xEqJoA",
    authDomain: "wrapprai.firebaseapp.com",
    databaseURL: "https://wrapprai.firebaseio.com",
    projectId: "wrapprai",
    storageBucket: "",
    messagingSenderId: "900162097056",
    appId: "1:900162097056:web:128bd525897e15fb10dec5",
    measurementId: "G-P6WWQERRHG"
};

firebase.initializeApp(firebaseConfig);
export const Performance = firebase.performance();

// Fuck you, iOS.
window.onerror = e => {
    if (e.indexOf("An internal error was encountered in the Indexed Database server") >= 0)
        window.location.reload();
};


export const db = firebase.firestore();

export default firebase;