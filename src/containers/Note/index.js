import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, Col, Container, Input, Modal, ModalBody, Row, Table } from 'reactstrap';
import PropTypes from 'prop-types';

import * as note from '../../actions/note';
import NoteOutput from '../../components/NoteOutput';
import * as fromRoot from '../../reducers';

class Note extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    note: ImmutablePropTypes.map.isRequired,
    versions: ImmutablePropTypes.list.isRequired,
    loadNote: PropTypes.func.isRequired,
    removeNote: PropTypes.func.isRequired,
    loadVersions: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      versionsOpen: false,
    };

    this.removeNote = this.removeNote.bind(this);
    this.toggleVersions = this.toggleVersions.bind(this);
  }

  componentDidMount() {
    const id = parseInt(this.props.match.params.id, 10);

    this.props.loadNote(id);
    this.props.loadVersions(id);
  }

  removeNote() {
    this.props.removeNote(parseInt(this.props.match.params.id, 10));
  }

  toggleVersions() {
    this.setState({
      versionsOpen: !this.state.versionsOpen,
    });
  }

  getTitle() {
    return this.props.note.get('title') || 'Sin título';
  }

  render() {
    return (
      <div className="Note">
        <Helmet>
          <title>{this.getTitle()}</title>
        </Helmet>

        <Container>
          <Row className="mb-3">
            <Col xs="8">
              <Input static>{this.getTitle()}</Input>
            </Col>

            <Col className="d-flex justify-content-between" xs="4">
              <Button className="mr-2" color="primary" tag={Link} to={this.props.match.url + '/edit'}>Editar</Button>
              <Button outline className="mr-2" color="info" onClick={this.toggleVersions}>Versiones</Button>
              <Button outline color="danger" onClick={this.removeNote}>Eliminar</Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <NoteOutput markdown={this.props.note.get('content')} />
            </Col>
          </Row>
        </Container>

        <Modal
          isOpen={this.state.versionsOpen}
          toggle={this.toggleVersions}
          contentClassName="border-0 b-transparent">
          <ModalBody>
            <Table inverse>
              <tbody>
                <tr>
                  <th scope="row">
                    Title
                  </th>
                </tr>
              </tbody>
            </Table>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  note: fromRoot.getNoteNote(state),
  versions: fromRoot.getNoteVersions(state),
});

const mapDispatchToProps = dispatch => ({
  loadNote(id) {
    dispatch(note.loadNote(id));
  },
  removeNote(id) {
    dispatch(note.removeNote(id));
  },
  loadVersions(id) {
    dispatch(note.loadVersions(id));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Note));
