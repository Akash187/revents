import React, {useEffect} from 'react';
import EventForm from "./EventForm";
import { withFormik } from 'formik';
import {object, string, date} from 'yup';
import { connect } from 'react-redux';
import { addEvent } from "../../store/actions/eventActions";

const CreateEditEvent = ({success, history, addEvent, values, handleChange, handleSubmit, setFieldValue, errors, touched, submitting}) => {

  useEffect(() => {
    if(success){
      history.push('/dashboard');
    }
  }, [success]);

  return (
    <EventForm values={values} handleChange={handleChange} handleSubmit={handleSubmit} setFieldValue={setFieldValue} errors={ errors } touched={ touched } submitting={ submitting }/>
  );
};

const mapStateToProps = ({ event: {err}, form: {success, submitting}}) => {
  return{
    err,
    success,
    submitting
  }
};

const mapDispatchToProps = dispatch => {
  return{
    addEvent: (eventDetail) => dispatch(addEvent(eventDetail))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withFormik({
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
      .max(500, 'Detail must not be more than 200 character')
      .required('Required'),
    city: string().min(5, 'Too Short!')
      .required('Required'),
    venue: string().min(5, 'Too Short!')
      .required('Required'),
    latLng: object(),
    dateTime: date().required('Required')
  }),
  handleSubmit(values, { props }){
    props.addEvent(values);
  }
})(CreateEditEvent));
