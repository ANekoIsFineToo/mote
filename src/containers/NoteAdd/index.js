import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Col, Container, Row } from 'reactstrap';

import NoteInput from '../../components/NoteInput';

class NoteAdd extends PureComponent {

  render() {
    return (
      <Container fluid className="NoteAdd">
        <Helmet>
          <title>Añadir nota</title>
        </Helmet>

        <Row>
          <Col xs="6">
            <NoteInput />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NoteAdd;
