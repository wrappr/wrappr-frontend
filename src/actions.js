import {createAction} from "redux-actions";
import firebase, {db, Performance} from "./firebase";
import * as Sentry from '@sentry/browser';

export const ADD_HISTORY = createAction("ADD_HISTORY");
export const CLEAR_HISTORY = createAction("CLEAR_HISTORY");
export const CREATE_COUPON = createAction("CREATE_COUPON");
export const FETCH_START = createAction("FETCH_START");
export const FETCH_FINISH = createAction("FETCH_FINISH");
export const FETCH_ERROR = createAction("FETCH_ERROR");
export const DELETE_COUPON = createAction("DELETE_COUPON");
export const DISMISS_ERROR = createAction("DISMISS_ERROR");
export const AUTH_SUCCESS = createAction("AUTH_SUCCESS");
export const SET_COUNTER = createAction("SET_COUNTER");
export const AUTH_ERROR = createAction("AUTH_ERROR");
export const SWITCH_THEME = createAction("SWITCH_THEME");
export const SET_THEME = createAction("SET_THEME");
export const SET_HISTORY = createAction("SET_HISTORY");

export const createCoupon = () => (dispatch, getState) => {
    dispatch(CREATE_COUPON());
    dispatch(FETCH_START());
    const perfTrace = Performance.trace("couponFetch");
    perfTrace.start();
    if (typeof getState().user.getIdToken === "function")
        getState().user.getIdToken(true).then(idToken =>
            fetch(process.env.REACT_APP_API_URL, {
                headers: {
                    Authorization: idToken,
                }
            }).catch(e => {
                dispatch(FETCH_ERROR(e.message));
                return null;
            }).then(res => {
                if (res && res.status === 200) {
                    dispatch(DISMISS_ERROR());
                    dispatch(FETCH_FINISH());
                    perfTrace.stop();
                    return null;
                } else {
                    if (res) return res.json();
                }
            }).then(m => m && m.error ? dispatch(FETCH_ERROR(m.message)) : null));
};

export const deleteCoupon = coupon => (dispatch, getState) => {
    const perfTrace = Performance.trace("couponDelete");
    perfTrace.start();
    db.collection("coupons").doc(getState().user.uid).update({coupons: firebase.firestore.FieldValue.arrayRemove(coupon)}).then(() => dispatch(DELETE_COUPON(coupon)));
    perfTrace.stop();
};

export const authSuccess = user => (dispatch, getState) => {
    dispatch(AUTH_SUCCESS(user));
    Sentry.configureScope(scope => scope.setUser({"email": user.email, "id": user.uid, "name": user.displayName}));
    dispatch(FETCH_START());
    db.collection("statistics").doc(user.uid).onSnapshot(doc => doc.exists ? dispatch(SET_COUNTER(doc.data().counter)) : null);
    db.collection("coupons").doc(user.uid).onSnapshot(doc => {
        dispatch(FETCH_START());
        if (doc.exists)
            dispatch(SET_HISTORY(doc.data().coupons));
        dispatch(FETCH_FINISH());
    });
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