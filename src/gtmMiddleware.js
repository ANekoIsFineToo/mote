import { createMiddleware } from 'redux-beacon';
import { GoogleTagManager } from 'redux-beacon/targets/google-tag-manager';

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

  return createMiddleware(eventsMap, GoogleTagManager());
};
