import React, { Fragment } from 'react';
import {Button, Menu} from 'semantic-ui-react';

const SignedOutLinks = () => {
  return (
    <Fragment>
      <Menu.Menu position='right'>
        <Menu.Item>
          <Button basic inverted>
            Login
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button basic inverted>
            Register
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Fragment>
  );
};

export default SignedOutLinks;
