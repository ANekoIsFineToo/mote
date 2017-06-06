import { createMiddleware } from 'redux-beacon';
import { logger } from 'redux-beacon/extensions/logger';
import { offlineWeb } from 'redux-beacon/extensions/offline-web';
import { GoogleTagManager } from 'redux-beacon/targets/google-tag-manager';

import * as fromRoot from './reducers';

export default () => {
  const pageView = {
    eventFields: action => ({
      hitType: 'pageview',
      page: action.payload.pathname,
    }),
  };

  const eventsMap = {
    '@@router/LOCATION_CHANGE': pageView,
  };

  const offlineStorage = offlineWeb(fromRoot.getConnectionIsConnected);

  return createMiddleware(eventsMap, GoogleTagManager(), { logger, offlineStorage });
};
