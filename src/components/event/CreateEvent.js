import React from 'react';
import EventForm from "./EventForm";
import { withFormik } from 'formik';
import {object, string, number} from 'yup';


const CreateEvent = ({values, handleChange, handleSubmit, setFieldValue, errors, touched, isSubmitting}) => {
  return (
    <EventForm values={values} handleChange={handleChange} handleSubmit={handleSubmit} setFieldValue={setFieldValue} errors={ errors } touched={ touched } isSubmitting={ isSubmitting }/>
  );
};

export default withFormik({
  mapPropsToValues(){
    return{
      name: '',
      about: '',
      detail: '',
      city: '',
      venue: '',
      latLng: '',
      dateTime: ''
    }
  },
  validationSchema: object().shape({
    name: string().min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    about: string().required('Required'),
    detail: string().min(5, 'Too Short!')
      .max(200, 'Detail must not be more than 200 character')
      .required('Required'),
    city: string().min(5, 'Too Short!')
      .required('Required'),
    venue: string().min(5, 'Too Short!')
      .required('Required'),
    latLng: string(),
    dateTime: number().required('Required')
  }),
  handleSubmit(values, { setSubmitting }){
      setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 3000);
  }
})(CreateEvent);
