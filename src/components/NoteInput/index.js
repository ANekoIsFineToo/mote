import React, { PureComponent } from 'react';
import CodeMirror from 'react-codemirror';
import PropTypes from 'prop-types';

class NoteInput extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  codeMirror = null;

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value === '' && this.state.value !== nextProps.value) {
      this.codeMirror.getCodeMirror().setValue(nextProps.value);
    }
  }

  handleChange(value) {
    this.setState({ value });
    this.props.onChange(value);
  }

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
                       onChange={this.handleChange}
                       defaultValue={this.props.value}
                       ref={codeMirror => (this.codeMirror = codeMirror)} />;
  }
}

export default NoteInput;
