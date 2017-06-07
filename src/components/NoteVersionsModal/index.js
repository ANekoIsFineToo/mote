import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalBody, Table } from 'reactstrap';
import PropTypes from 'prop-types';

class NoteVersionsModal extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    versions: ImmutablePropTypes.list.isRequired,
    removeVersion: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        size="lg"
        contentClassName={'border-0 b-transparent ' + (!this.props.versions.size && 'text-center')}>
        <ModalBody>
          {
            !this.props.versions.size ?
              <h4 className="display-4 text-white">No hay versiones disponibles</h4> :
              <Table inverse responsive>
                <tbody>
                {
                  this.props.versions.reverse().map((version) => (
                    <tr key={version.get('id')}>
                      <th scope="row">{version.get('title')}</th>
                      <td className="text-right">
                        <Button
                          className="mr-2"
                          color="primary"
                          size="sm"
                          onClick={this.props.toggle}
                          tag={Link}
                          to={`${this.props.match.url}/version/${version.get('id')}`}>
                          Ver
                        </Button>

                        <Button
                          outline
                          color="warning"
                          size="sm"
                          onClick={() => this.props.removeVersion(version.get('id'))}>
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))
                }
                </tbody>
              </Table>
          }
        </ModalBody>
      </Modal>
    );
  }
}

export default NoteVersionsModal;
