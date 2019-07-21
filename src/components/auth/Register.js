import React, { useState } from 'react';
import { Modal, Card, Form, Button, Divider, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {googleSignIn, signUp, facebookSignIn} from "../../store/actions/authActions";
import { withRouter } from "react-router-dom";

const Register = ({history, signUp, trigger, googleSignIn, facebookSignIn, submitting}) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    if(e.target.id === 'name'){
      setName(e.target.value)
    }else if(e.target.id === 'email'){
      setEmail(e.target.value.trim())
    }else{
      setPassword(e.target.value.trim())
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp({name, email, password});
  };

  return (
    <Modal size='mini' trigger={trigger}>
      <Modal.Header as='h3'>Register to Re-vents</Modal.Header>
      <Modal.Content>
        <Card centered fluid>
          <Card.Content>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <input type="text" value={name} id="name" placeholder="Name" pattern="[A-Za-z0-9_ ]{3,}" title="Minimum three letter name." onChange={handleChange} required/>
              </Form.Field>
              <Form.Field>
                <input type="email" value={email} id="email" placeholder="Email" onChange={handleChange}/>
              </Form.Field>
              <Form.Field>
                <input type="password" value={password} id="password" placeholder="Password" pattern="[a-zA-Z0-9~!@#$%^&*]{6,}" title="Password must be atleast 6 characters. May contain letters, number or special characters." onChange={handleChange} required/>
              </Form.Field>
              <Button color='blue' loading={submitting} fluid>Register</Button>
            </Form>
            <Divider horizontal>Or</Divider>
            <Button color='facebook' onClick={facebookSignIn} fluid>
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

const mapStateToProps = ({form: {submitting}}) => {
  return{
    submitting
  }
};


const mapDispatchToProps = (dispatch) => {
  return{
    signUp: (newUser) => dispatch(signUp(newUser)),
    googleSignIn: () => dispatch(googleSignIn()),
    facebookSignIn: () => dispatch(facebookSignIn())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
