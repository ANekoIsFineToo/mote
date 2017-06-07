import React from 'react';
import a11y from 'react-a11y';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import createStore from './store';

if (process.env.NODE_ENV !== 'production') {
  a11y(React, { includeSrcNode: true, ReactDOM });
}

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
