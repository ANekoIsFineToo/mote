import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as common from '../actions/common';

class NoteAdd extends PureComponent {
  static propTypes = {
    setTitle: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.setTitle('Añadir Nota');
  }

  render() {
    return (
      <div>
        NoteAdd
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setTitle(title) {
    dispatch(common.setTitle(title));
  },
});

export default connect(null, mapDispatchToProps)(NoteAdd);
