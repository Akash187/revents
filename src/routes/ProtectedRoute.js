import React, {Fragment} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Navbar from "../components/navbar/Navbar";
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

const ProtectedRoute = ({component: Component,auth, ...rest}) => {

  return (
    <Route {...rest} render={
      (props) => {
        return (
           (isLoaded(auth) && auth.uid) ? <Fragment>
            <Navbar/>
            <Container className='project-content'>
              <Component {...props}/>
            </Container>
          </Fragment> : <Redirect to='/dashboard'/>
        )
      }
    }/>
  );
};

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth
  }
};

export default connect(mapStateToProps)(ProtectedRoute);
