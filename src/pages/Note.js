import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';

import * as common from '../actions/common';
import * as note from '../actions/note';
import NoteOutput from '../components/NoteOutput';
import * as fromRoot from '../reducers';

class Note extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    note: ImmutablePropTypes.map.isRequired,
    setTitle: PropTypes.func.isRequired,
    loadNote: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadNote(parseInt(this.props.match.params.id, 10));
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.note.get('title') || this.props.note.get('title') !== nextProps.note.get('title')) {
      this.props.setTitle(nextProps.note.get('title') || 'Sin título');
    }
  }

  render() {
    return (
      <Grid container gutter={24}>
        <Grid item xs={12}>
          <NoteOutput content={this.props.note.get('content')} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  note: fromRoot.getNoteNote(state),
});

const mapDispatchToProps = dispatch => ({
  setTitle(title) {
    dispatch(common.setTitle(title));
  },
  loadNote(id) {
    dispatch(note.loadNote(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Note);
