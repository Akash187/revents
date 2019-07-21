import React, {Fragment} from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import {Container, Dimmer, Loader} from 'semantic-ui-react';
import Navbar from "../components/navbar/Navbar";
import {updatePrevProtectedRoute} from "../store/actions/routeActions";
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

const ProtectedRoute = ({component: Component,auth, history, updatePrevProtectedRoute, ...rest}) => {

  updatePrevProtectedRoute(history.location.pathname);

  return (
    <Route {...rest} render={
      (props) => {
        if(isLoaded(auth)){
          if(auth.uid){
            return <Fragment>
              <Navbar/>
              <Container className='project-content'>
                <Component {...props}/>
              </Container>
            </Fragment>
          }else{
            return <Redirect to='/authenticate'/>
          }
        }else{
          return <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        }
      }
    }/>
  );
};

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth
  }
};

const matchDispatchToProps = (dispatch) => {
  return{
    updatePrevProtectedRoute : (route) => dispatch(updatePrevProtectedRoute(route))
  }
};

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(ProtectedRoute));
