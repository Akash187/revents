import {firestore} from "../../config/fbConfig";
import {toastr} from 'react-redux-toastr';

export const basicProfile = (info) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'FORM_SUBMITTING'
    });
    const uid = getState().firebase.auth.uid;
    firestore.collection('users').doc(uid).update({
      ...info
    }).then(() => {
      toastr.success('Basic profile Updated.');
      dispatch({
        type: 'RESET_FORM_SUBMITTING'
      });
    }).catch((err) => {
      dispatch({
        type: 'RESET_FORM_SUBMITTING'
      });
      toastr.error('Failed to Update.', err.message);
    });
  }
};

export const aboutMeProfile = (info) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'FORM_SUBMITTING'
    });
    const uid = getState().firebase.auth.uid;
    firestore.collection('users').doc(uid).update({
      ...info
    }).then(() => {
      dispatch({
        type: 'RESET_FORM_SUBMITTING'
      });
      toastr.success('About Me Updated.');
    }).catch((err) => {
      dispatch({
        type: 'RESET_FORM_SUBMITTING'
      });
      toastr.error('Failed to Update.', err.message);
    });
  }
};