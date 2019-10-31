//Vendors
import React  from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import { createStore,compose,applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import Reducer from './Store/Reducer/rootReducer'
import App from './App'


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(Reducer,composeEnhancers(applyMiddleware(thunk)))

const app =(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(
    app,
    document.getElementById('root')
);