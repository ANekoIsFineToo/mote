import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as common from '../actions/common';
import NoteModify from '../components/NoteModify';

class NoteAdd extends PureComponent {
  static propTypes = {
    setTitle: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.setTitle('Añadir Nota');
  }

  render() {
    return (
      <NoteModify />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setTitle(title) {
    dispatch(common.setTitle(title));
  },
});

export default connect(null, mapDispatchToProps)(NoteAdd);
