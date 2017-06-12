import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import CloseIcon from 'material-ui-icons/Close';
import PropTypes from 'prop-types';

import * as common from '../actions/common';
import * as fromRoot from '../reducers';

class AppSnackbar extends PureComponent {
  static propTypes = {
    snackbar: PropTypes.string.isRequired,
    setSnackbar: PropTypes.func.isRequired,
  };

  state = {
    snackbarOpen: true,
  };

  handleSnackbarClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackbarOpen: false });
  };

  componentDidMount() {
    this.props.setSnackbar('message');
    this.props.setSnackbar('another message');
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
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
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Note archived</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            // className={classes.close}
            onClick={this.handleSnackbarClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

const mapStateToProps = state => ({
  snackbar: fromRoot.getCommonSnackbar(state),
});

const mapDispatchToProps = dispatch => ({
  setSnackbar(message) {
    dispatch(common.setSnackbar(message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppSnackbar);
