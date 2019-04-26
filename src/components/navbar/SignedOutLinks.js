import React, { Fragment } from 'react';
import { Button, Menu, Header } from 'semantic-ui-react';

const SignedOutLinks = () => {
  return (
    <Fragment>
      <Menu.Menu position='right'>
        <Menu.Item>
          <Header as='h5' inverted>
            <Button basic inverted>
              Login
            </Button>
          </Header>
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
