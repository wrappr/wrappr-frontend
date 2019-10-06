import {applyMiddleware, createStore} from "redux";
import {handleActions} from "redux-actions";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const initialState = {
    authenticated: false,
    darkMode: false,
    user: {},
    streaming: false,
    currentFrames: [],
    currentContext: null,
};

export const reducer = handleActions({
    AUTH_SUCCESS: (state, action) => ({...state, authenticated: true, user: action.payload}),
    AUTH_ERROR: state => ({...state, authenticated: false}),
    SET_THEME: (state, action) => ({...state, darkMode: action.payload}),
    SWITCH_THEME: state => ({...state, darkMode: !state.darkMode}),
    START_STREAM: state => ({...state, streaming: true}),
    ADD_FRAME: (state, action) => ({...state, currentFrames: state.currentFrames.concat(action.payload)}),
    SET_CONTEXT: (state, action) => ({...state, currentContext: action.payload}),
}, initialState);

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
export const getStore = () => store;
