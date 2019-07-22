import React, {useEffect} from 'react';
import EventForm from "./EventForm";
import { withFormik } from 'formik';
import {object, string, date} from 'yup';
import { connect } from 'react-redux';
import { addEvent, updateEvent, cancelEvent } from "../../store/actions/eventActions";
import { compose } from 'redux';
import {firestoreConnect} from "react-redux-firebase";

const CreateEditEvent = ({success, id, active, action, history, addEvent, values, handleChange, handleSubmit, setFieldValue, errors, touched, submitting, cancelEvent}) => {

  useEffect(() => {
    if(success){
      history.goBack();
    }
  }, [success]);

  useEffect(() => {
    if(!active){
      history.goBack();
    }
  }, [active]);

  return (
    <EventForm action={action} values={values} handleChange={handleChange} handleSubmit={handleSubmit} setFieldValue={setFieldValue} errors={ errors } touched={ touched } submitting={ submitting } cancelEvent={cancelEvent} id={id}/>
  );
};

const mapStateToProps = ({ event: {err}, form: {success, submitting}, firestore: {ordered: {updateEventDoc}}}, ownprops) => {
  let action = '';
  let id = '';
  if(ownprops.match && ownprops.match.path === '/createEvent'){
    action = 'create';
  }else{
    action = 'update';
    id = ownprops.match.params.id;
  }
  return{
    err,
    success,
    submitting,
    action,
    id,
    event: updateEventDoc ? updateEventDoc[0] : [],
    active: updateEventDoc ? updateEventDoc[0].active : true
  }
};

const mapDispatchToProps = dispatch => {
  return{
    addEvent: (eventDetail) => dispatch(addEvent(eventDetail)),
    updateEvent: (eventDetail, id) => dispatch(updateEvent(eventDetail, id)),
    cancelEvent: (id) => dispatch(cancelEvent(id))
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    if(props.action === 'update'){
      return [
        {
          collection: 'events',
          doc: props.id,
          storeAs: 'updateEventDoc'
        },
      ]
    }else{
      return []
    }
  })
)(withFormik({
  mapPropsToValues({action, event, id}){
    if(action === 'update'){
      return{
        name: event.name || '',
        about: event.about || '',
        detail: event.detail || '',
        city: event.city || '',
        venue: event.venue || '',
        latLng: event.latLng || '',
        dateTime: event.dateTime ? new Date(event.dateTime.seconds * 1000) : ''
      }
    }
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
  enableReinitialize: true,
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
  handleSubmit(values, { props : {action, addEvent, id, updateEvent} }){
    if(action === 'update'){
      updateEvent(values, id);
    }else{
      addEvent(values);
    }
  }
})(CreateEditEvent));
