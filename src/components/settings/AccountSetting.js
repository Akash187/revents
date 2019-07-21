import React, {Fragment} from 'react';
import {Card, Form, Button, Message, Divider, Header, Icon} from "semantic-ui-react";
import { withFormik } from 'formik';
import {object, string} from 'yup';
import {connect} from 'react-redux';
import {updatePassword} from "../../store/actions/authActions";

const AccountSetting = ({handleChange, handleSubmit, errors, touched, submitting, values, profile}) => {

  return (
    <Card fluid>
      <Card.Header as='h1' className='setting-header'>Account</Card.Header>
      <Card.Content>
        {profile.authMethod === 'google' ?
          <Fragment>
            <Header color='teal' size='tiny' style={{marginBottom: '0.5rem'}}>Google Account</Header>
            <Card.Description style={{marginBottom: '0.5rem'}}>Visit Google to update your account settings</Card.Description>
            <Button as='a' href='https://myaccount.google.com/email' target="_blank" color='google plus'>
              <Icon name='google plus' /> Google Plus
            </Button>
          </Fragment>
          : profile.authMethod === 'facebook' ?
            <Fragment>
              <Fragment>
                <Header color='teal' size='tiny' style={{marginBottom: '0.5rem'}}>Facebook Account</Header>
                <Card.Description style={{marginBottom: '0.5rem'}}>Visit Facebook to update your account settings</Card.Description>
                <Button as='a' href='https://www.facebook.com/login' target="_blank" color='facebook'>
                  <Icon name='facebook' /> Facebook
                </Button>
              </Fragment>
            </Fragment>
            : <Fragment>
              <Header color='teal' size='tiny' style={{marginBottom: '0.5rem'}}>CHANGE PASSWORD</Header>
              <Card.Description style={{marginBottom: '0.5rem'}}>Use this form to update your account settings</Card.Description>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <input placeholder='New Password' type='password' value={values.password} name='password' onChange={handleChange}/>
                </Form.Field>
                {errors.password && touched.password && <Message
                  size='mini'
                  negative
                  header={errors.password}/>}
                <Form.Field>
                  <input placeholder='Confirm Password' type='password' value={values.reEnterPassword} name='reEnterPassword' onChange={handleChange}/>
                </Form.Field>
                {errors.reEnterPassword && touched.reEnterPassword && <Message
                  size='mini'
                  negative
                  header={errors.reEnterPassword}/>}
                {errors.passwordNotMatched && <Message
                  size='mini'
                  negative
                  header={errors.passwordNotMatched}/>}
                <Divider />
                <Button positive type='submit' loading={submitting}>Update Password</Button>
              </Form>
            </Fragment>
        }
      </Card.Content>
    </Card>
  );
};

const mapStateToProps = ({firebase: {profile}, form: {submitting}}) => {
  return{
    profile: profile,
    submitting
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    updatePassword: (newPassword) => dispatch(updatePassword(newPassword))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withFormik({
  mapPropsToValues(){
    return{
      password: '',
      reEnterPassword: ''
    }
  },
  validationSchema: object().shape({
    password: string().min(6, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
    reEnterPassword: string().min(6, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
  }),
  handleSubmit(values, { setErrors, resetForm, props: {updatePassword}}){
    if(values.password !== values.reEnterPassword){
      setErrors({passwordNotMatched: "Password did not match!"});
    }else{
      updatePassword(values.password);
      setTimeout(() => resetForm(), 3000);
    }
  }
})(AccountSetting));
