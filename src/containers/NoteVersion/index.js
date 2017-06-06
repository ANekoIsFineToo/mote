import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as note from '../../actions/note';
import * as fromRoot from '../../reducers';

class NoteVersion extends PureComponent {
  static propTypes = {
    version: ImmutablePropTypes.map.isRequired,
  };

  render() {
    return (
      <div className="NoteVersion">
        NoteVersion
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteVersion));
