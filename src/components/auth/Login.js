import React, {useState} from 'react';
import { Modal, Card, Form, Button, Divider, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { signIn, googleSignIn} from "../../store/actions/authActions";

const Login = ({ signIn, trigger, googleSignIn }) => {

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
    signIn({email, password});
  };

  return (
    <Modal size='mini' trigger={trigger}>
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
            <Button color='google plus' onClick={googleSignIn} fluid>
              <Icon name='google plus' /> Login with Google
            </Button>
          </Card.Content>
        </Card>
      </Modal.Content>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return{
    signIn: (credentials) => dispatch(signIn(credentials)),
    googleSignIn: (credentials) => dispatch(googleSignIn(credentials))
  }
};

export default connect(null, mapDispatchToProps)(Login);
