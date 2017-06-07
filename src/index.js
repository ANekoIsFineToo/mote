import React from 'react';
import a11y from 'react-a11y';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import createStore from './store';

if (process.env.NODE_ENV !== 'production') {
  a11y(React, { includeSrcNode: true, ReactDOM });
}

const history = createHistory();
const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
