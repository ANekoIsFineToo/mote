import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';

import * as note from '../../actions/note';
import NoteInput from '../../components/NoteInput';
import NoteOutput from '../../components/NoteOutput';
import * as fromRoot from '../../reducers';

class NoteAdd extends PureComponent {
  static propTypes = {
    draft: PropTypes.string.isRequired,
    saveDraft: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Container fluid className="NoteAdd">
        <Helmet>
          <title>Añadir nota</title>
        </Helmet>

        <Row>
          <Col xs="6">
            <NoteInput onChange={this.props.saveDraft} value={this.props.draft} />
          </Col>

          <Col xs="6">
            <NoteOutput markdown={this.props.draft} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  draft: fromRoot.getNoteDraft(state),
});

const mapDispatchToProps = dispatch => ({
  saveDraft(draft) {
    dispatch(note.saveDraft(draft));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteAdd));
