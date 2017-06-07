import React, { PureComponent } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';

class AppFrame extends PureComponent {

  render() {
    return (
      <div>
        AppFrame
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
}));

export default withStyles(styleSheet)(AppFrame);
