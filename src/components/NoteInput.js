import React, { PureComponent } from 'react';
import CodeMirror from 'react-codemirror';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import * as colors from 'material-ui/styles/colors';
import PropTypes from 'prop-types';

class NoteInput extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  };

  state = {
    value: '',
  };

  codeMirror = null;

  handleChange = value => {
    this.setState({ value });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  componentWillReceiveProps(nextProps) {
    if ((this.state.value === '' && this.state.value !== nextProps.value) || nextProps.value === '') {
      this.codeMirror.getCodeMirror().setValue(nextProps.value);
    }
  }

  render() {
    const codeMirrorOptions = {
      mode: 'gfm',
      tabSize: 2,
      placeholder: 'Contenido de la Nota',
      extraKeys: {
        'Enter': 'newlineAndIndentContinueMarkdownList',
        'Ctrl-Space': 'autocomplete',
        'Ctrl-J': 'toMatchingTag',
        'F11': 'toggleFullScreen',
        'Esc': 'closeFullScreen',
      },
      autoCloseBrackets: true,
      autoCloseTags: true,
      matchBrackets: true,
      matchTags: { bothTags: true },
      continueComments: true,
    };

    return (
      <CodeMirror
        autoFocus
        options={codeMirrorOptions}
        onChange={this.handleChange}
        defaultValue={this.props.value}
        ref={codeMirror => (this.codeMirror = codeMirror)}
      />
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

    '.cm-s-default .CodeMirror-matchingbracket': {
      color: 'inherit !important',
      backgroundColor: 'rgba(2, 117, 216, .2)',
    },
    '.cm-s-default .CodeMirror-nonmatchingbracket': {
      color: colors.red[500] + ' !important',
    },
    '.cm-s-default .CodeMirror-matchingtag': {
      backgroundColor: 'rgba(2, 117, 216, .2)',
    },
    '.cm-s-default .cm-header': {
      color: colors.blue[500],
    },
    '.cm-s-default .cm-quote': {
      color: colors.green[500],
    },
    '.cm-s-default .cm-negative': {
      color: colors.red[500],
    },
    '.cm-s-default .cm-positive': {
      color: colors.green[500],
    },

    '.cm-s-default .cm-keyword': {
      color: colors.blue[700],
    },
    '.cm-s-default .cm-atom': {
      color: colors.blue[500],
    },
    '.cm-s-default .cm-number': {
      color: colors.pink[700],
    },
    '.cm-s-default .cm-def': {
      color: 'inherit',
    },
    '.cm-s-default .cm-variable': {
      color: colors.deepPurple[500],
    },
    '.cm-s-default .cm-punctuation': {
      color: colors.grey[500],
    },
    '.cm-s-default .cm-property': {
      color: 'inherit',
    },
    '.cm-s-default .cm-operator': {
      color: colors.brown[500],
    },
    '.cm-s-default .cm-variable-2': {
      color: colors.deepPurple[500],
    },
    '.cm-s-default .cm-variable-3': {
      color: colors.deepPurple[500],
    },
    '.cm-s-default .cm-comment': {
      color: colors.grey[500],
    },
    '.cm-s-default .cm-string': {
      color: colors.lightGreen[700],
    },
    '.cm-s-default .cm-string-2': {
      color: colors.lightGreen[700],
    },
    '.cm-s-default .cm-meta': {
      color: colors.grey[700],
    },
    '.cm-s-default .cm-qualifier': {
      color: colors.grey[700],
    },
    '.cm-s-default .cm-builtin': {
      color: colors.lightGreen[700],
    },
    '.cm-s-default .cm-bracket': {
      color: colors.grey[500] + ' !important',
    },
    '.cm-s-default .cm-tag': {
      color: colors.pink[700],
    },
    '.cm-s-default .cm-attribute': {
      color: colors.blue[500],
    },
    '.cm-s-default .cm-hr': {
      color: colors.grey[500],
    },
    '.cm-s-default .cm-link': {
      color: colors.indigo[500],
    },
    '.cm-s-default .cm-error': {
      color: colors.red[500],
    },
    '.cm-s-default .cm-invalidchar': {
      color: colors.red[500],
    },
  },
}));

export default withStyles(styleSheet)(NoteInput);
