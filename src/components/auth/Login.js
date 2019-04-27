import React, {useState} from 'react';
import { Modal, Card, Form, Button, Divider, Icon, Header } from 'semantic-ui-react';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    if(e.target.id === 'email'){
      setEmail(e.target.value)
    }else{
      setPassword(e.target.value)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({email, password});
    //signIn({email, password});
    //this.props.signUp(this.state);
  };

  return (
    <Modal size='mini' trigger={
      <Header as='h5' inverted>
        <Button basic inverted>Login</Button>
      </Header>
    }>
      <Modal.Header as='h3'>Login to Re-vents</Modal.Header>
      <Modal.Content>
        <Card centered fluid>
          <Card.Content>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <input type="email" value={email} id="email" placeholder="Email" onChange={handleChange}/>
              </Form.Field>
              <Form.Field>
                <input type="password" value={password} id="password" placeholder="Password" onChange={handleChange}/>
              </Form.Field>
              <Button positive fluid>Login</Button>
            </Form>
            <Divider horizontal>Or</Divider>
            <Button color='facebook' fluid>
              <Icon name='facebook' /> Login with Facebook
            </Button>
            <br/>
            <Button color='google plus' fluid>
              <Icon name='google plus' /> Login with Google
            </Button>
          </Card.Content>
        </Card>
      </Modal.Content>
    </Modal>
  );
};

export default Login;
