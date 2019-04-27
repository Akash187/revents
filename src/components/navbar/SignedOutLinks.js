import React, { Fragment } from 'react';
import { Button, Menu, Header } from 'semantic-ui-react';
import Login from "../auth/Login";

const SignedOutLinks = () => {
  return (
    <Fragment>
      <Menu.Menu position='right'>
        <Menu.Item>
          <Login/>
        </Menu.Item>
        <Menu.Item>
          <Header as='h5' inverted>
            <Button basic inverted>
              Register
            </Button>
          </Header>
        </Menu.Item>
      </Menu.Menu>
    </Fragment>
  );
};

export default SignedOutLinks;
