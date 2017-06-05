import React, { PureComponent } from 'react';
import CodeMirror from 'codemirror';
import { safeHtml } from 'common-tags';
import MarkdownIt from 'markdown-it';
import markdownTaskLists from 'markdown-it-task-lists';
import PropTypes from 'prop-types';

import './index.css';

class NoteOutput extends PureComponent {
  static propTypes = {
    markdown: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.highlight = this.highlight.bind(this);

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

  highlight(str, lang) {
    let result = '';

    CodeMirror.runMode(str, this.resolveMode(lang), (html, type) => {
      const parsedTypes = type && type.split(' ').map(t => 'cm-' + t).join(' ');
      const parsedHtml = html.replace(/\t/g, '&nbsp;&nbsp;');

      result += type ? safeHtml`<span class="${parsedTypes}">${parsedHtml}</span>` : parsedHtml;
    });

    return result;
  }

  resolveMode(name) {
    const found = CodeMirror.findModeByName(name);

    return found ? found.mime || found.mimes[0] : null;
  }

  renderOutput() {
    return { __html: this.md.render(this.props.markdown) };
  }

  render() {
    return <div className="NoteOutput cm-s-default"
                dangerouslySetInnerHTML={this.renderOutput()} />;
  }
}

export default NoteOutput;
