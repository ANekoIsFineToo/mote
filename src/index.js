import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import CodeMirror from 'codemirror';
import createHistory from 'history/createBrowserHistory';

import 'typeface-roboto';

import 'codemirror/addon/comment/continuecomment';
import 'codemirror/addon/display/fullscreen';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/continuelist';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/anyword-hint';
import 'codemirror/addon/runmode/runmode';

import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/python/python';

import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/display/fullscreen.css';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import createStore from './store';

CodeMirror.commands.autocomplete = cm => cm.showHint({ hint: CodeMirror.hint.anyword });
CodeMirror.commands.toggleFullScreen = cm => cm.setOption('fullScreen', !cm.getOption('fullScreen'));
CodeMirror.commands.closeFullScreen = cm => cm.getOption('fullScreen') && cm.setOption('fullScreen', false);

const history = createHistory();
const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
