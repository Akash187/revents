import {firestore, firebase} from "../../config/fbConfig";
import {toastr} from 'react-redux-toastr';

export const addEvent = (eventDetail) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'FORM_SUBMITTING'
    });
    firestore.collection('events').add({
      ...eventDetail,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      toastr.success('Success', 'Event added successful.');
      dispatch({
        type: 'ADD_EVENT'
      });
      dispatch({
        type: 'FORM_SUCCESS'
      });
      dispatch({
        type: 'RESET_FORM_SUBMITTING'
      });
      dispatch({
        type: 'INITIALIZE_FORM'
      });
    }).catch((err) => {
      toastr.error('Failed to add Event.', err.message);
      dispatch({type: 'ADD_EVENT_ERROR',
      err: err.message});
      dispatch({
        type: 'RESET_FORM_SUBMITTING'
      });
    })
  }
};

export const addParentComment = (comment, eventId) => {
  return (dispatch, getState) => {
    const uid = getState().firebase.auth.uid;
    firestore.collection('comments').add({
      createdBy: uid,
      eventId,
      comment,
      subComments: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      parentId: ''
    })
      .then((snapshot) => {
        return firestore.collection('events').doc(eventId).update({
          comments: firebase.firestore.FieldValue.arrayUnion(snapshot.id)
        })
      })
      .then(() => console.log('Comment Added successfully!'))
      .catch((err) => {
        toastr.error('Failed to add Comment.', err.message);
      })
  }
};

export const deleteParentComment = (commentId, eventId, subComments) => {
  return (dispatch, getState) => {
    firestore.collection("comments").doc(commentId).delete()
      .then(() => {
        return firestore.collection('events').doc(eventId).update({
          comments: firebase.firestore.FieldValue.arrayRemove(commentId)
        })
      })
      .then(() => console.log('Comment Deleted successfully!'))
      .catch((err) => {
        toastr.error('Failed to delete Comment.', err.message);
      });
    subComments.forEach(comment => {
      firestore.collection("comments").doc(comment).delete();
    });
  }
};

export const updateComment = (comment,commentId) => {
  return (dispatch, getState) => {
    firestore.collection('comments').doc(commentId).update({
      comment
    })
      .then(() => console.log('Comment Updated successfully!'))
      .catch((err) => {
        toastr.error('Failed to update Comment.', err.message);
      })
  }
};

export const addChildComment = (comment, eventId, parentId) => {
  return (dispatch, getState) => {
    const uid = getState().firebase.auth.uid;
    firestore.collection('comments').add({
      createdBy: uid,
      eventId,
      comment,
      subComments: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      parentId
    })
      .then((snapshot) => {
        return firestore.collection('comments').doc(parentId).update({
          subComments: firebase.firestore.FieldValue.arrayUnion(snapshot.id)
        })
      })
      .then(() => console.log('Comment Added successfully!'))
      .catch((err) => {
        toastr.error('Failed to add Comment.', err.message);
      })
  }
};

export const deleteChildComment = (commentId, parentId) => {
  return (dispatch, getState) => {
    firestore.collection("comments").doc(commentId).delete()
      .then(() => {
        return firestore.collection('comments').doc(parentId).update({
          comments: firebase.firestore.FieldValue.arrayRemove(commentId)
        })
      })
      .then(() => console.log('Comment Deleted successfully!'))
      .catch((err) => {
        toastr.error('Failed to delete Comment.', err.message);
      });
  }
};