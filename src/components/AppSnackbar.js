import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { duration } from 'material-ui/styles/transitions';
import CloseIcon from 'material-ui-icons/Close';
import PropTypes from 'prop-types';

import * as fromRoot from '../reducers';

class AppSnackbar extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    snackbar: PropTypes.string.isRequired,
  };

  messageId = 0;
  messages = [];
  processingMessages = false;

  state = {
    snackbarOpen: false,
    message: '',
  };

  handleSnackbarClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackbarOpen: false });
  };

  processMessages = () => {
    this.processingMessages = true;

    if (this.messages.length) {
      const message = this.messages.shift();

      if (this.state.snackbarOpen) {
        this.setState({ snackbarOpen: false });

        setTimeout(() => this.setState({ snackbarOpen: true, message }), duration.leavingScreen);
        setTimeout(this.processMessages, duration.enteringScreen + duration.leavingScreen + 1e3);
      } else {
        this.setState({ snackbarOpen: true, message });

        setTimeout(this.processMessages, duration.enteringScreen + 1e3);
      }
    } else {
      this.processingMessages = false;
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.messageId !== nextProps.snackbar.get('id')) {
      this.messageId = nextProps.snackbar.get('id');
      this.messages.push(nextProps.snackbar.get('message'));

      if (!this.processingMessages) {
        this.processMessages();
      }
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.snackbarOpen}
        autoHideDuration={6e3}
        onRequestClose={this.handleSnackbarClose}
        contentProps={{
          'aria-describedby': 'app-snackbar',
        }}
        message={<span id="app-snackbar">{this.state.message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleSnackbarClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

const styleSheet = createStyleSheet('AppSnackbar', theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
}));

const mapStateToProps = state => ({
  snackbar: fromRoot.getCommonSnackbar(state),
});

export default compose(withStyles(styleSheet), connect(mapStateToProps))(AppSnackbar);
