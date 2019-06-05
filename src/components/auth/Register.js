import React, { useState, useEffect } from 'react';
import { Modal, Card, Form, Button, Divider, Icon, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { signUp } from "../../store/actions/authActions";
import { withRouter } from "react-router-dom";

const Register = ({history, success, signUp }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(success){
      history.push('/dashboard');
    }
  }, [success]);

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
    <Modal size='mini' trigger={
      <Header as='h5' inverted>
        <Button basic inverted>Register</Button>
      </Header>
    }>
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
              <Button color='blue' fluid>Register</Button>
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

const mapStateToProps = state => {
  return {
    success: state.form.success
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    signUp: (newUser) => dispatch(signUp(newUser))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
