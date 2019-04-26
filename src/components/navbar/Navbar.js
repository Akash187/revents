import React from 'react';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
import { Menu, Container, Header } from 'semantic-ui-react';
import logo from '../../assets/logo.png';

const Navbar = () => {
  return (
    <Menu size='mini' fixed='top' className="navbar" inverted>
      <Container>
        <Menu.Item>
          <Header as='h4' inverted>
          <img src={logo} alt="logo"/>
          <span className="navbar-title">Re-vents</span>
          </Header>
        </Menu.Item>
        <Menu.Item>
          <Header as='h5' inverted>
            Events
          </Header>
        </Menu.Item>
        {/*<SignedOutLinks/>*/}
        <SignedInLinks/>
      </Container>
    </Menu>
  );
};

export default Navbar;
