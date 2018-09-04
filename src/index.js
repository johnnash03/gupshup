import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import socketInit from './socket';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

const socket = socketInit(store.dispatch);
sagaMiddleware.run(sagas, socket);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
