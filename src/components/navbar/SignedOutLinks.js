import React, { Fragment } from 'react';
import { Menu } from 'semantic-ui-react';
import Login from "../auth/Login";
import Register from "../auth/Register";

const SignedOutLinks = () => {
  return (
    <Fragment>
      <Menu.Menu position='right'>
        <Menu.Item>
          <Login/>
        </Menu.Item>
        <Menu.Item>
          <Register/>
        </Menu.Item>
      </Menu.Menu>
    </Fragment>
  );
};

export default SignedOutLinks;
