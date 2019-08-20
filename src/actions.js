import {createAction} from "redux-actions";

export const ADD_HISTORY = createAction("ADD_HISTORY");
export const CLEAR_HISTORY = createAction("CLEAR_HISTORY");
export const CREATE_COUPON = createAction("CREATE_COUPON");
export const FETCH_START = createAction("FETCH_START");
export const FETCH_FINISH = createAction("FETCH_FINISH");
export const FETCH_ERROR = createAction("FETCH_ERROR");
export const DELETE_COUPON = createAction("DELETE_COUPON");
export const DISMISS_ERROR = createAction("DISMISS_ERROR");

export const createCoupon = () => dispatch => {
    dispatch(CREATE_COUPON());
    dispatch(FETCH_START());
    fetch("http://10.42.0.72:8000/fetch").catch(e => {
        dispatch(FETCH_ERROR(e.message));
        return null;
    }).then(res => {
        if (res) return res.json()
    }).then(coupon => {
        dispatch(FETCH_FINISH());
        dispatch(ADD_HISTORY(coupon));
    });
};

export const deleteCoupon = code => (dispatch, getState) => {
    dispatch(DELETE_COUPON(code));
    if (getState().history.length === 0) dispatch(createCoupon());
};
