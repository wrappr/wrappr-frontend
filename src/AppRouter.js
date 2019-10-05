import React from 'react';
import AppHeader from "./component/AppHeader";
import {Route, BrowserRouter as Router, Redirect} from "react-router-dom";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import AuthView from "./component/AuthView";
import firebase from "./firebase";
import {connect} from "react-redux";
import SettingsView from "./component/SettingsView";
import ScanView from "./component/ScanView";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(4),
    },
}));


function AppRouter() {
    const classes = useStyles();


    return (
        <Router className="App">
            <AppHeader/>
            <Container className={classes.container}>
                <Route exact path="/"
                       render={(props) => <ScanView {...props}/>}/>
                <Route path="/settings"
                       render={(props) => <SettingsView {...props}/>}/>
                <Route path="/login" component={AuthView}/>
                <Route path="/logout" component={() => {
                    firebase.auth().signOut();
                    return (<Redirect to={"/login"}/>);
                }}/>
            </Container>
        </Router>
    );
}

export default connect()(AppRouter);
