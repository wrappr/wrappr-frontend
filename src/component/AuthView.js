import {connect} from "react-redux";
import {StyledFirebaseAuth} from "react-firebaseui";
import React from "react";
import * as firebase from "firebase";
import {makeStyles, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

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

const uiConfig = {
    signInFlow: 'redirect',
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ]
};

const useStyles = makeStyles(theme => ({
    auth: {
        marginTop: theme.spacing(4),
    }
}));

export default connect(state => ({authenticated: state.authenticated}))(props =>
    <div className={useStyles().root}>
        <Grid container justify={"center"}>
            <Typography variant={"h5"}>Please sign in to access this application.</Typography>
        </Grid>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} className={useStyles().auth}/>
    </div>
)