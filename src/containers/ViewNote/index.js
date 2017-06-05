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

class ViewNote extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    note: ImmutablePropTypes.map.isRequired,
    loadNote: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadNote(parseInt(this.props.match.params.id, 10));
  }

  getTitle() {
    return this.props.note.get('title') || 'Sin título';
  }

  render() {
    return (
      <div className="ViewNote">
        <Helmet>
          <title>{this.getTitle()}</title>
        </Helmet>

        <Container>
          <Row className="mb-3">
            <Col xs="9">
              <Input static>{this.getTitle()}</Input>
            </Col>

            <Col xs="3">
              <Button className="mr-2" color="primary" tag={Link} to={this.props.match.url + '/edit'}>Editar</Button>
              <Button outline color="danger">Eliminar</Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <NoteOutput markdown={this.props.note.get('content')} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  note: fromRoot.getNoteNote(state),
});

const mapDispatchToProps = dispatch => ({
  loadNote(id) {
    dispatch(note.loadNote(id));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewNote));
