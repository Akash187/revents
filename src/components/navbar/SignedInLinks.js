import React, { Fragment } from 'react';
import {Button, Image, Menu, Dropdown, Header} from 'semantic-ui-react';
import {NavLink, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from "../../store/actions/authActions";

const SignedInLinks = ({name, history, signOut}) => {
  return (
    <Fragment>
      <Menu.Item>
        <NavLink to='/people/123'>
          <Header as='h5' inverted>
            People
          </Header>
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <Header as='h5' inverted>
          <Button inverted positive onClick={() => history.push('/createEvent')}>Create Event</Button>
        </Header>
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item>
          <Image circular size='mini' src='/assets/user.png' alt="logo"/>
          <Dropdown text={ name || 'Random'} pointing className='link item navbar-dropdown'>
            <Dropdown.Menu>
              <Dropdown.Item icon='plus' text='Create Event'/>
              <Dropdown.Item icon='calendar alternate' text='My Event'/>
              <Dropdown.Item icon='users' text='My Community'/>
              <Dropdown.Item icon='user' text='My Profile' onClick={() => history.push('/user/123')}/>
              <Dropdown.Item icon='settings' text='Setting' onClick={() => history.push('/settings/basic')}/>
              <Dropdown.Item icon='power' text='Logout' onClick={signOut}/>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu.Menu>
    </Fragment>
  );
};

const mapStateToProps = ({firebase: { profile }}) => {
  return{
    name: profile.name
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    signOut: () => dispatch(signOut())
  }

};

export default connect( mapStateToProps, mapDispatchToProps )(withRouter(SignedInLinks));
