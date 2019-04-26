import React from 'react';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
import { Menu, Container } from 'semantic-ui-react';
import logo from '../../assets/logo.png';

const Navbar = () => {
  return (
    <Menu size='large' fixed='top' className="navbar" inverted>
      <Container>
        <Menu.Item>
          <img src={logo} alt="logo"/>
          <span className="navbar-title">Re-vents</span>
        </Menu.Item>
        <Menu.Item>
          Events
        </Menu.Item>
        {/*<SignedOutLinks/>*/}
        <SignedInLinks/>
      </Container>
    </Menu>
  );
};

export default Navbar;
