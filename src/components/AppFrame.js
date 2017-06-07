import React, { PureComponent } from 'react';
import AppBar from 'material-ui/AppBar';
import ToolBar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import PropTypes from 'prop-types';

class AppFrame extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className={this.props.classes.appFrame}>
        <AppBar>
          <ToolBar>
            <Typography type="title" colorInherit noWrap>
              Mote
            </Typography>
          </ToolBar>
        </AppBar>
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
}));

export default withStyles(styleSheet)(AppFrame);
