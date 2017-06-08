import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import MenuIcon from 'material-ui-icons/Menu';
import PropTypes from 'prop-types';

class AppDrawer extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    docked: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
  };

  handleButtonClick = () => {
    if (!this.props.docked) {
      this.props.onRequestClose();
    }
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
        <Hidden lgUp>
          <div>
            <Toolbar>
              <IconButton className={classes.menuIcon} onClick={this.props.onRequestClose}>
                <MenuIcon />
              </IconButton>

              <Typography type="title" colorInherit noWrap>
                {this.props.title || 'Mote'}
              </Typography>
            </Toolbar>

            <Divider className={classes.bottomDivider} />
          </div>
        </Hidden>

        <Button
          className={classes.button}
          component={NavLink}
          exact
          to="/"
          activeClassName={classes.buttonActive}
          onClick={this.handleButtonClick}
        >
          Notas
        </Button>

        <Button
          className={classes.button}
          component={NavLink}
          to="/note/add"
          activeClassName={classes.buttonActive}
          onClick={this.handleButtonClick}
        >
          Añadir Nota
        </Button>
        <Divider className={classes.divider} />
        <Button
          className={classes.button}
          component={NavLink}
          to="/settings"
          activeClassName={classes.buttonActive}
          onClick={this.handleButtonClick}
        >
          Opciones
        </Button>

        <Button
          className={classes.button}
          component="a"
          href="https://github.com/DarkerTV/mote"
          target="_blank"
          onClick={this.handleButtonClick}
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
  bottomDivider: {
    marginBottom: theme.spacing.unit,
  },
  [theme.breakpoints.up('lg')]: {
    paper: {
      paddingTop: theme.spacing.unit,
      marginTop: '64px',
      zIndex: theme.zIndex.appBar - 1,
    },
  },
}));

export default withStyles(styleSheet)(AppDrawer);
