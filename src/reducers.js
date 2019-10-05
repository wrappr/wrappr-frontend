import {applyMiddleware, createStore} from "redux";
import {handleActions} from "redux-actions";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const initialState = {
    history: [],
    fetching: false,
    errorMessage: null,
    authenticated: false,
    darkMode: false,
    statisticsCount: 0,
    user: {},
};

export const reducer = handleActions({
    AUTH_SUCCESS: (state, action) => ({...state, authenticated: true, user: action.payload}),
    AUTH_ERROR: state => ({...state, authenticated: false}),
    SET_THEME: (state, action) => ({...state, darkMode: action.payload}),
    SWITCH_THEME: state => ({...state, darkMode: !state.darkMode}),
}, initialState);

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
export const getStore = () => store;
