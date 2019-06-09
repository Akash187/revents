import {firestore} from "../../config/fbConfig";
import {toastr} from 'react-redux-toastr';

export const basicProfile = (info) => {
  return (dispatch, getState) => {
    const uid = getState().firebase.auth.uid;
    firestore.collection('users').doc(uid).update({
      ...info
    }).then(() => {
      toastr.success('Basic profile Updated.');
    }).catch((err) => {
      toastr.error('Failed to Update.', err.message);
    });
  }
};