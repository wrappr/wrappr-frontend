import React from 'react';
import AppHeader from "./component/AppHeader";
import {Route, BrowserRouter as Router, Redirect} from "react-router-dom";
import GenerateView from "./component/GenerateView";
import HistoryView from "./component/HistoryView";
import Container from "@material-ui/core/Container";
import {createMuiTheme, makeStyles} from "@material-ui/core/styles";
import ErrorBarrier from "./component/ErrorBarrier";
import AuthView from "./component/AuthView";
import firebase from "./firebase";
import {connect} from "react-redux";
import ThemeProvider from "@material-ui/styles/ThemeProvider/ThemeProvider";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(4),
    },
}));


function AppRouter() {
    const classes = useStyles();


    const theme = createMuiTheme({
        palette: {
            type: "dark",
        }
    });


    return (
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
    );
}

export default connect()(AppRouter);