import {auth, firebase, firestore, googleProvider, facebookProvider} from "../../config/fbConfig";
import {toastr} from 'react-redux-toastr';
import React from 'react';

export const signIn = (credentials) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'FORM_SUBMITTING'
    });
    auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({
        type: 'RESET_FORM_SUBMITTING'
      });
      dispatch({type: 'LOGIN_SUCCESS'});
    }).catch((err) => {
      dispatch({
        type: 'RESET_FORM_SUBMITTING'
      });
      toastr.error('Failed to Login.', `Email and Password didn't Match.`);
      dispatch({type: 'LOGIN_ERROR', err})
    });
  }
};

export const googleSignIn = () => {
  return (dispatch, getState) => {
    auth.signInWithPopup(googleProvider).then(function(result) {
      return result;
    }).then((result) => {
      if(result.additionalUserInfo.isNewUser){
        firestore.collection('users').doc(result.user.uid).set({
          name: result.additionalUserInfo.profile.name,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          authMethod: "google",
          images: firebase.firestore.FieldValue.arrayUnion(result.additionalUserInfo.profile.picture)
        });
      }
    }).catch(function(error) {
      console.log(error);
      toastr.error('Failed to SignIn', error.message);
    });
  }
};

export const facebookSignIn = () => {
  return (dispatch, getState) => {
    auth.signInWithPopup(facebookProvider).then(function(result) {
      return result;
    }).then((result) => {
      const fbUID = result.user.providerData[0].uid;
      const photoURL = 'https://graph.facebook.com/' + fbUID + '/picture?type=large';
      if(result.additionalUserInfo.isNewUser){
        firestore.collection('users').doc(result.user.uid).set({
          name: result.additionalUserInfo.profile.name,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          authMethod: 'facebook',
          images: firebase.firestore.FieldValue.arrayUnion(photoURL)
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
    dispatch({
      type: 'FORM_SUBMITTING'
    });
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
        type: 'RESET_FORM_SUBMITTING'
      });
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
      dispatch({
        type: 'RESET_FORM_SUBMITTING'
      });
      toastr.error('Failed to Register', err.message);
      dispatch({type: 'SIGNUP_ERROR', err: err.message});
    })
  }
};

export const updatePassword = (newPassword) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'FORM_SUBMITTING'
    });
    let user = auth.currentUser;
    user.updatePassword(newPassword).then(function() {
      dispatch({
        type: 'RESET_FORM_SUBMITTING'
      });
      toastr.success('Success', 'Updated Password Successfully.');
    }).catch(function(error) {
      dispatch({
        type: 'RESET_FORM_SUBMITTING'
      });
      if(error.code === "auth/requires-recent-login"){
        const toastrOptions = {
          timeOut: 0, // by setting to 0 it will prevent the auto close
          position: "top-left",
          showCloseButton: true, // false by default
          closeOnToastrClick: true, // false by default, this will close the toastr when user clicks on it
          component: ( // this option will give you a func 'remove' as props
            <span>You need to Re-login to update password.</span>
          )
        };
        toastr.info('The message', toastrOptions);
      }else{
        toastr.error('Failed to Update Password.', error.message);
      }
    });
  }
};