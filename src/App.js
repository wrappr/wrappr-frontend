import React, {useState} from 'react';
import './App.css';
import AppHeader from "./component/AppHeader";
import {Route, BrowserRouter as Router} from "react-router-dom";
import GenerateView from "./component/GenerateView";
import HistoryView from "./component/HistoryView";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import ErrorBarrier from "./component/ErrorBarrier";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(4),
    },
}));

function App() {
    const [state, setState] = useState({
        history: [],
        refreshCounter: 0,
    });

    const handleRefresh = () => setState({
        refreshCounter: state.refreshCounter + 1
    });

    const classes = useStyles();
    return (
        <Router className="App">
            <AppHeader history={state.history} handleRefresh={handleRefresh}/>
            <ErrorBarrier/>
            <Container className={classes.container}>
                <Route exact path="/"
                       render={(props) => <GenerateView {...props} refreshCounter={state.refreshCounter}/>}/>
                <Route path="/history"
                       render={(props) => <HistoryView {...props} history={state.history}/>}/>
            </Container>
        </Router>
    );
}

export default App;
