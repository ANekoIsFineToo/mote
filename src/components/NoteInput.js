import React, { PureComponent } from 'react';
import CodeMirror from 'react-codemirror';
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

export default NoteInput;
