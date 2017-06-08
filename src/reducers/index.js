import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux-immutable';
import { createSelector } from 'reselect';

import * as common from './common';

export default combineReducers({
  router: routerReducer,
  common: common.default,
});

export const getCommon = state => state.get('common');
export const getCommonTitle = createSelector(getCommon, common.getTitle);
