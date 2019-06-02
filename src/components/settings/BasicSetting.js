import React, {useState} from 'react';
import {Card, Form, Button, Message, Divider} from "semantic-ui-react";
import { withFormik } from 'formik';
import {object, string, date} from 'yup';
import DatePicker from "react-datepicker";
import moment from 'moment';

const BasicSetting = ({values, handleChange, handleSubmit, setFieldValue, errors, touched, isSubmitting}) => {

  const [birthDate, setDate] = useState(values.birthDate);

  const updateBirthDate = date => {
    setDate(date);
    setFieldValue('birthDate', date);
  };

  return (
    <Card fluid>
      <Card.Header as='h1' className='setting-header'>Basics</Card.Header>
      <Card.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <input placeholder='Name' name='name' value={values.name} onChange={handleChange}/>
          </Form.Field>
          {errors.name && touched.name && <Message
            size='mini'
            negative
            header={errors.name}/>}
          <Form.Group inline>
            <label>Gender</label>
            <Form.Radio
              label='Male'
              value='male'
              checked={values.gender === 'male'}
              onChange={() => setFieldValue('gender', 'male')}
            />
            <Form.Radio
              label='Female'
              value='female'
              checked={values.gender === 'female'}
              onChange={() => setFieldValue('gender', 'female')}
            />
          </Form.Group>
          {errors.gender && touched.gender && <Message
            size='mini'
            negative
            header={errors.gender}/>}
          <div>
            <DatePicker
              selected={birthDate}
              maxDate={new Date(moment().subtract(18, 'y').format())}
              onChange={updateBirthDate}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText="Date of Birth"
              dateFormat="d, MMMM yyyy"
            />
          </div>
          <Form.Field>
            <input placeholder='Address' name='address' value={values.address} onChange={handleChange}/>
          </Form.Field>
          {errors.address && touched.address && <Message
            size='mini'
            negative
            header={errors.address}/>}
          <Divider />
          <Button positive type='submit' loading={isSubmitting}>Update Profile</Button>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default withFormik({
  mapPropsToValues(){
    return{
      name: '',
      gender: 'male',
      birthDate: new Date('Wed May 02 2001 00:00:00 GMT+0530 (India Standard Time)'),
      address: ''
    }
  },
  validationSchema: object().shape({
    name: string().min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    gender: string().required('Required'),
    birthDate: date(),
    address: string().min(5, 'Too Short!')
    .max(100, 'Too Long!')
  }),
  handleSubmit(values, { setSubmitting }){
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 3000);
  }
})(BasicSetting);
