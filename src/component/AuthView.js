import {connect} from "react-redux";
import {StyledFirebaseAuth} from "react-firebaseui";
import React from "react";
import firebase from "../firebase";
import "firebase/performance";
import {makeStyles, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

export const PerformanceContext = React.createContext(firebase.performance());

const uiConfig = {
    signInFlow: 'redirect',
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
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