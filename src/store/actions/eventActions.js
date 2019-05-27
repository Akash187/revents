import {firestore} from "../../config/fbConfig";

export const addEvent = (eventDetail) => {
  return (dispatch, getState) => {
    firestore.collection('events').add({
      ...eventDetail
    }).then(() => {
      dispatch({
        type: 'ADD_EVENT'
      })
    }).catch((err) => {
      dispatch({type: 'ADD_EVENT_ERROR',
      err: err.message})
    })
  }
};