import React, { PureComponent } from 'react';
import CodeMirror from 'react-codemirror';
import PropTypes from 'prop-types';

class NoteInput extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  render() {
    const codeMirrorOptions = {
      mode: 'gfm',
      tabSize: 2,
      placeholder: 'Escribe el contenido de tu nota aquí.',
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

    return <CodeMirror autoFocus
                       className="NoteInput"
                       options={codeMirrorOptions}
                       onChange={this.props.onChange}
                       defaultValue={this.props.value} />;
  }
}

export default NoteInput;