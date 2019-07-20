import React, { Fragment } from 'react';
import {Button, Image, Menu, Dropdown, Header} from 'semantic-ui-react';
import {NavLink, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from "../../store/actions/authActions";

const SignedInLinks = ({profile, history, signOut, auth}) => {
  return (
    <Fragment>
      <Menu.Item>
        <NavLink to={`/people/${auth.uid}`}>
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
          <Image circular size='mini' src={profile.images ? profile.images[0] : '/assets/user.png'} alt="logo"/>
          <Dropdown text={ profile.name || 'Random'} pointing className='link item navbar-dropdown'>
            <Dropdown.Menu>
              <Dropdown.Item icon='plus' text='Create Event' onClick={() => history.push(`/createEvent`)}/>
              <Dropdown.Item icon='calendar alternate' text='My Event' onClick={() => history.push(`/user/${auth.uid}/#myEvents`)}/>
              <Dropdown.Item icon='users' text='My Community' onClick={() => history.push(`/people/${auth.uid}`)}/>
              <Dropdown.Item icon='user' text='My Profile' onClick={() => history.push(`/user/${auth.uid}`)}/>
              <Dropdown.Item icon='settings' text='Setting' onClick={() => history.push('/settings/basic')}/>
              <Dropdown.Item icon='power' text='Logout' onClick={signOut}/>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu.Menu>
    </Fragment>
  );
};

const mapStateToProps = ({firebase: { profile, auth }}) => {
  return{
    profile,
    auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    signOut: () => dispatch(signOut())
  }

};

export default connect( mapStateToProps, mapDispatchToProps )(withRouter(SignedInLinks));
