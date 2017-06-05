import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import PropTypes from 'prop-types';

import * as note from '../../actions/note';
import NoteInput from '../../components/NoteInput';
import NoteOutput from '../../components/NoteOutput';
import * as fromRoot from '../../reducers';

class NoteAdd extends PureComponent {
  static propTypes = {
    draft: ImmutablePropTypes.map.isRequired,
    loadDraft: PropTypes.func.isRequired,
    saveDraft: PropTypes.func.isRequired,
    saveNewNote: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.saveNote = this.saveNote.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  componentDidMount() {
    this.props.loadDraft(0);
  }

  saveNote() {
    this.props.saveNewNote(this.props.draft);
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
      <div className="NoteAdd">
        <Helmet>
          <title>Añadir nota</title>
        </Helmet>

        <Container className="mb-3">
          <Row>
            <Col xs="9">
              <Input
                className="border-0"
                value={this.props.draft.get('title')}
                placeholder="Nota sin título."
                onChange={this.handleTitleChange} />
            </Col>

            <Col xs="3">
              <Button className="mr-2" color="primary" onClick={this.saveNote}>Guardar</Button>
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

const mapStateToProps = state => ({
  draft: fromRoot.getNoteDraft(state),
});

const mapDispatchToProps = dispatch => ({
  loadDraft(id) {
    dispatch(note.loadDraft(id));
  },
  saveDraft(draft) {
    dispatch(note.saveDraft(draft));
  },
  saveNewNote(draft) {
    dispatch(note.saveNewNote(draft));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteAdd));
