import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as note from '../../actions/note';
import NoteModify from '../../components/NoteModify';
import * as fromRoot from '../../reducers';

class NoteEdit extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    draft: ImmutablePropTypes.map.isRequired,
    loadDraft: PropTypes.func.isRequired,
    saveDraft: PropTypes.func.isRequired,
    saveNote: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadDraft(parseInt(this.props.match.params.id, 10));
  }

  getTitle() {
    return this.props.draft.get('title') || 'Sin título';
  }

  render() {
    return (
      <div className="NoteEdit">
        <Helmet>
          <title>{'Editar / ' + this.getTitle()}</title>
        </Helmet>

        <NoteModify
          draft={this.props.draft}
          saveDraft={this.props.saveDraft}
          saveNote={this.props.saveNote}
          goBack={'/note/' + this.props.match.params.id} />
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
  saveNote(draft) {
    dispatch(note.saveNote(draft));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteEdit));
