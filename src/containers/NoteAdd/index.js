import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as note from '../../actions/note';
import EditNote from '../../components/EditNote';
import * as fromRoot from '../../reducers';

class NoteAdd extends PureComponent {
  static propTypes = {
    draft: ImmutablePropTypes.map.isRequired,
    loadDraft: PropTypes.func.isRequired,
    saveDraft: PropTypes.func.isRequired,
    saveNewNote: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadDraft(0);
  }

  render() {
    return (
      <div className="NoteAdd">
        <Helmet>
          <title>Añadir nota</title>
        </Helmet>

        <EditNote draft={this.props.draft} saveDraft={this.props.saveDraft} saveNote={this.props.saveNewNote} />
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
