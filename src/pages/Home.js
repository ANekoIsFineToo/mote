import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as common from '../actions/common';

class Home extends PureComponent {
  static propTypes = {
    setTitle: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.setTitle('');
  }

  render() {
    return (
      <div>
        Home
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setTitle(title) {
    dispatch(common.setTitle(title));
  },
});

export default connect(null, mapDispatchToProps)(Home);
