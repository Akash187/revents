import React, { Fragment } from 'react';
import {Menu, Button, Header} from 'semantic-ui-react';
import Login from "../auth/Login";
import Register from "../auth/Register";

const SignedOutLinks = () => {
  return (
    <Fragment>
      <Menu.Menu position='right'>
        <Menu.Item>
          <Login trigger={<Header as='h5' inverted> <Button basic inverted>Login</Button> </Header>}/>
        </Menu.Item>
        <Menu.Item>
          <Register trigger={<Header as='h5' inverted> <Button basic inverted>Register</Button> </Header>}/>
        </Menu.Item>
      </Menu.Menu>
    </Fragment>
  );
};

export default SignedOutLinks;
