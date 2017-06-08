import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import PropTypes from 'prop-types';

class AppDrawer extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    open: PropTypes.bool.isRequired,
    docked: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
  };

  render() {
    const { classes } = this.props;

    return (
      <Drawer
        className={this.props.className}
        classes={{
          paper: classes.paper,
        }}
        open={this.props.open}
        docked={this.props.docked}
        onRequestClose={this.props.onRequestClose}
      >
        <Button
          className={classes.button}
          component={NavLink}
          exact
          to="/"
          activeClassName={classes.buttonActive}
        >
          Notas
        </Button>
        <Button
          className={classes.button}
          component={NavLink}
          to="/note/add"
          activeClassName={classes.buttonActive}
        >
          Añadir Nota
        </Button>
        <Divider className={classes.divider} />
        <Button
          className={classes.button}
          component={NavLink}
          to="/settings"
          activeClassName={classes.buttonActive}
        >
          Opciones
        </Button>
        <Button
          className={classes.button}
          component="a"
          href="https://github.com/DarkerTV/mote"
          target="_blank"
        >
          GitHub
        </Button>
      </Drawer>
    );
  }
}

const styleSheet = createStyleSheet('AppDrawer', theme => ({
  paper: {
    width: 250,
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  button: theme.mixins.gutters({
    borderRadius: 0,
    justifyContent: 'flex-start',
    textTransform: 'none',
  }),
  buttonActive: {
    color: theme.palette.accent[500],
  },
  divider: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  [theme.breakpoints.up('lg')]: {
    paper: {
      marginTop: '64px',
      zIndex: theme.zIndex.appBar - 1,
    },
  },
}));

export default withStyles(styleSheet)(AppDrawer);
