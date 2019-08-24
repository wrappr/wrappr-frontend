import React from 'react';
import './App.css';
import AppHeader from "./component/AppHeader";
import {Route, BrowserRouter as Router, Redirect} from "react-router-dom";
import GenerateView from "./component/GenerateView";
import HistoryView from "./component/HistoryView";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import ErrorBarrier from "./component/ErrorBarrier";
import AuthView from "./component/AuthView";
import * as firebase from "firebase";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(4),
    },
}));

function App() {
    const classes = useStyles();
    return (
        <Router className="App">
            <AppHeader/>
            <ErrorBarrier/>
            <Container className={classes.container}>
                <Route exact path="/"
                       render={(props) => <GenerateView {...props}/>}/>
                <Route path="/history"
                       render={(props) => <HistoryView {...props}/>}/>
                <Route path="/login" component={AuthView}/>
                <Route path="/logout" component={() => {
                    firebase.auth().signOut();
                    return (<Redirect to={"/login"}/>);
                }}/>
            </Container>
        </Router>
    );
}

export default connect()(App);
