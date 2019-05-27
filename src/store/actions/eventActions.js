import {firestore, firebase} from "../../config/fbConfig";
import {toastr} from 'react-redux-toastr';

export const addEvent = (eventDetail) => {
  return (dispatch, getState) => {
    firestore.collection('events').add({
      ...eventDetail,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      toastr.success('Event added successful.');
      dispatch({
        type: 'ADD_EVENT'
      });
      dispatch({
        type: 'FORM_SUCCESS_ROUTE'
      });
      dispatch({
        type: 'INITIALIZE_FORM_ROUTE'
      });
    }).catch((err) => {
      toastr.error('Failed to add Event.');
      dispatch({type: 'ADD_EVENT_ERROR',
      err: err.message})
    })
  }
};