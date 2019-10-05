import {createAction} from "redux-actions";

export const AUTH_SUCCESS = createAction("AUTH_SUCCESS");
export const AUTH_ERROR = createAction("AUTH_ERROR");
export const SWITCH_THEME = createAction("SWITCH_THEME");
export const SET_THEME = createAction("SET_THEME");
export const UPLOAD_IMAGE = createAction("UPLOAD_IMAGE");

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

export const uploadImage = image => (dispatch) => {
    // TODO: Upload image to backend
    dispatch(UPLOAD_IMAGE());
};