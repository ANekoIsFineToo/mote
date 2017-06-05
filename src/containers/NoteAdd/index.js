import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
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
    draft: ImmutablePropTypes.map.isRequired,
    loadDraft: PropTypes.func.isRequired,
    saveDraft: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleContentChange = this.handleContentChange.bind(this);
  }

  componentDidMount() {
    this.props.loadDraft(0);
  }

  handleContentChange(content) {
    this.props.saveDraft(this.props.draft.set('content', content));
  }

  render() {
    return (
      <Container fluid className="NoteAdd">
        <Helmet>
          <title>Añadir nota</title>
        </Helmet>

        <Row>
          <Col xs="6">
            <NoteInput onChange={this.handleContentChange} value={this.props.draft.get('content')} />
          </Col>

          <Col xs="6">
            <NoteOutput markdown={this.props.draft.get('content')} />
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
  loadDraft(id) {
    dispatch(note.loadDraft(id));
  },
  saveDraft(draft) {
    dispatch(note.saveDraft(draft));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteAdd));
