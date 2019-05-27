import eventReducer from './eventReducer';
import { combineReducers } from 'redux';
import { firestoreReducer} from "redux-firestore";
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  event: eventReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;