import './patchPassiveEvents';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import CodeMirror from 'codemirror';
import createHistory from 'history/createBrowserHistory';
import Noty from 'noty';

import * as connection from './actions/connection';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import createStore from './store';

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
import 'bootstrap/dist/css/bootstrap.css';
import 'noty/lib/noty.css';
import 'animate.css/animate.css';
import './index.css';

CodeMirror.commands.autocomplete = cm => cm.showHint({ hint: CodeMirror.hint.anyword });
CodeMirror.commands.toggleFullScreen = cm => cm.setOption('fullScreen', !cm.getOption('fullScreen'));
CodeMirror.commands.closeFullScreen = cm => cm.getOption('fullScreen') && cm.setOption('fullScreen', false);

Noty.overrideDefaults({
  theme: 'bootstrap-v4',
  timeout: 5000,
  closeWith: ['click', 'button'],
});

const history = createHistory();
const store = createStore(history);

window.addEventListener('online', () => store.dispatch(connection.updateConnectivity(true)));
window.addEventListener('offline', () => store.dispatch(connection.updateConnectivity(false)));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
