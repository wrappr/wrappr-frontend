import {createAction} from "redux-actions";
import * as firebase from "firebase";

export const ADD_HISTORY = createAction("ADD_HISTORY");
export const CLEAR_HISTORY = createAction("CLEAR_HISTORY");
export const CREATE_COUPON = createAction("CREATE_COUPON");
export const FETCH_START = createAction("FETCH_START");
export const FETCH_FINISH = createAction("FETCH_FINISH");
export const FETCH_ERROR = createAction("FETCH_ERROR");
export const DELETE_COUPON = createAction("DELETE_COUPON");
export const DISMISS_ERROR = createAction("DISMISS_ERROR");
export const AUTH_SUCCESS = createAction("AUTH_SUCCESS");
export const AUTH_ERROR = createAction("AUTH_ERROR");

export const createCoupon = () => (dispatch, getState) => {
    dispatch(CREATE_COUPON());
    dispatch(FETCH_START());
    getState().user.getIdToken(true).then(idToken =>
        fetch(process.env.REACT_APP_API_URL, {
            headers: {
                Authorization: idToken,
            }
        }).catch(e => {
            dispatch(FETCH_ERROR(e.message));
            return null;
        }).then(res => {
            if (res.status === 200) {
                dispatch(DISMISS_ERROR());
                dispatch(FETCH_FINISH());
                return null;
            } else {
                return res.json();
            }
        }).then(m => m && m.error ? dispatch(FETCH_ERROR(m.message)) : null));
};

export const deleteCoupon = coupon => (dispatch, getState) => {
    firebase.database().ref("coupons/" + getState().user.uid + "/" + coupon.key).remove(() => dispatch(DELETE_COUPON(coupon.code))).then(() => getState().history.length === 0 ? dispatch(createCoupon()) : null);
};

export const authSuccess = user => (dispatch, getState) => {
    dispatch(AUTH_SUCCESS(user));
    dispatch(FETCH_START());
    firebase.database().ref("coupons/" + user.uid).on("value", snapshot => {
        dispatch(CLEAR_HISTORY());
        snapshot.forEach(data => {
            let coupon = { ...data.val(), key: data.key };
            dispatch(ADD_HISTORY(coupon));
        });
        dispatch(FETCH_FINISH());
    });
};