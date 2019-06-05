import eventReducer from './eventReducer';
import formReducer from './formReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';
import { firestoreReducer} from "redux-firestore";
import { firebaseReducer } from 'react-redux-firebase';
import {reducer as toastrReducer} from 'react-redux-toastr';

const rootReducer = combineReducers({
  event: eventReducer,
  form: formReducer,
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  toastr: toastrReducer
});

export default rootReducer;