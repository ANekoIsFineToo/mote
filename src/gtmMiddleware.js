import { createMiddleware } from 'redux-beacon';
import { offlineWeb } from 'redux-beacon/extensions/offline-web';
import { GoogleTagManager } from 'redux-beacon/targets/google-tag-manager';

import * as note from './actions/note';
import * as fromRoot from './reducers';

export default () => {
  const pageView = {
    eventFields: action => ({
      hitType: 'pageview',
      page: action.payload.pathname,
    }),
  };

  const newNote = {
    eventFields: action => ({
      hitType: 'event',
      eventCategory: 'Note',
      eventAction: 'New',
    }),
  };

  const updateNote = {
    eventFields: action => ({
      hitType: 'event',
      eventCategory: 'Note',
      eventAction: 'Update',
    }),
  };

  const removeNote = {
    eventFields: action => ({
      hitType: 'event',
      eventCategory: 'Note',
      eventAction: 'Remove',
    }),
  };

  const restoreVersion = {
    eventFields: action => ({
      hitType: 'event',
      eventCategory: 'Version',
      eventAction: 'Restore',
    }),
  };

  const removeVersion = {
    eventFields: action => ({
      hitType: 'event',
      eventCategory: 'Version',
      eventAction: 'Remove',
    }),
  };

  const eventsMap = {
    '@@router/LOCATION_CHANGE': pageView,
    [note.SAVE_NEW_NOTE]: newNote,
    [note.SAVE_NOTE]: updateNote,
    [note.REMOVE_NOTE]: removeNote,
    [note.RESTORE_VERSION]: restoreVersion,
    [note.REMOVE_VERSION]: removeVersion,
  };

  const offlineStorage = offlineWeb(fromRoot.getConnectionIsConnected);

  return createMiddleware(eventsMap, GoogleTagManager(), { offlineStorage });
};
