import React, { PureComponent } from 'react';
import CodeMirror from 'codemirror';
import { safeHtml } from 'common-tags';
import MarkdownIt from 'markdown-it';
import markdownTaskLists from 'markdown-it-task-lists';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { blue } from 'material-ui/styles/colors';
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
      breaks: true,
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
      <div className="cm-s-default note-output" dangerouslySetInnerHTML={{ __html: this.md.render(this.props.content) }} />
    );
  }
}

const styleSheet = createStyleSheet('NoteOutput', theme => ({
  '@global': {
    [`.cm-s-default.note-output h1, 
    .cm-s-default.note-output h2, 
    .cm-s-default.note-output h3, 
    .cm-s-default.note-output h4, 
    .cm-s-default.note-output h5, 
    .cm-s-default.note-output h6`]: {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '.cm-s-default.note-output blockquote': {
      borderLeft: '3px solid ' + blue[500],
      paddingLeft: theme.spacing.unit * 2,
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
    },
    '.cm-s-default.note-output blockquote p': {
      marginBottom: 0,
    },
  },
}));

export default withStyles(styleSheet)(NoteOutput);
