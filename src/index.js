import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import 'typeface-roboto';

import 'codemirror/addon/comment/continuecomment.js';
import 'codemirror/addon/display/fullscreen.js';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/edit/continuelist.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/anyword-hint.js';
import 'codemirror/addon/runmode/runmode.js';

import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/python/python';

import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/display/fullscreen.css';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import createStore from './store';

const history = createHistory();
const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
