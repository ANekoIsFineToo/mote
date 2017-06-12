import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux-immutable';
import { createSelector } from 'reselect';

import * as fromCommon from './common';
import * as fromNote from './note';

export default combineReducers({
  router: routerReducer,
  common: fromCommon.default,
  note: fromNote.default,
});

export const getCommon = state => state.get('common');
export const getCommonTitle = createSelector(getCommon, fromCommon.getTitle);
export const getCommonSnackbar = createSelector(getCommon, fromCommon.getSnackbar);

export const getNote = state => state.get('note');
export const getNoteDraft = createSelector(getNote, fromNote.getDraft);
