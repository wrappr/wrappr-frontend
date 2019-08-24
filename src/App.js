import {connect} from "react-redux";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import React from "react";
import AppRouter from "./AppRouter";

function App(props) {
    const theme = createMuiTheme({palette: {type: props.darkMode ? "dark" : "light"}});
    return (<ThemeProvider theme={theme}><AppRouter/></ThemeProvider>)
}

export default connect(state => ({darkMode: state.darkMode}))(App);