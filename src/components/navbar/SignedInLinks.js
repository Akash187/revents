import React, { Fragment } from 'react';
import {Button, Image, Menu, Dropdown} from 'semantic-ui-react';
import user from '../../assets/user.png';

const SignedInLinks = () => {
  return (
    <Fragment>
      <Menu.Item>
        People
      </Menu.Item>
      <Menu.Item>
        <Button inverted positive>Create Event</Button>
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item>
          <Image circular size='mini' src={user} alt="logo"/>
          <Dropdown text='Random' pointing className='link item'>
            <Dropdown.Menu>
              <Dropdown.Item icon='plus' text='Create Event'/>
              <Dropdown.Item icon='calendar alternate' text='My Event'/>
              <Dropdown.Item icon='users' text='My Community'/>
              <Dropdown.Item icon='user' text='My Profile'/>
              <Dropdown.Item icon='settings' text='Setting'/>
              <Dropdown.Item icon='power' text='Logout'/>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu.Menu>
    </Fragment>
  );
};

export default SignedInLinks;
