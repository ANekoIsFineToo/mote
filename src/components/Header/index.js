import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

class Header extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Container className="Header my-3">
        <Navbar color="fade" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand tag={Link} to="/">Mote</NavbarBrand>

          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink tag={Link} to="/">Inicio</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    );
  }
}

export default Header;
