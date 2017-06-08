import React, { PureComponent } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

class NoteModify extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container gutter={24}>
        <Grid item xs={12} md={8}>
          <TextField id="title" label="Título de la Nota" />
        </Grid>

        <Grid item xs={12} md={4} className={classes.actionButtons}>
          <Button raised primary>Guardar</Button>
          <Button raised accent>Vaciar</Button>
        </Grid>

        <Grid item xs={12} md={6}>
          Input
        </Grid>

        <Hidden smDown>
          <Grid item md={6}>
            Output
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
