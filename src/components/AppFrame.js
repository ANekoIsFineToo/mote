import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import compose from 'recompose/compose';
import classNames from 'classnames';
import withWidth, { isWidthUp } from 'material-ui/utils/withWidth';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';
import PropTypes from 'prop-types';

import AppDrawer from './AppDrawer';
import * as fromRoot from '../reducers';
import Home from '../pages/Home';
import Note from '../pages/Note';
import NoteAdd from '../pages/NoteAdd';

class AppFrame extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  state = {
    drawerOpen: isWidthUp('lg', this.props.width),
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  render() {
    const { classes } = this.props;
    const drawerDocked = isWidthUp('lg', this.props.width);

    return (
      <div className={classes.appFrame}>
        <Helmet titleTemplate="%s / Mote" defaultTitle="Mote">
          <title>{this.props.title}</title>
        </Helmet>

        <AppBar>
          <Toolbar>
            <IconButton className={classes.menuIcon} contrast onClick={this.handleDrawerToggle}>
              <MenuIcon />
            </IconButton>

            <Typography type="title" colorInherit noWrap>
              {this.props.title || 'Mote'}
            </Typography>
          </Toolbar>
        </AppBar>

        <AppDrawer title={this.props.title} open={this.state.drawerOpen} docked={drawerDocked} onRequestClose={this.handleDrawerClose} />

        <div className={classNames(classes.pagesContainer, { [classes.pagesContainerSpaced]: this.state.drawerOpen })}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/note/add" component={NoteAdd} />
            <Route path="/note/:id" component={Note} />
          </Switch>
        </div>
      </div>
    );
  }
}

const styleSheet = createStyleSheet('AppFrame', theme => ({
  '@global': {
    html: {
      boxSizing: 'border-box',
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: 0,
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
      lineHeight: '1.2',
      fontFamily: theme.typography.fontFamily,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
  },
  appFrame: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
  },
  menuIcon: {
    marginRight: theme.spacing.unit * 2,
  },
  pagesContainer: {
    flex: '1 0 100%',
    overflow: 'hidden',
    paddingTop: 64 + theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,
    paddingLeft: theme.spacing.unit * 5,
    paddingRight: theme.spacing.unit * 5,
    transition: theme.transitions.create('padding-left', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp
    }),
  },
  [theme.breakpoints.up('lg')]: {
    pagesContainerSpaced: {
      paddingLeft: 250 + theme.spacing.unit * 5,
      transition: theme.transitions.create('padding-left', {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut
      }),
    },
  }
}));

const mapStateToProps = state => ({
  title: fromRoot.getCommonTitle(state),
});

export default compose(withStyles(styleSheet), withWidth(), connect(mapStateToProps))(AppFrame);
