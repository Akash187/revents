import React from 'react';
import {Card, Form, Button, Message, Divider, Header} from "semantic-ui-react";
import { withFormik } from 'formik';
import {object, string} from 'yup';

const AccountSetting = ({handleChange, handleSubmit, errors, touched, isSubmitting}) => {

  console.log(errors);

  return (
    <Card fluid>
      <Card.Header as='h1' className='setting-header'>Account</Card.Header>
      <Card.Content>
        <Header color='teal' size='tiny' style={{marginBottom: '0.5rem'}}>CHANGE PASSWORD</Header>
        <Card.Description style={{marginBottom: '0.5rem'}}>Use this form to update your account settings</Card.Description>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <input placeholder='New Password' type='password' name='password' onChange={handleChange}/>
          </Form.Field>
          {errors.password && touched.password && <Message
            size='mini'
            negative
            header={errors.password}/>}
          <Form.Field>
            <input placeholder='Confirm Password' type='password' name='reEnterPassword' onChange={handleChange}/>
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
          <Button positive type='submit' loading={isSubmitting}>Update Password</Button>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default withFormik({
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
  handleSubmit(values, { setSubmitting, setErrors}){
    if(values.password !== values.reEnterPassword){
      setSubmitting(false);
      setErrors({passwordNotMatched: "Password did not match!"});
    }else{
      setTimeout(() => {
        console.log(values);
        setSubmitting(false);
      }, 3000);
    }
  }
})(AccountSetting);
