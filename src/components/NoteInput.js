import React, { PureComponent } from 'react';
import CodeMirror from 'react-codemirror';
import { withStyles, createStyleSheet } from 'material-ui/styles';

class NoteInput extends PureComponent {

  render() {
    const codeMirrorOptions = {
      mode: 'gfm',
      tabSize: 2,
      placeholder: 'Contenido de la Nota',
      extraKeys: {
        'Enter': 'newlineAndIndentContinueMarkdownList',
        'Ctrl-Space': 'autocomplete',
        'F11': 'toggleFullScreen',
        'Esc': 'closeFullScreen',
      },
      autoCloseBrackets: true,
      matchBrackets: true,
      continueComments: true,
    };

    return (
      <CodeMirror autoFocus options={codeMirrorOptions} />
    );
  }
}

const styleSheet = createStyleSheet('NoteInput', theme => ({
  '@global': {
    '.CodeMirror': {
      background: 'transparent',
      height: 'auto',
      color: theme.palette.text.primary,
    },
    '.CodeMirror-empty': {
      color: theme.palette.text.secondary,
    },
    '.CodeMirror-cursor': {
      color: theme.palette.text.primary,
    },
    'div.CodeMirror span.CodeMirror-matchingbracket': {
      color: 'inherit',
      backgroundColor: 'rgba(2, 117, 216, .3)',
    },

    '.cm-s-default .cm-header': {
      color: '#2196F3',
    },
    '.cm-s-default .cm-quote': {
      color: '#4CAF50',
    },
    '.cm-s-default .cm-negative': {
      color: '#F44336',
    },
    '.cm-s-default .cm-positive': {
      color: '#4CAF50',
    },

    '.cm-s-default .cm-keyword': {
      color: '#1976D2',
    },
    '.cm-s-default .cm-atom': {
      color: '#2196F3',
    },
    '.cm-s-default .cm-number': {
      color: '#C2185B',
    },
    '.cm-s-default .cm-variable': {
      color: '#673AB7',
    },
    '.cm-s-default .cm-def': {
      color: 'inherit',
    }
  },
}));

export default withStyles(styleSheet)(NoteInput);
