import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';

import * as common from '../actions/common';
import * as note from '../actions/note';
import * as fromRoot from '../reducers';

class Home extends PureComponent {
  static propTypes = {
    notes: ImmutablePropTypes.list.isRequired,
    setTitle: PropTypes.func.isRequired,
    loadNotes: PropTypes.func.isRequired,
  };

  mapNotes = (note) => (
    <Grid key={note.get('id')} item xs={12} sm={6} md={3} lg={2}>
      <Card>
        <CardContent>
          <Typography type="headline" component="h2" align="center">
            {note.get('title')}
          </Typography>
        </CardContent>

        <CardActions>
          <Button compact color="primary" component={Link} to={'/note/' + note.get('id')}>Ver</Button>
        </CardActions>
      </Card>
    </Grid>
  );

  componentDidMount() {
    this.props.setTitle('');
    this.props.loadNotes();
  }

  render() {
    return (
      <Grid container>
        {this.props.notes.map(this.mapNotes)}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  notes: fromRoot.getNoteNotes(state),
});

const mapDispatchToProps = dispatch => ({
  setTitle(title) {
    dispatch(common.setTitle(title));
  },
  loadNotes() {
    dispatch(note.loadNotes());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
