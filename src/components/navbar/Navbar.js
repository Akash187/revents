import React from 'react';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
import { Menu, Container, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

const Navbar = ({ auth }) => {

  return (
    isLoaded(auth) ? <Menu size='tiny' fixed='top' className="navbar" inverted>
      <Container>
        <Menu.Item>
          <NavLink exact to='/'>
            <Header as='h4' inverted>
              <img src='/assets/logo.png' alt="logo"/>
              <span className="navbar-title">Re-vents</span>
            </Header>
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to='/dashboard'>
            <Header as='h5' inverted>
              Events
            </Header>
          </NavLink>
        </Menu.Item>
        { auth.uid ? <SignedInLinks/> : <SignedOutLinks/> }
      </Container>
    </Menu> : <div/>
  );
};

const mapStateToProps = ({firebase : {auth}}) => {
  return{
    auth
  }
};

export default connect(mapStateToProps)( Navbar );
