import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux-immutable';

export default combineReducers({
  router: routerReducer,
});
