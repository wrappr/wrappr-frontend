import {createAction} from "redux-actions";
import * as firebase from "firebase";

export const AUTH_SUCCESS = createAction("AUTH_SUCCESS");
export const AUTH_ERROR = createAction("AUTH_ERROR");
export const SWITCH_THEME = createAction("SWITCH_THEME");
export const SET_THEME = createAction("SET_THEME");
export const SET_CONTEXT = createAction("SET_CONTEXT");
export const START_STREAM = createAction("START_STREAM");
export const ADD_FRAME = createAction("ADD_FRAME");
export const authSuccess = user => (dispatch, getState) => {
    dispatch(AUTH_SUCCESS(user));
};

export const syncSettings = () => (dispatch, getState) => {
    if (window.localStorage)
        dispatch(SET_THEME(JSON.parse(localStorage.getItem("darkMode"))));
};

export const switchTheme = () => (dispatch, getState) => {
    dispatch(SWITCH_THEME());
    if (window.localStorage)
        localStorage.setItem("darkMode", JSON.stringify(getState().darkMode));
};


function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    let data = new Blob([ia], {type: mimeString});
    return data;
}

export const pushImage = image => (dispatch, getState) => {
    if (getState().streaming && getState().currentContext)
        firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
            const data = new FormData();
            data.append("image", dataURItoBlob(image), "frame.jpg");
            data.append("context", getState().currentContext);

            fetch(process.env.REACT_APP_API_URL + "/api/frames/", {
                method: "post",
                body: data,
                headers: {
                    "Authorization": "JWT " + idToken,
                    'Accept': 'application/json',
                }
            }).then(data => data.json()).then(data => dispatch(ADD_FRAME(data.id)));
        });
};

export const startStream = () => dispatch => {
    dispatch(START_STREAM());
    // Create a new context on the server
    firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
        fetch(process.env.REACT_APP_API_URL + "/api/contexts/", {
            method: "post",
            body: JSON.stringify({}),
            headers: {
                "Authorization": "JWT " + idToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(data => data.json()).then(data => dispatch(SET_CONTEXT(data.url)));
    });
};
