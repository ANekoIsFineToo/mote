import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux-immutable';
import { createSelector } from 'reselect';

import * as fromNote from './note';

export default combineReducers({
  router: routerReducer,
  note: fromNote.reducer,
});

export const getNote = state => state.get('note');
export const getNoteDraft = createSelector(getNote, fromNote.getDraft);
