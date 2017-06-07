import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import { Button, Card, CardColumns, CardTitle, Col, Container, Row } from 'reactstrap';

import './index.css';

class NoteList extends PureComponent {
  static propTypes = {
    notes: ImmutablePropTypes.list.isRequired,
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <CardColumns className="NoteList">
              {
                this.props.notes.map((note) => (
                  <Card key={note.get('id')} block outline style={{ backgroundColor: 'transparent', borderColor: note.get('bgColor') }}>
                    <CardTitle>{note.get('title')}</CardTitle>
                    <Button block tag={Link} to={'/note/' + note.get('id')}>Ver</Button>
                  </Card>
                ))
              }
            </CardColumns>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NoteList;
