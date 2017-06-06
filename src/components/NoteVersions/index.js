import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Button, Table } from 'reactstrap';

import './index.css';

class NoteVersions extends PureComponent {
  static propTypes = {
    versions: ImmutablePropTypes.list.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      versionsOpen: false,
      toggleVersionsText: 'Expandir',
    };

    this.toggleVersions = this.toggleVersions.bind(this);
    this.mapVersions = this.mapVersions.bind(this);
  }

  toggleVersions() {
    this.setState({
      versionsOpen: !this.state.versionsOpen,
      toggleVersionsText: this.state.versionsOpen ? 'Expandir' : 'Contraer',
    });
  }

  mapVersions(version) {
    return (
      <tr key={version.get('id')}>
        <th className="align-middle" scope="row">{version.get('title')}</th>
        <td className="text-right">
          <Button className="mr-2" color="primary" size="sm">Ver</Button>
          <Button outline color="warning" size="sm">Eliminar</Button>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <Table inverse className="NoteVersions">
        <thead>
          <tr>
            <th>Versiones</th>
            <th className="text-right">
              <Button color="primary" size="sm" onClick={this.toggleVersions}>{this.state.toggleVersionsText}</Button>
            </th>
          </tr>
        </thead>
        <tbody className={'animated animated-3 versions ' + (this.state.versionsOpen ? 'versions-expanded' : '')}>
          {this.props.versions.map(this.mapVersions)}
        </tbody>
      </Table>
    );
  }
}

export default NoteVersions;
