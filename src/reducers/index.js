import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux-immutable';
import { createSelector } from 'reselect';

import * as fromConnection from './connection';
import * as fromNote from './note';

export default combineReducers({
  router: routerReducer,
  connection: fromConnection.reducer,
  note: fromNote.reducer,
});

export const getConnection = state => state.get('connection');
export const getConnectionIsConnected = createSelector(getConnection, fromConnection.isConnected);

export const getNote = state => state.get('note');
export const getNoteDraft = createSelector(getNote, fromNote.getDraft);
export const getNoteNote = createSelector(getNote, fromNote.getNote);
export const getNoteVersions = createSelector(getNote, fromNote.getVersions);
