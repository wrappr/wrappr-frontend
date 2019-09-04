import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
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

firebase.firestore().enablePersistence({synchronizeTabs: true}).catch(err => {
    if (err.code === "failed-precondition")
        console.log("Offline caching only available in one tab!")
});

// Fuck you, iOS.
window.onerror = e => {
    if (e.indexOf("An internal error was encountered in the Indexed Database server") >= 0)
        window.location.reload();
};


export const db = firebase.firestore();

export default firebase;