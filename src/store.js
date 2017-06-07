import { fromJS } from 'immutable';
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import createSagaMiddleware from 'redux-saga';

import { reducer } from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default (initialState = {}) => {
  const middlewares = [
    sagaMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const store = createStore(reducer, fromJS(initialState), composeWithDevTools(...enhancers));

  return store;
};
