import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import React, {useState} from "react";
import {Snackbar} from "@material-ui/core";
import firebase from "../firebase";

function AuthBarrier(props) {
    const [state, setState] = useState(true);

    firebase.auth().onAuthStateChanged(user => setState(user !== null));

    return !state ? (
        <div><Redirect to={"/login"}/>
            <Snackbar open={!state} autoHideDuration={6000}
                      anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left"
                      }} message={"Please sign in to access this page"}/>
        </div>
    ) : <div/>;
}

export default connect(state => ({authenticated: state.authenticated}))(withRouter(AuthBarrier));