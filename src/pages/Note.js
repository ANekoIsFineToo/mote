import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
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
    removeNote: PropTypes.func.isRequired,
  };

  removeNote = () => this.props.removeNote(parseInt(this.props.match.params.id, 10));

  componentDidMount() {
    this.props.loadNote(parseInt(this.props.match.params.id, 10));
  }

  componentWillReceiveProps(nextProps) {
    const title = nextProps.note.get('title');

    if (!title || this.props.note.get('title') !== title) {
      this.props.setTitle(title || 'Sin título');
    }
  }

  render() {
    return (
      <Grid container gutter={24}>
        <Hidden smDown>
          <Grid item md={8} />
        </Hidden>

        <Grid container item xs={12} md={4} justify="space-around">
          <Button raised color="primary" component={Link} to={this.props.match.url + '/edit'}>Editar</Button>
          <Button raised color="accent" onClick={this.removeNote}>Eliminar</Button>
        </Grid>

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
  removeNote(id) {
    dispatch(note.removeNote(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Note);
