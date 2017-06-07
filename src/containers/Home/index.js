import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as note from '../../actions/note';
import NoteList from '../../components/NoteList';
import * as fromRoot from '../../reducers';

class Home extends PureComponent {
  static propTypes = {
    notes: ImmutablePropTypes.list.isRequired,
    loadNotes: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadNotes();
  }

  render() {
    return (
      <div className="Home">
        <NoteList notes={this.props.notes} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notes: fromRoot.getNoteNotes(state),
});

const mapDispatchToProps = dispatch => ({
  loadNotes() {
    dispatch(note.loadNotes());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
