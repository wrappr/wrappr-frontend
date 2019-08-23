import {applyMiddleware, createStore} from "redux";
import {handleActions} from "redux-actions";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const initialState = {
    history: [],
    fetching: false,
    errorMessage: null,
    authenticated: false,
    user: {},
};

export const reducer = handleActions({
    ADD_HISTORY: (state, action) => action.payload ? ({
        ...state,
        history: state.history.concat(action.payload)
    }) : state,
    FETCH_START: state => ({...state, fetching: true}),
    CLEAR_HISTORY: state => ({...state, history: []}),
    FETCH_FINISH: state => ({...state, fetching: false}),
    FETCH_ERROR: (state, action) => ({...state, fetching: false, errorMessage: action.payload}),
    DELETE_COUPON: (state, action) => ({...state, history: state.history.filter(n => n.code !== action.payload)}),
    DISMISS_ERROR: state => ({...state, errorMessage: null}),
    AUTH_SUCCESS: (state, action) => ({...state, authenticated: true, user: action.payload}),
    AUTH_ERROR: state => ({...state, authenticated: false}),
}, initialState);

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
export const getStore = () => store;