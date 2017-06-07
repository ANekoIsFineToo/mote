import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import PropTypes from 'prop-types';

import * as note from '../../actions/note';
import NoteOutput from '../../components/NoteOutput';
import * as fromRoot from '../../reducers';

class NoteVersion extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    version: ImmutablePropTypes.map.isRequired,
    loadVersion: PropTypes.func.isRequired,
    restoreVersion: PropTypes.func.isRequired,
    removeVersion: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.restoreVersion = this.restoreVersion.bind(this);
    this.removeVersion = this.removeVersion.bind(this);
  }

  componentDidMount() {
    this.props.loadVersion(parseInt(this.props.match.params.version, 10));
  }

  restoreVersion() {
    this.props.restoreVersion(parseInt(this.props.match.params.version, 10));
  }

  removeVersion() {
    this.props.removeVersion(parseInt(this.props.match.params.version, 10));
  }

  getTitle() {
    return this.props.version.get('title') || 'Sin título';
  }

  render() {
    return (
      <div className="NoteVersion">
        <Helmet>
          <title>{this.getTitle()}</title>
        </Helmet>

        <Container>
          <Row className="mb-3">
            <Col xs="2">
              <Button outline color="primary" tag={Link} to={'/note/' + this.props.match.params.id}>Volver</Button>
            </Col>

            <Col xs="7">
              <Input static>{this.getTitle()}</Input>
            </Col>

            <Col className="d-flex justify-content-between" xs="3">
              <Button className="mr-2" color="success" onClick={this.restoreVersion}>Restaurar</Button>
              <Button outline color="warning" onClick={this.removeVersion}>Eliminar</Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <NoteOutput markdown={this.props.version.get('content')} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  version: fromRoot.getNoteVersion(state),
});

const mapDispatchToProps = dispatch => ({
  loadVersion(id) {
    dispatch(note.loadVersion(id));
  },
  restoreVersion(id) {
    dispatch(note.restoreVersion(id));
  },
  removeVersion(id) {
    dispatch(note.removeVersion(id));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteVersion));
