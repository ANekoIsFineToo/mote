import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

import NoteInput from './NoteInput';
import NoteOutput from './NoteOutput';

class NoteModify extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    draft: ImmutablePropTypes.map.isRequired,
    saveDraft: PropTypes.func.isRequired,
    saveNote: PropTypes.func.isRequired,
  };

  saveNote = () => this.props.saveNote(this.props.draft);

  clearAll = () => this.props.saveDraft(this.props.draft.set('title', '').set('content', ''));

  handleTitleChange = e => this.props.saveDraft(this.props.draft.set('title', e.target.value));

  handleContentChange = content => this.props.saveDraft(this.props.draft.set('content', content));

  render() {
    const { classes } = this.props;

    return (
      <Grid container gutter={24}>
        <Grid item xs={12} md={8}>
          <TextField
            id="title"
            label="Título de la Nota"
            value={this.props.draft.get('title')}
            onChange={this.handleTitleChange}
          />
        </Grid>

        <Grid item xs={12} md={4} className={classes.actionButtons}>
          <Button raised color="primary" onClick={this.saveNote}>Guardar</Button>
          <Button raised color="accent" onClick={this.clearAll}>Vaciar</Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <NoteInput value={this.props.draft.get('content')} onChange={this.handleContentChange} />
        </Grid>

        <Hidden smDown>
          <Grid item md={6}>
            <NoteOutput content={this.props.draft.get('content')} />
          </Grid>
        </Hidden>
      </Grid>
    );
  }
}

const styleSheet = createStyleSheet('NoteModify', theme => ({
  actionButtons: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  [theme.breakpoints.up('md')]: {
    actionButtons: {
      marginBottom: theme.spacing.unit,
    },
  },
}));

export default withStyles(styleSheet)(NoteModify);
