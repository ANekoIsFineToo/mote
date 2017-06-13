import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as common from '../actions/common';
import * as note from '../actions/note';
import NoteModify from '../components/NoteModify';
import * as fromRoot from '../reducers';

class NoteEdit extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    draft: ImmutablePropTypes.map.isRequired,
    setTitle: PropTypes.func.isRequired,
    loadDraft: PropTypes.func.isRequired,
    saveDraft: PropTypes.func.isRequired,
    saveNote: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.setTitle('Editar Nota');
    this.props.loadDraft(parseInt(this.props.match.params.id, 10));
  }

  render() {
    return <NoteModify draft={this.props.draft} saveDraft={this.props.saveDraft} saveNote={this.props.saveNote} />;
  }
}

const mapStateToProps = state => ({
  draft: fromRoot.getNoteDraft(state),
});

const mapDispatchToProps = dispatch => ({
  setTitle(title) {
    dispatch(common.setTitle(title));
  },
  loadDraft(id) {
    dispatch(note.loadDraft(id));
  },
  saveDraft(draft) {
    dispatch(note.saveDraft(draft));
  },
  saveNote(draft) {
    dispatch(note.saveNote(draft));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteEdit);
