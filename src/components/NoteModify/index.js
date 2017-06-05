import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import PropTypes from 'prop-types';

import NoteInput from '../NoteInput';
import NoteOutput from '../NoteOutput';

class NoteModify extends PureComponent {
  static propTypes = {
    draft: ImmutablePropTypes.map.isRequired,
    saveDraft: PropTypes.func.isRequired,
    saveNote: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.saveNote = this.saveNote.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  saveNote() {
    this.props.saveNote(this.props.draft);
  }

  clearAll() {
    const clearDraft = this.props.draft
      .set('title', '')
      .set('content', '');

    this.props.saveDraft(clearDraft);
  }

  handleTitleChange(e) {
    this.props.saveDraft(this.props.draft.set('title', e.target.value));
  }

  handleContentChange(content) {
    this.props.saveDraft(this.props.draft.set('content', content));
  }

  render() {
    return (
      <div className="NoteModify">
        <Container className="mb-3">
          <Row>
            <Col xs="9">
              <Input
                className="border-top-0 border-left-0 border-right-0 rounded-0"
                value={this.props.draft.get('title')}
                placeholder="Nota sin título."
                onChange={this.handleTitleChange} />
            </Col>

            <Col xs="3">
              <Button className="mr-2" color="success" onClick={this.saveNote}>Guardar</Button>
              <Button outline color="warning" onClick={this.clearAll}>Vaciar</Button>
            </Col>
          </Row>
        </Container>

        <Container fluid>
          <Row>
            <Col xs="6">
              <NoteInput onChange={this.handleContentChange} value={this.props.draft.get('content')} />
            </Col>

            <Col xs="6">
              <NoteOutput markdown={this.props.draft.get('content')} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default NoteModify;
