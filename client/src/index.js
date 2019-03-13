import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Router, Route } from 'react-router-dom';
import history from './history'
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import decode from 'jwt-decode';
import reducers from './reducers';
import sagas from './sagas';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { userLogInSuccess } from './actions/auth';
import setAuthorizationHeader from "./utils/setAuthorizationHeader";
import 'semantic-ui-css/semantic.min.css';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
                        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(
  reducers,
  enhancers
);

sagas.map(sagaMiddleware.run);

if(localStorage.bookwormJWT) {
  const payload = decode(localStorage.bookwormJWT);
  const user = {
    token: localStorage.bookwormJWT,
    email: payload.email,
    confirmed: payload.confirmed
  };
  setAuthorizationHeader(localStorage.bookwormJWT);
  store.dispatch(userLogInSuccess(user));
}

ReactDOM.render(
  <Router history = {history}>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
