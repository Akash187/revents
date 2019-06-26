import React from 'react';
import {Card, Button} from "semantic-ui-react";
import Login from "./Login";
import Register from "./Register";

const Authenticate = ({history}) => {
  return (
    <div className='authenticate'>
      <Card className='authenticate-card'>
        <Card.Content>
          <Card.Header>You must be logged in to access it!</Card.Header>
        </Card.Content>
        <Card.Content textAlign='center'>
          <Card.Description>
            To view this page, log in or register.
          </Card.Description>
          <Button.Group fluid style={{ margin: '1rem 0'}}>
            <Login trigger={<Button color='blue'>Sign In</Button>}/>
            <Button.Or />
            <Register trigger={<Button positive>Register</Button>}/>
          </Button.Group>
        </Card.Content>
        <Card.Content textAlign='center'>
          <Card.Description>
            Or click cancel to continue as a guest.
          </Card.Description>
          <Button style={{ margin: '1rem 0'}} onClick={() => history.push('/dashboard')}>Cancel</Button>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Authenticate;