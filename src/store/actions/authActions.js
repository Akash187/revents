import {auth, firebase, firestore, provider} from "../../config/fbConfig";
import {toastr} from 'react-redux-toastr';

export const signIn = (credentials) => {
  return (dispatch, getState) => {
    auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({type: 'LOGIN_SUCCESS'})
    }).catch((err) => {
      toastr.error('Failed to Login.', `Email and Password didn't Match.`);
      dispatch({type: 'LOGIN_ERROR', err})
    });
  }
};

export const googleSignIn = () => {
  return (dispatch, getState) => {
    auth.signInWithPopup(provider).then(function(result) {
      return result;
    }).then((result) => {
      if(result.additionalUserInfo.isNewUser){
        firestore.collection('users').doc(result.user.uid).set({
          name: result.additionalUserInfo.profile.name,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          images: firebase.firestore.FieldValue.arrayUnion(result.additionalUserInfo.profile.picture)
        });
      }
    }).catch(function(error) {
      console.log(error);
      toastr.error('Failed to SignIn', error.message);
    });
  }
};

export const signOut = () => {
  return (dispatch, getState) => {
    auth.signOut().then(() => {
      dispatch({type: 'SIGNOUT_SUCCESS'})
    })
  }
};

export const signUp = (newUser) => {
  return (dispatch, getState) => {
    auth.createUserWithEmailAndPassword(
      newUser.email, newUser.password
    ).then((res) => {
      firestore.collection('users').doc(res.user.uid)
        .set({
          name: newUser.name,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      return res.user.uid;
    }).then(() => {
      dispatch({
        type: 'SIGNUP_SUCCESS'
      });
      dispatch({
        type: 'FORM_SUCCESS'
      });
      dispatch({
        type: 'INITIALIZE_FORM'
      });
    }).catch((err) => {
      toastr.error('Failed to Register', err.message);
      dispatch({type: 'SIGNUP_ERROR', err: err.message});
    })
  }
};