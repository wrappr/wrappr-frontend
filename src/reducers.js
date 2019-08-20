import {applyMiddleware, createStore} from "redux";
import {handleActions} from "redux-actions";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const initialState = {
    history: localStorage && localStorage.getItem("history") ? JSON.parse(localStorage.getItem("history")) : [],
    fetching: false,
    errorMessage: null
};

export const reducer = handleActions({
    ADD_HISTORY: (state, action) => action.payload ? ({...state, history: state.history.concat(action.payload)}) : state,
    FETCH_START: state => ({...state, fetching: true}),
    CLEAR_HISTORY: state => ({...state, history: []}),
    FETCH_FINISH: state => ({...state, fetching: false}),
    FETCH_ERROR: (state, action) => ({...state, fetching: false, errorMessage: action.payload}),
    DELETE_COUPON: (state, action) => ({...state, history: state.history.filter(n => n.code !== action.payload)}),
    DISMISS_ERROR: state => ({...state, errorMessage: null}),
}, initialState);

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => {
    if (window.localStorage) {
        localStorage.setItem("history", JSON.stringify(store.getState().history));
    }
});

export const getStore = () => store;