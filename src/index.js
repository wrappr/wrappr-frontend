import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {getStore} from "./reducers";
import {Provider} from "react-redux";
import * as Sentry from '@sentry/browser';

const store = getStore();

Sentry.init({dsn: "https://91a5e593c3ff4e3e896cc14ddb401a2c@sentry.io/1539919"});

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
