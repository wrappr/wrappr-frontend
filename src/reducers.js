import {applyMiddleware, createStore} from "redux";
import {handleActions} from "redux-actions";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const initialState = {
    authenticated: false,
    darkMode: false,
    user: {},
    streaming: false,
};

export const reducer = handleActions({
    AUTH_SUCCESS: (state, action) => ({...state, authenticated: true, user: action.payload}),
    AUTH_ERROR: state => ({...state, authenticated: false}),
    SET_THEME: (state, action) => ({...state, darkMode: action.payload}),
    SWITCH_THEME: state => ({...state, darkMode: !state.darkMode}),
    UPLOAD_IMAGE: state => state,
    START_STREAM: state => ({...state, streaming: true}),
}, initialState);

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
export const getStore = () => store;
