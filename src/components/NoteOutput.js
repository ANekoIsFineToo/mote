import React, { PureComponent } from 'react';
import CodeMirror from 'codemirror';
import { safeHtml } from 'common-tags';
import MarkdownIt from 'markdown-it';
import markdownTaskLists from 'markdown-it-task-lists';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import PropTypes from 'prop-types';

class NoteOutput extends PureComponent {
  static propTypes = {
    content: PropTypes.string.isRequired,
  };

  md = null;

  constructor(props) {
    super(props);

    const options = {
      html: true,
      xhtmlOut: true,
      linkify: true,
      typographer: true,

      highlight: this.highlight,
    };

    this.md = new MarkdownIt(options);

    this.md.use(markdownTaskLists);
  }

  highlight = (str, lang) => {
    let result = '';

    CodeMirror.runMode(str, this.resolveMode(lang), (html, type) => {
      const parsedTypes = type && type.split(' ').map(t => 'cm-' + t).join(' ');
      const parsedHtml = html.replace(/\t/g, '&nbsp;&nbsp;');

      result += type ? safeHtml`<span class="${parsedTypes}">${parsedHtml}</span>` : parsedHtml;
    });

    return result;
  };

  resolveMode = name => {
    const found = CodeMirror.findModeByName(name);

    return found ? found.mime || found.mimes[0] : null;
  };

  render() {
    return (
      <div className="cm-s-default" dangerouslySetInnerHTML={{ __html: this.md.render(this.props.content) }} />
    );
  }
}

const styleSheet = createStyleSheet('NoteOutput', theme => ({
  '@global': {
    '.cm-s-default h1, .cm-s-default h2, .cm-s-default h3, .cm-s-default h4, .cm-s-default h5, .cm-s-default h6': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
}));

export default withStyles(styleSheet)(NoteOutput);
