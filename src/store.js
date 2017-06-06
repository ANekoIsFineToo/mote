import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import createSagaMiddleware from 'redux-saga';

import createGtmMiddleware from './gtmMiddleware';
import reducer from './reducers';
import noteSaga from './sagas/note';

const sagaMiddleware = createSagaMiddleware();

export default (history, initialState = {}) => {
  const middlewares = [
    createGtmMiddleware(),
    routerMiddleware(history),
    sagaMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const store = createStore(
    reducer,
    fromJS(initialState),
    composeWithDevTools(...enhancers));

  sagaMiddleware.run(noteSaga);

  return store;
};
